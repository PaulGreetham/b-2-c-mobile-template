import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { settingsStyles } from '../../styles/settingsStyles';

export default function SettingsScreen() {
  const renderSettingItem = (
    icon: React.ComponentProps<typeof FontAwesome>['name'],
    title: string,
    onPress?: () => void
  ) => (
    <TouchableOpacity style={settingsStyles.settingItem} onPress={onPress}>
      <FontAwesome name={icon} size={20} color="#3B82F6" />
      <Text style={settingsStyles.settingText}>{title}</Text>
      <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={settingsStyles.container}>
      <ScrollView style={settingsStyles.content}>
        <Text style={settingsStyles.title}>Settings</Text>
        
        {/* Display Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Display</Text>
          {renderSettingItem('adjust', 'Light/Dark Mode')}
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