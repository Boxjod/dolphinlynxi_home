/**
 * @file 数据集市场页（Marketplace Page）
 *
 * 职责：
 *   展示全部可用数据集，支持三维筛选（场景 × 机械臂类型 × 供应方）+ 关键词搜索
 *
 * 数据流：
 *   lib/data.ts → datasets 数组
 *     ↓ useMemo 筛选（scene + arm + vendor + search）
 *     ↓ 渲染为 grid 卡片列表
 *
 * 文案：i18n.ts → market.* / common.scene.* / common.arm.* / common.vendor.* 键
 *
 * 核心设计：
 *   - 筛选值使用中文原始值（如 '餐饮'），通过 SCENE_KEYS 等映射表翻译为 i18n 键
 *   - 封面有两种模式：有 image 字段时显示真实图片，否则用场景色块 + icon
 *   - 价格区域（.ds-card-price）由全局 CSS 隐藏（参见 CLAUDE.md 铁律）
 *   - 帧数格式化：>1亿显示"x.xx亿"，>1万显示"x.x万"
 */
'use client';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { datasets } from '@/lib/data';
import { withAssetPath } from '@/lib/site-path';

// ── 筛选选项常量 ────────────────────────────────────────────────
// 以下数组定义了三个筛选维度的全部可选项。
// 筛选值使用中文原始值（与 lib/data.ts 中 dataset.scene 等字段一致），
// 通过下方的 *_KEYS 映射表翻译为 i18n 键以支持双语显示。

// 场景筛选列表（中文值，直接匹配 dataset.scene 字段）
const SCENES = ['全部','餐饮','家庭服务','工业制造','物流仓储','零售连锁','医疗医药','服务连锁','教育','教育玩具','艺术文创','清洁服务','精细服务','娱乐零售'];
// 机械臂类型筛选（single=单臂 / dual=双臂，匹配 dataset.arm 字段）
const ARMS = ['全部','single','dual'];
// 供应方来源筛选（匹配 dataset.vendor 字段）
const VENDORS = ['全部','海豚自营','精选合集','众包采集'];

// ── 筛选值 → i18n 键映射 ────────────────────────────────────
// 这些映射表将中文筛选值翻译为 i18n 键，从而在英文模式下也能正确显示按钮文字。
// 例如：'餐饮' → 'food' → t('common.scene.food') → "Food & Beverage"

// 场景中文名 → common.scene.{value} 键
const SCENE_KEYS: Record<string, string> = { '餐饮':'food','家庭服务':'home','工业制造':'industry','物流仓储':'logistics','零售连锁':'retail','医疗医药':'medical','服务连锁':'service','教育':'edu','教育玩具':'eduToy','艺术文创':'arts','清洁服务':'clean','精细服务':'precision','娱乐零售':'fun' };
// 供应方中文名 → common.vendor.{value} 键
const VENDOR_KEYS: Record<string, string> = { '海豚自营':'self','精选合集':'bigB','众包采集':'crowd' };
// 机械臂类型 → common.arm.{value} 键
const ARM_KEYS: Record<string, string> = { 'single':'single','dual':'dual' };

// ── 视觉辅助映射 ────────────────────────────────────────────────
// 场景中文名 → CSS slug（用于无图片封面的色块类名 .s-{slug}，定义在 legacy.css 中）
const sceneSlug: Record<string, string> = { '餐饮':'food','家庭服务':'home','工业制造':'industry','物流仓储':'logistics','医疗医药':'medical','零售连锁':'retail','服务连锁':'service','艺术文创':'arts','教育':'edu','教育玩具':'edu','清洁服务':'clean','精细服务':'precision','娱乐零售':'fun','通用':'general' };

// 供应方 → 供应方徽标的 CSS 类后缀（精选合集='b' 蓝色 / 众包='crowd' 橙色 / 自营=空字符串默认色）
const vendorCls = (v: string) => v === '精选合集' ? 'b' : v === '众包采集' ? 'crowd' : '';

// 帧数格式化工具：>1亿 → "x.xx亿"，>1万 → "x.x万"，否则千位逗号分隔
const fmtNum = (n: number) => n >= 1e8 ? (n/1e8).toFixed(2)+'亿' : n >= 1e4 ? (n/1e4).toFixed(1)+'万' : n.toLocaleString();

