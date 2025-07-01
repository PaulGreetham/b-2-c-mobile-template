import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { theme, typography } from '../theme';

type TypographyVariant = keyof typeof typography;
type TypographySize<T extends TypographyVariant> = keyof typeof typography[T];

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  size?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: keyof typeof theme.typography.body.medium;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  size = 'medium',
  color,
  align = 'left',
  style,
  ...props
}) => {
  // Get typography style
  const typographyStyle = typography[variant]?.[size as keyof typeof typography[typeof variant]] || typography.body.medium;

  const textStyle = [
    typographyStyle,
    color && { color },
    align !== 'left' && { textAlign: align },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

// Convenience components for common text variants
export const Heading: React.FC<Omit<TextProps, 'variant'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }> = ({
  level = 1,
  ...props
}) => (
  <Text variant="heading" size={`h${level}` as any} {...props} />
);

export const Body: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="body" {...props} />
);

export const Label: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="label" {...props} />
);

export const Caption: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="caption" {...props} />
);

export const Display: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="display" {...props} />
);

export const Mono: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="mono" {...props} />
); 