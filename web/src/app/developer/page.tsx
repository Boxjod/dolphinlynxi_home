/**
 * @file 开发者生态页（Developer Page）—— 2 大板块（可扩展至 5 个）
 *
 * 页面结构：
 *   ① 数据管理平台（#platform）—— 三步上手流程 + 支持模型标签 + 三大优势卡片
 *   ② 开源数据集（#oss）        —— 开源数据集卡片网格 + 社区统计指标
 *   ③④⑤ 技能认证/轻量臂教学/学院（预留隐藏锚点，按钮 display:none）
 *
 * 数据来源：
 *   - 开源数据集列表：lib/data.ts → ossDatasets 数组
 *   - 支持模型列表：本文件 MODELS 常量
 *
 * 文案：i18n.ts → dev.* 键
 *
 * 注意：
 *   - 模型标签使用条件颜色：GR00T 系列=金色、π/Ant=粉色、其余=默认青色
 *   - "查看官方"按钮文案不走 i18n，直接判断语言拼字符串（VIEW_OFFICIAL）
 *   - s4.note 含 HTML 标签（<a> 链接），使用 dangerouslySetInnerHTML 渲染
 */
'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ossDatasets } from '@/lib/data';
import { withAssetPath } from '@/lib/site-path';

// ── 平台支持的模型清单 ─────────────────────────────────────────
// 这些模型名将渲染为标签 tag，并根据名称条件着色（见下方 JSX 逻辑）
const MODELS = ['ACT', 'Diffusion Policy', 'SmolVLA', 'π0', 'π0.5', 'Ant RDT', 'GR00T-N1', 'GR00T-N1.5'];

// ── 三步上手流程的 i18n 键后缀与对应图标 ───────────────────────
// 分别代表：上传数据 → 云端管理 → 一键推送
const STEP_KEYS = ['step1','step2','step3'] as const;
const STEP_ICONS = ['📂','☁️','📡'];

// ── 开源数据集"查看官方"按钮文案 ───────────────────────────────
// 未走 i18n 体系，因为仅此一处使用且无复杂逻辑
const VIEW_OFFICIAL = { zh: '查看官方 →', en: 'View official →' };

