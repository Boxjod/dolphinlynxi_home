/**
 * @file 数据管理看板页（Dashboard Page）—— 纯演示 / Demo 版
 *
 * 说明：
 *   所有数据均为静态 Mock 常量，仅用于展示平台 UI 设计效果，
 *   不涉及真实 API 调用。真实数据接入方案参见 services/api/。
 *
 * 页面结构：
 *   - 页头（含 Demo 警示横幅）
 *   - 侧边栏菜单（CSS 默认隐藏，预留后续展开交互）
 *   - 主内容区：
 *     · KPI 指标卡片（3 列）——  日采集帧数 / 在线设备 / QA 合格率
 *     · 采集趋势柱图（纯 CSS 渲染，14 天数据）
 *     · 采集设备状态表（10 行 Mock 设备）
 *     · 任务进度 + 订单记录（2 列并排）
 *
 * 文案：i18n.ts → dash.* 键
 *
 * 注意：
 *   - 柱图高度通过 (当日值 / 最大值) * 100% 计算相对比例
 *   - 设备/任务/订单的状态颜色统一通过 STATUS_COLOR 映射表管理
 *   - 侧边栏使用 .dash-sidebar CSS 类控制显示/隐藏
 */
'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// ── KPI 卡片数据（Mock）────────────────────────────────────────
// key：对应 i18n 键 dash.kpi.{key}（指标名称）
// note：对应 i18n 键 dash.kpi.{note}（环比说明，如"较昨日"）
// delta：环比变化值（正增长显示为绿色）
const KPI = [
  { key: 'frames',  value: '1,248,600', unit: '帧',  delta: '+12%', note: 'vsYesterday'  },
  { key: 'devices', value: '47',        unit: '台',  delta: '+3',   note: 'newOnline'    },
  { key: 'qa',      value: '98.4%',     unit: '',    delta: '+0.2%',note: 'vsLastMonth'  },
];

// ── 折线/柱状图数据（Mock）────────────────────────────────────
// 表示最近 14 天的日采集帧数（单位：万帧），数值用于计算各柱的相对高度百分比
// 渲染为纯 CSS 柱图（无第三方图表库依赖），每根柱高度 = (值 / 最大值) * 100%
const CHART_DATA = [42,58,65,51,78,90,85,112,98,105,130,145,138,162];

// ── 采集设备列表（Mock）───────────────────────────────────────
// status: 'capturing'=采集中 / 'slow'=慢速 / 'offline'=离线
const DEVICES = [
  { id:'DVC-001', loc:'上海·P1车间A', frames:28400, status:'capturing' },
  { id:'DVC-002', loc:'上海·P1车间B', frames:24100, status:'capturing' },
  { id:'DVC-003', loc:'北京·P2采集站', frames:19800, status:'capturing' },
  { id:'DVC-004', loc:'深圳·P3实验室', frames:17200, status:'capturing' },
  { id:'DVC-005', loc:'广州·P4站点',   frames:15600, status:'slow' },
  { id:'DVC-006', loc:'上海·P5教育园', frames:13400, status:'capturing' },
  { id:'DVC-007', loc:'杭州·P6研究所', frames:12200, status:'capturing' },
  { id:'DVC-008', loc:'武汉·P7工厂',   frames:11500, status:'capturing' },
  { id:'DVC-009', loc:'成都·P8实验室', frames:10800, status:'offline' },
  { id:'DVC-010', loc:'西安·P9站点',   frames:9200,  status:'capturing' },
];

// ── 进行中任务（Mock）────────────────────────────────────────
// prog：进度百分比；status: 'ok'=正常 / 'warn'=警告
const TASKS_DATA = [
  { id:'TASK-2025-001', name:'物流分拣双臂采集', prog:72, status:'ok' },
  { id:'TASK-2025-002', name:'家庭折叠衣物 EGO', prog:45, status:'ok' },
  { id:'TASK-2025-003', name:'工业 PCB 贴片精密操作', prog:23, status:'warn' },
  { id:'TASK-2025-004', name:'医疗中药分拣', prog:88, status:'ok' },
];

// ── 订单记录（Mock）──────────────────────────────────────────
// status: 'paid'=已付款 / 'pending'=待处理
const ORDERS = [
  { id:'ORD-20250601', type:'数据集', desc:'物流场景双臂·500ep', time:'2025-06-01', status:'paid' },
  { id:'ORD-20250528', type:'算力',   desc:'GPU·A100·20h', time:'2025-05-28', status:'paid' },
  { id:'ORD-20250520', type:'定制采集', desc:'家庭场景 200ep', time:'2025-05-20', status:'paid' },
  { id:'ORD-20250515', type:'标注',   desc:'轨迹标注·80,000帧', time:'2025-05-15', status:'pending' },
];

