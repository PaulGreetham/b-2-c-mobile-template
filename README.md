# 📱 B2C Mobile Template

A modern, production-ready React Native template built with Expo and Firebase, designed specifically for **Business-to-Consumer (B2C)** applications. This template provides a complete authentication system and user management foundation, allowing users to access core features without signup while unlocking enhanced functionality through account creation.

## ✨ Features

### 🔐 **Complete Authentication System**
- **Email/Password** signup and login
- **Email verification** required before access
- **Password reset** functionality
- **Profile management** (change name, email, password)
- **Account deletion** with confirmation
- **Result pattern** error handling (no try-catch)

### 🎨 **Modern Architecture**
- **TypeScript** throughout for type safety
- **Component-based** design system
- **Custom hooks** for state management
- **Modular styling** with theme system
- **Clean separation** of concerns

### 📱 **B2C Optimized**
- Users can **browse without signup**
- **Enhanced features** unlocked with account
- **Tab navigation** for intuitive UX
- **Modern UI/UX** patterns

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **Expo CLI**: `npm install -g @expo/cli`
- **Firebase account**

### 1. Clone & Install
```bash
git clone https://github.com/your-username/b-2-c-mobile-template.git
cd b-2-c-mobile-template
npm install
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name (e.g., `my-app-name`)
4. Click **"Create project"**

#### Enable Authentication
1. In Firebase Console, go to **Authentication** → **Get started**
2. Click **Sign-in method** tab
3. Enable **Email/Password** provider
4. Click **Save**

#### Get Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click **Web app** icon (`</>`）
4. Enter app nickname → **Register app**
5. Copy the `firebaseConfig` object

#### Add Config to App
1. Open `config/firebase.js`
2. Replace the placeholder config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789",
  measurementId: "G-XXXXXXXXXX"
};
```

### 3. Run the App
```bash
# Start Expo development server
npm start

# Or run on specific platform
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

## 📁 Project Structure

```
├── app/                      # Expo Router pages
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Home screen
│   │   └── profile.tsx      # Main auth/profile screen
├── components/              # Reusable components
│   ├── auth/               # Authentication components
│   │   ├── AuthScreen.tsx  # Login/signup forms
│   │   └── ForgotPasswordModal.tsx
│   └── profile/            # Profile management
│       ├── ProfileScreen.tsx
│       ├── ProfileHeader.tsx
│       └── ActionButtons.tsx
├── hooks/                   # Custom React hooks
│   └── useAuth.ts          # Authentication logic
├── lib/                     # Core libraries
│   ├── theme/              # Design system
│   │   ├── colors.ts       # Color palette
│   │   ├── typography.ts   # Font system
│   │   └── spacing.ts      # Layout system
│   └── components/         # Base UI components
├── styles/                  # Component styles
├── utils/                   # Utility functions
│   └── firebaseErrors.ts   # Error message handling
└── config/                  # Configuration files
    └── firebase.js         # Firebase setup
```

## 🔧 Key Components

### **Authentication Hook** (`hooks/useAuth.ts`)
Centralized authentication logic with result pattern error handling:

```typescript
const { user, login, signup, logout, changePassword } = useAuth();

// All methods return { success: boolean, error?: string, data?: any }
const result = await login(email, password);
if (result.success) {
  // Handle success
} else {
  // Handle error: result.error
}
```

### **Design System** (`lib/theme/`)
Consistent styling across the app:

```typescript
import { colors } from '@/lib/theme/colors';
import { spacing } from '@/lib/theme/spacing';
import { typography } from '@/lib/theme/typography';
```

## 📋 Usage Patterns

### **Adding New Screens**
1. Create component in `components/` or `app/`
2. Use the design system for styling
3. Import auth state from `useAuth` hook
4. Handle loading/error states with result pattern

### **Customizing Theme**
1. Edit `lib/theme/colors.ts` for color scheme
2. Modify `lib/theme/typography.ts` for fonts
3. Adjust `lib/theme/spacing.ts` for layout

### **Error Handling**
All Firebase operations return results instead of throwing:

```typescript
// ❌ Old way (try-catch)
try {
  await signInWithEmailAndPassword(auth, email, password);
} catch (error) {
  // Handle error
}

// ✅ New way (result pattern)
const result = await login(email, password);
if (!result.success) {
  Alert.alert('Error', result.error);
}
```

## 🎯 B2C Implementation Strategy

### **Progressive Engagement**
1. **Anonymous browsing** - Users can explore core features
2. **Soft prompts** - Encourage signup for enhanced features
3. **Value demonstration** - Show benefits of having an account
4. **Seamless onboarding** - Quick signup with email verification

### **Feature Gating Examples**
```typescript
// In your components
const { user } = useAuth();

return (
  <View>
    {/* Always available */}
    <PublicContent />
    
    {/* Enhanced features for authenticated users */}
    {user ? (
      <PremiumFeatures />
    ) : (
      <SignupPrompt />
    )}
  </View>
);
```

## 🔒 Security Features

- **Email verification** required before access
- **Password strength** validation (6+ characters)
- **Reauthentication** for sensitive operations
- **Secure password reset** flow
- **Account deletion** with double confirmation

## 🚀 Deployment

### **Building for Production**
```bash
# Create production build
eas build --platform all

# Submit to app stores
eas submit --platform all
```

### **Environment Variables**
For production, consider using environment variables:

```javascript
// config/firebase.js
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // ... other config
};
```

## 📚 Next Steps

After setup, consider adding:
- **Social login** (Google, Apple, Facebook)
- **Biometric authentication** 
- **Push notifications**
- **Analytics** (Firebase Analytics)
- **Crash reporting** (Firebase Crashlytics)
- **Database** integration (Firestore)
- **File storage** (Firebase Storage)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using Expo, React Native, TypeScript, and Firebase** 