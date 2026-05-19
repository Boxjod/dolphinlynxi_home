/**
 * @file CtaBanner.tsx — 首页底部行动号召横幅
 *
 * 位于首页内容末尾、Footer 之前，采用深色背景突出显示，
 * 引导用户进入产品页、开发者页或联系我们。
 *
 * 包含：
 * - 标题 + 描述（传递品牌价值主张）
 * - 三个 CTA 按钮：主按钮（探索产品）、次按钮（开发者）、弱化链接（联系我们）
 *
 * 所有文案通过 i18n 键 `home.cta.*` 配置。
 */
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
          {/* CTA 按钮组：主按钮 → 产品页 / 次按钮 → 开发者页 / 弱化链接 → 联系我们 */}
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
