import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { modalStyles } from '@/styles/modalStyles';
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

  const handleResetPassword = async () => {
    setLoading(true);
    const result = await resetPassword(resetEmail);
    setLoading(false);
    
    if (result.success) {
      Alert.alert('Password Reset Email Sent', result.data?.message);
      handleClose();
    } else {
      Alert.alert('Reset Failed', result.error);
    }
  };

  const handleClose = () => {
    setResetEmail('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>Reset Password</Text>
          
          <Text style={modalStyles.modalDescription}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>
          
          <View style={modalStyles.inputGroup}>
            <Text style={modalStyles.inputLabel}>Email Address</Text>
            <TextInput
              style={modalStyles.modalInput}
              value={resetEmail}
              onChangeText={setResetEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
            />
          </View>

          <View style={modalStyles.modalButtons}>
            <TouchableOpacity style={modalStyles.modalCancelButton} onPress={handleClose}>
              <Text style={modalStyles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[modalStyles.modalSubmitButton, loading && modalStyles.modalSubmitButtonDisabled]} 
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text style={modalStyles.modalSubmitText}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 