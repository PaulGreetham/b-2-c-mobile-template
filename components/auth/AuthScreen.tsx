import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { authStyles } from '@/styles/authStyles';
import { useAuth } from '@/hooks/useAuth';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, signup, sendVerificationEmail } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      // Login successful, user state will be updated by the hook
    } else {
      if (result.data?.needsVerification) {
        Alert.alert(
          'Email Verification Required',
          result.error,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Resend Verification',
              onPress: async () => {
                const verificationResult = await sendVerificationEmail();
                if (verificationResult.success) {
                  Alert.alert('Verification Sent', verificationResult.data?.message);
                } else {
                  Alert.alert('Error', verificationResult.error);
                }
              }
            }
          ]
        );
      } else {
        Alert.alert('Sign In Failed', result.error);
      }
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    const result = await signup(email, password, confirmPassword, displayName);
    setLoading(false);
    
    if (result.success) {
      Alert.alert(
        'Account Verification Email Sent',
        result.data?.message,
        [{ text: 'OK', onPress: () => setIsLogin(true) }]
      );
      clearForm();
    } else {
      Alert.alert('Sign Up Failed', result.error);
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    clearForm();
  };

  return (
    <>
      <View style={authStyles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={authStyles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <ScrollView 
            contentContainerStyle={authStyles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={authStyles.content}>
              <View style={authStyles.authCard}>
                {/* Header */}
                <View style={authStyles.authHeader}>
                  <Text style={authStyles.authTitle}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </Text>
                  <Text style={authStyles.authSubtitle}>
                    {isLogin 
                      ? 'Sign in to your account' 
                      : 'Sign up to get started'
                    }
                  </Text>
                </View>

                {/* Form */}
                <View style={authStyles.form}>
                  <View style={authStyles.inputGroup}>
                    <Text style={authStyles.inputLabel}>Email</Text>
                    <View style={authStyles.inputContainer}>
                      <FontAwesome name="envelope" size={16} color="#9CA3AF" style={authStyles.inputIcon} />
                      <TextInput
                        style={authStyles.textInput}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  {!isLogin && (
                    <View style={authStyles.inputGroup}>
                      <Text style={authStyles.inputLabel}>Full Name</Text>
                      <View style={authStyles.inputContainer}>
                        <FontAwesome name="user" size={16} color="#9CA3AF" style={authStyles.inputIcon} />
                        <TextInput
                          style={authStyles.textInput}
                          placeholder="Enter your full name"
                          value={displayName}
                          onChangeText={setDisplayName}
                          autoCapitalize="words"
                          autoCorrect={false}
                        />
                      </View>
                    </View>
                  )}

                  <View style={authStyles.inputGroup}>
                    <Text style={authStyles.inputLabel}>Password</Text>
                    <View style={authStyles.inputContainer}>
                      <FontAwesome name="lock" size={16} color="#9CA3AF" style={authStyles.inputIcon} />
                      <TextInput
                        style={authStyles.textInput}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  {!isLogin && (
                    <View style={authStyles.inputGroup}>
                      <Text style={authStyles.inputLabel}>Confirm Password</Text>
                      <View style={authStyles.inputContainer}>
                        <FontAwesome name="lock" size={16} color="#9CA3AF" style={authStyles.inputIcon} />
                        <TextInput
                          style={authStyles.textInput}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                          secureTextEntry
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                      </View>
                    </View>
                  )}

                  {/* Forgot Password Link (Login only) */}
                  {isLogin && (
                    <TouchableOpacity style={authStyles.forgotPassword} onPress={() => {
                      setShowForgotPassword(true);
                    }}>
                      <Text style={authStyles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  )}

                  {/* Submit Button */}
                  <TouchableOpacity 
                    style={[authStyles.submitButton, loading && authStyles.submitButtonDisabled]}
                    onPress={isLogin ? handleLogin : handleSignup}
                    disabled={loading}
                  >
                    <Text style={authStyles.submitButtonText}>
                      {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </Text>
                  </TouchableOpacity>

                  {/* Switch Mode */}
                  <View style={authStyles.switchMode}>
                    <Text style={authStyles.switchModeText}>
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </Text>
                    <TouchableOpacity onPress={switchMode}>
                      <Text style={authStyles.switchModeLink}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        visible={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        initialEmail={email}
      />
    </>
  );
}; 