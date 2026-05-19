'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ossDatasets } from '@/lib/data';

const MODELS = ['ACT','Diffusion Policy','SmolVLA','π0','π0.5','Ant RDT','GR00T-N1','GR00T-N1.5'];
const STEP_KEYS = ['step1','step2','step3'] as const;
const STEP_ICONS = ['📂','☁️','📡'];

export default function DeveloperPage() {
  const { t } = useTranslation();
  return (
    <>
      <Nav active="/developer" />
      <main>
        <header className="page-head">
          <h1>{t('dev.head.h1')}</h1>
          <p>{t('dev.head.desc')}</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#platform" className="btn btn-ghost btn-sm">{t('dev.head.b1')}</a>
            <a href="#oss" className="btn btn-ghost btn-sm">{t('dev.head.b4')}</a>
          </div>
        </header>

        {/* ── S1 Platform ── */}
        <section className="section section-bg-mid" id="platform">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('dev.s1.eyebrow')}</div>
              <h2 className="section-title">{t('dev.s1.title')}</h2>
              <p className="section-desc">{t('dev.s1.desc')}</p>
              <div style={{ marginTop: 28, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="https://robot.box2ai.com/demo/" target="_blank" rel="noopener" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 24px rgba(44,127,191,0.28)', fontSize: 16, padding: '16px 36px' }}>
                  {t('dev.s1.login')} →
                </a>
                <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>{t('dev.s1.loginHint')}</span>
              </div>
            </div>

            {/* 3-step flow */}
            <div className="card" style={{ padding: 48, marginBottom: 48 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, alignItems: 'center' }}>
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
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {MODELS.map(m => <span key={m} className="tag">{m}</span>)}
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-3">
              {(['c1','c2','c3'] as const).map(k => (
                <div key={k} className="card" style={{ padding: 32 }}>
                  <div style={{ fontSize: 42, marginBottom: 14 }}>{k === 'c1' ? '💎' : k === 'c2' ? '📚' : '🤝'}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t(`dev.s1.${k}.title`)}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{t(`dev.s1.${k}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S4 OSS Datasets ── */}
        <section className="section section-bg-deep" id="oss">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('dev.s4.eyebrow')}</div>
              <h2 className="section-title">{t('dev.s4.title')}</h2>
              <p className="section-desc">{t('dev.s4.desc')}</p>
            </div>

            <div className="grid grid-3">
              {ossDatasets.map(d => (
                <div key={d.id} className="card">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginBottom: 6 }}>{d.id}</div>
                  <h4 style={{ fontWeight: 700, marginBottom: 8 }}>{d.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65, marginBottom: 12 }}>{d.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {d.tags.slice(0,3).map(tag => <span key={tag} className="tag">{tag}</span>)}
                    <span className="tag" style={{ color: 'var(--wave-cyan)', borderColor: 'var(--wave-cyan)' }}>{d.license}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--wave-cyan)' }}>{d.scale}</div>
                </div>
              ))}
            </div>

            {/* Stats + Note */}
            <div style={{ marginTop: 48, padding: 36, background: 'var(--ocean-card)', border: '1px solid var(--ocean-line)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.8fr', gap: 32, textAlign: 'center', alignItems: 'center' }}>
                {(['k1','k2','k3','k4'] as const).map((k, i) => {
                  const vals = ['12','10⁹+','22+','Apache + MIT + CC'];
                  return (
                    <div key={k}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, whiteSpace: i === 3 ? 'nowrap' : undefined, background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{vals[i]}</div>
                      <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t(`dev.s4.${k}.label`)}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--ocean-line)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: t('dev.s4.note') }} />
            </div>

            {/* Academy CTA */}
            <div className="cta-banner" style={{ marginTop: 60 }}>
              <h3>{t('dev.s5.cta.title')}</h3>
              <p>{t('dev.s5.cta.desc')}</p>
              <div className="cta-banner-btns">
                <Link href="/about#contact" className="btn btn-primary btn-lg">{t('dev.s5.cta.b1')}</Link>
                <Link href="/tasks" className="link-more">{t('dev.s5.cta.b2')}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
