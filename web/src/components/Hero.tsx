/**
 * @file Hero.tsx — 首页 Hero 区域
 *
 * 全屏视觉焦点区域，包含：
 * - 品牌 Logo
 * - 主标题（一句话传达核心定位）
 * - 副标题描述
 * - 两个 CTA 按钮：主按钮导向产品页，次按钮导向开发者页
 *
 * 背景动效由 `.hero-waves` 空 div 承载，CSS 实现波浪动画。
 * 所有文案通过 i18n 键 `home.hero.*` 配置。
 */
'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { withAssetPath } from '@/lib/site-path';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero">
      {/* 背景波浪动画层（纯 CSS 实现） */}
      <div className="hero-waves" />
      <div className="hero-inner">
        <img src={withAssetPath('assets/logo.png')} className="hero-logo" alt="Dolphin Lynxi logo" />
        <h1 className="hero-title">{t('home.hero.title')}</h1>
        <p className="hero-sub">{t('home.hero.sub')}</p>
        {/* CTA 按钮组：主按钮（实心）+ 次按钮（文字链接样式） */}
        <div className="hero-cta">
          <Link href="/products" className="btn btn-primary btn-lg">{t('home.hero.cta1')}</Link>
          <Link href="/developer" className="link-more">{t('home.hero.cta2')}</Link>
        </div>
      </div>
    </section>
  );
}
