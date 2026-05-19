// ============================================================
// 寮€鍙戣€呯敓鎬侀〉锛圖eveloper锛夆€斺€?2 涓彲瑙佹澘鍧?
//   S1 涓€绔欏紡骞冲彴锛?platform锛? S4 寮€婧愭暟鎹泦锛?oss锛?
// 娉ㄦ剰锛歋2 鎶€鑳藉晢搴?/ S3 鍏ラ棬鏈烘鑷?/ S5 瀛﹂櫌 宸查€氳繃 style="display:none" 闅愯棌锛?
//       React 鐗堟湰鐩存帴涓嶆覆鏌撹繖浜涙澘鍧?
// 鏁版嵁鏉ユ簮锛歭ib/data.ts 鈫?ossDatasets
// 鏂囨锛歩18n.ts dev.* 閿?
// ============================================================
'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ossDatasets } from '@/lib/data';

// 骞冲彴鏀寔鐨勮缁冩ā鍨嬪垪琛紙浠呭睍绀猴紝涓嶅彲浜や簰锛?
const MODELS = ['ACT','Diffusion Policy','SmolVLA','蟺0','蟺0.5','Ant RDT','GR00T-N1','GR00T-N1.5'];
// 宸ヤ綔娴佷笁姝ラ key锛堝搴?i18n dev.s1.{key}.*锛?
const STEP_KEYS = ['step1','step2','step3'] as const;
// 姣忔楠ゅ搴旂殑 Emoji 鍥炬爣
const STEP_ICONS = ['馃搨','鈽侊笍','馃摗'];