export default function MarketplacePage() {
  const { t } = useTranslation();

  // ── 筛选状态 ──────────────────────────────────────────────
  // 四个独立的筛选维度，任一变化都会触发 useMemo 重新计算过滤结果
  const [scene, setScene] = useState('全部');   // 当前选中的应用场景
  const [arm, setArm] = useState('全部');       // 当前选中的机械臂类型（single/dual）
  const [vendor, setVendor] = useState('全部'); // 当前选中的供应方（自营/精选/众包）
  const [search, setSearch] = useState('');     // 搜索框文本（实时过滤）

  // ── 派生过滤结果（scene/arm/vendor/search 任一变化时自动重算）──
  // 使用 useMemo 避免每次渲染都遍历全量 datasets 数组
  const filtered = useMemo(() => datasets.filter(d => {
    if (scene !== '全部' && d.scene !== scene) return false;
    if (arm !== '全部' && d.arm !== arm) return false;
    if (vendor !== '全部' && d.vendor !== vendor) return false;
    if (search) {
      // 同时匹配名称、ID、描述，不区分大小写
      const q = search.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !d.id.toLowerCase().includes(q) && !d.description.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [scene, arm, vendor, search]);

  return (
    <>
      <Nav active="/marketplace" />
      <main>
        <header className="page-head">
          <h1>{t('market.head.h1')}</h1>
          <p>{t('market.head.desc')}</p>
        </header>

        <section className="section section-bg-mid" style={{ paddingTop: 60 }}>
          <div className="section-inner">

            {/* ── 筛选栏 ────────────────────────────────── */}
            <div className="filter-bar">
              {/* 场景筛选行 */}
              <div className="filter-row">
                <span className="filter-label">{t('market.filter.scene')}</span>
                <div className="filter-chips">
                  {SCENES.map(s => (
                    <button key={s} className={`filter-chip${scene === s ? ' active' : ''}`} onClick={() => setScene(s)}>
                      {s === '全部' ? t('common.arm.all') : t(`common.scene.${SCENE_KEYS[s]}`)}
                    </button>
                  ))}
                </div>
              </div>
              {/* 机械臂类型筛选行 + 搜索框（共行布局）*/}
              <div className="filter-row">
                <span className="filter-label">{t('market.filter.arm')}</span>
                <div className="filter-chips">
                  {ARMS.map(a => (
                    <button key={a} className={`filter-chip${arm === a ? ' active' : ''}`} onClick={() => setArm(a)}>
                      {a === '全部' ? t('common.arm.all') : t(`common.arm.${ARM_KEYS[a]}`)}
                    </button>
                  ))}
                </div>
                <input
                  className="filter-search"
                  placeholder={t('market.filter.search')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              {/* 供应方筛选行 */}
              <div className="filter-row">
                <span className="filter-label">{t('market.filter.vendor')}</span>
                <div className="filter-chips">
                  {VENDORS.map(v => (
                    <button key={v} className={`filter-chip${vendor === v ? ' active' : ''}`} onClick={() => setVendor(v)}>
                      {v === '全部' ? t('common.arm.all') : t(`common.vendor.${VENDOR_KEYS[v]}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 结果数量提示（含加粗数字，用 dangerouslySetInnerHTML 注入）*/}
            <div className="result-count" dangerouslySetInnerHTML={{ __html: `<strong>${filtered.length}</strong> ${t('market.resultSuffix')}` }} />

            {/* ── 数据集卡片网格 ────────────────────────── */}
            <div className="grid grid-4">
              {filtered.map(ds => {
                // 根据场景获取封面背景 CSS 类后缀（无图片时显示纯色背景）
                const slug = sceneSlug[ds.scene] || 'general';
                return (
                  <div key={ds.id} className="card ds-card">
                    {/* HOT / NEW 角标：两者互斥，HOT 优先 */}
                    {ds.hot && <span className="ds-card-badge hot">HOT</span>}
                    {!ds.hot && ds.new && <span className="ds-card-badge new">NEW</span>}
                    {/* 封面：有 image 字段则显示真实图，否则用场景色块 */}
                    {ds.image ? (
                      <div className="ds-card-cover ds-card-cover-img" style={{ backgroundImage: `url(${withAssetPath(ds.image)})` }}>
                        <span className="ds-card-cover-scene">{ds.scene}</span>
                      </div>
                    ) : (
                      <div className={`ds-card-cover s-${slug}`}>
                        <span className="ds-card-cover-icon">{ds.icon}</span>
                        <span className="ds-card-cover-scene">{ds.scene}</span>
                      </div>
                    )}
                    {/* 卡片元信息：ID / 名称 / 供应方 */}
                    <div className="ds-card-meta-only">
                      <div className="ds-card-id">{ds.id}</div>
                      <div className="ds-card-name">{ds.name}</div>
                      {/* vendorCls 决定供应方徽标颜色：精选合集=蓝色/众包=橙色/自营=默认 */}
                      <div className={`ds-card-vendor ${vendorCls(ds.vendor)}`}>● {ds.vendor}</div>
                    </div>
                    <div className="ds-card-desc">{ds.description}</div>
                    {/* 标签（最多显示 3 个）*/}
                    <div className="ds-card-tags">
                      {ds.tags.slice(0,3).map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                    {/* 统计数据：episodes / 时长 / 帧数 */}
                    <div className="ds-card-stats">
                      <span><strong>{ds.episodes}</strong> episodes</span>
                      <span><strong>{ds.duration}h</strong></span>
                      <span><strong>{fmtNum(ds.frames)}</strong>{t('common.unit.frames')}</span>
                    </div>
                    {/* 卡片底部：价格（CSS 隐藏）+ 评分/下载量 */}
                    <div className="ds-card-foot">
                      <div className="ds-card-price"><strong>{fmtNum(ds.price)}</strong></div>
                      <div className="ds-card-rating">★ {ds.rating} · {ds.downloads}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

