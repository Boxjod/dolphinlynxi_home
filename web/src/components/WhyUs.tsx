'use client';

import { useTranslation } from 'react-i18next';

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

