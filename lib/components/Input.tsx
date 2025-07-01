import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: keyof typeof FontAwesome.glyphMap;
  rightIcon?: keyof typeof FontAwesome.glyphMap;
  onRightIconPress?: () => void;
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  required = false,
  containerStyle,
  inputStyle,
  labelStyle,
  ...props
}) => {
  const hasError = !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, styles[`${size}Label`], labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}
      
      <View
        style={[
          styles.inputContainer,
          styles[variant],
          styles[size],
          hasError && styles.error,
          disabled && styles.disabled,
        ]}
      >
        {leftIcon && (
          <FontAwesome
            name={leftIcon}
            size={16}
            color={hasError ? theme.colors.error : theme.colors.textSecondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            styles[`${size}Input`],
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.textMuted}
          editable={!disabled}
          {...props}
        />
        
        {rightIcon && (
          <FontAwesome
            name={rightIcon}
            size={16}
            color={hasError ? theme.colors.error : theme.colors.textSecondary}
            style={styles.rightIcon}
            onPress={onRightIconPress}
          />
        )}
      </View>
      
      {(error || helperText) && (
        <View style={styles.messageContainer}>
          <Text
            style={[
              styles.message,
              hasError ? styles.errorMessage : styles.helperMessage,
            ]}
          >
            {error || helperText}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },

  labelContainer: {
    marginBottom: theme.componentSpacing.form.labelGap,
  },

  label: {
    ...theme.typography.label.medium,
    color: theme.colors.text,
  },

  required: {
    color: theme.colors.error,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
  },

  // Variants
  default: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderColor: theme.colors.border,
  },

  filled: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderColor: theme.colors.transparent,
  },

  outline: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.border,
  },

  // Sizes
  sm: {
    paddingHorizontal: theme.componentSpacing.input.paddingHorizontal - 4,
    paddingVertical: theme.componentSpacing.input.paddingVertical - 4,
  },

  md: {
    paddingHorizontal: theme.componentSpacing.input.paddingHorizontal,
    paddingVertical: theme.componentSpacing.input.paddingVertical,
  },

  lg: {
    paddingHorizontal: theme.componentSpacing.input.paddingHorizontal + 4,
    paddingVertical: theme.componentSpacing.input.paddingVertical + 4,
  },

  // States
  error: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.error[50],
  },

  disabled: {
    opacity: 0.6,
    backgroundColor: theme.colors.backgroundSecondary,
  },

  input: {
    flex: 1,
    ...theme.typography.body.medium,
    color: theme.colors.text,
    paddingVertical: 0, // Remove default padding
  },

  // Input sizes
  smInput: {
    fontSize: theme.typography.body.small.fontSize,
  },

  mdInput: {
    fontSize: theme.typography.body.medium.fontSize,
  },

  lgInput: {
    fontSize: theme.typography.body.large.fontSize,
  },

  // Label sizes
  smLabel: {
    fontSize: theme.typography.label.small.fontSize,
  },

  mdLabel: {
    fontSize: theme.typography.label.medium.fontSize,
  },

  lgLabel: {
    fontSize: theme.typography.label.large.fontSize,
  },

  leftIcon: {
    marginRight: theme.componentSpacing.input.gap,
  },

  rightIcon: {
    marginLeft: theme.componentSpacing.input.gap,
  },

  messageContainer: {
    marginTop: theme.spacing.xs,
  },

  message: {
    ...theme.typography.caption.small,
  },

  errorMessage: {
    color: theme.colors.error,
  },

  helperMessage: {
    color: theme.colors.textSecondary,
  },
}); 