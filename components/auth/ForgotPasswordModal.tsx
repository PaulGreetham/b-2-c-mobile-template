import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
  initialEmail = '',
}) => {
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
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
      marginBottom: 12,
      textAlign: 'center',
    },
    modalDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
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

  const handleResetPassword = async () => {
    setLoading(true);
    const result = await resetPassword(resetEmail);
    setLoading(false);
    
    if (result.success) {
      Alert.alert(t('auth.passwordResetEmailSent'), result.data?.message);
      handleClose();
    } else {
      Alert.alert(t('auth.resetFailed'), result.error);
    }
  };

  const handleClose = () => {
    setResetEmail('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('auth.resetPassword')}</Text>
          
          <Text style={styles.modalDescription}>
            {t('auth.resetPasswordDescription')}
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('auth.emailAddress')}</Text>
            <TextInput
              style={styles.modalInput}
              value={resetEmail}
              onChangeText={setResetEmail}
              placeholder={t('auth.enterEmail')}
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={handleClose}>
              <Text style={styles.modalCancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalSubmitButton, loading && styles.modalSubmitButtonDisabled]} 
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text style={styles.modalSubmitText}>
                {loading ? t('common.sending') : t('auth.sendResetLink')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 