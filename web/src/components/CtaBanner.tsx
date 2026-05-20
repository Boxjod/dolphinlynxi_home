'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function CtaBanner() {
  const { t } = useTranslation();
  return (
    <section className="section section-bg-deep">
      <div className="section-inner">
        <div className="cta-banner" style={{ margin: 0 }}>
          <h3>{t('home.cta.title')}</h3>
          <p>{t('home.cta.desc')}</p>
          <div className="cta-banner-btns">
            <Link href="/products" className="btn btn-primary btn-lg">{t('home.cta.b1')}</Link>
            <Link href="/developer" className="link-more">{t('home.cta.b2')}</Link>
            <Link href="/about#contact" className="link-more subtle">{t('home.cta.b3')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

