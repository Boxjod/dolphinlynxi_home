'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ossDatasets } from '@/lib/data';

const MODELS = ['ACT', 'Diffusion Policy', 'SmolVLA', 'π0', 'π0.5', 'Ant RDT', 'GR00T-N1', 'GR00T-N1.5'];
const STEP_KEYS = ['step1','step2','step3'] as const;
const STEP_ICONS = ['📂','☁️','📡'];
const VIEW_OFFICIAL = { zh: '查看官方 →', en: 'View official →' };

export default function DeveloperPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  return (
    <>
      <Nav active="/developer" />
      <main>
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

        <section className="section section-bg-mid" id="platform">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('dev.s1.eyebrow')}</div>
              <h2 className="section-title">{t('dev.s1.title')}</h2>
              <p className="section-desc">{t('dev.s1.desc')}</p>
              <div style={{ marginTop: 28, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="https://robot.box2ai.com/demo/" target="_blank" rel="noopener" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 24px rgba(44,127,191,0.28)', fontSize: 16, padding: '16px 36px' }}>
                  {t('dev.s1.login')}
                  <span style={{ marginLeft: 6 }}>→</span>
                </a>
                <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>{t('dev.s1.loginHint')}</span>
              </div>
            </div>

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

              <div style={{ textAlign: 'center', marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--ocean-line)' }}>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>{t('dev.s1.models')}</div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {MODELS.map((model) => {
                    const cls =
                      model.startsWith('GR00T') ? 'tag gold' :
                      model.includes('π') || model === 'Ant RDT' ? 'tag pink' :
                      'tag';
                    return <span key={model} className={cls}>{model}</span>;
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-3">
              <div className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: 42, marginBottom: 14 }}>💎</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t('dev.s1.c1.title')}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{t('dev.s1.c1.desc')}</p>
              </div>

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

        <section className="section section-bg-deep" id="oss">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('dev.s4.eyebrow')}</div>
              <h2 className="section-title">{t('dev.s4.title')}</h2>
              <p className="section-desc">{t('dev.s4.desc')}</p>
            </div>

            <div className="grid grid-3">
              {ossDatasets.map((dataset) => (
                <div key={dataset.id} className="card oss-ds-card">
                  <div className="oss-ds-image">
                    <img src={`/${dataset.image}`} alt={dataset.name} loading="lazy" />
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

            <div style={{ marginTop: 48, padding: 36, background: 'var(--ocean-card)', border: '1px solid var(--ocean-line)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.8fr', gap: 32, textAlign: 'center', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>12</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t('dev.s4.k1.label')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>10⁹+</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t('dev.s4.k2.label')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>22+</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t('dev.s4.k3.label')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, whiteSpace: 'nowrap', background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Apache + MIT + CC</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t('dev.s4.k4.label')}</div>
                </div>
              </div>

              <div
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
