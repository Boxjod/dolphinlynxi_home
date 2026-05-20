/**
 * @file 关于我们页（About Page）—— 3 大板块
 *
 * 页面结构：
 *   S1 关于海豚灵汐（#about）—— 品牌故事 + Slogan 拆解（数据如潮 × 灵汐而至）
 *   S2 加入我们（#join）      —— 招聘板块，分精选职位（大卡含职责/要求）和普通职位（小卡）
 *   S3 联系我们（#contact）   —— 邮箱 + 公司地址两列卡片
 *
 * 文案：i18n.ts → about.* / common.* 键
 *
 * 注意：
 *   - S1 段落含 <strong> HTML 标记做色彩强调，必须用 dangerouslySetInnerHTML 渲染
 *   - 投递按钮使用 mailto 链接并预填职位标题作为邮件主题
 *   - 精选职位展示 r1-r5（职责）+ q1-q5（要求）共 10 条列表项
 */
'use client';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// ── 职位配置 ──────────────────────────────────────────────────
// 精选职位（展示为大卡片，含完整的职责 r1-r5 + 要求 q1-q5 详情）
const FEATURED_JOBS = ['job1', 'job2'] as const;
// 普通职位（展示为小卡片，仅含简介和投递按钮，适合快速浏览）
const REGULAR_JOBS  = ['job3', 'job4', 'job5', 'job6', 'job7'] as const;

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <Nav active="/about" />
      <main>

        {/* ── 页头：标题 + 锚点导航 ───────────────────── */}
        <header className="page-head">
          <h1>{t('about.head.h1')}</h1>
          <p>{t('about.head.desc')}</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#about" className="btn btn-ghost btn-sm">{t('about.head.b1')}</a>
            <a href="#join"  className="btn btn-ghost btn-sm">{t('about.head.b2')}</a>
            <a href="#contact" className="btn btn-ghost btn-sm">{t('about.head.b3')}</a>
          </div>
        </header>

        {/* ── S1 关于我们 ───────────────────────────────── */}
        <section className="section section-bg-mid" id="about">
          <div className="section-inner" style={{ maxWidth: 920 }}>

            {/* 五段叙述性文字，使用循环渲染 p1~p5 */}
            {/* p1/p3/p4 含 <strong> 标签做色彩强调（如品牌名、定位语句高亮），需 dangerouslySetInnerHTML */}
            <div style={{ background: 'var(--ocean-card)', padding: 48, borderRadius: 'var(--radius-lg)', border: '1px solid var(--ocean-line)' }}>
              {(['p1','p2','p3','p4','p5'] as const).map((p, i) => (
                <p key={p} style={{ fontSize: 17, lineHeight: 1.9, color: 'var(--text-secondary)', marginBottom: i < 4 ? 20 : 0 }}
                  dangerouslySetInnerHTML={{ __html: t(`about.s1.${p}`) }} />
              ))}
            </div>

            {/* Slogan 拆解：数据如潮（左）× 灵汐而至（右）2 列卡片 */}
            <div style={{ marginTop: 40, padding: 48, background: 'var(--ocean-card)', border: '1px solid var(--ocean-line)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 3, fontWeight: 600 }}>{t('about.s1b.title')}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
                {/* 左列：DATA FLOWS LIKE TIDE */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--wave-cyan)', letterSpacing: 3, marginBottom: 10, fontWeight: 600 }}>{t('about.s1b.left.tag')}</div>
                  <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 14, background: 'linear-gradient(135deg,var(--wave-blue),var(--wave-cyan))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{t('about.s1b.left.title')}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.85 }}>{t('about.s1b.left.desc')}</p>
                </div>
                {/* 右列：INTELLIGENCE EMERGES */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--wave-pink)', letterSpacing: 3, marginBottom: 10, fontWeight: 600 }}>{t('about.s1b.right.tag')}</div>
                  <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 14, background: 'linear-gradient(135deg,var(--wave-pink),var(--wave-coral))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{t('about.s1b.right.title')}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.85 }}>{t('about.s1b.right.desc')}</p>
                </div>
              </div>
              {/* 底部结语 */}
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--ocean-line)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                {t('about.s1b.foot')}
              </div>
            </div>

          </div>
        </section>

        {/* ── S2 加入我们（招聘）─────────────────────────── */}
        <section className="section section-bg-mid" id="join">
          <div className="section-inner">
            <div className="section-head">
              <div className="section-eyebrow">{t('about.s2.eyebrow')}</div>
              <h2 className="section-title">{t('about.s2.title')}</h2>
              <p className="section-desc">{t('about.s2.desc')}</p>
            </div>

            {/* 精选职位：大卡片，含职责 r1-r5 + 要求 q1-q5 */}
            <div className="job-grid job-grid-featured">
              {FEATURED_JOBS.map(key => (
                <div key={key} className="job-card job-card-featured">
                  <div className="job-head">
                    <span className="job-tag-new">NEW</span>
                    <h3 className="job-title">{t(`about.${key}.title`)}</h3>
                    <div className="job-meta">{t(`about.${key}.meta`)}</div>
                  </div>
                  <div className="job-section">
                    <div className="job-section-title">{t('about.job.responsibility')}</div>
                    <ul className="job-list">
                      {(['r1','r2','r3','r4','r5'] as const).map(r => (
                        <li key={r}>{t(`about.${key}.${r}`)}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="job-section">
                    <div className="job-section-title">{t('about.job.requirements')}</div>
                    <ul className="job-list">
                      {(['q1','q2','q3','q4','q5'] as const).map(q => (
                        <li key={q}>{t(`about.${key}.${q}`)}</li>
                      ))}
                    </ul>
                  </div>
                  {/* 投递按钮：mailto 预填职位标题 */}
                  <a href={`mailto:plumpost@sina.com?subject=Application - ${t(`about.${key}.title`)}`} className="btn btn-primary btn-sm">{t('common.btn.apply')}</a>
                </div>
              ))}
            </div>

            {/* 普通职位：小卡片，只有简介和投递按钮 */}
            <div className="job-grid job-grid-regular" style={{ marginTop: 24 }}>
              {REGULAR_JOBS.map(key => (
                <div key={key} className="job-card">
                  <div className="job-head">
                    <h3 className="job-title">{t(`about.${key}.title`)}</h3>
                    <div className="job-meta">{t(`about.${key}.meta`)}</div>
                  </div>
                  <p className="job-desc">{t(`about.${key}.desc`)}</p>
                  <a href={`mailto:plumpost@sina.com?subject=Application - ${t(`about.${key}.title`)}`} className="btn btn-ghost btn-sm">{t('common.btn.apply')}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S3 联系我们 ──────────────────────────────────── */}
        <section className="section section-bg-deep" id="contact">
          <div className="section-inner" style={{ maxWidth: 1100 }}>
            <div className="section-head">
              <div className="section-eyebrow">{t('about.s3.eyebrow')}</div>
              <h2 className="section-title">{t('about.s3.title')}</h2>
              <p className="section-desc">{t('about.s3.desc')}</p>
            </div>
            {/* 邮箱 + 地址两列卡片 */}
            <div className="grid grid-2" style={{ alignItems: 'stretch' }}>
              {/* 邮箱卡片 */}
              <div className="card" style={{ padding: '48px 36px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 54, marginBottom: 14 }}>📮</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 2, marginBottom: 10, fontWeight: 600 }}>{t('about.s3.email.tag')}</div>
                <a href="mailto:plumpost@sina.com" style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: 'var(--wave-blue)', textDecoration: 'none' }}>plumpost@sina.com</a>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginTop: 18 }}>{t('about.s3.email.note')}</p>
              </div>
              {/* 地址卡片 */}
              <div className="card" style={{ padding: '48px 36px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 54, marginBottom: 14 }}>📍</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 2, marginBottom: 10, fontWeight: 600 }}>{t('about.s3.addr.tag')}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5 }}>{t('about.s3.addr.city')}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginTop: 10 }}>{t('about.s3.addr.full')}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 18, fontSize: 12, color: 'var(--text-dim)' }}>
                  <span>{t('about.s3.addr.hours')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
