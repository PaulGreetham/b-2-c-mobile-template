import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Button, 
  Input, 
  Text, 
  Heading, 
  Body, 
  Avatar,
  theme,
  spacing,
} from '../index';

export const UIDemo: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Typography Examples */}
        <View style={styles.section}>
          <Heading level={2}>Typography</Heading>
          <Text variant="display" size="small">Display Text</Text>
          <Heading level={1}>Main Heading</Heading>
          <Heading level={3}>Sub Heading</Heading>
          <Body size="large">Large body text example</Body>
          <Body>Regular body text</Body>
          <Text variant="caption" color={theme.colors.textSecondary}>
            Caption text example
          </Text>
        </View>

        {/* Avatar Examples */}
        <View style={styles.section}>
          <Heading level={3}>Avatars</Heading>
          <View style={styles.avatarRow}>
            <Avatar size="sm" />
            <Avatar size="md" initials="JD" />
            <Avatar size="lg" icon="star" backgroundColor={theme.colors.warning} />
            <Avatar size="xl" variant="rounded" />
          </View>
        </View>

        {/* Button Examples */}
        <View style={styles.section}>
          <Heading level={3}>Buttons</Heading>
          <Button 
            title="Primary Button" 
            onPress={handleSubmit}
            loading={loading}
            fullWidth
          />
          <Button 
            title="Secondary" 
            variant="secondary" 
            onPress={() => {}}
          />
          <Button 
            title="Outline" 
            variant="outline" 
            onPress={() => {}}
          />
          <Button 
            title="Danger" 
            variant="danger" 
            size="sm"
            onPress={() => {}}
          />
        </View>

        {/* Input Examples */}
        <View style={styles.section}>
          <Heading level={3}>Inputs</Heading>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            leftIcon="envelope"
            keyboardType="email-address"
            required
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            leftIcon="lock"
            secureTextEntry
            helperText="Must be at least 8 characters"
          />
          <Input
            label="Disabled Input"
            placeholder="This is disabled"
            disabled
            variant="filled"
          />
        </View>

        {/* Color Palette */}
        <View style={styles.section}>
          <Heading level={3}>Colors</Heading>
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: theme.colors.primary }]} />
            <View style={[styles.colorBox, { backgroundColor: theme.colors.success }]} />
            <View style={[styles.colorBox, { backgroundColor: theme.colors.warning }]} />
            <View style={[styles.colorBox, { backgroundColor: theme.colors.error }]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing['4xl'],
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
  },
}); 