export default function DeveloperPage() {
  const { t, i18n } = useTranslation();
  // 判断当前语言是否为英文，用于条件渲染非 i18n 管理的文案
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  return (
    <>
      <Nav active="/developer" />
      <main>
        {/* ── 页头：标题 + 描述 + 锚点导航按钮 ────────────────── */}
        {/* 部分锚点按钮 display:none，为后续板块预留入口 */}
        <header className="page-head">
          <h1>{t('dev.head.h1')}</h1>
          <p>{t('dev.head.desc')}</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#platform" className="btn btn-ghost btn-sm">{t('dev.head.b1')}</a>
            <a href="#skills" className="btn btn-ghost btn-sm" style={{ display: 'none' }}>{t('dev.head.b2')}</a>
            <a href="#mini-arm" className="btn btn-ghost btn-sm" style={{ display: 'none' }}>{t('dev.head.b3')}</a>
            <a href="#oss" className="btn btn-ghost btn-sm">{t('dev.head.b4')}</a>
            <a href="#academy" className="btn btn-ghost btn-sm" style={{ display: 'none' }}>{t('dev.head.b5')}</a>
          </div>
        </header>

        {/* ── ① 数据管理平台（#platform）────────────────── */}
        {/* 核心卖点板块：展示平台的三步上手流程、支持的模型体系、以及三大优势 */}
        <section className="section section-bg-mid" id="platform">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('dev.s1.eyebrow')}</div>
              <h2 className="section-title">{t('dev.s1.title')}</h2>
              <p className="section-desc">{t('dev.s1.desc')}</p>
              {/* 平台入口按钮：跳转至 Demo 站点，带发光阴影强调 CTA */}
              <div style={{ marginTop: 28, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="https://robot.box2ai.com/demo/" target="_blank" rel="noopener" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 24px rgba(44,127,191,0.28)', fontSize: 16, padding: '16px 36px' }}>
                  {t('dev.s1.login')}
                  <span style={{ marginLeft: 6 }}>→</span>
                </a>
                <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>{t('dev.s1.loginHint')}</span>
              </div>
            </div>

            {/* 三步上手流程卡片：5 列网格（步骤1 | 箭头 | 步骤2 | 箭头 | 步骤3 | 空列） */}
            {/* gridTemplateColumns 最后的 0fr 列避免箭头溢出 */}
            <div style={{ background: 'var(--ocean-card)', border: '1px solid var(--ocean-line)', borderRadius: 'var(--radius-lg)', padding: 48, marginBottom: 48 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 0fr', gap: 0, alignItems: 'center' }}>
                {STEP_KEYS.map((sk, i) => (
                  <React.Fragment key={sk}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 80, height: 80, margin: '0 auto 12px', borderRadius: '50%', background: 'var(--gradient-cta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{STEP_ICONS[i]}</div>
                      <div style={{ fontSize: 11, color: 'var(--wave-cyan)', letterSpacing: 2 }}>{t(`dev.s1.${sk}.eyebrow`)}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, margin: '6px 0' }}>{t(`dev.s1.${sk}.label`)}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{t(`dev.s1.${sk}.desc`)}</div>
                    </div>
                    {i < 2 && <div style={{ textAlign: 'center', color: 'var(--wave-cyan)', fontSize: 24 }}>→</div>}
                  </React.Fragment>
                ))}
              </div>

              {/* 分隔线下方：展示平台支持的训练模型标签列表 */}
              <div style={{ textAlign: 'center', marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--ocean-line)' }}>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>{t('dev.s1.models')}</div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {MODELS.map((model) => {
                    // 条件着色逻辑：
                    //   GR00T 系列 → 金色标签（突出 NVIDIA 合作伙伴）
                    //   π 系列 / Ant RDT → 粉色标签（新兴热门模型）
                    //   其余 → 默认青色标签
                    const cls =
                      model.startsWith('GR00T') ? 'tag gold' :
                      model.includes('π') || model === 'Ant RDT' ? 'tag pink' :
                      'tag';
                    return <span key={model} className={cls}>{model}</span>;
                  })}
                </div>
              </div>
            </div>

            {/* 三大优势卡片：数据质量 / 开发文档（外链火山引擎）/ 生态合作 */}
            <div className="grid grid-3">
              {/* 数据质量保障卡片 */}
              <div className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: 42, marginBottom: 14 }}>💎</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t('dev.s1.c1.title')}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{t('dev.s1.c1.desc')}</p>
              </div>

              {/* 开发文档卡片：整张卡片可点击，跳转至火山引擎文档站 */}
              <a
                href="https://www.volcengine.com/docs/82379/1541523"
                target="_blank"
                rel="noopener"
                className="card"
                style={{ padding: 32, cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ fontSize: 42, marginBottom: 14 }}>📚</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t('dev.s1.c2.title')}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{t('dev.s1.c2.desc')}</p>
              </a>

              <div className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: 42, marginBottom: 14 }}>🤝</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t('dev.s1.c3.title')}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{t('dev.s1.c3.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ② 开源数据集（#oss）───────────────────────── */}
        {/* 展示业界知名的开源具身智能数据集，帮助开发者了解数据生态 */}
        <section className="section section-bg-deep" id="oss">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('dev.s4.eyebrow')}</div>
              <h2 className="section-title">{t('dev.s4.title')}</h2>
              <p className="section-desc">{t('dev.s4.desc')}</p>
            </div>

            {/* 开源数据集卡片网格：每张卡片包含封面图 / 机构 / 规模 / 标签 / 许可证 */}
            <div className="grid grid-3">
              {ossDatasets.map((dataset) => (
                <div key={dataset.id} className="card oss-ds-card">
                  <div className="oss-ds-image">
                    {/* dataset.image 来自 lib/data.ts，路径前加 / 使其相对于 /public */}
                    <img src={withAssetPath(dataset.image)} alt={dataset.name} loading="lazy" />
                  </div>
                  <div className="oss-ds-body">
                    <div className="oss-ds-org">{dataset.org}</div>
                    <h3 className="oss-ds-name">{dataset.name}</h3>
                    <div className="oss-ds-meta">
                      <span className="oss-ds-scale">📊 {dataset.scale}</span>
                      <span className="oss-ds-metric">▸ {dataset.metric}</span>
                    </div>
                    <div className="oss-ds-tags">
                      {dataset.tags.slice(0, 3).map((tag) => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                    <p className="oss-ds-desc">{dataset.desc}</p>
                    <div className="oss-ds-foot">
                      <span className="oss-ds-license">📜 {dataset.license}</span>
                      <a href={dataset.href} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
                        {isEn ? VIEW_OFFICIAL.en : VIEW_OFFICIAL.zh}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 社区统计指标面板：数据集数量 / 总帧数 / 任务类型 / 开源协议 */}
            {/* 数字使用渐变背景裁剪文字（background-clip: text）实现彩色效果 */}
            <div className="dev-oss-stats-panel" style={{ marginTop: 48, padding: 36, background: 'var(--ocean-card)', border: '1px solid var(--ocean-line)', borderRadius: 'var(--radius-lg)' }}>
              <div className="dev-oss-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.8fr', gap: 32, textAlign: 'center', alignItems: 'center' }}>
                <div>
                  <div className="dev-oss-stats-value" style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>12</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t('dev.s4.k1.label')}</div>
                </div>
                <div>
                  <div className="dev-oss-stats-value" style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>10⁹+</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t('dev.s4.k2.label')}</div>
                </div>
                <div>
                  <div className="dev-oss-stats-value" style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>22+</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t('dev.s4.k3.label')}</div>
                </div>
                <div>
                  <div className="dev-oss-stats-value dev-oss-stats-license" style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, whiteSpace: 'nowrap', background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Apache + MIT + CC</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t('dev.s4.k4.label')}</div>
                </div>
              </div>

              {/* 底部说明文字，含 HTML 链接标签，须用 dangerouslySetInnerHTML 渲染 */}
              <div
                className="dev-oss-note"
                style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--ocean-line)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: t('dev.s4.note') }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
