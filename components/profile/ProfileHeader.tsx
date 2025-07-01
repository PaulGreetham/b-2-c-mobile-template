import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { User } from 'firebase/auth';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfileHeaderProps {
  user: User;
  pendingEmailChange: string | null;
  onEditName: () => void;
  onRefreshUserData: () => void;
  onCancelPendingEmail: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  pendingEmailChange,
  onEditName,
  onRefreshUserData,
  onCancelPendingEmail,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    authHeader: {
      alignItems: 'center',
      marginBottom: 30,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    nameSection: {
      alignItems: 'center',
      marginBottom: 4,
    },
    nameDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    profileEmail: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    pendingEmailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    pendingEmailText: {
      color: theme.colors.textSecondary,
      fontSize: 12,
    },
    cancelPendingButton: {
      padding: 4,
    },
    refreshButton: {
      padding: 4,
    },
  });

  return (
    <View style={styles.authHeader}>
      <View style={styles.avatar}>
        <FontAwesome name="user" size={32} color="white" />
      </View>
      
      {/* Display Name Section */}
      <View style={styles.nameSection}>
        <View style={styles.nameDisplay}>
          <Text style={styles.profileName}>{user.displayName || 'Set your name'}</Text>
          <TouchableOpacity onPress={onEditName}>
            <FontAwesome name="edit" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.profileEmail}>{user.email}</Text>
      {pendingEmailChange && (
        <View style={styles.pendingEmailContainer}>
          <FontAwesome name="clock-o" size={12} color={theme.colors.warning} />
          <Text style={styles.pendingEmailText}>
            Pending: {pendingEmailChange}
          </Text>
          <TouchableOpacity 
            onPress={onRefreshUserData}
            style={styles.refreshButton}
          >
            <FontAwesome name="refresh" size={10} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onCancelPendingEmail}
            style={styles.cancelPendingButton}
          >
            <FontAwesome name="times" size={10} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}; 