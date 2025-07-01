import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
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
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (!result.success) {
              Alert.alert('Error', result.error);
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      '⚠️ Delete Account',
      'This action will permanently delete your account and all associated data. This cannot be undone.\n\nAre you absolutely sure you want to proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          style: 'destructive',
          onPress: () => {
            Alert.prompt(
              'Confirm Account Deletion',
              'To confirm deletion, please enter your current password:',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete Account',
                  style: 'destructive',
                  onPress: async (password) => {
                    if (!password) return;
                    
                    const result = await deleteAccount(password);
                    if (result.success) {
                      Alert.alert('Account Deleted', result.data?.message);
                    } else {
                      Alert.alert('Deletion Failed', result.error);
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
        <Text style={styles.actionButtonText}>Change Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onChangePassword}>
        <FontAwesome name="lock" size={16} color={theme.colors.primary} />
        <Text style={styles.actionButtonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={16} color={theme.colors.error} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <FontAwesome name="trash" size={16} color={theme.colors.error} />
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}; 