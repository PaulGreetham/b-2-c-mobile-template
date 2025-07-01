import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { ProfileScreen } from '@/components/profile/ProfileScreen';

export default function MainScreen() {
  const { user, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return null; // You could add a loading spinner here if needed
  }

  // Show profile screen if user is logged in and verified
  if (user && user.emailVerified) {
    return <ProfileScreen />;
  }

  // Show auth screen for non-authenticated users or unverified users
  return <AuthScreen />;
} 