/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ar from './ar';
import en from './en';

export type Locale = 'ar' | 'en';
export type Translations = typeof ar;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: Record<Locale, any> = { ar, en };

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('rawafid-locale') as Locale | null;
    return saved === 'en' ? 'en' : 'ar';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('rawafid-locale', newLocale);
  };

  const isRTL = locale === 'ar';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.className = isRTL ? 'arabic' : 'english';
  }, [locale, isRTL]);

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
