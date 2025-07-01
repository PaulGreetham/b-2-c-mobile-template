import { theme } from '@/lib/theme';

const tintColorLight = theme.colors.primary;
const tintColorDark = theme.colors.white;

export default {
  light: {
    text: theme.colors.text,
    background: theme.colors.background,
    tint: tintColorLight,
    tabIconDefault: theme.colors.textMuted,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: theme.colors.white,
    background: theme.colors.black,
    tint: tintColorDark,
    tabIconDefault: theme.colors.textMuted,
    tabIconSelected: tintColorDark,
  },
};

// Re-export new theme for easy migration
export { theme };
