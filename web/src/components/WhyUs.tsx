/**
 * @file WhyUs.tsx — 首页"为什么选我们"板块
 *
 * 以 3 列图标+文字卡片展示核心竞争优势。
 * 每张卡片包含 emoji 图标、标题和描述。
 *
 * 所有文案通过 i18n 键 `home.why.*` 配置，
 * 卡片数据由 WHY_CARDS 数组驱动，通过 id 动态拼接翻译键。
 *
 * 布局使用 `.grid.grid-3` 三列响应式栅格。
 */
'use client';

import { useTranslation } from 'react-i18next';

/**
 * 三项优势的静态配置。
 * id 用于拼接 i18n 键（如 `home.why.c1.title`），icon 为展示用 emoji。
 */
const WHY_CARDS = [
  { id: 'c1', icon: '🎯' },
  { id: 'c2', icon: '📈' },
  { id: 'c3', icon: '🏆' },
];

export default function WhyUs() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-eyebrow">{t('home.why.eyebrow')}</div>
          <h2 className="section-title">{t('home.why.title')}</h2>
          <p className="section-desc">{t('home.why.desc')}</p>
        </div>
        <div className="grid grid-3">
          {WHY_CARDS.map((card) => (
            <div key={card.id} className="card">
              <div className="feature-icon">{card.icon}</div>
              <h3 className="feature-title">{t(`home.why.${card.id}.title`)}</h3>
              <p className="feature-desc">{t(`home.why.${card.id}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

