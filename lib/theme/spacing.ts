// Spacing scale based on 4px grid
export const spacing = {
  none: 0,
  xs: 4,    // 0.25rem
  sm: 8,    // 0.5rem  
  md: 12,   // 0.75rem
  lg: 16,   // 1rem
  xl: 20,   // 1.25rem
  '2xl': 24, // 1.5rem
  '3xl': 32, // 2rem
  '4xl': 40, // 2.5rem
  '5xl': 48, // 3rem
  '6xl': 64, // 4rem
  '7xl': 80, // 5rem
  '8xl': 96, // 6rem
} as const;

// Component-specific spacing
export const componentSpacing = {
  // Button spacing
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },

  // Input spacing
  input: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },

  // Card spacing
  card: {
    padding: spacing.lg,
    gap: spacing.md,
  },

  // Modal spacing
  modal: {
    padding: spacing['2xl'],
    gap: spacing.lg,
  },

  // Form spacing
  form: {
    gap: spacing.lg,
    labelGap: spacing.sm,
  },

  // Screen spacing
  screen: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },

  // Header spacing
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
} as const;

// Border radius values
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// Shadow system
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export type Spacing = typeof spacing;
export type ComponentSpacing = typeof componentSpacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows; 