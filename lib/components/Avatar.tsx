import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../theme';
import { Text } from './Text';

export interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'rounded' | 'square';
  backgroundColor?: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  iconColor?: string;
  initials?: string;
  style?: ViewStyle;
}

const avatarSizes = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
} as const;

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 28,
  xl: 32,
} as const;

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  variant = 'circle',
  backgroundColor = theme.colors.primary,
  icon = 'user',
  iconColor = theme.colors.white,
  initials,
  style,
}) => {
  const avatarSize = avatarSizes[size];
  const iconSize = iconSizes[size];

  const avatarStyle = [
    styles.base,
    {
      width: avatarSize,
      height: avatarSize,
      backgroundColor,
    },
    variant === 'circle' && { borderRadius: avatarSize / 2 },
    variant === 'rounded' && { borderRadius: theme.borderRadius.lg },
    variant === 'square' && { borderRadius: 0 },
    style,
  ];

  return (
    <View style={avatarStyle}>
      {initials ? (
        <Text
          variant="label"
          size={size === 'sm' ? 'small' : size === 'lg' || size === 'xl' ? 'large' : 'medium'}
          color={iconColor}
          align="center"
          style={styles.initials}
        >
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      ) : (
        <FontAwesome
          name={icon}
          size={iconSize}
          color={iconColor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '600',
  },
}); 