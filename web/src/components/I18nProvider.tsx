'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const STORAGE_KEY = 'i18nextLng';

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Client-only: restore stored language preference
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const lang = (stored === 'en') ? 'en' : 'zh';
      if (lang !== i18n.language) i18n.changeLanguage(lang);
      document.documentElement.setAttribute('data-lang', lang);
    } catch {
      // localStorage may be unavailable in some environments
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
