# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your B2C mobile app.

## 🚀 Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "b2c-mobile-app")
4. Configure Google Analytics (optional but recommended)
5. Click "Create project"

## 📱 Step 2: Add Your App to Firebase

1. In your Firebase project dashboard, click on the "Web" icon (`</>`)
2. Register your app with a nickname (e.g., "B2C Mobile App")
3. **Don't check** "Also set up Firebase Hosting" 
4. Click "Register app"
5. Copy the Firebase configuration object (you'll need this in Step 4)

## 🔐 Step 3: Enable Authentication

1. In your Firebase console, go to **Authentication** > **Sign-in method**
2. Click on **Email/Password**
3. Enable **Email/Password** authentication
4. Click **Save**

### Optional: Enable Other Sign-in Methods
- **Google Sign-in**: Follow the setup wizard
- **Apple Sign-in**: Configure Apple developer settings
- **Facebook**: Add Facebook App ID and secret

## ⚙️ Step 4: Configure Your App

1. Open `config/firebase.js` in your project
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com", 
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## 🔄 Step 5: Enable Firebase Auth in Your App

1. Open `app/(tabs)/two.tsx`
2. Uncomment the Firebase imports at the top:
```javascript
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
```

3. Uncomment the Firebase auth state listener:
```javascript
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setUser(user);
  });
  return unsubscribe;
}, []);
```

4. Replace the demo auth functions with real Firebase calls:

### Login Function:
```javascript
const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Alert.alert('Success', 'Logged in successfully!');
  } catch (error: any) {
    setLoading(false);
    Alert.alert('Login Error', error.message || 'An error occurred');
  }
};
```

### Signup Function:
```javascript
const handleSignup = async () => {
  if (!email || !password || !confirmPassword) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  if (password.length < 6) {
    Alert.alert('Error', 'Password must be at least 6 characters long');
    return;
  }

  setLoading(true);
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    Alert.alert('Success', 'Account created successfully!');
  } catch (error: any) {
    setLoading(false);
    Alert.alert('Signup Error', error.message || 'An error occurred');
  }
};
```

### Logout Function:
```javascript
const handleLogout = async () => {
  try {
    await signOut(auth);
    Alert.alert('Success', 'Logged out successfully!');
  } catch (error: any) {
    Alert.alert('Logout Error', error.message || 'An error occurred');
  }
};
```

## 🧪 Step 6: Test Your Authentication

1. Run your app: `npx expo start`
2. Navigate to the Profile tab
3. Try creating a new account
4. Sign out and sign back in
5. Test error scenarios (wrong password, invalid email, etc.)

## 🔒 Step 7: Security Rules (Optional but Recommended)

In your Firebase console, go to **Firestore Database** or **Realtime Database** and set up security rules:

```javascript
// Firestore Rules Example
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Next Steps

After setting up Firebase Auth, you can:

1. **Add user profiles**: Store additional user data in Firestore
2. **Email verification**: Require email verification for new accounts
3. **Password reset**: Implement forgot password functionality
4. **Social login**: Add Google, Apple, or Facebook sign-in
5. **Multi-factor auth**: Add SMS or authenticator-based 2FA

## ❗ Common Issues

### "Firebase not initialized" error:
- Make sure you've replaced the placeholder config values
- Check that your Firebase project is active

### "Network error" during auth:
- Verify your internet connection
- Check Firebase project settings and API keys

### "Invalid email" errors:
- Ensure email format validation on the frontend
- Check Firebase Auth settings

### iOS/Android specific issues:
- Make sure you've added the correct platform in Firebase console
- For iOS: Add GoogleService-Info.plist 
- For Android: Add google-services.json

## 📚 Additional Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [React Native Firebase](https://rnfirebase.io/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

Your Firebase Authentication is now ready! 🎉 