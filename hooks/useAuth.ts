import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  updatePassword,
  deleteUser,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  verifyBeforeUpdateEmail,
  sendPasswordResetEmail
} from 'firebase/auth';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';

export interface AuthResult {
  success: boolean;
  error?: string;
  data?: any;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  pendingEmailChange: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    pendingEmailChange: null,
  });

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Only set user if they are verified
      if (user && user.emailVerified) {
        setAuthState(prev => ({
          ...prev,
          user,
          loading: false,
        }));
        
        // Clear pending email change if the current email matches the pending one
        if (authState.pendingEmailChange && user.email === authState.pendingEmailChange) {
          setAuthState(prev => ({
            ...prev,
            pendingEmailChange: null,
          }));
        }
      } else {
        setAuthState(prev => ({
          ...prev,
          user: null,
          loading: false,
        }));
      }
    });
    return unsubscribe;
  }, [authState.pendingEmailChange]);

  const setPendingEmailChange = (email: string | null) => {
    setAuthState(prev => ({ ...prev, pendingEmailChange: email }));
  };

  const refreshUserData = useCallback(async (): Promise<AuthResult> => {
    if (!authState.user) {
      return { success: false, error: 'No user logged in' };
    }
    
    const reloadResult = await authState.user.reload().catch((error) => error);
    if (reloadResult instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage(reloadResult.message) };
    }
    
    // Get the updated user object
    const updatedUser = auth.currentUser;
    if (updatedUser && authState.pendingEmailChange && updatedUser.email === authState.pendingEmailChange) {
      setAuthState(prev => ({ ...prev, pendingEmailChange: null }));
      return { success: true, data: { emailUpdated: true } };
    }
    
    return { success: true };
  }, [authState.user, authState.pendingEmailChange]);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    const result = await signInWithEmailAndPassword(auth, email, password).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    const user = result.user;
    
    // Check if email is verified
    if (!user.emailVerified) {
      await signOut(auth); // Sign out the unverified user
      return { 
        success: false, 
        error: 'Email verification required. Please verify your email address before signing in.',
        data: { needsVerification: true, user }
      };
    }
    
    return { success: true, data: { user } };
  };

  const signup = async (email: string, password: string, confirmPassword: string, displayName: string): Promise<AuthResult> => {
    if (!email || !password || !confirmPassword || !displayName.trim()) {
      return { success: false, error: 'Please fill in all fields.' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match. Please try again.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const result = await createUserWithEmailAndPassword(auth, email, password).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    const user = result.user;
    
    // Set the display name
    const profileResult = await updateProfile(user, { displayName: displayName.trim() }).catch((error) => error);
    if (profileResult instanceof Error) {
      return { success: false, error: 'Account created but failed to set display name.' };
    }
    
    // Reload user to ensure the profile update is saved
    await user.reload();
    
    // Send verification email
    const verificationResult = await sendEmailVerification(user).catch((error) => error);
    if (verificationResult instanceof Error) {
      return { success: false, error: 'Account created but failed to send verification email.' };
    }
    
    await signOut(auth); // Sign out until they verify their email
    
    return { 
      success: true, 
      data: { 
        message: 'Account created successfully. Please check your inbox and verify your email before signing in.',
        needsVerification: true 
      }
    };
  };

  const logout = async (): Promise<AuthResult> => {
    const result = await signOut(auth).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    return { success: true };
  };

  const sendVerificationEmail = async (): Promise<AuthResult> => {
    if (!authState.user) {
      return { success: false, error: 'No user logged in' };
    }

    const result = await sendEmailVerification(authState.user).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    return { success: true, data: { message: 'Verification email sent successfully.' } };
  };

  const resetPassword = async (email: string): Promise<AuthResult> => {
    if (!email) {
      return { success: false, error: 'Please enter your email address.' };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const result = await sendPasswordResetEmail(auth, email).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    return { 
      success: true, 
      data: { message: `A password reset link has been sent to ${email}. Please check your inbox and click the link to reset your password.` }
    };
  };

  const reauthenticateUser = async (password: string): Promise<AuthResult> => {
    if (!authState.user || !authState.user.email) {
      return { success: false, error: 'No user found' };
    }
    
    const credential = EmailAuthProvider.credential(authState.user.email, password);
    const result = await reauthenticateWithCredential(authState.user, credential).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    return { success: true };
  };

  const updateDisplayName = async (newDisplayName: string): Promise<AuthResult> => {
    if (!authState.user || !newDisplayName.trim()) {
      return { success: false, error: 'Please enter a valid name.' };
    }

    const result = await updateProfile(authState.user, { displayName: newDisplayName.trim() }).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    // Trigger a re-render by updating the user state
    setAuthState(prev => ({ ...prev, user: { ...prev.user! } }));
    return { success: true, data: { message: 'Display name updated successfully!' } };
  };

  const changeEmail = async (newEmail: string, currentPassword: string): Promise<AuthResult> => {
    if (!authState.user || !newEmail || !currentPassword) {
      return { success: false, error: 'Please fill in all fields.' };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Check if the new email is the same as the current email
    if (newEmail.toLowerCase() === authState.user.email?.toLowerCase()) {
      return { success: false, error: 'This is already your email address.' };
    }

    // First, reauthenticate the user
    const reauthResult = await reauthenticateUser(currentPassword);
    if (!reauthResult.success) {
      if (reauthResult.error?.includes('invalid-credential')) {
        return { 
          success: false, 
          error: `The password you entered is incorrect. Please make sure you're using the password for your current email address (${authState.user.email}).`
        };
      }
      return reauthResult;
    }
    
    // Use verifyBeforeUpdateEmail to send verification email first
    const result = await verifyBeforeUpdateEmail(authState.user, newEmail).catch((error) => error);
    if (result instanceof Error) {
      if ((result as any).code === 'auth/operation-not-allowed') {
        return { 
          success: false, 
          error: 'You may already have a pending email change request. Please check your email inbox for any pending verification links, or wait a few minutes before trying again.'
        };
      }
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    // Set the pending email change
    setPendingEmailChange(newEmail);
    
    return { 
      success: true, 
      data: { 
        message: `A verification email has been sent to ${newEmail}.\n\nPlease check your inbox and click the verification link to complete the email change.\n\nYou can continue using your current email until the change is verified.`,
        pendingEmail: newEmail
      }
    };
  };

  const changePassword = async (newPassword: string, confirmNewPassword: string, currentPassword: string): Promise<AuthResult> => {
    if (!authState.user || !newPassword || !confirmNewPassword || !currentPassword) {
      return { success: false, error: 'Please fill in all fields.' };
    }

    if (newPassword !== confirmNewPassword) {
      return { success: false, error: 'New passwords do not match. Please try again.' };
    }

    if (newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }

    const reauthResult = await reauthenticateUser(currentPassword);
    if (!reauthResult.success) {
      return reauthResult;
    }
    
    const result = await updatePassword(authState.user, newPassword).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    return { success: true, data: { message: 'Your password has been updated successfully!' } };
  };

  const deleteAccount = async (password: string): Promise<AuthResult> => {
    if (!password || !authState.user) {
      return { success: false, error: 'Password is required to delete your account.' };
    }
    
    const reauthResult = await reauthenticateUser(password);
    if (!reauthResult.success) {
      return reauthResult;
    }
    
    const result = await deleteUser(authState.user).catch((error) => error);
    if (result instanceof Error) {
      return { success: false, error: getFirebaseErrorMessage((result as any).code) };
    }
    
    return { success: true, data: { message: 'Your account has been permanently deleted.' } };
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    refreshUserData,
    sendVerificationEmail,
    resetPassword,
    updateDisplayName,
    changeEmail,
    changePassword,
    deleteAccount,
    setPendingEmailChange,
  };
}; 