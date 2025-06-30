# B2C Mobile Template

A modern, beautiful Business-to-Consumer (B2C) mobile app template built with **Expo**, **TypeScript**, **NativeWind (Tailwind CSS)**, and **Expo Router**.

## 🚀 Features

### 🎯 Core Technologies
- **Expo SDK ~53.0** - Latest Expo framework for cross-platform development
- **TypeScript** - Type-safe development experience
- **Expo Router** - File-based routing system for navigation
- **NativeWind** - Tailwind CSS for React Native styling
- **React Native Reanimated** - Smooth animations and gestures

### 📱 App Features
- **Modern UI/UX Design** - Clean, contemporary interface with beautiful styling
- **Tab Navigation** - Bottom tab navigation with Home and Profile screens
- **Modal Presentations** - Modern notification modal system
- **Responsive Layout** - Optimized for different screen sizes
- **Dark/Light Mode Support** - Built-in theme switching capability

### 🏠 Home Screen
- Welcome header with user greeting
- Search functionality with modern search bar
- Category selection with horizontal scrolling
- Featured products showcase
- Quick action buttons (Wishlist, Cart, Offers)
- Beautiful gradient buttons and cards

### 👤 Profile Screen
- User profile information card
- Statistics dashboard (Orders, Points, Reviews)
- Account management menu
- Settings with toggle switches
- Modern list design with icons

### 🔔 Notifications Modal
- Real-time notification system
- Different notification types (Orders, Promotions, Wishlist, etc.)
- Unread status indicators
- Modern card-based layout
- Color-coded notification categories

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Quick Start

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd b-2-c-mobile-template
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Run on Device/Simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📁 Project Structure

```
b-2-c-mobile-template/
├── app/                    # App screens and routing
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Home screen
│   │   └── two.tsx        # Profile screen
│   ├── _layout.tsx        # Root layout
│   ├── modal.tsx          # Notifications modal
│   └── +not-found.tsx     # 404 error screen
├── assets/                # Static assets (images, fonts)
├── components/            # Reusable components
├── constants/             # App constants and colors
├── babel.config.js        # Babel configuration
├── metro.config.js        # Metro bundler configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── global.css            # Global CSS with Tailwind directives
├── nativewind-env.d.ts   # TypeScript definitions for NativeWind
└── package.json          # Dependencies and scripts
```

## 🎨 Styling & Design System

### NativeWind Classes
This template uses Tailwind CSS classes through NativeWind. Common patterns:

```tsx
// Layout
className="flex-1 bg-gray-50"
className="px-6 py-4"
className="flex-row items-center justify-between"

// Cards & Containers
className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"

// Typography
className="text-2xl font-bold text-gray-900"
className="text-gray-600 text-sm"

// Interactive Elements
className="bg-blue-500 rounded-full items-center justify-center"
```

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Background**: Gray-50 (#F9FAFB)
- **Cards**: White (#FFFFFF)
- **Text**: Gray-900 (#111827)
- **Secondary Text**: Gray-600 (#4B5563)

## 🧭 Navigation Structure

The app uses Expo Router with the following structure:

- **Root Layout** (`app/_layout.tsx`) - Main app wrapper
- **Tab Layout** (`app/(tabs)/_layout.tsx`) - Bottom tab navigation
- **Home Screen** (`app/(tabs)/index.tsx`) - Main dashboard
- **Profile Screen** (`app/(tabs)/two.tsx`) - User profile & settings
- **Modal Screen** (`app/modal.tsx`) - Notifications overlay

## 📱 Screen Descriptions

### Home Screen (`/`)
Modern e-commerce style home screen with:
- Personalized greeting
- Search functionality
- Category browsing
- Featured products
- Quick action buttons

### Profile Screen (`/profile`)
Comprehensive user profile with:
- User information card
- Activity statistics
- Account management options
- App settings
- Sign out functionality

### Notifications Modal (`/modal`)
Beautiful notification center with:
- Different notification types
- Unread indicators
- Time stamps
- Action buttons

## 🔧 Configuration Files

### NativeWind Setup
```javascript
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  // ...
};
```

### Babel Configuration
```javascript
// babel.config.js
module.exports = {
  presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
  plugins: ["nativewind/babel"],
};
```

## 🚀 Deployment

### Build for Production
```bash
# Create production build
npx expo build

# Build for specific platforms
npx expo build:ios
npx expo build:android
```

### App Store Deployment
1. Configure `app.json` with your app details
2. Set up signing certificates
3. Run production build
4. Submit to App Store/Play Store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Expo Documentation](https://docs.expo.dev/)
2. Review [NativeWind Documentation](https://www.nativewind.dev/)
3. Open an issue in this repository

---

**Happy Coding!** 🎉 