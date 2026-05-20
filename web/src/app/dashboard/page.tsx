'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/* ── KPI 卡片（4 张，第 4 张 kpi-credits 被 CSS 全局隐藏）─── */
const KPI = [
  { key: 'frames',  value: '82,640',  delta: '↑ 12.4%', note: 'vsYesterday', dir: 'up' },
  { key: 'devices', value: '186',     delta: '↑ 4',     note: 'newOnline',   dir: 'up' },
  { key: 'qa',      value: '96.8%',   delta: '↑ 0.6 pp', note: '',           dir: 'up' },
  { key: 'credits', value: '128.4k',  delta: '↓ 8.2%',  note: 'vsLastMonth', dir: 'down' },
];

/* ── 14 天采集趋势柱图数据（万帧）─────────────────────── */
const CHART_DAYS  = ['05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11','05-12','05-13','05-14','05-15','05-16','05-17'];
const CHART_DATA  = [4.2, 5.1, 4.8, 6.2, 7.4, 6.8, 5.6, 7.2, 8.1, 8.6, 7.9, 9.2, 7.4, 8.3];
const CHART_MAX   = Math.max(...CHART_DATA);

/* ── 侧边栏菜单分组 ─────────────────────────────────── */
const MENU_GROUPS = [
  { sectionKey: 'ops',   items: ['cockpit','mydata','task','qa'] },
  { sectionKey: 'dev',   items: ['cap','cam','gpu'] },
  { sectionKey: 'model', items: ['train','repo','deploy'] },
  { sectionKey: 'acct',  items: ['wallet','bill','team'] },
];

/* ── 采集设备 TOP 10 ─────────────────────────────────── */
const DEVICES: { id: string; loc: { zh: string; en: string }; frames: number; dot: string; statusKey: string }[] = [
  { id:'DEV-SH-0142', loc:{ zh:'上海·浦东厂区 A 工位 12', en:'Shanghai · Pudong A · Station 12' },     frames:1284, dot:'green', statusKey:'capturing' },
  { id:'DEV-SZ-0086', loc:{ zh:'深圳·南山厂区 B 工位 03', en:'Shenzhen · Nanshan B · Station 03' },     frames:1156, dot:'green', statusKey:'capturing' },
  { id:'DEV-SH-0098', loc:{ zh:'上海·张江厂区 C 工位 08', en:'Shanghai · Zhangjiang C · Station 08' },   frames:1042, dot:'green', statusKey:'capturing' },
  { id:'DEV-SZ-0119', loc:{ zh:'深圳·南山厂区 A 工位 21', en:'Shenzhen · Nanshan A · Station 21' },     frames:982,  dot:'green', statusKey:'capturing' },
  { id:'DEV-SH-0156', loc:{ zh:'上海·浦东厂区 D 工位 16', en:'Shanghai · Pudong D · Station 16' },       frames:864,  dot:'yellow',statusKey:'slow' },
  { id:'DEV-SZ-0204', loc:{ zh:'深圳·南山厂区 B 工位 11', en:'Shenzhen · Nanshan B · Station 11' },     frames:762,  dot:'green', statusKey:'capturing' },
  { id:'DEV-SH-0078', loc:{ zh:'上海·张江厂区 A 工位 05', en:'Shanghai · Zhangjiang A · Station 05' },   frames:698,  dot:'green', statusKey:'capturing' },
  { id:'DEV-SZ-0033', loc:{ zh:'深圳·南山厂区 C 工位 09', en:'Shenzhen · Nanshan C · Station 09' },     frames:612,  dot:'yellow',statusKey:'slow' },
  { id:'DEV-SH-0186', loc:{ zh:'上海·浦东厂区 B 工位 22', en:'Shanghai · Pudong B · Station 22' },       frames:548,  dot:'green', statusKey:'capturing' },
  { id:'DEV-SZ-0167', loc:{ zh:'深圳·南山厂区 D 工位 17', en:'Shenzhen · Nanshan D · Station 17' },     frames:0,    dot:'red',   statusKey:'offline' },
];

/* ── 进行中任务 ──────────────────────────────────────── */
const TASKS_DATA: { name: { zh: string; en: string }; prog: number; budget: string; dot: string; statusKey: string }[] = [
  { name:{ zh:'PCB 贴片元件抓取',     en:'PCB SMT component grasp' },       prog:76, budget:'38w', dot:'green', statusKey:'ok' },
  { name:{ zh:'工业上下料 SOP',       en:'Industrial load/unload SOP' },     prog:18, budget:'100w',dot:'green', statusKey:'ok' },
  { name:{ zh:'工位异常处理 case',     en:'Station-anomaly case' },           prog:42, budget:'12w', dot:'yellow',statusKey:'warn' },
  { name:{ zh:'夹爪触觉数据补采',     en:'Gripper tactile re-capture' },     prog:89, budget:'8w',  dot:'green', statusKey:'ok' },
  { name:{ zh:'失败 case 二次校验',   en:'Failed-case re-verification' },   prog:64, budget:'5w',  dot:'green', statusKey:'ok' },
];

