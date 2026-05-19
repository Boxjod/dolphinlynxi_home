// ============================================================
// 产品页（Products）—— 4 大板块
//   ① 数据集（#datasets）  ② 工具链（#toolchain）
//   ③ 采集设备（#devices） ④ 生态支持（#ecosystem）
// 数据来源：lib/data.ts → devices；静态数组在本文件定义
// 文案：i18n.ts products.* 键
// ============================================================
'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { devices } from '@/lib/data';

// ── ① 数据集：场景封面图 ──────────────────────────────────────
// img 为相对于 /public 的路径；key 对应 i18n products.p1.{key}.*
const SCENES = [
  { key: 's1', labelKey: 'home.ds.s1.label', img: 'assets/scenes/logistics.jpg' },
  { key: 's2', labelKey: 'home.ds.s2.label', img: 'assets/scenes/industry.jpg'  },
  { key: 's3', labelKey: 'home.ds.s3.label', img: 'assets/scenes/home.jpg'      },
  { key: 's4', labelKey: 'home.ds.s4.label', img: 'assets/scenes/medical.jpg'   },
];

// ── ② 工具链：三个特性 Pill 的背景/边框颜色 ────────────────────
const PILL_STYLES = [
  { bg: 'rgba(8,145,178,0.08)',  border: 'rgba(8,145,178,0.22)',  icon: '🏢' },
  { bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.22)', icon: '📦' },
  { bg: 'rgba(74,222,128,0.06)', border: 'rgba(74,222,128,0.2)',  icon: '🔄' },
];

// 工具链三步走流程的 i18n key（products.p2.flow.{step}.*）
const FLOW_STEPS = ['s1', 's2', 's3'] as const;

// ── ④ 生态支持：支持的机器人本体分类 ──────────────────────────
// bg：CSS background shorthand（含图片路径 + 颜色兜底）
// overlay：渐变遮罩，从透明→半透明，用于卡片文字可读性
// brands：该分类代表品牌列表（渲染为 tag 标签）
const ECO_CATS = [
  { key: 'cat1', bg: '#141414 url(assets/supports/arm.png) center/contain no-repeat',     overlay: 'linear-gradient(180deg,rgba(15,37,64,0) 60%,rgba(15,37,64,0.55) 100%)', brands: ['ARX','AgileX 松灵','SO-101','ALOHA','GELLO','Koch'] },
  { key: 'cat2', bg: '#ffffff url(assets/supports/ur.png) center/contain no-repeat',      overlay: 'linear-gradient(180deg,rgba(15,37,64,0) 60%,rgba(15,37,64,0.45) 100%)', brands: ['UR','Franka Panda','Sawyer','ABB GoFa','KUKA iiwa'] },
  { key: 'cat3', bg: '#ffffff url(assets/supports/chassis.png) center/contain no-repeat', overlay: 'linear-gradient(180deg,rgba(15,37,64,0) 60%,rgba(15,37,64,0.45) 100%)', brands: ['AgileX Scout','AgileX Bunker','大象 myAGV','Fetch','UR + 升降柱'] },
  { key: 'cat4', bg: 'url(assets/supports/human.jpg) center/contain no-repeat, linear-gradient(180deg,#e9edf2 0%,#c3cbd4 100%)', overlay: 'linear-gradient(180deg,rgba(15,37,64,0) 60%,rgba(15,37,64,0.45) 100%)', brands: ['Fourier GR','HOPE-JR','Unitree G1','智元远征','优必选 Walker'] },
];

