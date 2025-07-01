import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { modalStyles } from '@/styles/modalStyles';
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

  const handleChangeEmail = async () => {
    setLoading(true);
    const result = await changeEmail(newEmail, currentPassword);
    setLoading(false);
    
    if (result.success) {
      Alert.alert('Email Change Request Sent', result.data?.message);
      handleClose();
    } else {
      Alert.alert('Update Failed', result.error);
    }
  };

  const handleClose = () => {
    setNewEmail('');
    setCurrentPassword('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>Change Email</Text>
          
          <View style={modalStyles.inputGroup}>
            <Text style={modalStyles.inputLabel}>New Email</Text>
            <TextInput
              style={modalStyles.modalInput}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Enter new email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={modalStyles.inputGroup}>
            <Text style={modalStyles.inputLabel}>Current Password</Text>
            <TextInput
              style={modalStyles.modalInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              secureTextEntry
            />
            <Text style={modalStyles.inputHelpText}>
              Use the password for your current email address: {currentEmail}
            </Text>
          </View>

          <View style={modalStyles.modalButtons}>
            <TouchableOpacity style={modalStyles.modalCancelButton} onPress={handleClose}>
              <Text style={modalStyles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[modalStyles.modalSubmitButton, loading && modalStyles.modalSubmitButtonDisabled]} 
              onPress={handleChangeEmail}
              disabled={loading}
            >
              <Text style={modalStyles.modalSubmitText}>
                {loading ? 'Updating...' : 'Update Email'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 