/* ── 订单 / 财务流水 ─────────────────────────────────── */
const ORDERS: { id: string; type: { zh: string; en: string }; desc: { zh: string; en: string }; amt: string; time: string; dot: string; statusLabel: { zh: string; en: string } }[] = [
  { id:'ORD-26051704', type:{ zh:'采购', en:'Purchase' }, desc:{ zh:'购买 DLX-DS-1003 PCB 板贴片数据集', en:'Bought DLX-DS-1003 PCB SMT dataset' },                amt:'-38,000',  time:'17:42',                     dot:'green',  statusLabel:{ zh:'已完成', en:'Done' } },
  { id:'ORD-26051703', type:{ zh:'充值', en:'Topup' },    desc:{ zh:'对公转账充值',                     en:'Corporate bank-transfer topup' },                      amt:'+500,000', time:'15:28',                     dot:'green',  statusLabel:{ zh:'已到账', en:'Received' } },
  { id:'ORD-26051702', type:{ zh:'采购', en:'Purchase' }, desc:{ zh:'购买 DLX-DS-1010 拧螺丝数据集',   en:'Bought DLX-DS-1010 screwdriving dataset' },             amt:'-28,000',  time:'14:11',                     dot:'green',  statusLabel:{ zh:'已完成', en:'Done' } },
  { id:'ORD-26051701', type:{ zh:'消耗', en:'Usage' },    desc:{ zh:'GPU 训练任务 · π0 微调 · 8.2 小时', en:'GPU training · π0 fine-tune · 8.2 hours' },            amt:'-164',     time:'12:05',                     dot:'green',  statusLabel:{ zh:'已结算', en:'Settled' } },
  { id:'ORD-26051609', type:{ zh:'定制', en:'Custom' },   desc:{ zh:'大单：3C 工厂上下料数采（预付款）', en:'Major: 3C factory load/unload capture (prepayment)' },  amt:'-300,000', time:'Yesterday 18:30',            dot:'yellow', statusLabel:{ zh:'进行中', en:'In progress' } },
  { id:'ORD-26051608', type:{ zh:'消耗', en:'Usage' },    desc:{ zh:'众包标注 · 物体分割 5,200 帧',     en:'Crowd labeling · object segmentation 5,200 frames' },  amt:'-26,000',  time:'Yesterday 16:48',            dot:'green',  statusLabel:{ zh:'已完成', en:'Done' } },
];

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('cockpit');
  const isZh = i18n.language === 'zh';

  return (
    <>
      <Nav active="/dashboard" />

      {/* ── 页头 ────────────────────────────────────── */}
      <header className="page-head">
        <h1>{t('dash.head.h1')}</h1>
        <p>{t('dash.head.desc')}</p>
      </header>

      {/* ── 主体区域 ────────────────────────────────── */}
      <section className="section section-bg-mid" style={{ paddingTop: 48 }}>
        <div className="section-inner">

          {/* Demo 提示横幅 */}
          <div style={{ background:'rgba(8,145,178,0.06)', border:'1px solid var(--ocean-line-strong)', borderRadius:8, padding:'14px 20px', marginBottom:24, color:'var(--text-secondary)', fontSize:13 }}>
            <strong style={{ color:'var(--wave-cyan)' }}>{t('dash.demo.label')}</strong>{' '}
            {t('dash.demo.note')}
          </div>

          {/* ── dash-grid: 280px 侧边栏 | 1fr 主内容 ── */}
          <div className="dash-grid">

            {/* ── 侧边栏 ──────────────────────────── */}
            <aside className="dash-sidebar">
              {MENU_GROUPS.map(group => (
                <div key={group.sectionKey} className="dash-sidebar-section">
                  <div className="dash-sidebar-title">{t(`dash.side.${group.sectionKey}`)}</div>
                  {group.items.map(item => (
                    <div
                      key={item}
                      className={`dash-menu-item${activeMenu === item ? ' active' : ''}`}
                      onClick={() => setActiveMenu(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      {t(`dash.menu.${item}`)}
                    </div>
                  ))}
                </div>
              ))}
            </aside>

            {/* ── 主内容 ──────────────────────────── */}
            <main className="dash-main">

              <h2 style={{ fontSize:22, marginBottom:24 }}>{t('dash.greet')}</h2>

              {/* KPI 卡片（4 列，第 4 张 kpi-credits 被 CSS 隐藏）*/}
              <div className="dash-kpi">
                {KPI.map(k => (
                  <div key={k.key} className="dash-kpi-card">
                    <div className="dash-kpi-label">{t(`dash.kpi.${k.key}`)}</div>
                    <div className="dash-kpi-num">{k.value}</div>
                    <div className={`dash-kpi-delta ${k.dir}`}>
                      {k.delta}{k.note ? <> <span>{t(`dash.kpi.${k.note}`)}</span></> : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── 14 天采集趋势柱图 ────────────── */}
              <div className="dash-section">
                <div className="dash-section-title">
                  <span>{t('dash.chart.title')}</span>
                  <span style={{ fontSize:12, color:'var(--text-dim)', fontWeight:400 }}>{t('dash.chart.unit')}</span>
                </div>
                <div className="dash-chart">
                  {CHART_DATA.map((v, i) => (
                    <div
                      key={i}
                      className="dash-bar"
                      style={{ height: `${(v / CHART_MAX) * 92}%` }}
                      title={`${CHART_DAYS[i]}: ${v} ${isZh ? '万帧' : '10k frames'}`}
                    >
                      <div className="dash-bar-label">{CHART_DAYS[i].slice(3)}</div>
                    </div>
                  ))}
                </div>
                <div style={{ height:24 }} />
              </div>

              {/* ── 设备表 + 任务表（并排两列）───── */}
              <div className="dash-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {/* 设备 TOP 10 */}
                <div className="dash-section">
                  <div className="dash-section-title">
                    <span>{t('dash.dev.title')}</span>
                    <a href="#" style={{ fontSize:12, fontWeight:400, color:'var(--wave-cyan)' }}>{t('dash.dev.viewAll')}</a>
                  </div>
                  <table className="dash-table dash-table-dev">
                    <thead>
                      <tr>
                        <th>{t('dash.dev.col.id')}</th>
                        <th>{t('dash.dev.col.loc')}</th>
                        <th>{t('dash.dev.col.frames')}</th>
                        <th>{t('dash.dev.col.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEVICES.map(d => (
                        <tr key={d.id}>
                          <td className="mono">{d.id}</td>
                          <td style={{ fontSize:12 }}>{isZh ? d.loc.zh : d.loc.en}</td>
                          <td className="mono">{d.frames.toLocaleString()}</td>
                          <td><span className={`dot ${d.dot}`} />{t(`dash.status.${d.statusKey}`)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 进行中任务 */}
                <div className="dash-section">
                  <div className="dash-section-title">
                    <span>{t('dash.task.title')}</span>
                    <a href="#" style={{ fontSize:12, fontWeight:400, color:'var(--wave-cyan)' }}>{t('dash.task.new')}</a>
                  </div>
                  <table className="dash-table dash-table-task">
                    <thead>
                      <tr>
                        <th>{t('dash.task.col.task')}</th>
                        <th>{t('dash.task.col.prog')}</th>
                        <th>{t('dash.task.col.bud')}</th>
                        <th>{t('dash.task.col.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TASKS_DATA.map(task => (
                        <tr key={task.name.zh}>
                          <td>{isZh ? task.name.zh : task.name.en}</td>
                          <td>
                            <div className="dash-prog" style={{ height:5, background:'var(--ocean-deep)', borderRadius:3, width:80, display:'inline-block', overflow:'hidden' }}>
                              <div style={{ height:'100%', background:'var(--gradient-cta)', width:`${task.prog}%` }} />
                            </div>
                            <span className="mono" style={{ marginLeft:6 }}>{task.prog}%</span>
                          </td>
                          <td className="mono">{task.budget}</td>
                          <td><span className={`dot ${task.dot}`} />{t(`dash.status.${task.statusKey}`)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── 订单 / 财务流水（全宽）─────── */}
              <div className="dash-section">
                <div className="dash-section-title">
                  <span>{t('dash.ord.title')}</span>
                  <a href="#" style={{ fontSize:12, fontWeight:400, color:'var(--wave-cyan)' }}>{t('dash.ord.export')}</a>
                </div>
                  <table className="dash-table dash-table-order">
                  <thead>
                    <tr>
                      <th>{t('dash.ord.col.id')}</th>
                      <th>{t('dash.ord.col.type')}</th>
                      <th>{t('dash.ord.col.desc')}</th>
                      <th>{t('dash.ord.col.amt')}</th>
                      <th>{t('dash.ord.col.time')}</th>
                      <th>{t('dash.ord.col.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map(ord => (
                      <tr key={ord.id}>
                        <td className="mono">{ord.id}</td>
                        <td>{isZh ? ord.type.zh : ord.type.en}</td>
                        <td>{isZh ? ord.desc.zh : ord.desc.en}</td>
                        <td style={{ color: ord.amt.startsWith('+') ? '#4ade80' : 'var(--wave-pink)' }}>{ord.amt}</td>
                        <td>{ord.time}</td>
                        <td><span className={`dot ${ord.dot}`} />{isZh ? ord.statusLabel.zh : ord.statusLabel.en}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </main>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