// ── 侧边栏菜单分组配置 ──────────────────────────────────────────
// sectionKey：菜单分组标题的 i18n 键后缀（dash.side.{sectionKey}）
// items：该分组下的菜单项，每项对应 i18n 键 dash.menu.{item}
// 菜单项点击后只更新 activeMenu 状态（高亮样式），暂无路由跳转
const MENU_GROUPS = [
  { sectionKey:'ops',   items: ['cockpit','mydata','task','qa'] },
  { sectionKey:'dev',   items: ['cap','cam'] },
  { sectionKey:'model', items: ['gpu','train','repo','deploy'] },
  { sectionKey:'acct',  items: ['wallet','bill','team'] },
];

// ── 状态颜色统一映射 ──────────────────────────────────────────
// 设备状态（capturing/slow/offline）、任务状态（ok/warn）、
// 订单状态（paid/pending）共用此 Map，实现全页状态色彩一致性
const STATUS_COLOR: Record<string, string> = {
  capturing:'var(--wave-cyan)', slow:'#f59e0b', offline:'var(--text-dim)',
  ok:'#22c55e', warn:'#f59e0b', paid:'#22c55e', pending:'#f59e0b',
};

export default function DashboardPage() {
  const { t } = useTranslation();
  // 当前激活的侧边栏菜单项（默认"驾驶舱"，即概览视图）
  const [activeMenu, setActiveMenu] = useState('cockpit');
  // 柱图最大值：用于计算各柱的相对高度百分比（保证最高柱 = 100%）
  const maxChart = Math.max(...CHART_DATA);

  return (
    <>
      <Nav active="/dashboard" />
      <main style={{ minHeight: '100vh', background: 'var(--ocean-deepest)' }}>
        {/* ── 页头 ─────────────────────────────────────── */}
        <header className="page-head" style={{ padding: '48px 24px' }}>
          <h1>{t('dash.head.h1')}</h1>
          <p>{t('dash.head.desc')}</p>
          {/* Demo 提示横幅 */}
          <div style={{ marginTop: 16, display: 'inline-block', borderRadius: 6, border: '1px solid #ffc850', background: 'rgba(255,200,80,0.08)', padding: '8px 16px', fontSize: 12, color: '#c8971b' }}>
            ⚠ {t('dash.demo.note')}
          </div>
        </header>

        <div style={{ display: 'flex' }}>
          {/* ── 侧边栏（移动端隐藏，用 CSS .dash-sidebar 控制）── */}
          <aside style={{ width: 200, flexShrink: 0, borderRight: '1px solid var(--ocean-line)', background: 'var(--ocean-card)', display: 'none' }} className="dash-sidebar">
            <nav style={{ position: 'sticky', top: 0, padding: '16px 0' }}>
              {MENU_GROUPS.map(group => (
                <div key={group.sectionKey} style={{ marginBottom: 4 }}>
                  {/* 分组标题 */}
                  <div style={{ padding: '8px 20px', fontSize: 10, fontWeight: 700, letterSpacing: 3, color: 'var(--text-dim)', textTransform: 'uppercase' }}>{t(`dash.side.${group.sectionKey}`)}</div>
                  {group.items.map(item => (
                    <button
                      key={item}
                      style={{ width: '100%', padding: '10px 20px', textAlign: 'left', fontSize: 13, color: activeMenu === item ? 'var(--wave-blue)' : 'var(--text-secondary)', background: activeMenu === item ? 'rgba(44,127,191,0.08)' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                      onClick={() => setActiveMenu(item)}
                    >
                      {t(`dash.menu.${item}`)}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </aside>

          {/* ── 主内容区 ──────────────────────────────────── */}
          <div style={{ flex: 1, overflowX: 'auto', padding: '32px 24px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>{t('dash.greet')}</h2>

            {/* KPI 卡片组（3 列）*/}
            <div className="grid grid-3" style={{ marginBottom: 32 }}>
              {KPI.map(k => (
                <div key={k.key} className="card" style={{ padding: '24px 20px' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8 }}>{t(`dash.kpi.${k.key}`)}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--wave-blue)', lineHeight: 1 }}>{k.value}{k.unit}</div>
                  {/* 环比变化：绿色数值 + 说明文字 */}
                  <div style={{ marginTop: 6, fontSize: 11, display: 'flex', gap: 6 }}>
                    <span style={{ color: '#22c55e' }}>{k.delta}</span>
                    <span style={{ color: 'var(--text-dim)' }}>{t(`dash.kpi.${k.note}`)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── 采集趋势图（纯 CSS 柱图）────────────────── */}
            <div className="card" style={{ marginBottom: 32, padding: 24 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16 }}>{t('dash.chart.title')}</h3>
              <div style={{ display: 'flex', height: 120, alignItems: 'flex-end', gap: 3 }}>
                {CHART_DATA.map((v, i) => (
                  // 每根柱：高度 = (当日值 / 最大值) * 100%
                  <div
                    key={i}
                    style={{ flex: 1, borderRadius: '3px 3px 0 0', background: 'var(--gradient-cta)', opacity: 0.7, height: `${(v / maxChart) * 100}%`, transition: 'all 0.2s' }}
                    title={`Day ${i+1}: ${v}万帧`}
                  />
                ))}
              </div>
              <div style={{ marginTop: 8, textAlign: 'right', fontSize: 11, color: 'var(--text-dim)' }}>{t('dash.chart.unit')}</div>
            </div>

            {/* ── 采集设备状态表 ────────────────────────── */}
            <div className="card" style={{ marginBottom: 32, padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--ocean-line)' }}>
                <h3 style={{ fontWeight: 700 }}>{t('dash.dev.title')}</h3>
                <button style={{ fontSize: 12, color: 'var(--wave-blue)', background: 'none', border: 'none', cursor: 'pointer' }}>{t('dash.dev.viewAll')}</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--ocean-line)' }}>
                      {(['id','loc','frames','status'] as const).map(col => (
                        <th key={col} style={{ padding: '10px 20px', textAlign: 'left', fontWeight: 600, fontSize: 11, letterSpacing: 2, color: 'var(--text-dim)', textTransform: 'uppercase' }}>{t(`dash.dev.col.${col}`)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DEVICES.map((d, i) => (
                      <tr key={d.id} style={{ borderTop: i > 0 ? '1px solid var(--ocean-line)' : undefined }}>
                        <td style={{ padding: '10px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{d.id}</td>
                        <td style={{ padding: '10px 20px', color: 'var(--text-secondary)' }}>{d.loc}</td>
                        <td style={{ padding: '10px 20px', fontWeight: 600, color: 'var(--text-primary)' }}>{d.frames.toLocaleString()}</td>
                        {/* 状态颜色通过 STATUS_COLOR Map 映射 */}
                        <td style={{ padding: '10px 20px', fontWeight: 600, color: STATUS_COLOR[d.status] ?? 'var(--text-secondary)' }}>{t(`dash.status.${d.status}`)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── 任务进度 + 订单记录（2 列）────────────── */}
            <div className="grid grid-2">
              {/* 任务进度卡片 */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--ocean-line)' }}>
                  <h3 style={{ fontWeight: 700 }}>{t('dash.task.title')}</h3>
                  <button className="btn btn-ghost btn-sm">{t('dash.task.new')}</button>
                </div>
                <div>
                  {TASKS_DATA.map((task, i) => (
                    <div key={task.id} style={{ padding: '14px 20px', borderTop: i > 0 ? '1px solid var(--ocean-line)' : undefined }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{task.name}</div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: STATUS_COLOR[task.status] ?? 'var(--text-dim)' }}>{t(`dash.status.${task.status}`)}</span>
                      </div>
                      {/* 进度条：宽度 = prog% */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--ocean-line)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: 'var(--gradient-cta)', width: `${task.prog}%` }} />
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{task.prog}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 订单记录卡片 */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--ocean-line)' }}>
                  <h3 style={{ fontWeight: 700 }}>{t('dash.ord.title')}</h3>
                  <button style={{ fontSize: 12, color: 'var(--wave-blue)', background: 'none', border: 'none', cursor: 'pointer' }}>{t('dash.ord.export')}</button>
                </div>
                <div>
                  {ORDERS.map((ord, i) => (
                    <div key={ord.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: i > 0 ? '1px solid var(--ocean-line)' : undefined }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>{ord.id}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{ord.type}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ord.desc}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 4 }}>{ord.time}</div>
                        {/* 状态胶囊：已付款=绿色背景 / 待处理=黄色背景 */}
                        <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: ord.status === 'paid' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)', color: STATUS_COLOR[ord.status] ?? 'var(--text-dim)' }}>
                          {t(`dash.status.${ord.status}`)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
