'use client';

import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'i18nextLng';

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language?.startsWith('zh');

  function toggle() {
    const next = isZh ? 'en' : 'zh';
    i18n.changeLanguage(next);
    document.documentElement.setAttribute('data-lang', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className={className ?? 'lang-toggle'}
    >
      {isZh
        ? <><span className="lang-flag">🌐</span><span className="lang-label">EN</span></>
        : <><span className="lang-flag">🌐</span><span className="lang-label">中文</span></>}
    </button>
  );
}
