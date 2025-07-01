import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { modalStyles } from '@/styles/modalStyles';
import { useAuth } from '@/hooks/useAuth';

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { changePassword } = useAuth();

  const handleChangePassword = async () => {
    setLoading(true);
    const result = await changePassword(newPassword, confirmNewPassword, currentPassword);
    setLoading(false);
    
    if (result.success) {
      Alert.alert('Password Updated', result.data?.message);
      handleClose();
    } else {
      Alert.alert('Update Failed', result.error);
    }
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>Change Password</Text>
          
          <View style={modalStyles.inputGroup}>
            <Text style={modalStyles.inputLabel}>Current Password</Text>
            <TextInput
              style={modalStyles.modalInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              secureTextEntry
            />
          </View>

          <View style={modalStyles.inputGroup}>
            <Text style={modalStyles.inputLabel}>New Password</Text>
            <TextInput
              style={modalStyles.modalInput}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
            />
          </View>

          <View style={modalStyles.inputGroup}>
            <Text style={modalStyles.inputLabel}>Confirm New Password</Text>
            <TextInput
              style={modalStyles.modalInput}
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholder="Confirm new password"
              secureTextEntry
            />
          </View>

          <View style={modalStyles.modalButtons}>
            <TouchableOpacity style={modalStyles.modalCancelButton} onPress={handleClose}>
              <Text style={modalStyles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[modalStyles.modalSubmitButton, loading && modalStyles.modalSubmitButtonDisabled]} 
              onPress={handleChangePassword}
              disabled={loading}
            >
              <Text style={modalStyles.modalSubmitText}>
                {loading ? 'Updating...' : 'Update Password'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 