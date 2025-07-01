// Export all theme tokens
export * from './colors';
export * from './typography';
export * from './spacing';

// Import for combined theme
import { theme as colorTheme } from './colors';
import { typography } from './typography';
import { spacing, componentSpacing, borderRadius, shadows } from './spacing';

// Combined theme object
export const theme = {
  ...colorTheme,
  typography,
  spacing,
  componentSpacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

// Utility function to get theme values
export const useTheme = () => theme; 