import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { modalStyles } from '@/styles/modalStyles';
import { useAuth } from '@/hooks/useAuth';

interface ChangeNameModalProps {
  visible: boolean;
  onClose: () => void;
  currentName: string;
}

export const ChangeNameModal: React.FC<ChangeNameModalProps> = ({
  visible,
  onClose,
  currentName,
}) => {
  const [newDisplayName, setNewDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateDisplayName } = useAuth();

  useEffect(() => {
    if (visible) {
      setNewDisplayName(currentName);
    }
  }, [visible, currentName]);

  const handleUpdateName = async () => {
    setLoading(true);
    const result = await updateDisplayName(newDisplayName);
    setLoading(false);
    
    if (result.success) {
      Alert.alert('Success', result.data?.message);
      handleClose();
    } else {
      Alert.alert('Update Failed', result.error);
    }
  };

  const handleClose = () => {
    setNewDisplayName('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>Change Name</Text>
          
          <View style={modalStyles.inputGroup}>
            <Text style={modalStyles.inputLabel}>Display Name</Text>
            <TextInput
              style={modalStyles.modalInput}
              value={newDisplayName}
              onChangeText={setNewDisplayName}
              placeholder="Enter your display name"
              autoFocus
            />
          </View>

          <View style={modalStyles.modalButtons}>
            <TouchableOpacity style={modalStyles.modalCancelButton} onPress={handleClose}>
              <Text style={modalStyles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[modalStyles.modalSubmitButton, loading && modalStyles.modalSubmitButtonDisabled]} 
              onPress={handleUpdateName}
              disabled={loading}
            >
              <Text style={modalStyles.modalSubmitText}>
                {loading ? 'Updating...' : 'Update Name'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 