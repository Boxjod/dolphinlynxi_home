/**
 * @file I18nProvider.tsx — 国际化上下文 Provider
 *
 * 职责：
 * 1. 将 i18next 实例注入 React 树，使所有子组件可通过 useTranslation() 获取翻译函数。
 * 2. 客户端挂载后从 localStorage 恢复用户上次选择的语言（中/英），
 *    保证刷新后语言偏好不丢失。
 * 3. 同步设置 `<html data-lang="zh|en">`，供 CSS 做语言级样式适配。
 *
 * 该组件应包裹在应用最外层（通常在 RootLayout 中）。
 */
'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

/** localStorage 中用于持久化语言偏好的 key */
const STORAGE_KEY = 'i18nextLng';

export default function I18nProvider({ children }: { children: ReactNode }) {
  /**
   * 副作用：客户端首次渲染后恢复语言偏好。
   * 仅接受 'en'，其余值一律回退到 'zh'（中文优先策略）。
   */
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
