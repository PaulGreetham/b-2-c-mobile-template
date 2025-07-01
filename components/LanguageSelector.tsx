import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  Pressable,
  StyleSheet
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, SUPPORTED_LANGUAGES, Language, LanguageCode } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export default function LanguageSelector({ visible, onClose }: LanguageSelectorProps) {
  const { theme } = useTheme();
  const { currentLanguage, changeLanguage, t } = useLanguage();

  const handleLanguageSelect = (languageCode: LanguageCode) => {
    changeLanguage(languageCode);
    onClose();
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modal: {
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      width: '100%',
      maxWidth: 400,
      maxHeight: 600,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
    header: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
    },
    languageList: {
      maxHeight: 400,
    },
    languageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderBottomColor: theme.colors.border,
    },
    languageName: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
      color: theme.colors.text,
    },
    closeButton: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.primary,
    },
  });

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => handleLanguageSelect(item.code)}
    >
      <Text style={styles.languageName}>
        {item.nativeName}
      </Text>
      {currentLanguage === item.code && (
        <FontAwesome name="check" size={16} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('settings.selectLanguage')}</Text>
          </View>
          
          <FlatList
            data={SUPPORTED_LANGUAGES}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.code}
            style={styles.languageList}
            showsVerticalScrollIndicator={false}
          />
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
} 