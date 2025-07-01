import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { ProfileHeader } from './ProfileHeader';
import { ActionButtons } from './ActionButtons';
import { ChangeNameModal } from './ChangeNameModal';
import { ChangeEmailModal } from './ChangeEmailModal';
import { ChangePasswordModal } from './ChangePasswordModal';

export const ProfileScreen: React.FC = () => {
  const [showChangeName, setShowChangeName] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();

  const { 
    user, 
    pendingEmailChange, 
    refreshUserData, 
    setPendingEmailChange 
  } = useAuth();

  // Auto-refresh user data when there's a pending email change
  useEffect(() => {
    if (!pendingEmailChange) return;

    const interval = setInterval(() => {
      refreshUserData().then((result) => {
        if (result.success && result.data?.emailUpdated) {
          Alert.alert(t('profile.emailUpdated'), t('profile.emailUpdatedMessage'));
        }
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [pendingEmailChange, refreshUserData, t]);

  const handleRefreshUserData = async () => {
    const result = await refreshUserData();
    if (result.success && result.data?.emailUpdated) {
      Alert.alert(t('profile.emailUpdated'), t('profile.emailUpdatedMessage'));
    }
  };

  const handleCancelPendingEmail = () => {
    setPendingEmailChange(null);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    profileContent: {
      flex: 1,
      padding: 20,
      paddingTop: 60,
    },
  });

  if (!user) {
    return null; // This should not happen as this component is only rendered when user exists
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContent}>
          <ProfileHeader
            user={user}
            pendingEmailChange={pendingEmailChange}
            onEditName={() => setShowChangeName(true)}
            onRefreshUserData={handleRefreshUserData}
            onCancelPendingEmail={handleCancelPendingEmail}
          />
          
          <ActionButtons
            onChangeEmail={() => setShowChangeEmail(true)}
            onChangePassword={() => setShowChangePassword(true)}
          />
        </View>
      </View>

      {/* Modals */}
      <ChangeNameModal
        visible={showChangeName}
        onClose={() => setShowChangeName(false)}
        currentName={user.displayName || ''}
      />

      <ChangeEmailModal
        visible={showChangeEmail}
        onClose={() => setShowChangeEmail(false)}
        currentEmail={user.email || ''}
      />

      <ChangePasswordModal
        visible={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
}; 