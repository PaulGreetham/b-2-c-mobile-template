// Design System Colors
export const colors = {
  // Primary brand colors
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    900: '#1E3A8A',
  },
  
  // Neutral/Gray scale
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: {
    50: '#F0FDF4',
    500: '#22C55E',
    600: '#16A34A',
  },
  
  warning: {
    50: '#FFFBEB',
    500: '#F59E0B',
    600: '#D97706',
  },
  
  error: {
    50: '#FEF2F2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
  
  // Common colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // App-specific semantic mapping
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    heavy: '#9CA3AF',
  },
} as const;

// Color shortcuts for common usage
export const theme = {
  colors: {
    // Primary brand
    primary: colors.primary[500],
    primaryLight: colors.primary[100],
    primaryDark: colors.primary[700],

    // Backgrounds
    background: colors.background,
    backgroundSecondary: colors.background,
    
    // Text
    text: colors.text.primary,
    textSecondary: colors.text.secondary,
    textMuted: colors.text.disabled,
    
    // Status
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    info: colors.primary[500],
    
    // Borders
    border: colors.border.light,
    borderMedium: colors.border.medium,
    
    // Special
    white: colors.white,
    black: colors.black,
    transparent: colors.transparent,
  },
} as const;

export type Colors = typeof colors;
export type Theme = typeof theme; 