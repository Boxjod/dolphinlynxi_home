'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_HREFS = [
  { href: '/',          key: 'nav.home' },
  { href: '/products',  key: 'nav.products' },
  { href: '/developer', key: 'nav.developer' },
  { href: '/about',     key: 'nav.about' },
];

export default function Nav({ active }: { active?: string }) {
  const { t } = useTranslation();

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <img src="/assets/logo.png" alt="Dolphin Lynxi" />
          <div className="nav-brand-text">
            <span>{t('nav.brand')}</span>
            <div className="nav-brand-sub">{t('nav.brandSub')}</div>
          </div>
        </Link>

        <div className="nav-links">
          {NAV_HREFS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={active === link.href ? 'active' : ''}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="nav-cta">
          <LanguageSwitcher />
          <a href="#" className="btn btn-ghost btn-sm">{t('common.btn.login')}</a>
          <Link href="/about#contact" className="btn btn-primary btn-sm">{t('common.btn.contact')}</Link>
        </div>
      </div>
    </nav>
  );
}

