'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { tasks } from '@/lib/data';

const TYPE_ICONS: Record<string, string> = { collect:'🎯', verify:'✅', label:'🏷️', custom:'💎' };
const LEVEL_MAP: Record<string, string> = { '入门':'entry','中级':'mid','高级':'high','大单':'big' };
const TYPE_KEYS = ['collect','verify','label','custom'] as const;

export default function TasksPage() {
  const { t } = useTranslation();
  const [typeFilter, setTypeFilter] = useState<string>('全部');
  const [search, setSearch] = useState('');

  const filtered = tasks.filter(task => {
    if (typeFilter !== '全部' && task.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!task.title.toLowerCase().includes(q) && !task.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const pct = (t: typeof tasks[0]) => t.target > 0 ? Math.min(100, Math.round(t.progress / t.target * 100)) : 0;

  return (
    <>
      <Nav active="/tasks" />
      <main>
        <header className="page-head">
          <h1>{t('tasks.head.h1')}</h1>
          <p>{t('tasks.head.desc')}</p>
        </header>

        <section className="section section-bg-mid">
          <div className="section-inner">

            {/* Type overview cards */}
            <div className="grid grid-4" style={{ marginBottom: 32 }}>
              {TYPE_KEYS.map(k => (
                <button
                  key={k}
                  onClick={() => setTypeFilter(typeFilter === k ? '全部' : k)}
                  className="card"
                  style={{ textAlign: 'left', cursor: 'pointer', border: typeFilter === k ? '2px solid var(--wave-cyan)' : undefined }}
                >
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{TYPE_ICONS[k]}</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{t(`tasks.type.${k}.title`)}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6 }}>{t(`tasks.type.${k}.desc`)}</p>
                </button>
              ))}
            </div>

            {/* Filter bar */}
            <div className="filter-bar" style={{ marginBottom: 24 }}>
              <div className="filter-row">
                <span className="filter-label">{t('tasks.filter.type')}</span>
                <div className="filter-chips">
                  <button className={`filter-chip${typeFilter === '全部' ? ' active' : ''}`} onClick={() => setTypeFilter('全部')}>{t('common.arm.all')}</button>
                  {TYPE_KEYS.map(k => (
                    <button key={k} className={`filter-chip${typeFilter === k ? ' active' : ''}`} onClick={() => setTypeFilter(k)}>
                      {TYPE_ICONS[k]} {t(`tasks.type.${k}.title`)}
                    </button>
                  ))}
                </div>
                <input
                  className="filter-search"
                  placeholder={t('tasks.filter.search')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="result-count"><strong>{filtered.length}</strong> {t('tasks.resultSuffix')}</div>

            <div className="grid grid-3">
              {filtered.map(task => (
                <div key={task.id} className="card task-card">
                  <div className="task-card-top">
                    <div className="task-card-icon">{task.icon}</div>
                    <div className="task-card-meta">
                      <div className="task-card-id">{task.id} · {t(`tasks.type.${task.type}.title`)}</div>
                      <div className="task-card-title">{task.title}</div>
                      <div className="task-card-client">{t('common.task.client')}{task.client}</div>
                    </div>
                  </div>
                  <div className="task-card-desc">{task.description}</div>
                  <div className="task-card-info">
                    <div>{t('common.task.scene')}<strong>{task.scene}</strong></div>
                    <div>{t('common.task.device')}<strong>{task.device}</strong></div>
                    <div>{t('common.task.deadline')}<strong>{task.deadline}</strong></div>
                    <div>{t('common.task.level')}<span className={`level-tag ${task.level}`}>{t(`common.level.${LEVEL_MAP[task.level] || 'entry'}`)}</span></div>
                  </div>
                  <div className="task-progress">
                    <div className="task-progress-bar">
                      <div className="task-progress-fill" style={{ width: `${pct(task)}%` }} />
                    </div>
                    <div className="task-progress-text">
                      <span>{task.progress.toLocaleString()} / {task.target.toLocaleString()}</span>
                      <span>{pct(task)}%</span>
                    </div>
                  </div>
                  <div className="task-card-foot">
                    <div className="task-card-reward">
                      {task.reward === 0
                        ? <strong>{t('common.task.negotiate')}</strong>
                        : <><strong>{task.reward.toLocaleString()}</strong><small>{task.rewardUnit}</small></>
                      }
                    </div>
                    <button className="btn btn-ghost btn-sm">{t('common.task.accept')}</button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="cta-banner" style={{ marginTop: 60 }}>
              <h3>{t('tasks.cta.title')}</h3>
              <p>{t('tasks.cta.desc')}</p>
              <div className="cta-banner-btns">
                <a href="/about#contact" className="btn btn-primary btn-lg">{t('tasks.cta.b1')}</a>
                <a href="/developer#platform" className="link-more">{t('tasks.cta.b2')}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
