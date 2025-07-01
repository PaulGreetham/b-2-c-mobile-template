# Design System Library

A comprehensive UI library with consistent theming, typography, and reusable components for the B2C Mobile Template.

## 🚀 Quick Start

```tsx
import { Button, Input, theme, Avatar } from '@/lib';

// Use components with built-in theming
<Button 
  title="Get Started" 
  variant="primary" 
  onPress={handleSubmit}
  fullWidth 
/>
```

## 🎨 Theme System

### Colors
Access colors through the theme object:

```tsx
import { theme } from '@/lib';

// Primary colors
theme.colors.primary        // #3B82F6
theme.colors.primaryLight   // #DBEAFE
theme.colors.primaryDark    // #1D4ED8

// Semantic colors
theme.colors.success        // #10B981
theme.colors.warning        // #F59E0B
theme.colors.error          // #EF4444

// Text colors
theme.colors.text           // #111827
theme.colors.textSecondary  // #6B7280
theme.colors.textMuted      // #9CA3AF
```

### Typography
Consistent typography scale:

```tsx
import { Text, Heading, Body } from '@/lib';

<Heading level={1}>Main Title</Heading>
<Heading level={2}>Section Title</Heading>
<Body size="large">Large body text</Body>
<Body>Regular body text</Body>
<Text variant="caption">Small caption</Text>
```

### Spacing
Consistent spacing system based on 4px grid:

```tsx
import { spacing } from '@/lib';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,        // 16px
    marginTop: spacing['2xl'],  // 24px
    gap: spacing.md,            // 12px
  },
});
```

## 🧩 Components

### Button

```tsx
<Button 
  title="Submit"
  variant="primary"     // primary | secondary | outline | ghost | danger
  size="md"            // sm | md | lg
  onPress={handlePress}
  loading={isLoading}
  disabled={isDisabled}
  fullWidth
/>
```

### Input

```tsx
<Input
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  leftIcon="envelope"
  rightIcon="eye"
  error={emailError}
  helperText="We'll never share your email"
  required
  variant="default"    // default | filled | outline
  size="md"           // sm | md | lg
/>
```

### Avatar

```tsx
<Avatar 
  size="lg"           // sm | md | lg | xl
  variant="circle"    // circle | rounded | square
  icon="user"
  initials="JD"
  backgroundColor={theme.colors.primary}
/>
```

### Text Components

```tsx
// Semantic text components
<Heading level={1}>Page Title</Heading>
<Body>Content text</Body>
<Label>Form labels</Label>
<Caption>Helper text</Caption>

// Generic text with variants
<Text 
  variant="heading" 
  size="h2" 
  color={theme.colors.primary}
  align="center"
>
  Custom text
</Text>
```

## 🎯 Migration Guide

### From Old Styles

**Before:**
```tsx
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
```

**After:**
```tsx
<Button 
  title="Submit" 
  variant="primary" 
  onPress={handleSubmit} 
/>
```

### Using Theme Values

**Before:**
```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    margin: 16,
  },
});
```

**After:**
```tsx
import { theme, spacing } from '@/lib';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: spacing.lg,
    margin: spacing.lg,
  },
});
```

## 📐 Design Tokens

### Spacing Scale
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 32px
- `4xl`: 40px
- `5xl`: 48px
- `6xl`: 64px

### Border Radius
- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `2xl`: 20px
- `full`: 9999px

### Shadows
```tsx
import { shadows } from '@/lib';

const styles = StyleSheet.create({
  card: {
    ...shadows.md,  // Medium shadow
  },
});
```

## 🛠️ Customization

### Extending the Theme

```tsx
// Create custom components using theme
import { theme } from '@/lib';

const CustomCard = ({ children }) => (
  <View style={{
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  }}>
    {children}
  </View>
);
```

### Custom Colors

```tsx
// Add to your theme extensions
const customColors = {
  brand: '#FF6B6B',
  accent: '#4ECDC4',
};
```

## ✨ Benefits

1. **Consistency**: All components follow the same design language
2. **Maintainability**: Change colors/fonts in one place
3. **Type Safety**: Full TypeScript support
4. **Performance**: Optimized styles and components
5. **Accessibility**: Built-in accessibility features
6. **Scalability**: Easy to extend and customize

## 📁 File Structure

```
lib/
├── theme/
│   ├── colors.ts      # Color palette
│   ├── typography.ts  # Font system
│   ├── spacing.ts     # Spacing & shadows
│   └── index.ts       # Combined theme
├── components/
│   ├── Button.tsx     # Button component
│   ├── Input.tsx      # Input component
│   ├── Text.tsx       # Text components
│   ├── Avatar.tsx     # Avatar component
│   └── index.ts       # Component exports
├── examples/
│   └── UIDemo.tsx     # Usage examples
└── index.ts           # Main export
```

## 🔄 Next Steps

1. Gradually migrate existing components to use the design system
2. Add more components as needed (Card, Modal, Toast, etc.)
3. Implement dark mode support
4. Add animation utilities
5. Create Storybook documentation 