export default function ProductsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Nav active="/products" />
      <main>
        {/* 页头：标题 + 描述 + 锚点快速跳转 */}
        <header className="page-head">
          <h1>{t('products.head.h1')}</h1>
          <p>{t('products.head.desc')}</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#datasets" className="btn btn-ghost btn-sm">{t('products.head.b1')}</a>
            <a href="#toolchain" className="btn btn-ghost btn-sm">{t('products.head.b2')}</a>
            <a href="#devices" className="btn btn-ghost btn-sm">{t('products.head.b3')}</a>
            <a href="#ecosystem" className="btn btn-ghost btn-sm">{t('products.head.b4')}</a>
          </div>
        </header>

        {/* ── ① 数据集 ──────────────────────────────────── */}
        <section className="section section-bg-mid" id="datasets">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('products.p1.eyebrow')}</div>
              <h2 className="section-title">{t('products.p1.title')}</h2>
              <p className="section-desc">{t('products.p1.desc')}</p>
            </div>
            {/* 4 个场景封面卡片：图片遮罩 + 场景名 + 描述 + 跳转按钮 */}
            <div className="grid grid-4" style={{ marginBottom: 64 }}>
              {SCENES.map((s) => (
                <div key={s.key} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: 160, background: `url(${s.img}) center/cover`, position: 'relative' }}>
                    {/* 渐变遮罩保证底部文字可读 */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(15,37,64,0.15) 0%,rgba(15,37,64,0.75) 100%)' }} />
                    <div style={{ position: 'absolute', bottom: 14, left: 18, color: 'white', zIndex: 2 }}>
                      <div style={{ fontSize: 11, letterSpacing: 2, opacity: 0.85 }}>{t(`products.p1.${s.key}.eyebrow`)}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>{t(s.labelKey)}</div>
                    </div>
                  </div>
                  <div style={{ padding: '22px 24px 24px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>{t(`products.p1.${s.key}.desc`)}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 14, fontFamily: 'var(--font-mono)', color: 'var(--wave-cyan)', fontSize: 13, marginBottom: 14 }}>
                      <span>{t('home.ds.status.coming')}</span>
                    </div>
                    <Link href="/marketplace" className="btn btn-ghost btn-sm">{t(`products.p1.${s.key}.btn`)}</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ② 工具链 ──────────────────────────────────── */}
        <section className="section section-bg-deep" id="toolchain">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('products.p2.eyebrow')}</div>
              <h2 className="section-title">{t('products.p2.title')}</h2>
              <p className="section-desc">{t('products.p2.desc')}</p>
            </div>

            {/* 三个特性 Pill（响应式用 .grid.grid-3 CSS 类）*/}
            <div className="grid grid-3" style={{ marginBottom: 48 }}>
              {(['h1','h2','h3'] as const).map((k, i) => (
                <div key={k} style={{ padding: 20, background: PILL_STYLES[i].bg, border: `1px solid ${PILL_STYLES[i].border}`, borderRadius: 'var(--radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{PILL_STYLES[i].icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{t(`products.p2.${k}.t`)}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{t(`products.p2.${k}.d`)}</div>
                </div>
              ))}
            </div>

            {/* 部署方式：本地一体机 + 云算力（2 列）*/}
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>{t('products.p2.deploy.title')}</h3>
            <div className="grid grid-2" style={{ marginBottom: 64, alignItems: 'stretch' }}>
              {/* 本地一体机卡片 */}
              <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#ffffff', borderBottom: '1px solid var(--ocean-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, height: 200 }}>
                  <img src="assets/server.png" alt="Lynxi appliance" style={{ maxHeight: 170, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(15,37,64,0.12))' }} />
                </div>
                <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--wave-cyan)', letterSpacing: 2, marginBottom: 6, fontWeight: 700 }}>{t('products.p2.banner.eyebrow')}</div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t('products.p2.appl.title')}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{t('products.p2.banner.desc')}</p>
                  {/* tag4=粉色徽标（含 AI 推理引擎标识），其余默认青色 */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
                    {(['tag1','tag2','tag3','tag4'] as const).map(tk => (
                      <span key={tk} className={tk === 'tag4' ? 'tag pink' : 'tag'}>{t(`products.p2.banner.${tk}`)}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 云算力卡片 */}
              <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: 'url(assets/devices/gpu-cloud.jpg) center/cover', height: 200, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(44,127,191,0.55) 0%,rgba(8,145,178,0.85) 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 18, left: 20, color: 'white', zIndex: 2 }}>
                    <div style={{ fontSize: 11, letterSpacing: 2, opacity: 0.85, fontWeight: 600 }}>{t('products.p2.cloud.eyebrow')}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginTop: 6 }}>{t('products.p2.cloud.priceMain')}</div>
                  </div>
                </div>
                <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--wave-pink)', letterSpacing: 2, marginBottom: 6, fontWeight: 700 }}>{t('products.p2.cloud.lead')}</div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t('products.p2.cloud.title')}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>{t('products.p2.cloud.desc')}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    {(['tag1','tag2','tag3','tag4'] as const).map(tk => (
                      <span key={tk} className={tk === 'tag4' ? 'tag pink' : 'tag'}>{t(`products.p2.cloud.${tk}`)}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 'auto' }}>
                    <Link href="/developer#platform" className="btn btn-primary btn-sm">{t('products.p2.cloud.b1')}</Link>
                    <a href="https://www.volcengine.com/docs/82379/1541523" target="_blank" rel="noopener" className="btn btn-ghost btn-sm">{t('products.p2.cloud.b2')}</a>
                    <Link href="/about#contact" className="btn btn-ghost btn-sm">{t('products.p2.cloud.b3')}</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 数据流水线三步走：采集接入 → 加工提质 → 训练交付 */}
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{t('products.p2.arch.title')}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 28 }}>{t('products.p2.arch.desc')}</p>
            {/* flow-wrap / flow-step CSS 类见 style.css ── 移动端自动折叠为单列 */}
            <div className="flow-wrap">
              {FLOW_STEPS.map((step, i) => (
                <React.Fragment key={step}>
                  <div className={`flow-step flow-step-${i + 1}`}>
                    <div className="flow-step-badge"><span className="flow-step-num">{String(i + 1).padStart(2, '0')}</span></div>
                    <div className="flow-step-eyebrow">{t(`products.p2.flow.${step}.eyebrow`)}</div>
                    <div className="flow-step-title">{t(`products.p2.flow.${step}.title`)}</div>
                  </div>
                  {/* 步骤间箭头（最后一步不渲染）*/}
                  {i < 2 && <div className="flow-arrow" aria-hidden="true">→</div>}
                </React.Fragment>
              ))}
            </div>

            {/* 工具链 Demo CTA */}
            <div style={{ background: 'linear-gradient(135deg, rgba(44,127,191,0.10), rgba(8,145,178,0.05))', border: '1px solid var(--ocean-line-strong)', borderRadius: 'var(--radius-lg)', padding: 48, textAlign: 'center' }}>
              <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>{t('products.p2.demo.title')}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>{t('products.p2.demo.desc')}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/dashboard" className="btn btn-primary btn-lg">{t('products.p2.demo.b1')}</Link>
                <Link href="/about#contact" className="btn btn-ghost btn-lg">{t('products.p2.demo.b2')}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── ③ 采集设备 ────────────────────────────────── */}
        <section className="section section-bg-mid" id="devices">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('products.p3.eyebrow')}</div>
              <h2 className="section-title">{t('products.p3.title')}</h2>
              <p className="section-desc">{t('products.p3.desc')}</p>
            </div>
            {/* 设备卡片：HOT/NEW 角标位于图片之前（绝对定位）*/}
            <div className="grid grid-4">
              {devices.map(dev => (
                <div key={dev.id} className="card device-card">
                  {/* 角标：两者互斥，HOT 和 NEW 可同时存在（由数据决定）*/}
                  {dev.hot && <span className="ds-card-badge hot">HOT</span>}
                  {dev.new && <span className="ds-card-badge new">NEW</span>}
                  <div className="device-card-image">
                    {/* lazy 加载；图片加载失败则隐藏 img 元素 */}
                    <img src={dev.image} alt={dev.name} loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  </div>
                  <div className="device-card-cat">{dev.category}</div>
                  <div className="device-card-name">{dev.name}</div>
                  <div className="device-card-desc">{dev.desc}</div>
                  <ul className="device-features">
                    {dev.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <div className="device-card-foot">
                    {/* .device-card-price：全站 CSS 已隐藏价格区域 */}
                    <div className="device-card-price"></div>
                    <span className={`status-tag ${dev.status}`}>{dev.status}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* 设备咨询 CTA */}
            <div className="cta-banner" style={{ marginTop: 64 }}>
              <h3>{t('products.p3.cta.title')}</h3>
              <p>{t('products.p3.cta.desc')}</p>
              <div className="cta-banner-btns">
                <Link href="/about#contact" className="btn btn-primary btn-lg">{t('products.p3.cta.b1')}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── ④ 生态支持 ────────────────────────────────── */}
        <section className="section section-bg-deep" id="ecosystem">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('products.p4.eyebrow')}</div>
              <h2 className="section-title">{t('products.p4.title')}</h2>
              <p className="section-desc">{t('products.p4.desc')}</p>
            </div>
            {/* 4 类机器人本体生态卡片：背景图 + 渐变遮罩 + 品牌标签 */}
            <div className="grid grid-4">
              {ECO_CATS.map(cat => (
                <div key={cat.key} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {/* cat.bg = 完整 CSS background shorthand（图 + 兜底色）*/}
                  {/* cat.overlay = 底部渐变遮罩提升文字层次感 */}
                  <div style={{ height: 160, background: cat.bg, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: cat.overlay }} />
                  </div>
                  <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{t(`products.p4.${cat.key}.title`)}</h4>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>{t(`products.p4.${cat.key}.desc`)}</p>
                    {/* 品牌标签列表，marginTop: auto 使其始终贴底 */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
                      {cat.brands.map(b => <span key={b} className="tag">{b}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
