/**
 * @file Services.tsx — 首页"我们提供的服务"板块
 *
 * 以 4 张图文卡片展示核心服务：
 * 1. 大规模数据集 → 导向 /marketplace
 * 2. 数据管理工具链 → 导向 /products#toolchain
 * 3. 数采设备 → 导向 /products#devices
 * 4. 开发者生态 → 导向 /developer
 *
 * 每张卡片包含背景图（渐变遮罩）、角标标签、简介描述。
 * 所有文案通过 i18n 键 `home.svc.*` 配置。
 *
 * 布局使用 `.grid.grid-4` 四列响应式栅格（≤1100px 降为两列）。
 */
'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { withAssetPath } from '@/lib/site-path';

/**
 * 四项核心服务的静态配置。
 * img: 卡片顶部背景图路径
 * eyebrow / label / desc / tag: 对应 i18n 翻译键
 * href: 点击后跳转的目标路由
 */
const SERVICES = [
  { img: 'assets/services/service-datasets.jpg',  eyebrow: 'home.svc.s1.eyebrow', label: 'home.svc.s1.label', desc: 'home.svc.s1.desc', tag: 'home.svc.s1.tag', href: '/marketplace' },
  { img: 'assets/services/service-toolchain.jpg', eyebrow: 'home.svc.s2.eyebrow', label: 'home.svc.s2.label', desc: 'home.svc.s2.desc', tag: 'home.svc.s2.tag', href: '/products#toolchain' },
  { img: 'assets/services/service-platform.jpg',  eyebrow: 'home.svc.s3.eyebrow', label: 'home.svc.s3.label', desc: 'home.svc.s3.desc', tag: 'home.svc.s3.tag', href: '/products#devices' },
  { img: 'assets/services/service-developer.jpg', eyebrow: 'home.svc.s4.eyebrow', label: 'home.svc.s4.label', desc: 'home.svc.s4.desc', tag: 'home.svc.s4.tag', href: '/developer' },
];

export default function Services() {
  const { t } = useTranslation();
  return (
    <section className="section section-bg-mid">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-eyebrow">{t('home.svc.eyebrow')}</div>
          <h2 className="section-title">{t('home.svc.title')}</h2>
          <p className="section-desc">{t('home.svc.desc')}</p>
        </div>
        {/* 四列服务卡片：每张卡片整体可点击（Link 包裹） */}
        <div className="grid grid-4">
          {SERVICES.map((svc, i) => (
            <Link key={i} href={svc.href} className="card" style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>
              {/* 卡片顶部：背景图 + 渐变遮罩 + 服务名称叠加 */}
              <div style={{ height: 160, background: `url(${withAssetPath(svc.img)}) center/cover`, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(15,37,64,0.15) 0%,rgba(15,37,64,0.78) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 14, left: 18, color: 'white', zIndex: 2 }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, opacity: 0.85 }}>{t(svc.eyebrow)}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>{t(svc.label)}</div>
                </div>
              </div>
              {/* 卡片底部：描述文字 + 标签 & "了解更多"链接 */}
              <div style={{ padding: '20px 24px 24px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{t(svc.desc)}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  <span style={{ color: 'var(--wave-cyan)' }}>{t(svc.tag)}</span>
                  <span style={{ color: 'var(--text-dim)' }}>{t('home.svc.more')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

