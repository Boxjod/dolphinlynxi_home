'use client';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { datasets } from '@/lib/data';

const SCENES = ['全部','餐饮','家庭服务','工业制造','物流仓储','零售连锁','医疗医药','服务连锁','教育','教育玩具','艺术文创','清洁服务','精细服务','娱乐零售'];
const ARMS = ['全部','single','dual'];
const VENDORS = ['全部','海豚自营','精选合集','众包采集'];
const SCENE_KEYS: Record<string, string> = { '餐饮':'food','家庭服务':'home','工业制造':'industry','物流仓储':'logistics','零售连锁':'retail','医疗医药':'medical','服务连锁':'service','教育':'edu','教育玩具':'eduToy','艺术文创':'arts','清洁服务':'clean','精细服务':'precision','娱乐零售':'fun' };
const VENDOR_KEYS: Record<string, string> = { '海豚自营':'self','精选合集':'bigB','众包采集':'crowd' };
const ARM_KEYS: Record<string, string> = { 'single':'single','dual':'dual' };
const sceneSlug: Record<string, string> = { '餐饮':'food','家庭服务':'home','工业制造':'industry','物流仓储':'logistics','医疗医药':'medical','零售连锁':'retail','服务连锁':'service','艺术文创':'arts','教育':'edu','教育玩具':'edu','清洁服务':'clean','精细服务':'precision','娱乐零售':'fun','通用':'general' };
const vendorCls = (v: string) => v === '精选合集' ? 'b' : v === '众包采集' ? 'crowd' : '';
const fmtNum = (n: number) => n >= 1e8 ? (n/1e8).toFixed(2)+'亿' : n >= 1e4 ? (n/1e4).toFixed(1)+'万' : n.toLocaleString();

export default function MarketplacePage() {
  const { t } = useTranslation();
  const [scene, setScene] = useState('全部');
  const [arm, setArm] = useState('全部');
  const [vendor, setVendor] = useState('全部');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => datasets.filter(d => {
    if (scene !== '全部' && d.scene !== scene) return false;
    if (arm !== '全部' && d.arm !== arm) return false;
    if (vendor !== '全部' && d.vendor !== vendor) return false;
    if (search) {
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

            <div className="filter-bar">
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

            <div className="result-count" dangerouslySetInnerHTML={{ __html: `<strong>${filtered.length}</strong> ${t('market.resultSuffix')}` }} />

            <div className="grid grid-4">
              {filtered.map(ds => {
                const slug = sceneSlug[ds.scene] || 'general';
                return (
                  <div key={ds.id} className="card ds-card">
                    {ds.hot && <span className="ds-card-badge hot">HOT</span>}
                    {!ds.hot && ds.new && <span className="ds-card-badge new">NEW</span>}
                    {ds.image ? (
                      <div className="ds-card-cover ds-card-cover-img" style={{ backgroundImage: `url(${ds.image})` }}>
                        <span className="ds-card-cover-scene">{ds.scene}</span>
                      </div>
                    ) : (
                      <div className={`ds-card-cover s-${slug}`}>
                        <span className="ds-card-cover-icon">{ds.icon}</span>
                        <span className="ds-card-cover-scene">{ds.scene}</span>
                      </div>
                    )}
                    <div className="ds-card-meta-only">
                      <div className="ds-card-id">{ds.id}</div>
                      <div className="ds-card-name">{ds.name}</div>
                      <div className={`ds-card-vendor ${vendorCls(ds.vendor)}`}>● {ds.vendor}</div>
                    </div>
                    <div className="ds-card-desc">{ds.description}</div>
                    <div className="ds-card-tags">
                      {ds.tags.slice(0,3).map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                    <div className="ds-card-stats">
                      <span><strong>{ds.episodes}</strong> episodes</span>
                      <span><strong>{ds.duration}h</strong></span>
                      <span><strong>{fmtNum(ds.frames)}</strong>{t('common.unit.frames')}</span>
                    </div>
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

