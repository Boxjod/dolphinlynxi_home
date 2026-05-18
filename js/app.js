/* ============================================================
 * 海豚灵汐 · 共享交互脚本
 * 卡片渲染 / 筛选 / 弹窗 / 数字滚动
 * ============================================================ */

(function () {
  const D = window.DOLPHIN_DATA;

  /* ===== Utils ===== */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const isEn = () => window.I18N && window.I18N.lang === 'en';
  const t = (k) => (window.I18N && window.I18N.t) ? window.I18N.t(k) : k;
  const L = (item, kind) => (window.DOLPHIN_I18N ? window.DOLPHIN_I18N.localize(item, kind) : item);
  const fmtNum = (n) => {
    if (isEn()) {
      if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
      if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
      if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
      return n.toLocaleString();
    }
    if (n >= 1e8) return (n / 1e8).toFixed(2) + ' 亿';
    if (n >= 1e4) return (n / 1e4).toFixed(1) + ' 万';
    return n.toLocaleString();
  };
  const vendorClass = (v) => (v === '精选合集' || v === 'Curated collection') ? 'b'
                            : (v === '众包采集' || v === 'Crowdsourced')   ? 'crowd' : '';

  /* 场景配色 slug（CSS 用 ASCII class 名） */
  const sceneSlug = {
    '餐饮':'food','家庭服务':'home','工业制造':'industry',
    '物流仓储':'logistics','医疗医药':'medical','零售连锁':'retail',
    '服务连锁':'service','艺术文创':'arts','教育':'edu','教育玩具':'edu',
    '清洁服务':'clean','精细服务':'precision','娱乐零售':'fun','通用':'general'
  };

  /* ===== Dataset card ===== */
  function renderDatasetCard(raw) {
    const ds = L(raw, 'dataset');
    const slug = sceneSlug[raw.scene] || 'general';
    const badge = ds.hot ? '<span class="ds-card-badge hot">HOT</span>'
                 : ds.new ? '<span class="ds-card-badge new">NEW</span>' : '';
    const tags = ds.tags.slice(0, 3).map(tg => {
      const lower = String(tg).toLowerCase();
      const cls = tg.includes('独家') || tg.includes('SOTA') || lower.includes('exclusive') || lower.includes('sota') ? 'gold'
                : tg.includes('VLA') || lower.includes('vla') ? 'pink' : '';
      return `<span class="tag ${cls}">${tg}</span>`;
    }).join('');
    const cover = ds.image
      ? `<div class="ds-card-cover ds-card-cover-img" style="background-image:url(${ds.image});">
           <span class="ds-card-cover-scene">${ds.scene}</span>
         </div>`
      : `<div class="ds-card-cover s-${slug}">
           <span class="ds-card-cover-icon">${ds.icon}</span>
           <span class="ds-card-cover-scene">${ds.scene}</span>
         </div>`;
    const durationUnit = isEn() ? 'duration' : '时长';
    const framesUnit   = isEn() ? 'frames'   : '帧';
    const pointsUnit   = isEn() ? 'credits'  : '积分';
    const dlText       = isEn() ? 'downloads' : '次下载';
    return `
      <div class="card ds-card" data-id="${ds.id}">
        ${badge}
        ${cover}
        <div class="ds-card-meta-only">
          <div class="ds-card-id">${ds.id}</div>
          <div class="ds-card-name">${ds.name}</div>
          <div class="ds-card-vendor ${vendorClass(ds.vendor)}">● ${ds.vendor}</div>
        </div>
        <div class="ds-card-desc">${ds.description}</div>
        <div class="ds-card-tags">${tags}</div>
        <div class="ds-card-stats">
          <span><strong>${ds.episodes}</strong>episodes</span>
          <span><strong>${ds.duration}h</strong>${durationUnit}</span>
          <span><strong>${fmtNum(ds.frames)}</strong>${framesUnit}</span>
        </div>
        <div class="ds-card-foot">
          <div class="ds-card-price"><strong>${fmtNum(ds.price)}</strong><small>${pointsUnit}</small></div>
          <div class="ds-card-rating">★ ${ds.rating} · ${ds.downloads} ${dlText}</div>
        </div>
      </div>`;
  }

  /* ===== Task card ===== */
  function renderTaskCard(raw) {
    const tk = L(raw, 'task');
    const pct = tk.target > 0 ? Math.min(100, Math.round(tk.progress / tk.target * 100)) : 0;
    const typeLabelKey = { collect: 'common.task.collect', verify: 'common.task.verify', label: 'common.task.label', custom: 'common.task.custom' };
    const typeLabel = typeLabelKey[tk.type] ? t(typeLabelKey[tk.type]) : tk.type;
    const levelMap = { '入门':'common.level.entry','中级':'common.level.mid','高级':'common.level.high','大单':'common.level.big' };
    const levelText = levelMap[tk.level] ? t(levelMap[tk.level]) : tk.level;
    const rewardUnitEn = (tk.rewardUnit || '').replace('积分/集','credits/episode').replace('积分/条','credits/item').replace('积分/帧','credits/frame').replace('总包','total');
    const rewardUnit = isEn() ? rewardUnitEn : tk.rewardUnit;
    return `
      <div class="card task-card" data-id="${tk.id}">
        <div class="task-card-top">
          <div class="task-card-icon">${tk.icon}</div>
          <div class="task-card-meta">
            <div class="task-card-id">${tk.id} · ${typeLabel}</div>
            <div class="task-card-title">${tk.title}</div>
            <div class="task-card-client">${t('common.task.client')}${tk.client}</div>
          </div>
        </div>
        <div class="task-card-desc">${tk.description}</div>
        <div class="task-card-info">
          <div>${t('common.task.scene')}<strong>${tk.scene}</strong></div>
          <div>${t('common.task.device')}<strong>${tk.device}</strong></div>
          <div>${t('common.task.deadline')}<strong>${tk.deadline}</strong></div>
          <div>${t('common.task.level')}<span class="level-tag ${tk.level}">${levelText}</span></div>
        </div>
        <div class="task-progress">
          <div class="task-progress-bar"><div class="task-progress-fill" style="width:${pct}%"></div></div>
          <div class="task-progress-text">
            <span>${tk.progress.toLocaleString()} / ${tk.target.toLocaleString()}</span>
            <span>${pct}%</span>
          </div>
        </div>
        <div class="task-card-foot">
          <div class="task-card-reward">
            ${tk.reward === 0 ? `<strong>${t('common.task.negotiate')}</strong>` : `<strong>${fmtNum(tk.reward)}</strong><small>${rewardUnit}</small>`}
          </div>
          <button class="btn btn-pink btn-sm">${tk.type === 'custom' ? t('common.task.submit') : t('common.task.accept')}</button>
        </div>
      </div>`;
  }

  /* ===== Device card ===== */
  function renderDeviceCard(raw) {
    const d = L(raw, 'device');
    const isHourly = raw.category === '云端算力';
    const visual = d.image
      ? `<div class="device-card-image"><img src="${d.image}" alt="${d.name}" loading="lazy" /></div>`
      : `<div class="device-card-icon">${d.icon}</div>`;
    const hourlyUnit = isEn() ? '/hour · 32G' : '/小时·32G';
    return `
      <div class="card device-card">
        ${d.hot ? '<span class="ds-card-badge hot">HOT</span>' : ''}
        ${d.new ? '<span class="ds-card-badge new">NEW</span>' : ''}
        ${visual}
        <div class="device-card-cat">${d.category}</div>
        <div class="device-card-name">${d.name}</div>
        <div class="device-card-desc">${d.desc}</div>
        <ul class="device-features">
          ${d.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="device-card-foot">
          <div class="device-card-price">
            <strong>¥${d.price.toLocaleString()}</strong>
            <small>${isHourly ? hourlyUnit : (d.priceSuffix || '')}</small>
          </div>
          <span class="status-tag ${raw.status}">${d.status}</span>
        </div>
      </div>`;
  }

  /* ===== Course card ===== */
  function renderCourseCard(raw) {
    const c = L(raw, 'course');
    const levelMap = { '入门':'common.level.entry','中级':'common.level.mid','高级':'common.level.high','大单':'common.level.big','企业': null, '专家': null };
    const levelText = c.level === '企业' ? (isEn()?'Enterprise':'企业')
                    : c.level === '专家' ? (isEn()?'Expert':'专家')
                    : (levelMap[c.level] ? t(levelMap[c.level]) : c.level);
    const perUnit  = isEn() ? '/ person' : '/ 人';
    const enrolled = isEn() ? `Enrolled <span>${c.enrolled}</span>` : `已报名 <span>${c.enrolled}</span> 人`;
    return `
      <div class="card course-card">
        <div class="course-icon">${c.icon}</div>
        <div class="course-body">
          <div class="course-head">
            <div class="course-title">${c.title}</div>
            <span class="level-tag ${raw.level}">${levelText}</span>
          </div>
          <div class="course-meta">
            <span>📍 ${c.format}</span>
            <span>⏱ ${c.duration}</span>
            <span>★ ${c.rating}</span>
          </div>
          <div class="course-desc">${c.desc}</div>
          <div class="course-foot">
            <div class="course-price">
              ${c.price === 0 ? c.priceLabel : '¥' + c.price.toLocaleString()}
              ${c.price > 0 ? `<small>${perUnit}</small>` : ''}
            </div>
            <div class="course-enrolled">${enrolled}</div>
          </div>
        </div>
      </div>`;
  }

  /* ===== Case card ===== */
  function renderCaseCard(c) {
    const scaleLabel = isEn() ? 'Scale: ' : '规模：';
    return `
      <div class="case-card">
        <div class="case-head">
          <div class="case-icon">${c.icon}</div>
          <div>
            <div class="case-client">${c.client}</div>
            <div class="case-industry">${c.industry}</div>
          </div>
        </div>
        <div class="case-story">${c.story}</div>
        <div class="case-foot">
          <span class="case-scale">${scaleLabel}${c.scale}</span>
          <span class="level-tag ${c.tag === '已交付' ? '入门' : c.tag === '进行中' ? '中级' : '高级'}">${c.tag}</span>
        </div>
      </div>`;
  }

  /* ===== 通用：把数据渲染到容器 ===== */
  function fill(sel, html) {
    const el = $(sel);
    if (el) el.innerHTML = html;
  }

  /* ===== Dataset detail modal ===== */
  function showDatasetModal(raw) {
    const ds = L(raw, 'dataset');
    const tags = ds.tags.map(tg => {
      const lower = String(tg).toLowerCase();
      const cls = tg.includes('独家') || tg.includes('SOTA') || lower.includes('exclusive') || lower.includes('sota') ? 'gold'
                : tg.includes('VLA') || lower.includes('vla') ? 'pink' : '';
      return `<span class="tag ${cls}">${tg}</span>`;
    }).join('');
    const armText  = ds.arm === 'dual' ? t('common.arm.dual') : t('common.arm.single');
    const ptsUnit  = isEn() ? 'credits' : '积分';
    const dlUnit   = isEn() ? 'downloads' : '次下载';
    const pubLbl   = isEn() ? 'Published' : '发布于';
    const modalHtml = `
      <div class="modal-mask show" id="modal-mask">
        <div class="modal">
          <button class="modal-close">×</button>
          <div style="display:flex;gap:18px;align-items:flex-start;margin-bottom:12px;">
            <div class="ds-card-icon" style="width:64px;height:64px;font-size:36px;">${ds.icon}</div>
            <div style="flex:1">
              <div class="modal-id">${ds.id} · ${ds.scene} · ${ds.vendor}</div>
              <h3>${ds.name}</h3>
            </div>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px">${tags}</div>
          <p style="color:var(--text-secondary);line-height:1.7;">${ds.description}</p>
          <div class="modal-grid">
            <div class="modal-cell"><div class="modal-cell-label">${t('common.modal.episodes')}</div><div class="modal-cell-val">${ds.episodes}</div></div>
            <div class="modal-cell"><div class="modal-cell-label">${t('common.modal.duration')}</div><div class="modal-cell-val">${ds.duration} h</div></div>
            <div class="modal-cell"><div class="modal-cell-label">${t('common.modal.frames')}</div><div class="modal-cell-val">${fmtNum(ds.frames)}</div></div>
            <div class="modal-cell"><div class="modal-cell-label">${t('common.modal.arm')}</div><div class="modal-cell-val">${armText}</div></div>
            <div class="modal-cell"><div class="modal-cell-label">${t('common.modal.resolution')}</div><div class="modal-cell-val" style="font-size:13px;">${ds.resolution}</div></div>
            <div class="modal-cell"><div class="modal-cell-label">${t('common.modal.device')}</div><div class="modal-cell-val" style="font-size:13px;">${ds.device}</div></div>
          </div>
          <div style="margin:16px 0;padding:14px;background:var(--ocean-card-2);border-radius:6px;border:1px solid var(--ocean-line);">
            <div style="font-size:12px;color:var(--text-dim);margin-bottom:6px;">${t('common.modal.modality')}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              ${ds.modality.map(m => `<span class="tag">${m}</span>`).join('')}
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-top:1px solid var(--ocean-line);border-bottom:1px solid var(--ocean-line);">
            <div>
              <div style="font-size:12px;color:var(--text-dim);">${t('common.modal.price')}</div>
              <div style="font-family:var(--font-mono);font-size:32px;color:var(--wave-cyan);font-weight:700;">${fmtNum(ds.price)} <small style="font-size:13px;color:var(--text-dim);">${ptsUnit}</small></div>
            </div>
            <div style="text-align:right;">
              <div style="color:#ffc850;">★ ${ds.rating}</div>
              <div style="color:var(--text-dim);font-size:12px;margin-top:4px;">${ds.downloads} ${dlUnit}</div>
              <div style="color:var(--text-dim);font-size:12px;">${pubLbl} ${ds.publishedAt}</div>
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn btn-primary btn-lg" disabled style="opacity:0.6;cursor:not-allowed;">${t('common.modal.buySoon')}</button>
            <a href="about.html#contact" class="btn btn-ghost btn-lg">${t('common.modal.contactUs')}</a>
          </div>
        </div>
      </div>`;
    const wrap = document.createElement('div');
    wrap.innerHTML = modalHtml;
    document.body.appendChild(wrap.firstElementChild);
    const mask = $('#modal-mask');
    const close = () => mask.remove();
    $('.modal-close', mask).addEventListener('click', close);
    mask.addEventListener('click', e => { if (e.target === mask) close(); });
  }

  /* ===== 数字滚动动画 ===== */
  function animateNum(el, target, dur = 1200) {
    const start = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmtNum(Math.round(start + (target - start) * eased));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ===== 筛选器 ===== */
  function attachFilter({ chips, search, items, container, render, fields }) {
    const state = { ...fields, _q: '' };
    const filter = () => {
      let arr = items.slice();
      Object.keys(fields).forEach(k => {
        const v = state[k];
        if (v && v !== '全部') arr = arr.filter(x => Array.isArray(x[k]) ? x[k].includes(v) : x[k] === v);
      });
      if (state._q) {
        const q = state._q.toLowerCase();
        arr = arr.filter(x => (x.name || x.title || '').toLowerCase().includes(q)
                            || (x.description || '').toLowerCase().includes(q)
                            || x.id.toLowerCase().includes(q));
      }
      const emptyMsg = isEn() ? 'No matching results' : '没有匹配的结果';
      $(container).innerHTML = arr.map(render).join('') || `<div style="text-align:center;color:var(--text-dim);padding:60px 0;grid-column:1/-1;">${emptyMsg}</div>`;
      const cnt = $('#result-count');
      if (cnt) cnt.innerHTML = isEn()
        ? `<strong>${arr.length}</strong> results`
        : `共 <strong>${arr.length}</strong> 条结果`;
      // 重绑卡片点击
      $$('.ds-card', $(container)).forEach(c => {
        c.addEventListener('click', () => {
          const id = c.dataset.id;
          const ds = items.find(x => x.id === id);
          if (ds) showDatasetModal(ds);
        });
      });
    };
    chips.forEach(group => {
      const els = $$(`[data-filter="${group}"] .filter-chip`);
      els.forEach(chip => {
        chip.addEventListener('click', () => {
          els.forEach(e => e.classList.remove('active'));
          chip.classList.add('active');
          state[group] = chip.dataset.value;
          filter();
        });
      });
    });
    if (search) {
      const s = $(search);
      if (s) s.addEventListener('input', e => { state._q = e.target.value.trim(); filter(); });
    }
    filter();
  }

  /* ===== 数据集卡片绑定点击 ===== */
  function bindDatasetCards() {
    $$('.ds-card').forEach(c => {
      c.addEventListener('click', () => {
        const id = c.dataset.id;
        const ds = D.datasets.find(x => x.id === id);
        if (ds) showDatasetModal(ds);
      });
    });
  }

  /* ===== Skill card ===== */
  function renderSkillCard(raw) {
    const s = L(raw, 'skill');
    const isOpen = s.price === 0;
    const cover = s.image
      ? `<div class="ds-card-cover ds-card-cover-img" style="background-image:url(${s.image});">
           <span class="ds-card-cover-scene">${s.scene}</span>
         </div>`
      : `<div class="ds-card-cover s-${sceneSlug[raw.scene] || 'general'}">
           <span class="ds-card-cover-icon">${s.icon}</span>
           <span class="ds-card-cover-scene">${s.scene}</span>
         </div>`;
    const basedOnText = isEn() ? `Based on ${s.basedOn}` : `基于 ${s.basedOn}`;
    const successText = isEn() ? 'success' : '成功率';
    const latencyText = isEn() ? 'latency' : '推理延迟';
    const dlText      = isEn() ? 'downloads' : '下载';
    const freeText    = isEn() ? 'Free' : '免费';
    return `
      <div class="card ds-card" data-id="${s.id}">
        ${isOpen ? '<span class="ds-card-badge new">OPEN</span>' : ''}
        ${cover}
        <div class="ds-card-meta-only">
          <div class="ds-card-id">${s.id} · ${s.model}</div>
          <div class="ds-card-name">${s.name}</div>
          <div class="ds-card-vendor ${isOpen ? '' : 'b'}">● ${s.license}</div>
        </div>
        <div class="ds-card-desc">${s.desc}</div>
        <div class="ds-card-tags">
          <span class="tag">${basedOnText}</span>
          <span class="tag pink">${s.requires}</span>
        </div>
        <div class="ds-card-stats">
          <span><strong>${s.successRate}%</strong>${successText}</span>
          <span><strong>${s.latency} ms</strong>${latencyText}</span>
          <span><strong>${fmtNum(s.downloads)}</strong>${dlText}</span>
        </div>
        <div class="ds-card-foot">
          <div class="ds-card-price">
            ${isOpen ? `<strong style="color:#10b981;">${freeText}</strong>` : `<strong>¥${s.price.toLocaleString()}</strong>`}
          </div>
          <div class="ds-card-rating">★ ${s.rating}</div>
        </div>
      </div>`;
  }

  /* ===== Open-source dataset card (developer page) ===== */
  function renderOssCard(raw) {
    const ds = L(raw, 'oss');
    const tags = ds.tags.slice(0, 3).map(tg => `<span class="tag">${tg}</span>`).join('');
    const viewText = isEn() ? 'View official →' : '查看官方 →';
    return `
      <div class="card oss-ds-card">
        <div class="oss-ds-image"><img src="${ds.image}" alt="${ds.name}" loading="lazy" /></div>
        <div class="oss-ds-body">
          <div class="oss-ds-org">${ds.org}</div>
          <h3 class="oss-ds-name">${ds.name}</h3>
          <div class="oss-ds-meta">
            <span class="oss-ds-scale">📊 ${ds.scale}</span>
            <span class="oss-ds-metric">▸ ${ds.metric}</span>
          </div>
          <div class="oss-ds-tags">${tags}</div>
          <p class="oss-ds-desc">${ds.desc}</p>
          <div class="oss-ds-foot">
            <span class="oss-ds-license">📜 ${ds.license}</span>
            <a href="${ds.href}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">${viewText}</a>
          </div>
        </div>
      </div>`;
  }

  /* megaContentMap — shared by mega-menu and mobile drawer */
  function getMegaContent() {
    const en = isEn();
    return {
      products: [
        { href: '#datasets',  icon: '📦', title: en ? 'Large-scale Datasets' : '灵汐·大规模数据集',
                                          desc:  en ? 'Logistics / Industrial / Home / Medical — 4 core scenes' : '物流 / 工业 / 家庭 / 医疗 4 大场景' },
        { href: '#toolchain', icon: '💎', title: en ? 'Data Management Toolchain' : '灵汐·数据管理工具链',
                                          desc:  en ? 'On-prem appliance · capture + manage + train full stack' : '私有化一体机 · 采集 + 管理 + 训练全栈' },
        { href: '#devices',   icon: '🥽', title: en ? 'Capture devices' : '数采设备',
                                          desc:  en ? 'EGO + EXO + MoCap product lines' : 'EGO + EXO + MoCap 三大产品线' },
      ],
      developer: [
        { href: '#platform',  icon: '🌐', title: en ? 'All-in-one platform' : '一站式服务平台',
                                          desc:  en ? 'Data → Compute → Model → Deploy end-to-end' : '数据 → 算力 → 模型 → 部署 全链路' },
        { href: '#skills',    icon: '🎯', title: en ? 'Skill store' : '技能商店',
                                          desc:  en ? '8 ACT / π0 / GR00T skill packs' : '8 个 ACT / π0 / GR00T 技能包' },
        { href: '#mini-arm',  icon: '🐬', title: en ? 'Entry-level arm' : '入门级机械臂',
                                          desc:  en ? 'Dolphin-Mini · desktop 6-DOF' : 'Dolphin-Mini · 桌面级 6 自由度' },
        { href: '#oss',       icon: '📂', title: en ? 'Open-source datasets' : '开源数据集',
                                          desc:  en ? '12 curated globally · OXE / AgiBot / DROID' : '12 个全球精选 · 含 OXE / AgiBot / DROID' },
        { href: '#academy',   icon: '🎓', title: en ? 'Academy' : '培训学院',
                                          desc:  en ? '5 courses · 2,200+ alumni' : '5 门课程 · 2200+ 学员' },
      ],
      about: [
        { href: '#about',   icon: '🐬', title: en ? 'About us' : '关于我们',
                                        desc:  en ? 'Buoys · lighthouses · current monitoring' : '浮标 · 灯塔 · 洋流监测网' },
        { href: '#join',    icon: '👥', title: en ? 'Join us' : '加入我们',
                                        desc:  en ? '6 positions hiring' : '6 个职位招聘中' },
        { href: '#contact', icon: '📞', title: en ? 'Contact us' : '联系我们',
                                        desc:  'plumpost@sina.com · ' + (en ? 'Shanghai Minhang' : '上海闵行') },
      ],
    };
  }
  let megaContentMap = getMegaContent();

  /* ===== TOC 自动生成 + 滚动高亮 ===== */
  (function initTOC() {
    function build() {
      // 找到所有有 section-title 的 section
      const sections = Array.from(document.querySelectorAll('section.section'))
        .filter(s => s.querySelector('.section-title') || s.querySelector('.page-head h1'));
      if (sections.length < 3) return;  // 少于 3 段不显示

      // 给没有 id 的 section 加 id
      sections.forEach((s, i) => {
        if (!s.id) s.id = 's-' + i;
      });

      // 构建 TOC DOM
      const toc = document.createElement('aside');
      toc.className = 'toc';
      const titleEl = document.createElement('div');
      titleEl.className = 'toc-title';
      titleEl.textContent = isEn() ? 'On this page' : '本页章节';
      toc.appendChild(titleEl);

      const list = document.createElement('ul');
      list.className = 'toc-list';
      sections.forEach(s => {
        const titleNode = s.querySelector('.section-title');
        if (!titleNode) return;
        const title = titleNode.textContent.trim();
        if (!title) return;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'toc-item';
        a.href = '#' + s.id;
        a.textContent = title;
        a.dataset.target = s.id;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          s.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#' + s.id);
        });
        li.appendChild(a);
        list.appendChild(li);
      });
      if (!list.childNodes.length) return;
      toc.appendChild(list);
      document.body.appendChild(toc);
      requestAnimationFrame(() => toc.classList.add('ready'));

      // IntersectionObserver 高亮当前段
      const items = Array.from(list.querySelectorAll('.toc-item'));
      const obs = new IntersectionObserver((entries) => {
        // 找出当前可见区域最上方的 section
        const visible = entries.filter(e => e.isIntersecting)
                               .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;
        const activeId = visible[0].target.id;
        items.forEach(i => i.classList.toggle('active', i.dataset.target === activeId));
      }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
      sections.forEach(s => obs.observe(s));
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
  })();

  /* ===== Back-to-top 按钮（移动端 + 窄屏） ===== */
  (function initBackToTop() {
    function build() {
      const btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', isEn() ? 'Back to top' : '回到顶部');
      btn.innerHTML = '↑';
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      document.body.appendChild(btn);
      const check = () => {
        const show = window.innerWidth < 1280 && window.scrollY > 600;
        btn.classList.toggle('visible', show);
      };
      window.addEventListener('scroll', check, { passive: true });
      window.addEventListener('resize', check);
      check();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
  })();

  /* ===== Hamburger + mobile drawer ===== */
  let _mobileDrawer = null, _hamBtn = null;
  (function initMobileNav() {
    function buildDrawerInner() {
      megaContentMap = getMegaContent();
      const labels = isEn()
        ? { home:'Home', products:'Products', dev:'Developers', about:'About', login:'Sign in', enterprise:'Enterprise' }
        : { home:'首页', products:'产品', dev:'开发者生态', about:'关于我们', login:'登录', enterprise:'企业咨询' };
      return `
        <div class="mobile-drawer-section">
          <a href="index.html" class="mobile-drawer-item">
            <div class="mobile-drawer-body"><div class="mobile-drawer-name">${labels.home}</div></div>
          </a>
        </div>
        <div class="mobile-drawer-section">
          <div class="mobile-drawer-title">${labels.products}</div>
          ${megaContentMap.products.map(it => `
            <a href="products.html${it.href}" class="mobile-drawer-item">
              <div class="mobile-drawer-body">
                <div class="mobile-drawer-name">${it.title}</div>
                <div class="mobile-drawer-desc">${it.desc}</div>
              </div>
            </a>`).join('')}
        </div>
        <div class="mobile-drawer-section">
          <div class="mobile-drawer-title">${labels.dev}</div>
          ${megaContentMap.developer.map(it => `
            <a href="developer.html${it.href}" class="mobile-drawer-item">
              <div class="mobile-drawer-body">
                <div class="mobile-drawer-name">${it.title}</div>
                <div class="mobile-drawer-desc">${it.desc}</div>
              </div>
            </a>`).join('')}
        </div>
        <div class="mobile-drawer-section">
          <div class="mobile-drawer-title">${labels.about}</div>
          ${megaContentMap.about.map(it => `
            <a href="about.html${it.href}" class="mobile-drawer-item">
              <div class="mobile-drawer-body">
                <div class="mobile-drawer-name">${it.title}</div>
                <div class="mobile-drawer-desc">${it.desc}</div>
              </div>
            </a>`).join('')}
        </div>
        <div class="mobile-drawer-cta">
          <a href="#" class="btn btn-ghost">${labels.login}</a>
          <a href="about.html#contact" class="btn btn-primary">${labels.enterprise}</a>
        </div>`;
    }

    function build() {
      const nav = document.querySelector('.nav-inner');
      if (!nav || nav.querySelector('.hamburger-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'hamburger-btn';
      btn.setAttribute('aria-label', isEn() ? 'Menu' : '菜单');
      btn.innerHTML = '<span></span><span></span><span></span>';
      nav.appendChild(btn);
      _hamBtn = btn;

      const drawer = document.createElement('div');
      drawer.className = 'mobile-drawer';
      drawer.innerHTML = buildDrawerInner();
      document.body.appendChild(drawer);
      _mobileDrawer = drawer;

      // 3) 切换
      const close = () => {
        drawer.classList.remove('open');
        btn.classList.remove('active');
        document.body.classList.remove('drawer-open');
      };
      btn.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        btn.classList.toggle('active', isOpen);
        document.body.classList.toggle('drawer-open', isOpen);
      });
      function bindLinks() {
        drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
      }
      bindLinks();
      window.addEventListener('resize', () => { if (window.innerWidth > 1100) close(); });

      // Re-render on language change
      window.addEventListener('languagechange', () => {
        drawer.innerHTML = buildDrawerInner();
        bindLinks();
        if (_hamBtn) _hamBtn.setAttribute('aria-label', isEn() ? 'Menu' : '菜单');
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
  })();

  /* ===== Mega menu injection ===== */
  (function initMegaMenu() {
    function getGroups() {
      megaContentMap = getMegaContent();
      const en = isEn();
      return [
        { href: 'products.html',  title: en ? 'Products'   : '产品',       items: megaContentMap.products },
        { href: 'developer.html', title: en ? 'Developers' : '开发者生态', items: megaContentMap.developer },
        { href: 'about.html',     title: en ? 'About'      : '关于我们',   items: megaContentMap.about },
      ];
    }
    const groupHrefs = new Set(['products.html','developer.html','about.html']);
    let _panel = null;

    function renderPanel() {
      if (!_panel) return;
      const groups = getGroups();
      _panel.innerHTML = groups.map(g => `
        <div class="mega-col">
          <div class="mega-col-title">${g.title}</div>
          ${g.items.map(it => `
            <a href="${g.href}${it.href}" class="mega-item">
              <div class="mega-content">
                <div class="mega-title">${it.title}</div>
                <div class="mega-desc">${it.desc}</div>
              </div>
            </a>`).join('')}
        </div>`).join('');
    }

    function build() {
      const navLinks = document.querySelector('.nav-links');
      if (!navLinks) return;

      const triggers = Array.from(navLinks.querySelectorAll(':scope > a'))
        .filter(a => groupHrefs.has(a.getAttribute('href')));
      if (!triggers.length) return;

      triggers.forEach(a => {
        a.classList.add('has-mega');
        a.insertAdjacentHTML('beforeend', ' <span class="nav-arrow">▾</span>');
      });

      _panel = document.createElement('div');
      _panel.className = 'mega-panel';
      renderPanel();
      navLinks.classList.add('nav-links-with-mega');
      navLinks.appendChild(_panel);

      let hideTimer = null;
      const open  = () => { clearTimeout(hideTimer); navLinks.classList.add('mega-open'); };
      const close = () => { hideTimer = setTimeout(() => navLinks.classList.remove('mega-open'), 140); };
      triggers.forEach(a => {
        a.addEventListener('mouseenter', open);
        a.addEventListener('mouseleave', close);
        a.addEventListener('focus', open);
      });
      _panel.addEventListener('mouseenter', open);
      _panel.addEventListener('mouseleave', close);

      window.addEventListener('languagechange', renderPanel);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', build);
    } else {
      build();
    }
  })();

  /* ===== 导出到全局 ===== */
  window.DOLPHIN = {
    D, fmtNum, fill,
    renderDatasetCard, renderTaskCard, renderDeviceCard, renderCourseCard, renderCaseCard, renderSkillCard, renderOssCard,
    showDatasetModal, bindDatasetCards, attachFilter, animateNum,
  };
})();
