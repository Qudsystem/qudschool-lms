
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Language, Translations, I18nContextType } from '../types';
import usePersistentState from '../hooks/usePersistentState';

// Default empty context for safety, will be overridden by Provider value
const defaultTranslations: Record<string, Translations> = {
    en: {},
    ar: {}
};

export const I18nContext = createContext<I18nContextType>({
  language: 'ar', // Default language
  langDir: 'rtl',
  setLanguage: () => console.warn('setLanguage called without I18nProvider'),
  t: (key: string) => key, // Default t function returns key
  translations: defaultTranslations
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = usePersistentState<Language>('language', 'ar');
  const [translations, setTranslations] = useState<Record<string, Translations>>(defaultTranslations);
  const [translationsLoading, setTranslationsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setTranslationsLoading(true);
      try {
        // Using fetch API with absolute paths from server root
        const enResponse = await fetch('/locales/en.json');
        if (!enResponse.ok) {
          throw new Error(`Failed to fetch en.json: ${enResponse.statusText}`);
        }
        const enData = await enResponse.json();

        const arResponse = await fetch('/locales/ar.json');
        if (!arResponse.ok) {
          throw new Error(`Failed to fetch ar.json: ${arResponse.statusText}`);
        }
        const arData = await arResponse.json();
        
        setTranslations({
          en: enData,
          ar: arData,
        });
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Fallback to empty or embedded basic translations if needed
        // Potentially set an error state here to inform the user
      } finally {
        setTranslationsLoading(false);
      }
    };
    loadTranslations();
  }, []);
  
  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    if (translationsLoading && !Object.keys(translations[language] || {}).length && !Object.keys(translations['en'] || {}).length) {
        // Only return key if translations are truly not available yet
        return key; 
    }

    const langTranslations = translations[language] || translations['en']; // Fallback to English
    // Directly access the key for flat JSON structures
    let translation = (langTranslations as Translations)[key] as string | undefined;

    if (translation === undefined) {
      console.warn(`Translation key "${key}" not found for language "${language}".`);
      // Fallback to English if key not found in current language
      if (language !== 'en') {
        const enTranslationsFallback = translations['en'];
        // Directly access the key for flat JSON structures in fallback
        translation = (enTranslationsFallback as Translations)[key] as string | undefined;
        if (translation === undefined) return key; // Return key if not found in English either
      } else {
        return key;
      }
    }
    
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = (translation as string).replace(`{{${placeholder}}}`, String(replacements[placeholder]));
      });
    }
    return translation as string;
  }, [language, translations, translationsLoading]);

  if (translationsLoading && !Object.keys(translations[language] || {}).length && !Object.keys(translations['en'] || {}).length) {
    // Display a minimal global loader only if no translations are loaded at all.
    // This prevents a flash of untranslated content if relying solely on App.tsx's loader.
    return <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-neutral-dark z-[10000]"><div className="w-8 h-8 border-2 border-t-primary border-gray-200 dark:border-gray-600 rounded-full animate-spin"></div></div>;
  }

  const langDir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ language, langDir, setLanguage, t, translations }}>
      {children}
    </I18nContext.Provider>
  );
};
