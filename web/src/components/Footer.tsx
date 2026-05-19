/**
 * @file Footer.tsx — 全站页脚
 *
 * 结构分为上下两部分：
 * - 上半区（footer-top）：品牌 Logo + 公司信息 + 三列快捷链接（产品 / 开发者 / 关于）
 * - 下半区（footer-bot）：版权声明 + 品牌口号
 *
 * 所有文案通过 i18n 键 `nav.brand`、`footer.*` 配置。
 * 响应式行为：≤420px 时三列链接折叠为单列。
 */
'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* 上半区：品牌信息 + 三列快捷链接 */}
        <div className="footer-top">
          {/* 品牌栏：Logo + 公司名 + 联系方式 */}
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

          {/* 产品链接列 */}
          <div className="footer-col">
            <h4>{t('footer.col.products')}</h4>
            <Link href="/marketplace">{t('footer.link.market')}</Link>
            <Link href="/dashboard">{t('footer.link.demo')}</Link>
            <Link href="/products#devices">{t('footer.link.devices')}</Link>
            <Link href="/products">{t('footer.link.overview')}</Link>
          </div>

          {/* 开发者链接列 */}
          <div className="footer-col">
            <h4>{t('footer.col.dev')}</h4>
            <Link href="/developer#platform">{t('footer.link.platform')}</Link>
            <Link href="/developer#oss">{t('footer.link.oss')}</Link>
          </div>

          {/* 关于链接列 */}
          <div className="footer-col">
            <h4>{t('footer.col.about')}</h4>
            <Link href="/about#about">{t('footer.link.aboutUs')}</Link>
            <Link href="/about#join">{t('footer.link.join')}</Link>
            <Link href="/about#contact">{t('footer.link.contact')}</Link>
          </div>
        </div>

        {/* 下半区：版权 + 口号 */}
        <div className="footer-bot">
          <div>{t('footer.bot.copyright')}</div>
          <div className="footer-slogan">{t('footer.slogan')}</div>
        </div>
      </div>
    </footer>
  );
}