export default function DeveloperPage() {
  const { t } = useTranslation();
  return (
    <>
      <Nav active="/developer" />
      <main>
        {/* 椤靛ご锛氫粎淇濈暀 骞冲彴(b1) 鍜?寮€婧愭暟鎹泦(b4) 涓や釜閿氱偣锛屽叾浣欏凡闅愯棌 */}
        <header className="page-head">
          <h1>{t('dev.head.h1')}</h1>
          <p>{t('dev.head.desc')}</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#platform" className="btn btn-ghost btn-sm">{t('dev.head.b1')}</a>
            <a href="#oss" className="btn btn-ghost btn-sm">{t('dev.head.b4')}</a>
          </div>
        </header>

        {/* 鈹€鈹€ S1 涓€绔欏紡寮€鍙戣€呭钩鍙?鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */}
        <section className="section section-bg-mid" id="platform">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('dev.s1.eyebrow')}</div>
              <h2 className="section-title">{t('dev.s1.title')}</h2>
              <p className="section-desc">{t('dev.s1.desc')}</p>
              {/* 涓?CTA锛氳烦杞埌 Demo 骞冲彴锛堝閾撅級*/}
              <div style={{ marginTop: 28, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="https://robot.box2ai.com/demo/" target="_blank" rel="noopener" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 24px rgba(44,127,191,0.28)', fontSize: 16, padding: '16px 36px' }}>
                  {t('dev.s1.login')} 鈫?
                </a>
                <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>{t('dev.s1.loginHint')}</span>
              </div>
            </div>

            {/* 宸ヤ綔娴佷笁姝ラ锛氫笅杞芥暟鎹泦 鈫?GPU璁粌 鈫?涓€閿儴缃?
                grid 鐢?repeat(5,1fr) = 3涓楠?+ 2涓澶达紝鍏?鍒?*/}
            <div className="card" style={{ padding: 48, marginBottom: 48 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, alignItems: 'center' }}>
                {STEP_KEYS.map((sk, i) => (
                  <React.Fragment key={sk}>
                    <div style={{ textAlign: 'center' }}>
                      {/* 鍦嗗舰鍥炬爣鑳屾櫙 */}
                      <div style={{ width: 80, height: 80, margin: '0 auto 12px', borderRadius: '50%', background: 'var(--gradient-cta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{STEP_ICONS[i]}</div>
                      <div style={{ fontSize: 11, color: 'var(--wave-cyan)', letterSpacing: 2 }}>{t(`dev.s1.${sk}.eyebrow`)}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, margin: '6px 0' }}>{t(`dev.s1.${sk}.label`)}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{t(`dev.s1.${sk}.desc`)}</div>
                    </div>
                    {/* 姝ラ闂寸澶达紙浠呮楠?0/1 鍚庢覆鏌擄級*/}
                    {i < 2 && <div style={{ textAlign: 'center', color: 'var(--wave-cyan)', fontSize: 24 }}>→</div>}
                  </React.Fragment>
                ))}
              </div>
              {/* 鏀寔鐨勬ā鍨嬪垪琛?*/}
              <div style={{ textAlign: 'center', marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--ocean-line)' }}>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>{t('dev.s1.models')}</div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {MODELS.map(m => <span key={m} className="tag">{m}</span>)}
                </div>
              </div>
            </div>

            {/* 涓変釜鐗规€у崱鐗囷細鍏嶈垂棰濆害 / API鏂囨。 / 绀惧尯 */}
            <div className="grid grid-3">
              {(['c1','c2','c3'] as const).map(k => (
                <div key={k} className="card" style={{ padding: 32 }}>
                  <div style={{ fontSize: 42, marginBottom: 14 }}>{k === 'c1' ? '馃拵' : k === 'c2' ? '馃摎' : '馃'}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t(`dev.s1.${k}.title`)}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{t(`dev.s1.${k}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 鈹€鈹€ S4 鍏ㄧ悆寮€婧愭暟鎹泦绮鹃€?鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */}
        <section className="section section-bg-deep" id="oss">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('dev.s4.eyebrow')}</div>
              <h2 className="section-title">{t('dev.s4.title')}</h2>
              <p className="section-desc">{t('dev.s4.desc')}</p>
            </div>

            {/* 寮€婧愭暟鎹泦鍗＄墖缃戞牸锛?鍒楋級*/}
            <div className="grid grid-3">
              {ossDatasets.map(d => (
                <div key={d.id} className="card">
                  {/* 鏁版嵁闆?ID锛堢瓑瀹藉瓧浣擄紝鐢ㄤ簬鍖哄垎涓嶅悓鏁版嵁闆嗭級*/}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginBottom: 6 }}>{d.id}</div>
                  <h4 style={{ fontWeight: 700, marginBottom: 8 }}>{d.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65, marginBottom: 12 }}>{d.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {/* 浠呭彇鍓?3 涓?tag 灞曠ず锛岄伩鍏嶅崱鐗囪繃楂?*/}
                    {d.tags.slice(0,3).map(tag => <span key={tag} className="tag">{tag}</span>)}
                    {/* 鍗忚 tag 鐢ㄩ潚鑹茬壒娈婇珮浜?*/}
                    <span className="tag" style={{ color: 'var(--wave-cyan)', borderColor: 'var(--wave-cyan)' }}>{d.license}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--wave-cyan)' }}>{d.scale}</div>
                </div>
              ))}
            </div>

            {/* 缁熻鏁板瓧 + 娉ㄨ剼鍗＄墖
                grid 鍒楁瘮 1:1:1:1.8 鈥?绗?4 鍒楋紙Apache + MIT + CC锛夎緝瀹介槻姝㈡崲琛?*/}
            <div style={{ marginTop: 48, padding: 36, background: 'var(--ocean-card)', border: '1px solid var(--ocean-line)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.8fr', gap: 32, textAlign: 'center', alignItems: 'center' }}>
                {(['k1','k2','k3','k4'] as const).map((k, i) => {
                  // 缁熻鏁板€硷細绮鹃€夋暟鎹泦 / 绱甯ф暟 / 鏈哄櫒浜烘湰浣撴暟 / 鍗忚绫诲瀷
                  const vals = ['12','10鈦?','22+','Apache + MIT + CC'];
                  return (
                    <div key={k}>
                      {/* 娓愬彉鏂囧瓧锛涚 4 椤瑰姞 white-space:nowrap 闃叉姌琛?*/}
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, whiteSpace: i === 3 ? 'nowrap' : undefined, background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{vals[i]}</div>
                      <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{t(`dev.s4.${k}.label`)}</div>
                    </div>
                  );
                })}
              </div>
              {/* 娉ㄨ剼鏂囧瓧鍚?<strong> 楂樹寒锛岄渶鐢?dangerouslySetInnerHTML 娓叉煋 */}
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--ocean-line)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: t('dev.s4.note') }} />
            </div>

            {/* 搴曢儴 CTA锛氳仈绯绘垜浠?/ 娴忚浠诲姟澶у巺 */}
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
