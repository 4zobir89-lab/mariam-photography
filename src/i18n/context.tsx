import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Language, Translations } from '../types';
import { en, ar } from './translations';

interface I18nContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

const translations: Record<Language, Translations> = { en, ar };

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'ar' : 'en');
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const isRTL = lang === 'ar';
  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, t, setLang, toggleLang, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be inside I18nProvider');
  return ctx;
}
