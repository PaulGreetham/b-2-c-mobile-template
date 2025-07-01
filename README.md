# 📱 B2C Mobile Template

A modern, production-ready React Native template built with Expo and Firebase, designed specifically for **Business-to-Consumer (B2C)** applications. This template provides a complete authentication system, user management foundation, and enhanced UX features including theme switching and multi-language support.

## ✨ Features

### 🔐 **Complete Authentication System**
- **Email/Password** signup and login
- **Email verification** required before access
- **Password reset** functionality
- **Profile management** (change name, email, password)
- **Account deletion** with confirmation
- **Result pattern** error handling (no try-catch)
- **Fully localized** authentication screens

### 🎨 **Advanced Theme System**
- **Light/Dark mode** toggle with system preference
- **Persistent theme** selection using AsyncStorage
- **Dynamic color schemes** throughout the app
- **Themed tab navigation** with consistent styling
- **Theme context** for easy customization

### 🌍 **Multi-Language Support**
- **6 Languages**: English, Dutch, French, Spanish, German, Italian
- **Complete translation system** with context-based keys
- **Persistent language** selection using AsyncStorage
- **Runtime language switching** without app restart
- **Comprehensive coverage** of all UI text including auth flows

### 📱 **Enhanced Navigation & UX**
- **5-Tab navigation**: Home, Products, Orders, Profile, Settings
- **FontAwesome icons** with theme-aware colors
- **Modern UI patterns** and smooth animations
- **Responsive design** across devices
- **Intuitive user experience** for B2C applications

### ⚙️ **Comprehensive Settings**
- **Organized settings sections**: Display, App, Support
- **Theme toggle** with current mode indicator
- **Language selector** with native language names
- **Quick access** to notifications, support, and policies

### 🏗️ **Modern Architecture**
- **TypeScript** throughout for type safety
- **Component-based** design system
- **Custom hooks** for state management
- **Context-based** theme and language management
- **Modular styling** with dynamic theming
- **Clean separation** of concerns

### 📱 **B2C Optimized**
- Users can **browse without signup**
- **Enhanced features** unlocked with account
- **Tab navigation** for intuitive UX
- **Progressive engagement** strategy

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
├── app/                          # Expo Router pages
│   ├── (tabs)/                  # Tab navigation
│   │   ├── index.tsx            # Home screen
│   │   ├── products.tsx         # Products screen
│   │   ├── orders.tsx           # Orders screen
│   │   ├── profile.tsx          # Profile screen
│   │   ├── settings.tsx         # Settings screen
│   │   └── _layout.tsx          # Tab layout with navigation
├── components/                   # Reusable components
│   ├── auth/                    # Authentication components
│   │   ├── AuthScreen.tsx       # Login/signup forms
│   │   └── ForgotPasswordModal.tsx
│   ├── profile/                 # Profile management
│   │   ├── ProfileScreen.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── ActionButtons.tsx
│   │   ├── ChangeNameModal.tsx
│   │   ├── ChangeEmailModal.tsx
│   │   └── ChangePasswordModal.tsx
│   └── settings/                # Settings components
│       ├── SettingsScreen.tsx
│       └── LanguageSelector.tsx
├── contexts/                     # React Context providers
│   ├── ThemeContext.tsx         # Theme management
│   └── LanguageContext.tsx      # Language management
├── hooks/                        # Custom React hooks
│   └── useAuth.ts               # Authentication logic
├── lib/                          # Core libraries
│   ├── theme/                   # Design system
│   │   ├── themes.ts            # Light/dark theme definitions
│   │   ├── colors.ts            # Color palette
│   │   ├── typography.ts        # Font system
│   │   └── spacing.ts           # Layout system
│   ├── i18n/                    # Internationalization
│   │   └── translations/        # Translation files
│   │       ├── index.ts         # Export all translations
│   │       ├── en.ts            # English translations
│   │       ├── nl.ts            # Dutch translations
│   │       ├── fr.ts            # French translations
│   │       ├── es.ts            # Spanish translations
│   │       ├── de.ts            # German translations
│   │       └── it.ts            # Italian translations
│   └── components/              # Base UI components
├── styles/                       # Component styles
│   ├── authStyles.ts            # Authentication styling
│   └── tabStyles.ts             # Tab navigation styling
├── utils/                        # Utility functions
│   └── firebaseErrors.ts        # Error message handling
└── config/                       # Configuration files
    └── firebase.js              # Firebase setup
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

### **Theme System** (`contexts/ThemeContext.tsx`)
Dynamic theme management with persistence:

```typescript
const { theme, currentTheme, toggleTheme } = useTheme();

// Access theme colors
<View style={{ backgroundColor: theme.colors.background }}>
  <Text style={{ color: theme.colors.text }}>Hello World</Text>
</View>

// Toggle between light/dark
<TouchableOpacity onPress={toggleTheme}>
  <Text>Switch Theme</Text>
</TouchableOpacity>
```

