import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProductsScreen() {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    title: {
      textAlign: 'center',
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Products</Text>
      </View>
    </View>
  );
} 