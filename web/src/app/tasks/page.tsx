/**
 * @file 任务大厅页（Tasks Page）
 *
 * 职责：
 *   展示所有可接单的数据采集/标注/审核任务，支持类型筛选 + 关键词搜索
 *
 * 页面结构：
 *   - 顶部 4 张类型概览卡片（点击可切换筛选）
 *   - 筛选栏（类型 chip + 搜索框）
 *   - 任务卡片列表（含进度条、信息网格、难度标签）
 *   - 底部 CTA（发布任务 / 接入平台）
 *
 * 数据来源：lib/data.ts → tasks 数组
 * 文案：i18n.ts → tasks.* / common.* 键
 *
 * 注意：
 *   - 任务类型概览卡片同时充当快捷筛选器（点击 toggle 选中/全部）
 *   - 悬赏金额区域（.task-card-reward）由全局 CSS 隐藏（参见 CLAUDE.md 铁律）
 *   - 难度等级样式通过 .level-tag + 难度类名实现颜色区分
 */
'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { tasks } from '@/lib/data';
import { withBasePath } from '@/lib/site-path';

// ── 常量配置 ──────────────────────────────────────────────────
// 任务类型 → 展示图标映射（用于类型概览卡片和筛选 chip）
const TYPE_ICONS: Record<string, string> = { collect:'🎯', verify:'✅', label:'🏷️', custom:'💎' };
// 任务难度（中文值）→ i18n 键后缀（common.level.{value}）
// 用于将数据中的中文难度等级翻译为双语显示
const LEVEL_MAP: Record<string, string> = { '入门':'entry','中级':'mid','高级':'high','大单':'big' };
// 全部任务类型 key（与 TYPE_ICONS 键一致，决定渲染顺序）
const TYPE_KEYS = ['collect','verify','label','custom'] as const;

export default function TasksPage() {
  const { t } = useTranslation();
  // ── 筛选状态 ──────────────────────────────────────────────
  // 当前类型筛选（'全部' 或某个任务类型 key，如 'collect'）
  const [typeFilter, setTypeFilter] = useState<string>('全部');
  // 关键词搜索（同时匹配任务标题和 ID，不区分大小写）
  const [search, setSearch] = useState('');

  // ── 过滤逻辑 ──────────────────────────────────────────────
  // 先按类型筛选，再按搜索关键词过滤（两层条件串联）
  const filtered = tasks.filter(task => {
    if (typeFilter !== '全部' && task.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!task.title.toLowerCase().includes(q) && !task.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // 计算任务完成百分比（上限 100%，target=0 时返回 0 防止除零错误）
  // 注意：参数名 t 遮蔽了外层 useTranslation 的 t，但此处仅在 JSX 中作为回调使用
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

            {/* ── 任务类型总览卡片（同时充当快捷筛选器）──── */}
            {/* 点击已选中的类型会重置为"全部"（toggle 行为） */}
            <div className="grid grid-4" style={{ marginBottom: 32 }}>
              {TYPE_KEYS.map(k => (
                <button
                  key={k}
                  onClick={() => setTypeFilter(typeFilter === k ? '全部' : k)}
                  className="card"
                  // 选中时加粗蓝色边框高亮
                  style={{ textAlign: 'left', cursor: 'pointer', border: typeFilter === k ? '2px solid var(--wave-cyan)' : undefined }}
                >
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{TYPE_ICONS[k]}</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{t(`tasks.type.${k}.title`)}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6 }}>{t(`tasks.type.${k}.desc`)}</p>
                </button>
              ))}
            </div>

            {/* ── 筛选栏：类型切换 + 搜索框 ────────────── */}
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

            {/* 结果数量 */}
            <div className="result-count"><strong>{filtered.length}</strong> {t('tasks.resultSuffix')}</div>

            {/* ── 任务卡片列表 ──────────────────────────── */}
            <div className="grid grid-3">
              {filtered.map(task => (
                <div key={task.id} className="card task-card">
                  <div className="task-card-top">
                    <div className="task-card-icon">{task.icon}</div>
                    <div className="task-card-meta">
                      {/* 任务 ID + 类型 */}
                      <div className="task-card-id">{task.id} · {t(`tasks.type.${task.type}.title`)}</div>
                      <div className="task-card-title">{task.title}</div>
                      <div className="task-card-client">{t('common.task.client')}{task.client}</div>
                    </div>
                  </div>
                  <div className="task-card-desc">{task.description}</div>
                  {/* 任务信息网格：场景 / 设备 / 截止日期 / 难度等级 */}
                  <div className="task-card-info">
                    <div>{t('common.task.scene')}<strong>{task.scene}</strong></div>
                    <div>{t('common.task.device')}<strong>{task.device}</strong></div>
                    <div>{t('common.task.deadline')}<strong>{task.deadline}</strong></div>
                    <div>{t('common.task.level')}<span className={`level-tag ${task.level}`}>{t(`common.level.${LEVEL_MAP[task.level] || 'entry'}`)}</span></div>
                  </div>
                  {/* 进度条 */}
                  <div className="task-progress">
                    <div className="task-progress-bar">
                      <div className="task-progress-fill" style={{ width: `${pct(task)}%` }} />
                    </div>
                    <div className="task-progress-text">
                      <span>{task.progress.toLocaleString()} / {task.target.toLocaleString()}</span>
                      <span>{pct(task)}%</span>
                    </div>
                  </div>
                  {/* 卡片底部：悬赏金额（0=面议）+ 接单按钮 */}
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

            {/* ── 底部 CTA：发布任务 / 接入平台 ────────── */}
            <div className="cta-banner" style={{ marginTop: 60 }}>
              <h3>{t('tasks.cta.title')}</h3>
              <p>{t('tasks.cta.desc')}</p>
              <div className="cta-banner-btns">
                <a href={withBasePath('/about#contact')} className="btn btn-primary btn-lg">{t('tasks.cta.b1')}</a>
                <a href={withBasePath('/developer#platform')} className="link-more">{t('tasks.cta.b2')}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
