// Helper function to provide user-friendly error messages
export const getFirebaseErrorMessage = (errorCode: string): string => {
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