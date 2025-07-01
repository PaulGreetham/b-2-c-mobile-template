import { colors } from './colors';
import { typography } from './typography';
import { spacing, componentSpacing, borderRadius, shadows } from './spacing';

// Light Theme
export const lightTheme = {
  colors: {
    // Primary brand
    primary: colors.primary[500],
    primaryLight: colors.primary[100],
    primaryDark: colors.primary[700],

    // Backgrounds
    background: colors.white,
    backgroundSecondary: colors.neutral[50],
    surface: colors.white,
    card: colors.white,
    
    // Text
    text: colors.neutral[900],
    textSecondary: colors.neutral[600],
    textMuted: colors.neutral[500],
    textInverse: colors.white,
    
    // Borders
    border: colors.neutral[200],
    borderMedium: colors.neutral[300],
    
    // Status
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    info: colors.primary[500],
    
    // Tab specific
    tabIconDefault: colors.neutral[400],
    tabIconSelected: colors.primary[500],
    
    // Special
    white: colors.white,
    black: colors.black,
    transparent: colors.transparent,
  },
  typography,
  spacing,
  componentSpacing,
  borderRadius,
  shadows,
} as const;

// Dark Theme
export const darkTheme = {
  colors: {
    // Primary brand (slightly lighter in dark mode)
    primary: colors.primary[500],
    primaryLight: colors.primary[100],
    primaryDark: colors.primary[600],

    // Backgrounds
    background: colors.neutral[900],
    backgroundSecondary: colors.neutral[800],
    surface: colors.neutral[800],
    card: colors.neutral[800],
    
    // Text
    text: colors.neutral[100],
    textSecondary: colors.neutral[300],
    textMuted: colors.neutral[400],
    textInverse: colors.neutral[900],
    
    // Borders
    border: colors.neutral[700],
    borderMedium: colors.neutral[600],
    
    // Status
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    info: colors.primary[500],
    
    // Tab specific
    tabIconDefault: colors.neutral[500],
    tabIconSelected: colors.primary[500],
    
    // Special
    white: colors.white,
    black: colors.black,
    transparent: colors.transparent,
  },
  typography,
  spacing,
  componentSpacing,
  borderRadius,
  shadows,
} as const;

export type AppTheme = typeof lightTheme; 