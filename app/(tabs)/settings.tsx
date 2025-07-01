import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, themeMode, toggleTheme } = useTheme();

  const getThemeModeText = () => {
    return themeMode === 'light' ? 'Light Mode' : 'Dark Mode';
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
    textContainer: {
      flex: 1,
      marginLeft: 12,
    },
    settingText: {
      fontSize: 16,
      fontWeight: '500' as const,
    },
    subtitleText: {
      fontSize: 14,
      marginTop: 2,
    },
  };

  return (
    <View style={settingsStyles.container}>
      <ScrollView style={settingsStyles.content}>
        <Text style={settingsStyles.title}>Settings</Text>
        
        {/* Display Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Display</Text>
          {renderSettingItem(
            getThemeModeIcon(), 
            getThemeModeText(), 
            toggleTheme
          )}
          {renderSettingItem('language', 'Language')}
        </View>

        {/* App Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>App</Text>
          {renderSettingItem('bell', 'Notifications')}
        </View>

        {/* Support Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Support</Text>
          {renderSettingItem('envelope', 'Contact Support')}
          {renderSettingItem('question-circle', 'Q&A')}
          {renderSettingItem('file-text', 'Terms of Service')}
          {renderSettingItem('shield', 'Privacy Policy')}
        </View>
      </ScrollView>
    </View>
  );
} 