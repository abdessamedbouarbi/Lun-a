import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Language } from '@/types';
import { translations } from '@/data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations.fr) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lunea-lang');
    return (saved as Language) || 'fr';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lunea-lang', newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev: Language) => {
      const newLang = prev === 'fr' ? 'ar' : 'fr';
      localStorage.setItem('lunea-lang', newLang);
      return newLang;
    });
  }, []);

  const t = useCallback((key: keyof typeof translations.fr): string => {
    return translations[lang][key] || key;
  }, [lang]);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
