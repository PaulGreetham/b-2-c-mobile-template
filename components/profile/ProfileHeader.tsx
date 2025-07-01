import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { User } from 'firebase/auth';
import { authStyles } from '@/styles/authStyles';
import { profileStyles } from '@/styles/profileStyles';

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
  return (
    <View style={authStyles.authHeader}>
      <View style={authStyles.avatar}>
        <FontAwesome name="user" size={32} color="white" />
      </View>
      
      {/* Display Name Section */}
      <View style={profileStyles.nameSection}>
        <View style={profileStyles.nameDisplay}>
          <Text style={profileStyles.profileName}>{user.displayName || 'Set your name'}</Text>
          <TouchableOpacity onPress={onEditName}>
            <FontAwesome name="edit" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={profileStyles.profileEmail}>{user.email}</Text>
      {pendingEmailChange && (
        <View style={profileStyles.pendingEmailContainer}>
          <FontAwesome name="clock-o" size={12} color="#F59E0B" />
          <Text style={profileStyles.pendingEmailText}>
            Pending: {pendingEmailChange}
          </Text>
          <TouchableOpacity 
            onPress={onRefreshUserData}
            style={profileStyles.refreshButton}
          >
            <FontAwesome name="refresh" size={10} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onCancelPendingEmail}
            style={profileStyles.cancelPendingButton}
          >
            <FontAwesome name="times" size={10} color="#DC2626" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}; 