### **Multi-Language System** (`contexts/LanguageContext.tsx`)
Comprehensive translation support:

```typescript
const { t, currentLanguage, changeLanguage } = useLanguage();

// Use translations
<Text>{t('auth.welcomeBack')}</Text>
<Text>{t('settings.language')}</Text>

// Change language
changeLanguage('es'); // Switch to Spanish
```

### **Tab Navigation** (`app/(tabs)/_layout.tsx`)
5-tab navigation with theme-aware styling:

```typescript
// Tabs: Home, Products, Orders, Profile, Settings
// Each tab has FontAwesome icons and themed colors
// Automatically adapts to current theme
```

## 📋 Usage Patterns

### **Adding New Screens**
1. Create component in `components/` or add to `app/(tabs)/`
2. Use theme and language contexts for styling and text
3. Import auth state from `useAuth` hook
4. Handle loading/error states with result pattern

### **Adding Translations**
1. Add new keys to `lib/i18n/translations/en.ts`
2. Translate to all supported languages
3. Use `t('category.key')` in components
4. Organize keys by feature/screen for maintainability

### **Customizing Themes**
1. Edit `lib/theme/themes.ts` for light/dark definitions
2. Modify color palettes for both themes
3. Use `theme.colors.*` throughout components
4. Theme changes apply instantly across the app

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
  Alert.alert(t('common.error'), result.error);
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
const { t } = useLanguage();

return (
  <View>
    {/* Always available */}
    <PublicContent />
    
    {/* Enhanced features for authenticated users */}
    {user ? (
      <PremiumFeatures />
    ) : (
      <SignupPrompt message={t('auth.signUpToStart')} />
    )}
  </View>
);
```

### **Localization Best Practices**
```typescript
// Use translation keys for all user-facing text
<Text>{t('home.welcome')}</Text>

// Handle plurals and dynamic content
<Text>{t('orders.count', { count: orderCount })}</Text>

// Organize translations by feature
const translations = {
  auth: { /* authentication strings */ },
  profile: { /* profile strings */ },
  settings: { /* settings strings */ }
};
```

## 🎨 Theme Customization

### **Adding New Colors**
```typescript
// lib/theme/themes.ts
export const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#FF6B35', // Add your brand colors
    success: '#28A745',
    // ...
  }
};
```

### **Using Theme Colors**
```typescript
const { theme } = useTheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
  },
  text: {
    color: theme.colors.text,
  }
});
```

## 🌍 Adding New Languages

### **1. Create Translation File**
```typescript
// lib/i18n/translations/pt.ts (Portuguese example)
export const pt = {
  common: {
    cancel: 'Cancelar',
    save: 'Salvar',
    // ...
  },
  auth: {
    welcomeBack: 'Bem-vindo de Volta',
    // ...
  }
};
```

### **2. Update Language Context**
```typescript
// contexts/LanguageContext.tsx
export type LanguageCode = 'en' | 'nl' | 'fr' | 'es' | 'de' | 'it' | 'pt';

export const SUPPORTED_LANGUAGES: Language[] = [
  // ... existing languages
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
];
```

### **3. Export Translation**
```typescript
// lib/i18n/translations/index.ts
import { pt } from './pt';

export const translations = {
  // ... existing
  pt,
};
```

## 🔒 Security Features

- **Email verification** required before access
- **Password strength** validation (6+ characters)
- **Reauthentication** for sensitive operations
- **Secure password reset** flow
- **Account deletion** with double confirmation
- **Localized security messages** in user's language

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
- **Push notifications** with localized messages
- **Analytics** (Firebase Analytics)
- **Crash reporting** (Firebase Crashlytics)
- **Database** integration (Firestore)
- **File storage** (Firebase Storage)
- **More languages** based on your target markets
- **Right-to-left (RTL)** language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Add translations for new text
6. Submit a pull request

## 📱 Screenshots

### Light Mode
- 🏠 **Home**: Clean welcome screen with tab navigation
- 🛍️ **Products**: Product browsing interface
- 📋 **Orders**: Order management screen
- 👤 **Profile**: Complete profile management with modals
- ⚙️ **Settings**: Organized settings with theme/language toggles

### Dark Mode
- 🌙 **Consistent theming** across all screens
- 🎨 **Dynamic colors** that adapt to theme
- 👁️ **Eye-friendly** dark interface

### Multi-Language
- 🇺🇸 **English** (default)
- 🇳🇱 **Nederlands** (Dutch)
- 🇫🇷 **Français** (French)
- 🇪🇸 **Español** (Spanish)
- 🇩🇪 **Deutsch** (German)
- 🇮🇹 **Italiano** (Italian)

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using Expo, React Native, TypeScript, Firebase, and comprehensive UX features for modern B2C applications** 