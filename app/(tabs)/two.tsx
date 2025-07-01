import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react';
import { auth } from '@/config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  User,
  updateProfile,
  updatePassword,
  deleteUser,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  verifyBeforeUpdateEmail,
  sendPasswordResetEmail
} from 'firebase/auth';

type UserType = User | null;

// Helper function to provide user-friendly error messages
const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/requires-recent-login':
      return 'Please sign in again to complete this action.';
    case 'auth/email-already-exists':
      return 'This email is already registered to another account.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed. Please contact support.';
    case 'auth/invalid-action-code':
      return 'The action code is invalid. Please try again.';
    case 'auth/expired-action-code':
      return 'The action code has expired. Please request a new one.';
    case 'auth/user-token-expired':
      return 'Your session has expired. Please sign in again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

export default function ProfileScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>(null);

  // Profile management states
  const [newDisplayName, setNewDisplayName] = useState('');
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeName, setShowChangeName] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [pendingEmailChange, setPendingEmailChange] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Only set user if they are verified
      if (user && user.emailVerified) {
        setUser(user);
        setNewDisplayName(user.displayName || '');
        
        // Clear pending email change if the current email matches the pending one
        if (pendingEmailChange && user.email === pendingEmailChange) {
          setPendingEmailChange(null);
          Alert.alert('Email Updated!', 'Your email address has been successfully changed.');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [pendingEmailChange]);

  const refreshUserData = useCallback(async () => {
    if (!user) return;
    
    try {
      // Reload the user data from Firebase
      await user.reload();
      
      // Get the updated user object
      const updatedUser = auth.currentUser;
      if (updatedUser) {
        console.log('Refreshed user email:', updatedUser.email);
        
        // Clear pending email change if the email has been updated
        if (pendingEmailChange && updatedUser.email === pendingEmailChange) {
          setPendingEmailChange(null);
          Alert.alert('Email Updated!', 'Your email address has been successfully changed.');
        }
      }
    } catch (error: any) {
      console.log('Error refreshing user data:', error);
    }
  }, [user, pendingEmailChange]);

  // Auto-refresh user data when there's a pending email change
  useEffect(() => {
    if (!pendingEmailChange) return;

    const interval = setInterval(() => {
      refreshUserData();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [pendingEmailChange, refreshUserData]);

  const clearAllForms = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setNewEmail('');
    setNewPassword('');
    setConfirmNewPassword('');
    setCurrentPassword('');
    setNewDisplayName('');
    setShowChangeName(false);
    setPendingEmailChange(null);
    setShowForgotPassword(false);
    setResetEmail('');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if email is verified
      if (!user.emailVerified) {
        await signOut(auth); // Sign out the unverified user
        Alert.alert(
          'Email Verification Required',
          'Please verify your email address before signing in. Check your inbox for a verification link.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Resend Verification',
              onPress: async () => {
                try {
                  await sendEmailVerification(user);
                  Alert.alert('Verification Sent', 'A new verification email has been sent to your inbox.');
                } catch (error: any) {
                  Alert.alert('Error', getFirebaseErrorMessage(error.code));
                }
              }
            }
          ]
        );
        setLoading(false);
        return;
      }
      
      // User is verified, login successful (no success message needed)
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Sign In Failed', getFirebaseErrorMessage(error.code));
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Send standard verification email (no Dynamic Links needed)
      await sendEmailVerification(user);
      await signOut(auth); // Sign out the user until they verify their email
      
      Alert.alert(
        'Account Verification Email Sent',
        'Please check your inbox and click the verification link to activate your account. After verifying, return to the app to sign in.',
        [{ text: 'OK', onPress: () => setIsLogin(true) }]
      );
      
      // Clear form after successful signup
      clearAllForms();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Sign Up Failed', getFirebaseErrorMessage(error.code));
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              clearAllForms(); // Clear all forms on logout
            } catch (error: any) {
              Alert.alert('Error', getFirebaseErrorMessage(error.code));
            }
          }
        }
      ]
    );
  };

  const handleUpdateDisplayName = async () => {
    if (!user || !newDisplayName.trim()) {
      Alert.alert('Invalid Name', 'Please enter a valid name.');
      return;
    }

    setLoading(true);
    try {
      await updateProfile(user, { displayName: newDisplayName.trim() });
      setShowChangeName(false);
      setNewDisplayName('');
      Alert.alert('Success', 'Display name updated successfully!');
      // Trigger a re-render by updating the user state
      setUser({ ...user });
    } catch (error: any) {
      Alert.alert('Update Failed', getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailVerification = async () => {
    if (!user) return;

    try {
      // Send standard verification email (no Dynamic Links needed)
      await sendEmailVerification(user);
      Alert.alert('Verification Sent', 'A verification email has been sent to your inbox. Please check your email and click the verification link.');
    } catch (error: any) {
      Alert.alert('Error', getFirebaseErrorMessage(error.code));
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert('Missing Email', 'Please enter your email address.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setShowForgotPassword(false);
      setResetEmail('');
      Alert.alert(
        'Password Reset Email Sent',
        `A password reset link has been sent to ${resetEmail}.\n\nPlease check your inbox and click the link to reset your password.`
      );
    } catch (error: any) {
      Alert.alert('Reset Failed', getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const reauthenticateUser = async (password: string) => {
    if (!user || !user.email) throw new Error('No user found');
    
    console.log('Attempting reauthentication for user:', user.email);
    const credential = EmailAuthProvider.credential(user.email, password);
    
    try {
      await reauthenticateWithCredential(user, credential);
      console.log('Reauthentication successful');
    } catch (error: any) {
      console.log('Reauthentication error:', error);
      throw error;
    }
  };

  const handleChangeEmail = async () => {
    if (!user || !newEmail || !currentPassword) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Check if the new email is the same as the current email
    if (newEmail.toLowerCase() === user.email?.toLowerCase()) {
      Alert.alert('Same Email Address', 'This is already your email address.');
      return;
    }

    setLoading(true);
    try {
      // First, reauthenticate the user
      await reauthenticateUser(currentPassword);
      
      // Instead of directly updating email, we'll use verifyBeforeUpdateEmail
      // This sends a verification email to the new address first
      await verifyBeforeUpdateEmail(user, newEmail);
      
      setShowChangeEmail(false);
      setNewEmail('');
      setCurrentPassword('');
      
      // Set the pending email change
      setPendingEmailChange(newEmail);
      
      Alert.alert(
        'Email Change Request Sent', 
        `A verification email has been sent to ${newEmail}.\n\nPlease check your inbox and click the verification link to complete the email change.\n\nYou can continue using your current email until the change is verified.`
      );
    } catch (error: any) {
      console.log('Email update error:', error);
      
      // Provide more specific error handling for common scenarios
      if (error.code === 'auth/invalid-credential') {
        Alert.alert(
          'Authentication Failed', 
          `The password you entered is incorrect. Please make sure you're using the password for your current email address (${user.email}).`
        );
      } else if (error.code === 'auth/operation-not-allowed') {
        Alert.alert(
          'Email Change Pending', 
          'You may already have a pending email change request. Please check your email inbox for any pending verification links, or wait a few minutes before trying again.'
        );
      } else {
        Alert.alert('Update Failed', getFirebaseErrorMessage(error.code));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user || !newPassword || !confirmNewPassword || !currentPassword) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Password Mismatch', 'New passwords do not match. Please try again.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Weak Password', 'New password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await reauthenticateUser(currentPassword);
      await updatePassword(user, newPassword);
      setShowChangePassword(false);
      setNewPassword('');
      setConfirmNewPassword('');
      setCurrentPassword('');
      Alert.alert('Password Updated', 'Your password has been updated successfully!');
    } catch (error: any) {
      Alert.alert('Update Failed', getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      '⚠️ Delete Account',
      'This action will permanently delete your account and all associated data. This cannot be undone.\n\nAre you absolutely sure you want to proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          style: 'destructive',
          onPress: () => {
            Alert.prompt(
              'Confirm Account Deletion',
              'To confirm deletion, please enter your current password:',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete Account',
                  style: 'destructive',
                  onPress: async (password) => {
                    if (!password || !user) return;
                    
                    setLoading(true);
                    try {
                      await reauthenticateUser(password);
                      await deleteUser(user);
                      // Clear all forms after successful account deletion
                      clearAllForms();
                      Alert.alert('Account Deleted', 'Your account has been permanently deleted.');
                    } catch (error: any) {
                      Alert.alert('Deletion Failed', getFirebaseErrorMessage(error.code));
                    } finally {
                      setLoading(false);
                    }
                  }
                }
              ],
              'secure-text'
            );
          }
        }
      ]
    );
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  // Logged in state - only show if user exists AND is verified
  if (user && user.emailVerified) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.profileContent}>
            <View style={styles.authHeader}>
              <View style={styles.avatar}>
                <FontAwesome name="user" size={32} color="white" />
              </View>
              
              {/* Display Name Section */}
              <View style={styles.nameSection}>
                <View style={styles.nameDisplay}>
                  <Text style={styles.profileName}>{user.displayName || 'Set your name'}</Text>
                  <TouchableOpacity onPress={() => {
                    setNewDisplayName(user.displayName || '');
                    setShowChangeName(true);
                  }}>
                    <FontAwesome name="edit" size={16} color="#3B82F6" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.profileEmail}>{user.email}</Text>
              {pendingEmailChange && (
                <View style={styles.pendingEmailContainer}>
                  <FontAwesome name="clock-o" size={12} color="#F59E0B" />
                  <Text style={styles.pendingEmailText}>
                    Pending: {pendingEmailChange}
                  </Text>
                  <TouchableOpacity 
                    onPress={refreshUserData}
                    style={styles.refreshButton}
                  >
                    <FontAwesome name="refresh" size={10} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => setPendingEmailChange(null)}
                    style={styles.cancelPendingButton}
                  >
                    <FontAwesome name="times" size={10} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={() => setShowChangeEmail(true)}>
                <FontAwesome name="envelope" size={16} color="#3B82F6" />
                <Text style={styles.actionButtonText}>Change Email</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={() => setShowChangePassword(true)}>
                <FontAwesome name="lock" size={16} color="#3B82F6" />
                <Text style={styles.actionButtonText}>Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <FontAwesome name="sign-out" size={16} color="#DC2626" />
                <Text style={styles.logoutText}>Sign Out</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                <FontAwesome name="trash" size={16} color="#DC2626" />
                <Text style={styles.deleteButtonText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Change Email Modal */}
          <Modal visible={showChangeEmail} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Change Email</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>New Email</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={newEmail}
                    onChangeText={setNewEmail}
                    placeholder="Enter new email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Current Password</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Enter current password"
                    secureTextEntry
                  />
                  <Text style={styles.inputHelpText}>
                    Use the password for your current email address: {user.email}
                  </Text>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalCancelButton} onPress={() => {
                    setShowChangeEmail(false);
                    setNewEmail('');
                    setCurrentPassword('');
                  }}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalSubmitButton, loading && styles.modalSubmitButtonDisabled]} 
                    onPress={handleChangeEmail}
                    disabled={loading}
                  >
                    <Text style={styles.modalSubmitText}>
                      {loading ? 'Updating...' : 'Update Email'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Change Password Modal */}
          <Modal visible={showChangePassword} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Change Password</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Current Password</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Enter current password"
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>New Password</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Enter new password"
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Confirm New Password</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    placeholder="Confirm new password"
                    secureTextEntry
                  />
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalCancelButton} onPress={() => {
                    setShowChangePassword(false);
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setCurrentPassword('');
                  }}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalSubmitButton, loading && styles.modalSubmitButtonDisabled]} 
                    onPress={handleChangePassword}
                    disabled={loading}
                  >
                    <Text style={styles.modalSubmitText}>
                      {loading ? 'Updating...' : 'Update Password'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Change Name Modal */}
          <Modal visible={showChangeName} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Change Name</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Display Name</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={newDisplayName}
                    onChangeText={setNewDisplayName}
                    placeholder="Enter your display name"
                    autoFocus
                  />
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalCancelButton} onPress={() => {
                    setShowChangeName(false);
                    setNewDisplayName('');
                  }}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalSubmitButton, loading && styles.modalSubmitButtonDisabled]} 
                    onPress={handleUpdateDisplayName}
                    disabled={loading}
                  >
                    <Text style={styles.modalSubmitText}>
                      {loading ? 'Updating...' : 'Update Name'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        {/* Forgot Password Modal - Available in all states */}
        <Modal visible={showForgotPassword} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reset Password</Text>
              
              <Text style={styles.modalDescription}>
                Enter your email address and we'll send you a link to reset your password.
              </Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.modalInput}
                  value={resetEmail}
                  onChangeText={setResetEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoFocus
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalCancelButton} onPress={() => {
                  setShowForgotPassword(false);
                  setResetEmail('');
                }}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalSubmitButton, loading && styles.modalSubmitButtonDisabled]} 
                  onPress={handleForgotPassword}
                  disabled={loading}
                >
                  <Text style={styles.modalSubmitText}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }

  // Authentication state (show for non-authenticated users or unverified users)
  return (
    <>
      <View style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              <View style={styles.authCard}>
                {/* Header */}
                <View style={styles.authHeader}>
                  <View style={styles.avatar}>
                    <FontAwesome name="user" size={32} color="white" />
                  </View>
                  <Text style={styles.authTitle}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </Text>
                  <Text style={styles.authSubtitle}>
                    {isLogin 
                      ? 'Sign in to your account' 
                      : 'Sign up to get started'
                    }
                  </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.inputContainer}>
                      <FontAwesome name="envelope" size={16} color="#9CA3AF" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputContainer}>
                      <FontAwesome name="lock" size={16} color="#9CA3AF" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  {!isLogin && (
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Confirm Password</Text>
                      <View style={styles.inputContainer}>
                        <FontAwesome name="lock" size={16} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                          style={styles.textInput}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                          secureTextEntry
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                      </View>
                    </View>
                  )}

                  {/* Forgot Password Link (Login only) */}
                  {isLogin && (
                    <TouchableOpacity style={styles.forgotPassword} onPress={() => {
                      setResetEmail(email); // Pre-fill with current email input
                      setShowForgotPassword(true);
                    }}>
                      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  )}

                  {/* Submit Button */}
                  <TouchableOpacity 
                    style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                    onPress={isLogin ? handleLogin : handleSignup}
                    disabled={loading}
                  >
                    <Text style={styles.submitButtonText}>
                      {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </Text>
                  </TouchableOpacity>

                  {/* Switch Mode */}
                  <View style={styles.switchMode}>
                    <Text style={styles.switchModeText}>
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </Text>
                    <TouchableOpacity onPress={switchMode}>
                      <Text style={styles.switchModeLink}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Forgot Password Modal - Available in all states */}
      <Modal visible={showForgotPassword} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            
            <Text style={styles.modalDescription}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.modalInput}
                value={resetEmail}
                onChangeText={setResetEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => {
                setShowForgotPassword(false);
                setResetEmail('');
              }}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalSubmitButton, loading && styles.modalSubmitButtonDisabled]} 
                onPress={handleForgotPassword}
                disabled={loading}
              >
                <Text style={styles.modalSubmitText}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  authCard: {
    backgroundColor: 'white',
    padding: 46,
    width: '100%',
    height: '100%',
    maxWidth: 400,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#3B82F6',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchMode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchModeText: {
    color: '#6B7280',
    fontSize: 14,
  },
  switchModeLink: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  nameSection: {
    alignItems: 'center',
    marginBottom: 4,
  },
  nameDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  actionButtons: {
    flex: 1,
    paddingTop: 30,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  deleteButtonText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  modalSubmitButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalSubmitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  modalSubmitText: {
    color: 'white',
    fontWeight: '600',
  },
  inputHelpText: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  pendingEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  pendingEmailText: {
    color: '#6B7280',
    fontSize: 12,
  },
  cancelPendingButton: {
    padding: 4,
  },
  refreshButton: {
    padding: 4,
  },
  modalDescription: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 20,
  },
  profileContent: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
});
