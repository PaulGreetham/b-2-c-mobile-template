import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createAuthStyles } from '@/styles/authStyles';
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
  const { theme } = useTheme();
  const { t } = useLanguage();

  const { login, signup, sendVerificationEmail } = useAuth();
  
  // Create themed styles
  const authStyles = createAuthStyles(theme);

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      // Login successful, user state will be updated by the hook
    } else {
      if (result.data?.needsVerification) {
        Alert.alert(
          t('auth.emailVerificationRequired'),
          result.error,
          [
            { text: t('common.cancel'), style: 'cancel' },
            {
              text: t('auth.resendVerification'),
              onPress: async () => {
                const verificationResult = await sendVerificationEmail();
                if (verificationResult.success) {
                  Alert.alert(t('auth.verificationSent'), verificationResult.data?.message);
                } else {
                  Alert.alert(t('common.error'), verificationResult.error);
                }
              }
            }
          ]
        );
      } else {
        Alert.alert(t('auth.signInFailed'), result.error);
      }
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    const result = await signup(email, password, confirmPassword, displayName);
    setLoading(false);
    
    if (result.success) {
      Alert.alert(
        t('auth.accountVerificationEmailSent'),
        result.data?.message,
        [{ text: t('common.ok'), onPress: () => setIsLogin(true) }]
      );
      clearForm();
    } else {
      Alert.alert(t('auth.signUpFailed'), result.error);
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
                    {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
                  </Text>
                  <Text style={authStyles.authSubtitle}>
                    {isLogin 
                      ? t('auth.signInToAccount') 
                      : t('auth.signUpToStart')
                    }
                  </Text>
                </View>

                {/* Form */}
                <View style={authStyles.form}>
                  <View style={authStyles.inputGroup}>
                    <Text style={authStyles.inputLabel}>{t('auth.email')}</Text>
                    <View style={authStyles.inputContainer}>
                      <FontAwesome name="envelope" size={16} color={theme.colors.textMuted} style={authStyles.inputIcon} />
                      <TextInput
                        style={authStyles.textInput}
                        placeholder={t('auth.enterEmail')}
                        placeholderTextColor={theme.colors.textMuted}
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
                      <Text style={authStyles.inputLabel}>{t('auth.fullName')}</Text>
                      <View style={authStyles.inputContainer}>
                        <FontAwesome name="user" size={16} color={theme.colors.textMuted} style={authStyles.inputIcon} />
                        <TextInput
                          style={authStyles.textInput}
                          placeholder={t('auth.enterFullName')}
                          placeholderTextColor={theme.colors.textMuted}
                          value={displayName}
                          onChangeText={setDisplayName}
                          autoCapitalize="words"
                          autoCorrect={false}
                        />
                      </View>
                    </View>
                  )}

                  <View style={authStyles.inputGroup}>
                    <Text style={authStyles.inputLabel}>{t('auth.password')}</Text>
                    <View style={authStyles.inputContainer}>
                      <FontAwesome name="lock" size={16} color={theme.colors.textMuted} style={authStyles.inputIcon} />
                      <TextInput
                        style={authStyles.textInput}
                        placeholder={t('auth.enterPassword')}
                        placeholderTextColor={theme.colors.textMuted}
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
                      <Text style={authStyles.inputLabel}>{t('auth.confirmPassword')}</Text>
                      <View style={authStyles.inputContainer}>
                        <FontAwesome name="lock" size={16} color={theme.colors.textMuted} style={authStyles.inputIcon} />
                        <TextInput
                          style={authStyles.textInput}
                          placeholder={t('auth.confirmPasswordPlaceholder')}
                          placeholderTextColor={theme.colors.textMuted}
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
                      <Text style={authStyles.forgotPasswordText}>{t('auth.forgotPassword')}</Text>
                    </TouchableOpacity>
                  )}

                  {/* Submit Button */}
                  <TouchableOpacity 
                    style={[authStyles.submitButton, loading && authStyles.submitButtonDisabled]}
                    onPress={isLogin ? handleLogin : handleSignup}
                    disabled={loading}
                  >
                    <Text style={authStyles.submitButtonText}>
                      {loading ? t('common.loading') : (isLogin ? t('auth.signIn') : t('auth.signUp'))}
                    </Text>
                  </TouchableOpacity>

                  {/* Switch Mode */}
                  <View style={authStyles.switchMode}>
                    <Text style={authStyles.switchModeText}>
                      {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}
                    </Text>
                    <TouchableOpacity onPress={switchMode}>
                      <Text style={authStyles.switchModeLink}>
                        {isLogin ? t('auth.signUp') : t('auth.signIn')}
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