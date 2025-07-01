import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';

interface ChangeEmailModalProps {
  visible: boolean;
  onClose: () => void;
  currentEmail: string;
}

export const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({
  visible,
  onClose,
  currentEmail,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { changeEmail } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      width: '100%',
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    inputGroup: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    },
    inputHelpText: {
      fontSize: 12,
      color: theme.colors.textMuted,
      marginTop: 4,
    },
    modalButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    modalCancelButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    modalCancelText: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontWeight: '600',
    },
    modalSubmitButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.colors.primary,
    },
    modalSubmitButtonDisabled: {
      opacity: 0.6,
    },
    modalSubmitText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: '600',
    },
  });

  const handleChangeEmail = async () => {
    setLoading(true);
    const result = await changeEmail(newEmail, currentPassword);
    setLoading(false);
    
    if (result.success) {
      Alert.alert(t('profile.emailChangeRequestSent'), result.data?.message);
      handleClose();
    } else {
      Alert.alert(t('profile.updateFailed'), result.error);
    }
  };

  const handleClose = () => {
    setNewEmail('');
    setCurrentPassword('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('profile.changeEmail')}</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('profile.newEmail')}</Text>
            <TextInput
              style={styles.modalInput}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder={t('profile.enterNewEmail')}
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('profile.currentPassword')}</Text>
            <TextInput
              style={styles.modalInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder={t('profile.enterCurrentPassword')}
              placeholderTextColor={theme.colors.textMuted}
              secureTextEntry
            />
            <Text style={styles.inputHelpText}>
              {t('profile.currentPasswordHelp')} {currentEmail}
            </Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={handleClose}>
              <Text style={styles.modalCancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalSubmitButton, loading && styles.modalSubmitButtonDisabled]} 
              onPress={handleChangeEmail}
              disabled={loading}
            >
              <Text style={styles.modalSubmitText}>
                {loading ? t('common.updating') : t('profile.updateEmail')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 