import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const styles = {
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
      marginBottom: 16,
    },
    welcome: {
      fontSize: 18,
      color: theme.colors.textSecondary,
      textAlign: 'center' as const,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('home.title')}</Text>
      <Text style={styles.welcome}>{t('home.welcome')}</Text>
    </View>
  );
}
