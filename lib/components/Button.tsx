import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const titleStyle = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    (disabled || loading) && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colors.white : theme.colors.primary}
          style={styles.loader}
        />
      )}
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  outline: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: theme.colors.transparent,
  },
  danger: {
    backgroundColor: theme.colors.error,
  },

  // Sizes
  sm: {
    paddingHorizontal: theme.componentSpacing.button.paddingHorizontal - 4,
    paddingVertical: theme.componentSpacing.button.paddingVertical - 4,
    gap: theme.componentSpacing.button.gap - 2,
  },
  md: {
    paddingHorizontal: theme.componentSpacing.button.paddingHorizontal,
    paddingVertical: theme.componentSpacing.button.paddingVertical,
    gap: theme.componentSpacing.button.gap,
  },
  lg: {
    paddingHorizontal: theme.componentSpacing.button.paddingHorizontal + 4,
    paddingVertical: theme.componentSpacing.button.paddingVertical + 4,
    gap: theme.componentSpacing.button.gap + 2,
  },

  // Full width
  fullWidth: {
    width: '100%',
  },

  // Disabled state
  disabled: {
    opacity: 0.6,
  },

  // Text styles
  baseText: {
    fontFamily: theme.typography.label.medium.fontFamily,
    fontWeight: theme.typography.label.medium.fontWeight,
    textAlign: 'center',
  },

  // Text variants
  primaryText: {
    color: theme.colors.white,
    fontSize: theme.typography.label.medium.fontSize,
  },
  secondaryText: {
    color: theme.colors.text,
    fontSize: theme.typography.label.medium.fontSize,
  },
  outlineText: {
    color: theme.colors.primary,
    fontSize: theme.typography.label.medium.fontSize,
  },
  ghostText: {
    color: theme.colors.primary,
    fontSize: theme.typography.label.medium.fontSize,
  },
  dangerText: {
    color: theme.colors.white,
    fontSize: theme.typography.label.medium.fontSize,
  },

  // Text sizes
  smText: {
    fontSize: theme.typography.label.small.fontSize,
  },
  mdText: {
    fontSize: theme.typography.label.medium.fontSize,
  },
  lgText: {
    fontSize: theme.typography.label.large.fontSize,
  },

  disabledText: {
    opacity: 0.8,
  },

  loader: {
    marginRight: theme.spacing.sm,
  },
}); 