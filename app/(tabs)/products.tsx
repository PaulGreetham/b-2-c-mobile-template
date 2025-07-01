import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductsScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      color: theme.colors.text,
      textAlign: 'center' as const,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('products.title')}</Text>
    </View>
  );
} 