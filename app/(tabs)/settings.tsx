import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

export default function SettingsScreen() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const { t, currentLanguageInfo } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const getThemeModeText = () => {
    return themeMode === 'light' ? t('settings.lightMode') : t('settings.darkMode');
  };

  const getThemeModeIcon = () => {
    return themeMode === 'light' ? 'sun-o' : 'moon-o';
  };

  const renderSettingItem = (
    icon: React.ComponentProps<typeof FontAwesome>['name'],
    title: string,
    onPress?: () => void,
    subtitle?: string
  ) => (
    <TouchableOpacity 
      style={[settingsStyles.settingItem, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} 
      onPress={onPress}
    >
      <FontAwesome name={icon} size={20} color={theme.colors.primary} />
      <View style={settingsStyles.textContainer}>
        <Text style={[settingsStyles.settingText, { color: theme.colors.text }]}>{title}</Text>
        {subtitle && <Text style={[settingsStyles.subtitleText, { color: theme.colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      <FontAwesome name="chevron-right" size={16} color={theme.colors.textMuted} />
    </TouchableOpacity>
  );

  const renderCompactSettingItem = (
    icon: React.ComponentProps<typeof FontAwesome>['name'],
    title: string,
    onPress?: () => void
  ) => (
    <TouchableOpacity 
      style={[settingsStyles.compactSettingItem, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} 
      onPress={onPress}
    >
      <FontAwesome name={icon} size={18} color={theme.colors.primary} />
      <Text style={[settingsStyles.compactSettingText, { color: theme.colors.text }]}>{title}</Text>
      <FontAwesome name="chevron-right" size={14} color={theme.colors.textMuted} />
    </TouchableOpacity>
  );

  const settingsStyles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    title: {
      textAlign: 'center' as const,
      fontSize: 32,
      fontWeight: 'bold' as const,
      color: theme.colors.text,
      marginBottom: 30,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: theme.colors.textSecondary,
      marginBottom: 12,
      marginLeft: 4,
    },
    settingItem: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
      borderWidth: 1,
    },
    compactSettingItem: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
      borderWidth: 1,
      flex: 1,
      gap: 8,
    },
    supportRow: {
      flexDirection: 'row' as const,
      gap: 8,
      marginBottom: 8,
    },
    textContainer: {
      flex: 1,
      marginLeft: 12,
    },
    settingText: {
      fontSize: 16,
      fontWeight: '500' as const,
    },
    compactSettingText: {
      fontSize: 14,
      fontWeight: '500' as const,
      flex: 1,
    },
    subtitleText: {
      fontSize: 14,
      marginTop: 2,
    },
  };

  return (
    <View style={settingsStyles.container}>
      <ScrollView style={settingsStyles.content}>
        <Text style={settingsStyles.title}>{t('settings.title')}</Text>
        
        {/* Display Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>{t('settings.display')}</Text>
          {renderSettingItem(
            getThemeModeIcon(), 
            getThemeModeText(), 
            toggleTheme
          )}
          {renderSettingItem(
            'language', 
            t('settings.languageWithCurrent'), 
            () => setShowLanguageSelector(true)
          )}
        </View>

        {/* App Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>{t('settings.app')}</Text>
          {renderSettingItem('bell', t('settings.notifications'))}
        </View>

        {/* Support Section - 2x2 Grid Layout */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>{t('settings.support')}</Text>
          
          {/* First row - Support and Q&As */}
          <View style={settingsStyles.supportRow}>
            {renderCompactSettingItem('envelope', t('settings.contactSupport'))}
            {renderCompactSettingItem('question-circle', t('settings.qa'))}
          </View>
          
          {/* Second row - Terms and Privacy */}
          <View style={settingsStyles.supportRow}>
            {renderCompactSettingItem('file-text', t('settings.termsOfService'))}
            {renderCompactSettingItem('shield', t('settings.privacyPolicy'))}
          </View>
        </View>
      </ScrollView>

      <LanguageSelector 
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </View>
  );
} 