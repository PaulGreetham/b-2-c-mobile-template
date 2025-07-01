import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '@/lib/i18n/translations/index';

export type LanguageCode = 'en' | 'nl' | 'fr' | 'es' | 'de' | 'it';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
];

interface LanguageContextType {
  currentLanguage: LanguageCode;
  currentLanguageInfo: Language;
  translations: any;
  changeLanguage: (languageCode: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@selected_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  
  // Get current language info
  const currentLanguageInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  
  // Get current translations
  const currentTranslations = translations[currentLanguage];

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found for language "${currentLanguage}"`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Load saved language preference on mount
  useEffect(() => {
    loadLanguagePreference();
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    saveLanguagePreference(currentLanguage);
  }, [currentLanguage]);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage as LanguageCode);
      }
    } catch (error) {
      console.error('Failed to load language preference:', error);
    }
  };

  const saveLanguagePreference = async (languageCode: LanguageCode) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  const changeLanguage = (languageCode: LanguageCode) => {
    setCurrentLanguage(languageCode);
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage,
      currentLanguageInfo,
      translations: currentTranslations,
      changeLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 