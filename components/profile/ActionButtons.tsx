import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';

interface ActionButtonsProps {
  onChangeEmail: () => void;
  onChangePassword: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onChangeEmail,
  onChangePassword,
}) => {
  const { logout, deleteAccount } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const styles = StyleSheet.create({
    actionButtons: {
      flex: 1,
      paddingTop: 30,
      gap: 12,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 12,
      gap: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    actionButtonText: {
      color: theme.colors.primary,
      fontWeight: '600',
      fontSize: 16,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.error,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 12,
    },
    logoutText: {
      color: theme.colors.error,
      fontWeight: '600',
      fontSize: 16,
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.error,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 12,
    },
    deleteButtonText: {
      color: theme.colors.error,
      fontWeight: '600',
      fontSize: 16,
    },
  });

  const handleLogout = async () => {
    Alert.alert(
      t('profile.signOutTitle'),
      t('profile.signOutMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.signOut'),
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (!result.success) {
              Alert.alert(t('common.error'), result.error);
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      t('profile.deleteAccountTitle'),
      t('profile.deleteAccountMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.continue'),
          style: 'destructive',
          onPress: () => {
            Alert.prompt(
              t('profile.confirmDeletionTitle'),
              t('profile.confirmDeletionMessage'),
              [
                { text: t('common.cancel'), style: 'cancel' },
                {
                  text: t('profile.deleteAccount'),
                  style: 'destructive',
                  onPress: async (password) => {
                    if (!password) return;
                    
                    const result = await deleteAccount(password);
                    if (result.success) {
                      Alert.alert(t('profile.accountDeleted'), result.data?.message);
                    } else {
                      Alert.alert(t('profile.deletionFailed'), result.error);
                    }
                  }
                }
              ],
              'secure-text'
            );
          }
        }
      ]
    );
  };

  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.actionButton} onPress={onChangeEmail}>
        <FontAwesome name="envelope" size={16} color={theme.colors.primary} />
        <Text style={styles.actionButtonText}>{t('profile.changeEmail')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onChangePassword}>
        <FontAwesome name="lock" size={16} color={theme.colors.primary} />
        <Text style={styles.actionButtonText}>{t('profile.changePassword')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={16} color={theme.colors.error} />
        <Text style={styles.logoutText}>{t('profile.signOut')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <FontAwesome name="trash" size={16} color={theme.colors.error} />
        <Text style={styles.deleteButtonText}>{t('profile.deleteAccount')}</Text>
      </TouchableOpacity>
    </View>
  );
}; 