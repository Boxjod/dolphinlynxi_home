/**
 * @file LanguageSwitcher.tsx — 中英文切换按钮
 *
 * 功能：
 * - 在中文 ↔ 英文之间切换，同时更新 i18next 实例、`<html data-lang>` 属性
 *   和 localStorage 持久化值。
 * - 当前为中文时显示 "EN"，反之显示 "中文"，让用户知道点击后会切换到哪种语言。
 *
 * @param className — 可选的 CSS 类名覆盖，默认使用 'lang-toggle'。
 */
'use client';

import { useTranslation } from 'react-i18next';

/** localStorage 中用于持久化语言偏好的 key，需与 I18nProvider 保持一致 */
const STORAGE_KEY = 'i18nextLng';

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language?.startsWith('zh');

  /** 切换语言：更新 i18n 实例 → 更新 HTML 属性 → 持久化到 localStorage */
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
