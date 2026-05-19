'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <img src="/assets/logo.png" alt="Dolphin Lynxi" />
              <span>{t('nav.brand')}</span>
            </div>
            <div className="footer-tag">
              <span>{t('footer.company')}</span><br />
              <span>{t('footer.address')}</span><br />
              <span>{t('footer.email')}</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.col.products')}</h4>
            <Link href="/marketplace">{t('footer.link.market')}</Link>
            <Link href="/dashboard">{t('footer.link.demo')}</Link>
            <Link href="/products#devices">{t('footer.link.devices')}</Link>
            <Link href="/products">{t('footer.link.overview')}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footer.col.dev')}</h4>
            <Link href="/developer#platform">{t('footer.link.platform')}</Link>
            <Link href="/developer#oss">{t('footer.link.oss')}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footer.col.about')}</h4>
            <Link href="/about#about">{t('footer.link.aboutUs')}</Link>
            <Link href="/about#join">{t('footer.link.join')}</Link>
            <Link href="/about#contact">{t('footer.link.contact')}</Link>
          </div>
        </div>

        <div className="footer-bot">
          <div>{t('footer.bot.copyright')}</div>
          <div className="footer-slogan">{t('footer.slogan')}</div>
        </div>
      </div>
    </footer>
  );
}
