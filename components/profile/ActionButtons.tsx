import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { profileStyles } from '@/styles/profileStyles';
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
    <View style={profileStyles.actionButtons}>
      <TouchableOpacity style={profileStyles.actionButton} onPress={onChangeEmail}>
        <FontAwesome name="envelope" size={16} color="#3B82F6" />
        <Text style={profileStyles.actionButtonText}>Change Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={profileStyles.actionButton} onPress={onChangePassword}>
        <FontAwesome name="lock" size={16} color="#3B82F6" />
        <Text style={profileStyles.actionButtonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={16} color="#DC2626" />
        <Text style={profileStyles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={profileStyles.deleteButton} onPress={handleDeleteAccount}>
        <FontAwesome name="trash" size={16} color="#DC2626" />
        <Text style={profileStyles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}; 