'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero">
      <div className="hero-waves" />
      <div className="hero-inner">
        <img src="/assets/logo.png" className="hero-logo" alt="Dolphin Lynxi logo" />
        <h1 className="hero-title">{t('home.hero.title')}</h1>
        <p className="hero-sub">{t('home.hero.sub')}</p>
        <div className="hero-cta">
          <Link href="/products" className="btn btn-primary btn-lg">{t('home.hero.cta1')}</Link>
          <Link href="/developer" className="link-more">{t('home.hero.cta2')}</Link>
        </div>
      </div>
    </section>
  );
}
