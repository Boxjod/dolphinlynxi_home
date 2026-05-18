/* ============================================================
 * Dolphin Lynxi · i18n (EN default, 中文 toggle)
 * ============================================================ */
(function () {
  'use strict';

  const DICT = {
    /* =========================  COMMON  ========================= */
    'common.btn.login':        { zh: '登录',         en: 'Sign in' },
    'common.btn.contact':      { zh: '企业咨询',     en: 'Enterprise' },
    'common.btn.contactShort': { zh: '联系我们',     en: 'Contact us' },
    'common.btn.viewMore':     { zh: '了解更多',     en: 'Learn more' },
    'common.btn.viewAll':      { zh: '查看全部',     en: 'View all' },
    'common.btn.apply':        { zh: '📨 投递简历',  en: '📨 Apply now' },
    'common.btn.priceInquiry': { zh: '联系销售',     en: 'Contact sales' },
    'common.badge.coming':     { zh: '即将上市',     en: 'COMING SOON' },

    'common.vendor.self':      { zh: '海豚自营',     en: 'Dolphin in-house' },
    'common.vendor.bigB':      { zh: '精选合集',     en: 'Curated collection' },
    'common.vendor.crowd':     { zh: '众包采集',     en: 'Crowdsourced' },

    'common.scene.food':       { zh: '餐饮',         en: 'F&B' },
    'common.scene.home':       { zh: '家庭服务',     en: 'Home service' },
    'common.scene.industry':   { zh: '工业制造',     en: 'Industrial' },
    'common.scene.logistics':  { zh: '物流仓储',     en: 'Logistics' },
    'common.scene.retail':     { zh: '零售连锁',     en: 'Retail chain' },
    'common.scene.medical':    { zh: '医疗医药',     en: 'Medical' },
    'common.scene.service':    { zh: '服务连锁',     en: 'Service chain' },
    'common.scene.edu':        { zh: '教育',         en: 'Education' },
    'common.scene.eduToy':     { zh: '教育玩具',     en: 'Edu toys' },
    'common.scene.arts':       { zh: '艺术文创',     en: 'Arts & creative' },
    'common.scene.clean':      { zh: '清洁服务',     en: 'Cleaning' },
    'common.scene.precision':  { zh: '精细服务',     en: 'Precision' },
    'common.scene.fun':        { zh: '娱乐零售',     en: 'Entertainment' },
    'common.scene.general':    { zh: '通用',         en: 'General' },

    'common.arm.single':       { zh: '单臂',         en: 'Single-arm' },
    'common.arm.dual':         { zh: '双臂',         en: 'Dual-arm' },
    'common.arm.all':          { zh: '全部',         en: 'All' },

    'common.unit.episodes':    { zh: 'episodes',     en: 'episodes' },
    'common.unit.duration':    { zh: '时长',         en: 'duration' },
    'common.unit.frames':      { zh: '帧',           en: 'frames' },
    'common.unit.credits':     { zh: '积分',         en: 'credits' },
    'common.unit.downloads':   { zh: '次下载',       en: 'downloads' },
    'common.unit.points':      { zh: '人',           en: 'people' },
    'common.unit.perPerson':   { zh: '/ 人',         en: '/ person' },
    'common.unit.perHour':     { zh: '/小时·32G',   en: '/hour · 32G' },
    'common.unit.successRate': { zh: '成功率',       en: 'success' },
    'common.unit.latency':     { zh: '推理延迟',     en: 'inference latency' },
    'common.unit.free':        { zh: '免费',         en: 'Free' },
    'common.unit.published':   { zh: '发布于',       en: 'Published' },

    'common.tag.exclusive':    { zh: '精选收录',     en: 'Featured' },
    'common.tag.sota':         { zh: 'SOTA数据',     en: 'SOTA dataset' },
    'common.tag.vla':          { zh: 'VLA适用',      en: 'VLA-ready' },

    'common.modal.episodes':   { zh: '采集集数',     en: 'Episodes' },
    'common.modal.duration':   { zh: '总时长',       en: 'Total duration' },
    'common.modal.frames':     { zh: '总帧数',       en: 'Total frames' },
    'common.modal.arm':        { zh: '机械臂',       en: 'Arm config' },
    'common.modal.resolution': { zh: '分辨率',       en: 'Resolution' },
    'common.modal.device':     { zh: '采集设备',     en: 'Capture device' },
    'common.modal.modality':   { zh: '数据模态',     en: 'Modalities' },
    'common.modal.price':      { zh: '售价',         en: 'Price' },
    'common.modal.buySoon':    { zh: '⏳ 数据集购买功能即将开放', en: '⏳ Purchase coming soon' },
    'common.modal.contactUs':  { zh: '联系我们咨询', en: 'Contact us for inquiry' },

    'common.task.collect':     { zh: '征集',         en: 'Collect' },
    'common.task.verify':      { zh: '验证',         en: 'Verify' },
    'common.task.label':       { zh: '标注',         en: 'Label' },
    'common.task.custom':      { zh: '定制',         en: 'Custom' },
    'common.task.client':      { zh: '委托方：',     en: 'Client: ' },
    'common.task.scene':       { zh: '场景：',       en: 'Scene: ' },
    'common.task.device':      { zh: '设备：',       en: 'Device: ' },
    'common.task.deadline':    { zh: '截止：',       en: 'Deadline: ' },
    'common.task.level':       { zh: '难度：',       en: 'Difficulty: ' },
    'common.task.negotiate':   { zh: '面议',         en: 'Negotiable' },
    'common.task.accept':      { zh: '立即接单',     en: 'Accept task' },
    'common.task.submit':      { zh: '提交方案',     en: 'Submit proposal' },

    'common.level.entry':      { zh: '入门',         en: 'Entry' },
    'common.level.mid':        { zh: '中级',         en: 'Intermediate' },
    'common.level.high':       { zh: '高级',         en: 'Advanced' },
    'common.level.big':        { zh: '大单',         en: 'Major' },
    'common.eco.integrated':   { zh: '已集成',       en: 'Integrated' },
    'common.eco.connected':    { zh: '已对接',       en: 'Connected' },
    'common.eco.reference':    { zh: '对标参考',     en: 'Reference' },

    'common.lang.toggleToZh':  { zh: '中文',         en: '中文' },
    'common.lang.toggleToEn':  { zh: 'EN',           en: 'EN' },

    /* =========================  NAV  ========================= */
    'nav.brand':       { zh: '海豚灵汐', en: 'Dolphin Lynxi' },
    'nav.brandSub':    { zh: 'DOLPHIN LYNXI', en: 'DOLPHIN LYNXI' },
    'nav.home':        { zh: '首页',     en: 'Home' },
    'nav.products':    { zh: '产品',     en: 'Products' },
    'nav.developer':   { zh: '开发者生态', en: 'Developers' },
    'nav.about':       { zh: '关于我们', en: 'About' },

    /* =========================  FOOTER  ========================= */
    'footer.company':       { zh: '上海海豚灵汐技术有限公司', en: 'Shanghai Dolphin Lynxi Technology Co., Ltd.' },
    'footer.tagline':       { zh: '具身智能数据资产的运营商', en: 'Embodied-AI data-asset operator' },
    'footer.address':       { zh: '📍 上海市闵行区平阳路 258 号 1 层', en: '📍 1F, No. 258 Pingyang Rd., Minhang, Shanghai' },
    'footer.email':         { zh: '📮 plumpost@sina.com', en: '📮 plumpost@sina.com' },
    'footer.col.products':  { zh: '产品',       en: 'Products' },
    'footer.col.dev':       { zh: '开发者生态', en: 'Developers' },
    'footer.col.about':     { zh: '关于我们',   en: 'About' },
    'footer.link.market':   { zh: '灵汐·数据集市场',    en: 'Lynxi Dataset Market' },
    'footer.link.demo':     { zh: '工具链在线 Demo',     en: 'Toolchain Live Demo' },
    'footer.link.devices':  { zh: '灵汐·数采设备',      en: 'Lynxi Capture Devices' },
    'footer.link.overview': { zh: '产品总览',            en: 'Product overview' },
    'footer.link.platform': { zh: '一站式服务平台',      en: 'All-in-one platform' },
    'footer.link.skills':   { zh: '技能商店',            en: 'Skill store' },
    'footer.link.miniarm':  { zh: '入门级机械臂',        en: 'Entry-level arm' },
    'footer.link.oss':      { zh: '开源数据集',          en: 'Open-source datasets' },
    'footer.link.academy':  { zh: '培训学院',            en: 'Academy' },
    'footer.link.tasks':    { zh: '任务大厅',            en: 'Task hall' },
    'footer.link.aboutUs':  { zh: '关于我们',            en: 'About us' },
    'footer.link.join':     { zh: '人才发展',            en: 'Careers' },
    'footer.link.contact':  { zh: '联系我们',            en: 'Contact us' },
    'footer.link.mail':     { zh: '📮 邮箱直达',         en: '📮 Email us' },
    'footer.bot.copyright': { zh: '© 2026 上海海豚灵汐技术有限公司  ·  上海·闵行  ·  沪 ICP 备案中',
                              en: '© 2026 Shanghai Dolphin Lynxi Technology Co., Ltd.  ·  Shanghai · Minhang  ·  ICP filing pending' },
    'footer.bot.short':     { zh: '© 2026 上海海豚灵汐技术有限公司',
                              en: '© 2026 Shanghai Dolphin Lynxi Technology Co., Ltd.' },
    'footer.bot.copyAbout': { zh: '© 2026 上海海豚灵汐技术有限公司  ·  沪 ICP 备 2026XXXXXX 号',
                              en: '© 2026 Shanghai Dolphin Lynxi Technology Co., Ltd.  ·  ICP No. 2026XXXXXX' },
    'footer.slogan':        { zh: '数据如潮，灵汐而至', en: 'Data flows like tide, intelligence emerges' },

    /* =========================  INDEX (Home)  ========================= */
    'home.title':         { zh: '海豚灵汐 · 数据如潮，灵汐而至 | 具身智能数据资产的运营商',
                            en: 'Dolphin Lynxi · Data flows like tide | Embodied-AI data-asset operator' },
    'home.hero.title':    { zh: '数据如潮，灵汐而至',
                            en: 'Data flows like tide, intelligence emerges' },
    'home.hero.sub':      { zh: '具身智能数据资产的运营商',
                            en: 'Embodied-AI data-asset operator' },
    'home.hero.cta1':     { zh: '查看产品矩阵 →',  en: 'Explore products →' },
    'home.hero.cta2':     { zh: '加入开发者生态', en: 'Join developer ecosystem' },

    'home.svc.eyebrow':   { zh: '① SERVICES', en: '① SERVICES' },
    'home.svc.title':     { zh: '我们提供的服务', en: 'What we offer' },
    'home.svc.desc':      { zh: '从数据 · 工具链 · 一站式平台到开发者生态 — 一家提供具身智能产业基础设施的服务商。',
                            en: 'From datasets · toolchain · all-in-one platform to developer ecosystem — one provider of embodied-AI infrastructure.' },
    'home.svc.more':      { zh: '了解更多 →', en: 'Learn more →' },

    'home.svc.s1.eyebrow': { zh: '服务 01', en: 'SERVICE 01' },
    'home.svc.s2.eyebrow': { zh: '服务 02', en: 'SERVICE 02' },
    'home.svc.s3.eyebrow': { zh: '服务 03', en: 'SERVICE 03' },
    'home.svc.s4.eyebrow': { zh: '服务 04', en: 'SERVICE 04' },

    'home.ds.s1.label':       { zh: '📦 物流',     en: '📦 Logistics' },
    'home.ds.s2.label':       { zh: '🏭 工业制造', en: '🏭 Industrial' },
    'home.ds.s3.label':       { zh: '🏠 家庭服务', en: '🏠 Home service' },
    'home.ds.s4.label':       { zh: '🏥 医疗',     en: '🏥 Medical' },
    'home.ds.status.coming':  { zh: '即将开放',     en: 'Coming soon' },

    'home.svc.s1.label':  { zh: '大规模数据集', en: 'Large-scale Datasets' },
    'home.svc.s1.desc':   { zh: '物流 · 工业 · 家庭 · 医疗 四大核心场景持续上新，含遥操 / EGO / 仿真多模态数据。',
                            en: 'Logistics · Industrial · Home · Medical — four core scenes expanding, with teleop / EGO / sim multimodal data.' },
    'home.svc.s1.tag':    { zh: 'Datasets', en: 'Datasets' },

    'home.svc.s2.label':  { zh: '具身智能数据工具链', en: 'Embodied-AI Data Toolchain' },
    'home.svc.s2.desc':   { zh: '从采集到可交付模型的三步走管线 · 一体机交付 · LeRobot 原生 · 私有化部署可选。',
                            en: 'Three-step pipeline from capture to deliverable model · appliance delivery · LeRobot-native · on-prem option.' },
    'home.svc.s2.tag':    { zh: 'Toolchain', en: 'Toolchain' },

    'home.svc.s3.label':  { zh: '一键式采集预训练平台', en: 'One-click Capture & Pre-training' },
    'home.svc.s3.desc':   { zh: '数采设备 + 弹性算力 + 模型预训练 端到端打通，开箱即用，无需自建数据/算力栈。',
                            en: 'Capture hardware + elastic compute + pre-training, end-to-end — out-of-the-box, no need to build your own stack.' },
    'home.svc.s3.tag':    { zh: 'Platform', en: 'Platform' },

    'home.svc.s4.label':  { zh: '开发者中心', en: 'Developer Center' },
    'home.svc.s4.desc':   { zh: 'API 文档 · 技能商店 · 入门机械臂 · 开源数据集 · 培训学院 — 开发者生态一站式入口。',
                            en: 'API docs · skill store · entry-level arms · open-source datasets · academy — one entry to the developer ecosystem.' },
    'home.svc.s4.tag':    { zh: 'Developers', en: 'Developers' },

    'home.why.eyebrow':   { zh: '② WHY US', en: '② WHY US' },
    'home.why.title':     { zh: '为什么选我们', en: 'Why choose us' },
    'home.why.desc':      { zh: '质量 · 规模 · 背书，三大核心壁垒。',
                            en: 'Three moats: quality, scale, endorsement.' },
    'home.why.c1.title':  { zh: '帧级品控 · 工业级规范', en: 'Frame-level QA · Industrial standards' },
    'home.why.c1.desc':   { zh: '三重质检 —— 自动对齐 + 视觉异常筛检 + 持证质检员复核。出厂即对齐 LeRobot v3 / RLDS 标准。',
                            en: 'Three-stage QA — auto alignment + vision anomaly screening + certified review. Ships aligned to LeRobot v3 / RLDS.' },
    'home.why.c2.title':  { zh: '多城采集网络', en: 'Multi-city capture network' },
    'home.why.c2.desc':   { zh: '城市级采集基地 + 专业操作员，工业级稳定交付。覆盖单/双臂、多视角、力觉、触觉全模态。',
                            en: 'City-level sites with pro operators, industrial-grade delivery. Single/dual-arm, multi-view, force & tactile.' },
    'home.why.c3.title':  { zh: '生态共建 · 主流标准', en: 'Co-built · Mainstream standards' },
    'home.why.c3.desc':   { zh: '与 3C / EMS、医疗、零售、物流头部伙伴联合采集。对齐 LeRobot v3 / RLDS 与主流 VLA 训练格式。',
                            en: 'Joint capture with 3C / EMS, medical, retail, logistics leaders. LeRobot v3 / RLDS & VLA-ready.' },

    'home.cta.title':     { zh: '数据如潮，灵汐而至', en: 'Data flows like tide, intelligence emerges' },
    'home.cta.desc':      { zh: '让数据流入，让智能涌现。',
                            en: 'Data flows in, intelligence emerges.' },
    'home.cta.b1':        { zh: '查看完整产品矩阵', en: 'View full product lineup' },
    'home.cta.b2':        { zh: '加入开发者生态',   en: 'Join developer ecosystem' },
    'home.cta.b3':        { zh: '联系我们',         en: 'Contact us' },

    /* =========================  PRODUCTS  ========================= */
    'products.title':     { zh: '产品矩阵 · 海豚灵汐', en: 'Products · Dolphin Lynxi' },
    'products.head.h1':   { zh: '产品矩阵', en: 'Product lineup' },
    'products.head.desc': { zh: '数据 · 工具 · 硬件 —— 三位一体。',
                            en: 'Data · Tools · Hardware — three-in-one.' },
    'products.head.b1':   { zh: '① 灵汐·大规模数据集', en: '① Large-scale Datasets' },
    'products.head.b2':   { zh: '② 灵汐数据管理工具链', en: '② Data Management Toolchain' },
    'products.head.b3':   { zh: '③ 采集设备', en: '③ Capture Devices' },
    'products.head.b4':   { zh: '④ 兼容生态', en: '④ Compatible Ecosystem' },

    'products.p1.eyebrow': { zh: 'PRODUCT 01 · DATASETS', en: 'PRODUCT 01 · DATASETS' },
    'products.p1.s1.eyebrow': { zh: '场景 01', en: 'SCENE 01' },
    'products.p1.s2.eyebrow': { zh: '场景 02', en: 'SCENE 02' },
    'products.p1.s3.eyebrow': { zh: '场景 03', en: 'SCENE 03' },
    'products.p1.s4.eyebrow': { zh: '场景 04', en: 'SCENE 04' },
    'products.p1.title':   { zh: '灵汐·大规模数据集', en: 'Lynxi · Large-scale Datasets' },
    'products.p1.desc':    { zh: '四大核心行业，公开数据集持续上新。',
                             en: 'Four core industries, catalog continuously expanding.' },
    'products.p1.s1.desc': { zh: '分拣 · 装箱 · 折叠 · 压力测试。',
                             en: 'Sorting · packing · folding · stress tests.' },
    'products.p1.s1.btn':  { zh: '浏览物流数据集 →', en: 'Browse logistics datasets →' },
    'products.p1.s2.desc': { zh: 'PCB 贴片 · 拧螺丝 · EVA 装箱。',
                             en: 'PCB SMT · screwdriving · EVA packing.' },
    'products.p1.s2.btn':  { zh: '浏览工业数据集 →', en: 'Browse industrial datasets →' },
    'products.p1.s3.desc': { zh: '叠衣服 · 整理桌面 · 拉床单 · 开瓶盖。',
                             en: 'Fold clothes · tidy desk · pull sheets · open bottles.' },
    'products.p1.s3.btn':  { zh: '浏览家庭数据集 →', en: 'Browse home datasets →' },
    'products.p1.s4.desc': { zh: '中药分拣 · 手术器械递送。',
                             en: 'Herb sorting · surgical tool handoff.' },
    'products.p1.s4.btn':  { zh: '浏览医疗数据集 →', en: 'Browse medical datasets →' },
    'products.p1.feat.title': { zh: '精选数据集', en: 'Featured datasets' },
    'products.p1.feat.desc':  { zh: '自营 / 定制 / 众包，三种数据来源。',
                                en: 'In-house / Enterprise / Crowdsourced — three sources.' },
    'products.p1.feat.btn':   { zh: '浏览全部数据集 →', en: 'Browse all datasets →' },

    'products.p2.eyebrow': { zh: 'PRODUCT 02 · LYNXI', en: 'PRODUCT 02 · LYNXI' },
    'products.p2.title':   { zh: '灵汐·数据管理工具链', en: 'Lynxi · Data Management Toolchain' },
    'products.p2.desc':    { zh: '私有化部署 · 采集 + 管理 + 训练全链路一体机。',
                             en: 'On-prem · capture + manage + train, all-in-one appliance.' },
    'products.p2.h1.t':    { zh: '私有化部署', en: 'On-prem deployment' },
    'products.p2.h1.d':    { zh: '数据不出内网 · 满足合规要求',
                             en: 'Data stays in-network · compliance-ready' },
    'products.p2.h2.t':    { zh: '一体机交付', en: 'Appliance delivery' },
    'products.p2.h2.d':    { zh: '预装软件 · 上电即用',
                             en: 'Pre-installed · power-on ready' },
    'products.p2.h3.t':    { zh: '采集→管理→训练一站式', en: 'Capture → Manage → Train in one' },
    'products.p2.h3.d':    { zh: '数据进，模型出。',
                             en: 'Data in, models out.' },
    'products.p2.deploy.title': { zh: '📦 灵汐部署形态 · 一体机与云算力', en: '📦 Lynxi deployment options · Appliance & Cloud' },
    'products.p2.appl.title': { zh: '💎 灵汐一体机 · 私有化部署形态', en: '💎 Lynxi Appliance · On-prem form-factor' },
    'products.p2.banner.eyebrow': { zh: 'PRIVATE DEPLOYMENT · 私有化交付', en: 'PRIVATE DEPLOYMENT · On-prem delivery' },
    'products.p2.banner.title':   { zh: '数据不出场 · 算力一体交付', en: 'Data on-site · compute bundled' },
    'products.p2.banner.desc':    { zh: '高合规 / 强隐私场景专用。预装灵汐工具链 + LeRobot 全栈，端到端在内网完成。',
                                    en: 'For high-compliance scenarios. Pre-installed Lynxi toolchain + LeRobot, end-to-end on your intranet.' },
    'products.p2.banner.tag1':    { zh: '数据 0 外流', en: '0% data egress' },
    'products.p2.banner.tag2':    { zh: '机架 / 塔式两种形态', en: 'Rack & tower form-factors' },
    'products.p2.banner.tag3':    { zh: '驻场 + 远程双重支持', en: 'On-site + remote support' },
    'products.p2.banner.tag4':    { zh: '面向政企 / 科研 / 军工', en: 'For gov / research / defence' },

    'products.p2.pro.cat':     { zh: 'FLAGSHIP · 大型企业', en: 'FLAGSHIP · Large enterprise' },
    'products.p2.pro.name':    { zh: '灵汐 One Pro', en: 'Lynxi One Pro' },
    'products.p2.pro.sub':     { zh: '2U 机架式 · 数据中心级', en: '2U rack-mount · datacenter grade' },
    'products.p2.pro.f1':      { zh: '4 × NVIDIA H100 / H200 GPU', en: '4 × NVIDIA H100 / H200 GPU' },
    'products.p2.pro.f2':      { zh: '1 TB DDR5 + 32 TB NVMe SSD', en: '1 TB DDR5 + 32 TB NVMe SSD' },
    'products.p2.pro.f3':      { zh: '预装灵汐数据管理工具链 + LeRobot 全栈', en: 'Pre-installed Lynxi toolchain + full LeRobot stack' },
    'products.p2.pro.f4':      { zh: '面向大规模采集集群的并发架构', en: 'Designed for large-fleet capture concurrency' },
    'products.p2.pro.f5':      { zh: '3 年驻场服务 + 升级订阅', en: '3-year on-site service + upgrade subscription' },
    'products.p2.lite.cat':    { zh: 'LITE · 中型团队', en: 'LITE · Mid-size team' },
    'products.p2.lite.name':   { zh: '灵汐 One Lite', en: 'Lynxi One Lite' },
    'products.p2.lite.sub':    { zh: '塔式工作站 · 办公室即可部署', en: 'Tower workstation · office-deployable' },
    'products.p2.lite.f1':     { zh: '2 × NVIDIA A100 GPU', en: '2 × NVIDIA A100 GPU' },
    'products.p2.lite.f2':     { zh: '256 GB DDR5 + 8 TB NVMe SSD', en: '256 GB DDR5 + 8 TB NVMe SSD' },
    'products.p2.lite.f3':     { zh: '预装灵汐数据管理工具链 · 单人即可上手', en: 'Pre-installed Lynxi toolchain · single-user ready' },
    'products.p2.lite.f4':     { zh: '面向团队级采集场景的并发架构', en: 'Designed for team-scale capture concurrency' },
    'products.p2.lite.f5':     { zh: '1 年远程支持 + 升级订阅', en: '1-year remote support + upgrade subscription' },
    'products.p2.refPrice':    { zh: '参考价', en: 'Reference price' },
    'products.p2.inquiry':     { zh: '询价', en: 'Inquire' },
    'products.p2.status':      { zh: '上市状态', en: 'Status' },
    'products.p2.coming':      { zh: '即将上市 · 接受预订', en: 'Coming soon · Reserve now' },

    'products.p2.cloud.title':   { zh: '☁️ 灵汐云 · 弹性算力订阅', en: '☁️ Lynxi Cloud · Elastic compute subscription' },
    'products.p2.cloud.eyebrow': { zh: 'CLOUD SUBSCRIPTION', en: 'CLOUD SUBSCRIPTION' },
    'products.p2.cloud.priceUnit': { zh: ' / 小时 · 32G', en: ' / hour · 32G' },
    'products.p2.cloud.priceMain': { zh: '即将开放', en: 'Coming soon' },
    'products.p2.cloud.lead':    { zh: '不想买一体机？敬请期待云算力订阅 →', en: 'Don\'t want an appliance? Stay tuned for our cloud compute →' },
    'products.p2.cloud.name':    { zh: '灵汐云·GPU 共享训练算力', en: 'Lynxi Cloud · Shared GPU training compute' },
    'products.p2.cloud.desc':    { zh: '按需 GPU + LeRobot 全栈预装。适合中小客户、个人开发者与教育用户。',
                                   en: 'On-demand GPU + pre-installed LeRobot. For SMBs, developers and educators.' },
    'products.p2.cloud.tag1':    { zh: '4090 / A100 / H100 弹性调度', en: '4090 / A100 / H100 elastic scheduling' },
    'products.p2.cloud.tag2':    { zh: 'LeRobot 全栈预装', en: 'Full LeRobot stack pre-installed' },
    'products.p2.cloud.tag3':    { zh: '一键 ACT / π0 / GR00T', en: 'One-click ACT / π0 / GR00T' },
    'products.p2.cloud.tag4':    { zh: '基于火山方舟 Ark', en: 'Powered by Volcano Ark' },
    'products.p2.cloud.b1':      { zh: '加入早期体验列表 →', en: 'Join the early-access list →' },
    'products.p2.cloud.b2':      { zh: '📖 查看 API 文档', en: '📖 View API docs' },
    'products.p2.cloud.b3':      { zh: '询问企业方案', en: 'Enterprise inquiry' },

    'products.p2.arch.title': { zh: '⚙️ 灵汐数据管理工具链 · 数据如潮，三步直达模型', en: '⚙️ Lynxi Toolchain · From capture to model in three steps' },
    'products.p2.arch.desc':  { zh: '一套工具链 · LeRobot 原生 · 生产级落地。',
                                en: 'One toolchain · LeRobot-native · production-grade.' },

    /* —— 三步走流程图 (3-step flow diagram) —— */
    'products.p2.flow.s1.eyebrow': { zh: 'STEP 01', en: 'STEP 01' },
    'products.p2.flow.s1.title':   { zh: '采集接入', en: 'Capture & Ingest' },
    'products.p2.flow.s1.desc':    { zh: '即插即用 · 毫秒级对齐 · 一键导出 LeRobot 格式。',
                                     en: 'Plug-and-play · ms alignment · one-click LeRobot export.' },
    'products.p2.flow.s1.t1': { zh: '👓 智能数采眼镜', en: '👓 Smart glasses' },
    'products.p2.flow.s1.t2': { zh: '🧤 触觉手套',       en: '🧤 Tactile gloves' },
    'products.p2.flow.s1.t3': { zh: '⌚ AprilTag 手环',  en: '⌚ AprilTag wristband' },
    'products.p2.flow.s1.t4': { zh: '🦾 无感动捕服',     en: '🦾 Mocap suit' },
    'products.p2.flow.s1.t5': { zh: '⏱️ 时空同步对齐',    en: '⏱️ Spatio-temporal sync' },
    'products.p2.flow.s1.t6': { zh: '🔄 LeRobot 统一格式', en: '🔄 LeRobot unified format' },

    'products.p2.flow.s2.eyebrow': { zh: 'STEP 02', en: 'STEP 02' },
    'products.p2.flow.s2.title':   { zh: '加工提质', en: 'Refine & Augment' },
    'products.p2.flow.s2.desc':    { zh: '自动标注 · 多维质检 · Real2Sim2Real 10× 放大。',
                                     en: 'Auto-label · multi-dim QA · Real2Sim2Real 10× amplification.' },
    'products.p2.flow.s2.t1': { zh: '🎯 智能标注',           en: '🎯 Auto annotation' },
    'products.p2.flow.s2.t2': { zh: '⌨️ 指令标注',           en: '⌨️ Command annotation' },
    'products.p2.flow.s2.t3': { zh: '🔀 长程任务分解',        en: '🔀 Long-horizon decomposition' },
    'products.p2.flow.s2.t4': { zh: '🏆 奖励信号自动标注',    en: '🏆 Auto reward-signal labeling' },
    'products.p2.flow.s2.t5': { zh: '🌈 多维质检',            en: '🌈 Multi-dim QA' },
    'products.p2.flow.s2.t6': { zh: '📈 轨迹平滑滤波',         en: '📈 Trajectory smoothing' },
    'products.p2.flow.s2.t7': { zh: '💎 AI 数据增强',          en: '💎 AI data augmentation' },
    'products.p2.flow.s2.t8': { zh: '🔁 Real2Sim2Real 闭环',   en: '🔁 Real2Sim2Real loop' },

    'products.p2.flow.s3.eyebrow': { zh: 'STEP 03', en: 'STEP 03' },
    'products.p2.flow.s3.title':   { zh: '训练交付', en: 'Train & Deliver' },
    'products.p2.flow.s3.desc':    { zh: 'PB 级数据池 + 分布式集群 · 三重评测 · 交付可部署模型。',
                                     en: 'PB-scale pool + distributed cluster · triple eval · deliver deployable models.' },
    'products.p2.flow.s3.t1': { zh: '🗄️ PB 级数据池',         en: '🗄️ PB-scale data pool' },
    'products.p2.flow.s3.t2': { zh: '🖥️ 分布式训练',           en: '🖥️ Distributed training' },
    'products.p2.flow.s3.t3': { zh: '📊 仿真 + 真机评测',       en: '📊 Sim + real-machine eval' },
    'products.p2.flow.s3.t4': { zh: '🤖 真机评测',            en: '🤖 Real-machine eval' },
    'products.p2.flow.s3.t5': { zh: '🔄 Sim2Real 评测',       en: '🔄 Sim2Real eval' },
    'products.p2.flow.s3.t6': { zh: '☁️ 云边端协同部署',       en: '☁️ Cloud-edge-device deploy' },

    'products.p2.flow.stat1': { zh: '三步走 · 同一工具链',     en: 'Steps · one toolchain' },
    'products.p2.flow.stat2': { zh: '多模态数据池',           en: 'Multimodal data pool' },
    'products.p2.flow.stat3': { zh: '评测闭环',               en: 'Evaluation closures' },
    'products.p2.flow.stat4': { zh: 'LeRobot 原生兼容',       en: 'LeRobot-native' },
    'products.p2.arch.legend1': { zh: '自研投入', en: 'In-house R&D' },
    'products.p2.arch.legend2': { zh: '已有原型', en: 'Existing prototype' },
    'products.p2.arch.legend3': { zh: '合作构建', en: 'Co-built with partners' },
    'products.p2.arch.row1':    { zh: '核心算法层', en: 'Core algorithm layer' },
    'products.p2.arch.row2':    { zh: '数据标注层', en: 'Data annotation layer' },
    'products.p2.arch.row3':    { zh: '数据处理层', en: 'Data processing layer' },
    'products.p2.arch.row4':    { zh: '质量检测层', en: 'Quality inspection layer' },
    'products.p2.arch.row5':    { zh: '仿真合成层', en: 'Sim / synthesis layer' },
    'products.p2.arch.row6':    { zh: '数采硬件层', en: 'Capture hardware layer' },
    'products.p2.arch.row7':    { zh: '基础设施层', en: 'Infrastructure layer' },
    'products.p2.arch.bench':   { zh: '评测 benchmark', en: 'Benchmark' },
    'products.p2.arch.bench1':  { zh: '仿真评测', en: 'Sim eval' },
    'products.p2.arch.bench2':  { zh: '真机评测', en: 'Real-machine eval' },
    'products.p2.arch.bench3':  { zh: 'Sim2Real 评测', en: 'Sim2Real eval' },
    'products.p2.arch.c1':      { zh: '✨ 3DGS', en: '✨ 3DGS' },
    'products.p2.arch.c2':      { zh: '🎬 可控视频编辑', en: '🎬 Controllable video editing' },
    'products.p2.arch.c3':      { zh: '🏛️ 3D 场景生成', en: '🏛️ 3D scene generation' },
    'products.p2.arch.c4':      { zh: '🌐 跨本体特征提取', en: '🌐 Cross-embodiment feature extraction' },
    'products.p2.arch.c5':      { zh: '✋ 手体感知', en: '✋ Hand-body perception' },
    'products.p2.arch.c6':      { zh: '🎯 分割检测', en: '🎯 Segmentation & detection' },
    'products.p2.arch.c7':      { zh: '⌨️ 指令标注 「command」', en: '⌨️ Command annotation' },
    'products.p2.arch.c8':      { zh: '🔀 长程分解与打标', en: '🔀 Long-horizon decomposition & labeling' },
    'products.p2.arch.c9':      { zh: '🏆 自动奖励信号标注', en: '🏆 Auto reward-signal labeling' },
    'products.p2.arch.c10':     { zh: '🔄 统一格式', en: '🔄 Unified format' },
    'products.p2.arch.c11':     { zh: '⏱️ 时空同步', en: '⏱️ Spatio-temporal sync' },
    'products.p2.arch.c12':     { zh: '🗑️ 冗余静止清洗', en: '🗑️ Redundant-frame cleanup' },
    'products.p2.arch.c13':     { zh: '📈 轨迹平滑与滤波', en: '📈 Trajectory smoothing & filtering' },
    'products.p2.arch.c14':     { zh: '🌈 多样性检测', en: '🌈 Diversity check' },
    'products.p2.arch.c15':     { zh: '📋 完备性检测', en: '📋 Completeness check' },
    'products.p2.arch.c16':     { zh: '⚠️ 运动学奇异点检测', en: '⚠️ Kinematic singularity check' },
    'products.p2.arch.c17':     { zh: '🎞️ 帧率检测', en: '🎞️ Frame-rate check' },
    'products.p2.arch.c18':     { zh: '🖼️ 图像质量检测', en: '🖼️ Image-quality check' },
    'products.p2.arch.c19':     { zh: '🔁 Real2Sim2Real 闭环管线', en: '🔁 Real2Sim2Real closed-loop' },
    'products.p2.arch.c20':     { zh: '💎 AI 数据增强', en: '💎 AI data augmentation' },
    'products.p2.arch.c21':     { zh: '👓 智能数采眼镜', en: '👓 Smart capture glasses' },
    'products.p2.arch.c22':     { zh: '🧤 触觉手套', en: '🧤 Tactile gloves' },
    'products.p2.arch.c23':     { zh: '⌚ 环形 AprilTag 手环', en: '⌚ AprilTag wristband' },
    'products.p2.arch.c24':     { zh: '🦾 无感动捕服', en: '🦾 Inertial mocap suit' },
    'products.p2.arch.c25':     { zh: '🗄️ PB 级多模具身数据存储池', en: '🗄️ PB-scale multimodal data pool' },
    'products.p2.arch.c26':     { zh: '🖥️ 分布式训练集群', en: '🖥️ Distributed training cluster' },
    'products.p2.arch.c27':     { zh: '☁️ 云边端协同部署', en: '☁️ Cloud-edge-device deployment' },
    'products.p2.arch.c28':     { zh: '📡 低延迟数据传输', en: '📡 Low-latency data transport' },

    'products.p2.demo.title': { zh: '想预览灵汐数据管理工具链？', en: 'Want a preview of the Lynxi toolchain?' },
    'products.p2.demo.desc':  { zh: '抢先体验工具链驾驶舱，完整版本即将发布。',
                                en: 'Pre-release cockpit preview. Full release coming soon.' },
    'products.p2.demo.b1':    { zh: '查看在线 Demo →', en: 'View live demo →' },
    'products.p2.demo.b2':    { zh: '申请上门 POC', en: 'Request on-site POC' },

    'products.p3.eyebrow': { zh: 'PRODUCT 03 · HARDWARE', en: 'PRODUCT 03 · HARDWARE' },
    'products.p3.title':   { zh: '灵汐·数采设备矩阵', en: 'Lynxi · Capture Device Lineup' },
    'products.p3.desc':    { zh: '遥操数据 / EGO 预训练 · 配套高精度动捕。',
                             en: 'Teleop / EGO pre-training · with high-precision MoCap.' },
    'products.p3.cta.title': { zh: '团购 / 教育 / 量产合作？', en: 'Bulk / education / OEM partnerships?' },
    'products.p3.cta.desc':  { zh: '教育 / OEM / 开发者套餐可定制，联系销售获取报价。',
                               en: 'Education / OEM / developer bundles available — contact sales.' },
    'products.p3.cta.b1':    { zh: '联系销售获取报价', en: 'Get a quote' },
    'products.p3.cta.b2':    { zh: '了解 ToC 入门款', en: 'See entry-level ToC' },

    'products.p4.eyebrow': { zh: 'PRODUCT 04 · ECOSYSTEM', en: 'PRODUCT 04 · ECOSYSTEM' },
    'products.p4.title':   { zh: '兼容硬件生态', en: 'Compatible hardware ecosystem' },
    'products.p4.desc':    { zh: '深度对接主流数采设备，不造轮子，只让数据流更顺。',
                             en: 'Deep integration with mainstream hardware — no reinvention.' },

    'products.p4.cat1.title': { zh: '轻量级机械臂', en: 'Lightweight arms' },
    'products.p4.cat1.desc':  { zh: '桌面级 · 教研 · 单/双臂遥操，开源生态成熟。',
                                en: 'Desktop · research · single/dual-arm teleop · rich open-source ecosystem.' },

    'products.p4.cat2.title': { zh: '工业协作机械臂', en: 'Collaborative industrial arms' },
    'products.p4.cat2.desc':  { zh: '6-7 自由度 · 力控可选 · 面向产线协作与精密作业。',
                                en: '6-7 DOF · optional force control · for production-line collaboration and precision tasks.' },

    'products.p4.cat3.title': { zh: '移动升降机器人', en: 'Mobile & lift-augmented robots' },
    'products.p4.cat3.desc':  { zh: '底盘 + 机械臂 / 升降立柱，扩展作业空间，覆盖 AGV / AMR 场景。',
                                en: 'Chassis + arm / lift column · expanded workspace · AGV / AMR scenarios.' },

    'products.p4.cat4.title': { zh: '人形机器人', en: 'Humanoid robots' },
    'products.p4.cat4.desc':  { zh: '全身遥操 · 多模态采集 · 对接主流人形整机平台。',
                                en: 'Full-body teleop · multimodal capture · connects to mainstream humanoid platforms.' },

    'products.p4.note':    { zh: '💡 <strong>客户带任何上述硬件来，灵汐工具链直接吃</strong>（采集 / 对齐 / LeRobot 格式导出全跑通）。',
                             en: '💡 <strong>Bring any device above — Lynxi ingests it directly</strong> (capture / alignment / LeRobot export all wired up).' },

    /* =========================  DEVELOPER  ========================= */
    'dev.title':       { zh: '开发者生态 · 海豚灵汐', en: 'Developers · Dolphin Lynxi' },
    'dev.head.h1':     { zh: '开发者生态', en: 'Developer ecosystem' },
    'dev.head.desc':   { zh: '让具身智能开发像写 App 一样简单。',
                         en: 'Embodied-AI development, as easy as building an app.' },
    'dev.head.b1':     { zh: '一站式平台', en: 'Platform' },
    'dev.head.b2':     { zh: '技能商店', en: 'Skill store' },
    'dev.head.b3':     { zh: '入门机械臂', en: 'Entry arm' },
    'dev.head.b4':     { zh: '开源数据集', en: 'Open datasets' },
    'dev.head.b5':     { zh: '培训学院', en: 'Academy' },

    'dev.s1.eyebrow':  { zh: 'SECTION 01', en: 'SECTION 01' },
    'dev.s1.title':    { zh: '一站式具身智能服务平台', en: 'All-in-one Embodied-AI Platform' },
    'dev.s1.desc':     { zh: '数据 → 算力 → 模型 → 部署，一个账号搞定。',
                         en: 'Data → Compute → Model → Deploy. One account.' },
    'dev.s1.login':    { zh: '🚀 一站式开发者平台', en: '🚀 All-in-one developer platform' },
    'dev.s1.loginHint':{ zh: '加入早期体验列表 · 免费额度即将开放',
                         en: 'Join early access · free trial coming soon' },
    'dev.s1.step1.eyebrow': { zh: '步骤 1', en: 'STEP 1' },
    'dev.s1.step2.eyebrow': { zh: '步骤 2', en: 'STEP 2' },
    'dev.s1.step3.eyebrow': { zh: '步骤 3', en: 'STEP 3' },
    'dev.s1.step1.label': { zh: '下载数据集', en: 'Download dataset' },
    'dev.s1.step1.desc':  { zh: '海豚自营/开源/购买', en: 'In-house / open-source / purchased' },
    'dev.s1.step2.label': { zh: '弹性 GPU 训练', en: 'Elastic GPU training' },
    'dev.s1.step2.desc':  { zh: '按需开机 · 定价即将公布', en: 'On-demand · pricing TBD' },
    'dev.s1.step3.label': { zh: '一键部署', en: 'One-click deploy' },
    'dev.s1.step3.desc':  { zh: '→ 你的机械臂', en: '→ your robot arm' },
    'dev.s1.models':   { zh: '支持的模型：', en: 'Supported models:' },
    'dev.s1.c1.title': { zh: '免费体验 · 即将开放', en: 'Free trial · Coming soon' },
    'dev.s1.c1.desc':  { zh: '早期用户上线即享 GPU 免费试用，足够跑完一个 ACT 训练 + 推理周期。',
                         en: 'Early-access users get a free GPU trial — enough for one ACT train + inference cycle.' },
    'dev.s1.c2.title': { zh: '完整 API 文档', en: 'Full API documentation' },
    'dev.s1.c2.desc':  { zh: 'RESTful API + Python SDK，5 行代码调起推理。',
                         en: 'RESTful API + Python SDK — 5 lines of code to run inference.' },
    'dev.s1.c3.title': { zh: '开发者社区', en: 'Developer community' },
    'dev.s1.c3.desc':  { zh: 'GitHub / Discord / 微信群答疑。',
                         en: 'GitHub / Discord / WeChat Q&A.' },

    'dev.s2.eyebrow':  { zh: 'SECTION 02', en: 'SECTION 02' },
    'dev.s2.title':    { zh: '技能商店', en: 'Skill store' },
    'dev.s2.desc':     { zh: '预训练 ACT / π0 / GR00T 技能包，即开即用。',
                         en: 'Pre-trained ACT / π0 / GR00T skill packs, plug-and-play.' },
    'dev.s2.upload':   { zh: '上架你的技能赚分成 →', en: 'List your skill, share revenue →' },
    'dev.s2.banner.title': { zh: '🎯 技能开发者分成计划 · 即将开放', en: '🎯 Skill developer revenue program · Coming soon' },
    'dev.s2.banner.desc':  { zh: '上架技能包享开发者分成，平台包办算力、推广与客服。开源贡献者享流量扶持。',
                             en: 'List a skill and share revenue — platform handles compute, marketing, support. Open-source contributors get traffic boost.' },

    'dev.s3.eyebrow':  { zh: 'SECTION 03', en: 'SECTION 03' },
    'dev.s3.title':    { zh: '入门级机械臂', en: 'Entry-level robot arms' },
    'dev.s3.desc':     { zh: 'Dolphin-Mini 桌面级 6-DOF 即将发布。',
                         en: 'Dolphin-Mini 6-DOF desktop arm, launching soon.' },
    'dev.s3.mini.cat':  { zh: 'ENTRY · TOC', en: 'ENTRY · TOC' },
    'dev.s3.mini.from': { zh: '起', en: 'from' },
    'dev.s3.mini.priceLabel': { zh: '敬请期待 · 接受预订', en: 'Stay tuned · Reserve now' },
    'dev.s3.mini.f1':   { zh: '6 自由度 · 桌面级 · 仅 1.2 kg', en: '6-DOF · desktop · 1.2 kg' },
    'dev.s3.mini.f2':   { zh: 'USB-C 直供电 · 即插即用', en: 'USB-C power · plug & play' },
    'dev.s3.mini.f3':   { zh: '可折叠 · A4 大小收纳', en: 'Foldable · A4-size storage' },
    'dev.s3.mini.f4':   { zh: '配套 30 分钟入门教程 · 学院学员上线即享专属折扣', en: '30-min onboarding · Academy-student discount on release' },
    'dev.s3.mini.f5':   { zh: '开源固件 + 兼容 LeRobot 标准格式', en: 'Open-source firmware · LeRobot-format compatible' },
    'dev.s3.mini.b1':   { zh: '立即预订', en: 'Reserve now' },
    'dev.s3.mini.b2':   { zh: '查看详情', en: 'View details' },
    'dev.s3.arm.cat':   { zh: 'STANDARD', en: 'STANDARD' },
    'dev.s3.arm.name':  { zh: 'Dolphin-Arm 标准版', en: 'Dolphin-Arm Standard' },
    'dev.s3.arm.f1':    { zh: '6 DOF 飞特舵机 · 工业级一致性', en: '6-DOF Feetech servos · industrial consistency' },
    'dev.s3.arm.f2':    { zh: 'RGB-D 摄像头 · 含视觉抓取套件', en: 'RGB-D camera · visual-grasp kit included' },
    'dev.s3.arm.f3':    { zh: '主从遥操作 < 3 ms · ESP-NOW 直连', en: 'Leader-follower teleop < 3 ms · ESP-NOW direct' },
    'dev.s3.arm.f4':    { zh: '支持双臂扩展 · 升级到 Dolphin-Dual', en: 'Dual-arm upgrade-ready · become Dolphin-Dual' },
    'dev.s3.arm.f5':    { zh: '开发者数据平台账号 · 即将开放', en: 'Developer data-platform account · early-access coming soon' },
    'dev.s3.arm.b2':    { zh: '对比型号', en: 'Compare models' },

    'dev.s4.eyebrow':  { zh: 'SECTION 04 · OPEN-SOURCE DATASETS', en: 'SECTION 04 · OPEN-SOURCE DATASETS' },
    'dev.s4.title':    { zh: '全球开源数据集精选', en: 'Curated global open-source datasets' },
    'dev.s4.desc':     { zh: '12 个最具代表性的开源数据集，镜像加速 + 一键拉取。',
                         en: '12 representative open datasets, mirrored & one-click pullable.' },
    'dev.s4.k1.label': { zh: '精选数据集',   en: 'Curated datasets' },
    'dev.s4.k2.label': { zh: '累计帧数级',   en: 'Total frame scale' },
    'dev.s4.k3.label': { zh: '机器人本体',   en: 'Robot embodiments' },
    'dev.s4.k4.label': { zh: '多种开源协议', en: 'Open-source licenses' },
    'dev.s4.note':     { zh: '💡 <strong style="color:var(--wave-cyan);">SO-101 + 50 条数据 + 1 小时训练</strong>，机械臂学会一个新动作。',
                         en: '💡 <strong style="color:var(--wave-cyan);">SO-101 + 50 episodes + 1 hour training</strong> — arm learns a new skill.' },

    'dev.s5.eyebrow':  { zh: 'SECTION 05', en: 'SECTION 05' },
    'dev.s5.title':    { zh: '海豚学院 · 培训与认证', en: 'Dolphin Academy · Training & Certification' },
    'dev.s5.desc':     { zh: '零基础入门到企业团队陪跑，课程持续扩充。',
                         en: 'Beginner to enterprise enablement, curriculum growing.' },
    'dev.s5.cta.title': { zh: '成为海豚认证开发者', en: 'Become a Dolphin Certified Developer' },
    'dev.s5.cta.desc':  { zh: '认证后可上架技能 / 接大单 / 享流量扶持，完整体系即将发布。',
                          en: 'Certified developers can list skills, take platform jobs, get traffic boost — launching soon.' },
    'dev.s5.cta.b1':    { zh: '查看认证体系', en: 'See certification' },
    'dev.s5.cta.b2':    { zh: '浏览任务大厅', en: 'Browse task hall' },

    /* =========================  ABOUT  ========================= */
    'about.title':    { zh: '关于我们 · 海豚灵汐', en: 'About · Dolphin Lynxi' },
    'about.head.h1':  { zh: '关于海豚灵汐', en: 'About Dolphin Lynxi' },
    'about.head.desc': { zh: '具身智能数据资产的运营商 · 数据如潮，灵汐而至', en: 'Embodied-AI data-asset operator · Data flows like tide' },
    'about.head.b1':  { zh: '关于我们', en: 'About' },
    'about.head.b2':  { zh: '加入我们', en: 'Join us' },
    'about.head.b3':  { zh: '联系我们', en: 'Contact' },

    'about.s1.eyebrow': { zh: 'SECTION 01 · ABOUT', en: 'SECTION 01 · ABOUT' },
    'about.s1.title':   { zh: '关于我们', en: 'About us' },
    'about.s1.desc':    { zh: '不造舰船，不绘海图。我们建造浮标、灯塔和洋流监测网。',
                          en: 'We don\'t build ships or chart seas. We build buoys, lighthouses and current-monitoring networks.' },
    'about.s1.p1':      { zh: '<strong style="color:var(--wave-cyan);">海豚，是海洋中最聪明的哺乳动物。</strong>它们用声呐感知世界，用群体协作生存，用灵动身姿征服深海。',
                          en: '<strong style="color:var(--wave-cyan);">Dolphins are the smartest mammals in the ocean.</strong> They sense the world with sonar, survive through pod cooperation, and conquer the deep with agile grace.' },
    'about.s1.p2':      { zh: '海豚灵汐取意于此——具身智能的发展，离不开<strong style="color:var(--wave-cyan);">机器人本体、大模型与数据</strong>三大基石。我们选择把"数据"这件事做深、做透、做久，与本体厂商、模型公司、应用伙伴长期同行，共同推动产业稳步向前。',
                          en: 'Dolphin Lynxi takes its meaning from this — the advance of embodied AI rests on three foundations: <strong style="color:var(--wave-cyan);">robot bodies, foundation models, and data</strong>. We choose to commit ourselves to one of them — data — in depth, in breadth, and for the long run. Together with robot OEMs, foundation-model providers and application partners, we move the industry forward step by step.' },
    'about.s1.p3':      { zh: '我们不造机器人本体，也不研发大模型，<strong style="color:var(--wave-pink);">我们专注做产业的"数据基础设施"</strong>——从采集、清洗、对齐到训练，每一环都做到位。与本体厂商、大模型公司、应用集成方<strong style="color:var(--wave-cyan);">各司其职、协同共建</strong>，让数据真正成为驱动具身智能落地的核心动力。',
                          en: 'We don\'t build robot bodies, and we don\'t train foundation models. <strong style="color:var(--wave-pink);">We focus on the data infrastructure of the industry</strong> — capture, cleaning, alignment, training, every step done right. Together with robot OEMs, foundation-model providers and system integrators — <strong style="color:var(--wave-cyan);">each in our own craft, co-building side by side</strong> — we make data the real engine that drives embodied AI into the real world.' },
    'about.s1.p4':      { zh: '具身智能是一场长期的远征。造舰师锻造身体（机器人本体），制图师绘制航路（大模型与算法）。海豚灵汐则建造<strong style="color:var(--wave-pink);">浮标、灯塔与洋流监测网</strong>——为每一艘船提供更可靠的导航、更清晰的航路、更稳健的航行。',
                          en: 'Embodied AI is a long voyage. Shipwrights forge the hulls (robot bodies), cartographers chart the routes (foundation models and algorithms). Dolphin Lynxi builds the <strong style="color:var(--wave-pink);">buoys, lighthouses and current-monitoring network</strong> — giving every ship more reliable navigation, clearer routes, and steadier voyage.' },
    'about.s1.p5':      { zh: '<strong style="color:var(--wave-cyan);">长期投入，与伙伴同行</strong>——我们愿携手本体厂商、大模型公司与应用集成方，<strong style="color:var(--wave-pink);">让数据的潮汐托起整个行业，奔赴具身智能的星辰大海。</strong>',
                          en: '<strong style="color:var(--wave-cyan);">Investing for the long run, walking with our partners</strong> — together with robot OEMs, foundation-model providers and system integrators, <strong style="color:var(--wave-pink);">let the data tide lift the whole fleet, onward to the boundless ocean of embodied AI.</strong>' },
    'about.s1b.title':  { zh: 'SLOGAN · 一句话拆开看', en: 'SLOGAN · word by word' },
    'about.s1b.left.tag':  { zh: 'DATA FLOWS LIKE TIDE', en: 'DATA FLOWS LIKE TIDE' },
    'about.s1b.left.title':{ zh: '数据如潮', en: 'Data flows like tide' },
    'about.s1b.left.desc': { zh: 'Scaling Law 的注脚。当持续扩张的多城采集网络以工业级节奏稳定送出真实数据，<strong style="color:var(--text-primary);">数据规模本身就是答案</strong>。',
                             en: 'A footnote to the Scaling Law. When a growing capture network across many cities delivers real-world data continuously and at industrial cadence, <strong style="color:var(--text-primary);">scale itself becomes the answer</strong>.' },
    'about.s1b.right.tag':  { zh: 'INTELLIGENCE EMERGES', en: 'INTELLIGENCE EMERGES' },
    'about.s1b.right.title':{ zh: '灵汐而至', en: 'Intelligence emerges' },
    'about.s1b.right.desc': { zh: '涌现的必然。当数据规模 × 计算密度跨过临界点，<strong style="color:var(--text-primary);">智能就像晨雾在潮汐里浮现一样必然到来</strong>。',
                              en: 'Emergence is inevitable. Once data-scale × compute-density crosses the threshold, <strong style="color:var(--text-primary);">intelligence arrives as surely as morning mist rising from the tide</strong>.' },
    'about.s1b.foot':       { zh: '我们做的事，就是<strong style="color:var(--wave-blue);">让前者源源不断地流入</strong>，让<strong style="color:var(--wave-pink);">后者必然地发生</strong>。',
                              en: 'What we do: <strong style="color:var(--wave-blue);">keep the former flowing in endlessly</strong> so that <strong style="color:var(--wave-pink);">the latter inevitably happens</strong>.' },

    'about.s2.eyebrow': { zh: 'SECTION 02 · JOIN US', en: 'SECTION 02 · JOIN US' },
    'about.s2.title':   { zh: '加入海豚灵汐', en: 'Join Dolphin Lynxi' },
    'about.s2.desc':    { zh: '和我们一起，为具身智能产业建造浮标、灯塔与洋流监测网。简历投递 → <a href="mailto:plumpost@sina.com" style="color:var(--wave-blue);font-weight:600;">plumpost@sina.com</a>',
                          en: 'Help us build the buoys, lighthouses and current-monitoring networks of the embodied-AI industry. Send résumé → <a href="mailto:plumpost@sina.com" style="color:var(--wave-blue);font-weight:600;">plumpost@sina.com</a>' },

    'about.job.responsibility': { zh: '岗位职责', en: 'Responsibilities' },
    'about.job.requirements':   { zh: '任职要求', en: 'Requirements' },

    'about.job1.title': { zh: '具身智能数据算法工程师', en: 'Embodied-AI Data Algorithm Engineer' },
    'about.job1.meta':  { zh: '上海 · 全职 · 硕士+ · 35-70K × 16', en: 'Shanghai · Full-time · MS+ · 35-70K × 16' },
    'about.job1.r1':    { zh: '多模态数据（图像/点云/力觉/触觉/6D 位姿）清洗、标注、合成与质量评估流程设计',
                          en: 'Design pipelines for multimodal data (image/pointcloud/force/tactile/6D pose) cleaning, annotation, synthesis & quality assessment' },
    'about.job1.r2':    { zh: '开发自动化数据挖掘与增强算法（域随机化、场景重排、轨迹插值），提升数据多样性',
                          en: 'Build automated mining & augmentation (domain randomization, scene shuffling, trajectory interpolation) to boost diversity' },
    'about.job1.r3':    { zh: '搭建数据闭环系统：采集 → 训练 → 部署 → 难例挖掘 全链路',
                          en: 'Build closed-loop data system: capture → train → deploy → hard-case mining, end-to-end' },
    'about.job1.r4':    { zh: 'Sim2Real 数据对齐，降低虚实差距对策略迁移的影响',
                          en: 'Sim2Real data alignment to reduce the sim-to-real gap in policy transfer' },
    'about.job1.r5':    { zh: '跟踪 Open X-Embodiment / DROID 等数据集与治理标准，优化数据配方',
                          en: 'Track Open X-Embodiment / DROID datasets & governance standards to optimize data recipes' },
    'about.job1.q1':    { zh: '计算机/自动化/机器人/数学 硕士及以上，AI 数据处理 / 多模态算法经验',
                          en: 'MS+ in CS / automation / robotics / math, with AI data-processing or multimodal algorithm experience' },
    'about.job1.q2':    { zh: '熟练 Python/C++，熟悉 PyTorch、HDF5/Zarr/WebDataset/LeRobot 等数据工具',
                          en: 'Proficient in Python/C++, familiar with PyTorch, HDF5/Zarr/WebDataset/LeRobot data tooling' },
    'about.job1.q3':    { zh: '了解机器人学（运动学、刚体变换），有 3D 视觉 / 轨迹数据处理经验',
                          en: 'Knowledge of robotics (kinematics, rigid-body transforms), 3D-vision or trajectory data experience' },
    'about.job1.q4':    { zh: '真机数采 / Isaac Sim / Mujoco / Gazebo 仿真数据经验者优先',
                          en: 'Bonus: real-robot capture / Isaac Sim / Mujoco / Gazebo simulation experience' },
    'about.job1.q5':    { zh: '数据质量评估、长尾分析、主动学习、难例挖掘落地经验者优先',
                          en: 'Bonus: data-quality assessment, long-tail analysis, active learning, hard-case mining in production' },

    'about.job2.title': { zh: '具身智能数采设备工程师', en: 'Embodied-AI Capture Hardware Engineer' },
    'about.job2.meta':  { zh: '上海 · 全职 · 本科+ · 25-50K × 16', en: 'Shanghai · Full-time · BS+ · 25-50K × 16' },
    'about.job2.r1':    { zh: '设计/搭建/维护数采系统：遥操设备（VR / 手柄 / 主从臂）、多视角相机、力觉、触觉、激光雷达',
                          en: 'Design / build / maintain capture systems: teleop (VR / controllers / leader-follower), multi-view cameras, force, tactile, LiDAR' },
    'about.job2.r2':    { zh: '采集设备标定（相机内外参 / 手眼 / 时间同步）+ 底层驱动开发适配',
                          en: 'Calibration (camera intrinsics/extrinsics / hand-eye / time-sync) + low-level driver development' },
    'about.job2.r3':    { zh: '开发上位机软件：实时可视化、录制、校验、断点续传',
                          en: 'Build host software: real-time visualization, recording, validation, resumable transfer' },
    'about.job2.r4':    { zh: '采集现场布局管理（光照、遮挡、安全围栏）+ SOP 制定 + 采集员培训',
                          en: 'On-site layout management (lighting, occlusion, safety fences) + SOP authoring + operator training' },
    'about.job2.r5':    { zh: '与算法团队协作迭代硬件方案（夹爪适配、遥操作低延迟优化）',
                          en: 'Iterate hardware with algorithm team (gripper adaptation, teleop latency optimization)' },
    'about.job2.q1':    { zh: '机械电子/自动化/计算机/仪器 本科及以上，机器人 / 多传感器集成经验',
                          en: 'BS+ in mechatronics / automation / CS / instrumentation, with robotics / multi-sensor integration experience' },
    'about.job2.q2':    { zh: '熟悉 ROS / ROS2，能独立完成传感器驱动 + 数据流调试',
                          en: 'Familiar with ROS / ROS2, can independently develop sensor drivers and debug data flow' },
    'about.job2.q3':    { zh: 'Python / C++ + 基本电路知识，能设计简单触发同步信号电路',
                          en: 'Python / C++ + basic electronics; able to design simple trigger-sync circuits' },
    'about.job2.q4':    { zh: '相机 / 激光雷达 / IMU / 力觉标定经验（Kalibr / OpenCV / Matlab）',
                          en: 'Calibration experience for cameras / LiDAR / IMU / force (Kalibr / OpenCV / Matlab)' },
    'about.job2.q5':    { zh: 'VR 设备（Vive / Quest）/ 遥操作设备 / ESP32 固件 / EtherCAT 经验者加分',
                          en: 'Bonus: VR (Vive / Quest) / teleop hardware / ESP32 firmware / EtherCAT experience' },

    'about.job3.title': { zh: '评测工程师', en: 'Evaluation Engineer' },
    'about.job3.meta':  { zh: '上海 · 全职 · 30-60K × 16', en: 'Shanghai · Full-time · 30-60K × 16' },
    'about.job3.desc':  { zh: '负责数据集质量评测、模型 benchmark 体系搭建与 Sim2Real 评测闭环；熟悉 LeRobot 生态者优先，可参与下游客户的后训练 / 微调支持。',
                          en: 'Build dataset-quality eval, model-benchmark frameworks, and Sim2Real eval closures. LeRobot ecosystem familiarity preferred; supports downstream customer post-training / fine-tuning.' },
    'about.job4.title': { zh: '数据中心运维工程师', en: 'Datacenter Operations Engineer' },
    'about.job4.meta':  { zh: '上海 / 深圳 · 全职 · 25-45K × 16', en: 'Shanghai / Shenzhen · Full-time · 25-45K × 16' },
    'about.job4.desc':  { zh: '负责海豚自营 GPU 数据中心的弹性调度、故障自愈、成本优化，要求 K8s + GPU 集群经验。',
                          en: 'Run Dolphin\'s in-house GPU datacenter: elastic scheduling, self-healing, cost optimization. K8s + GPU cluster experience required.' },
    'about.job5.title': { zh: '数据采集运营', en: 'Data Capture Operations' },
    'about.job5.meta':  { zh: '全国 · 全职 · 15-25K × 14', en: 'Nationwide · Full-time · 15-25K × 14' },
    'about.job5.desc':  { zh: '负责城市采集节点运营，包括场地拓展、采集员培训、SOP 优化与质检流水线管理。',
                          en: 'Run city-level capture nodes: site expansion, operator training, SOP refinement, QA pipeline management.' },
    'about.job6.title': { zh: '企业大客户经理', en: 'Enterprise Account Manager' },
    'about.job6.meta':  { zh: '北 / 上 / 深 · 全职 · 30-50K × 16 + 提成', en: 'Beijing / Shanghai / Shenzhen · Full-time · 30-50K × 16 + commission' },
    'about.job6.desc':  { zh: '与头部机器人公司、大模型厂商和制造业战略客户深度合作，承接定制化数据采集与共建项目，与合作伙伴共创场景数据资产。',
                          en: 'Partner with leading robot OEMs, foundation-model providers and enterprise manufacturers — deliver custom data-capture engagements and co-build scene data assets together.' },
    'about.job7.title': { zh: '培训讲师 / 课程设计', en: 'Trainer / Curriculum Designer' },
    'about.job7.meta':  { zh: '上海 · 全职 · 20-35K × 14', en: 'Shanghai · Full-time · 20-35K × 14' },
    'about.job7.desc':  { zh: '负责海豚学院 ToC / B 端课程设计与讲授，要求具备 LeRobot 实战经验与公众表达能力。',
                          en: 'Design & teach Dolphin Academy ToC / B-end courses. Requires hands-on LeRobot experience and public-speaking skill.' },

    'about.s3.eyebrow': { zh: 'SECTION 03 · CONTACT', en: 'SECTION 03 · CONTACT' },
    'about.s3.title':   { zh: '联系我们', en: 'Contact us' },
    'about.s3.desc':    { zh: '任何业务、合作、投递、咨询，发邮件或来访均可。',
                          en: 'For any business, partnership, application, or inquiry — email or visit us.' },
    'about.s3.email.tag':  { zh: 'EMAIL · 邮箱', en: 'EMAIL' },
    'about.s3.email.note': { zh: '企业定制 / 设备采购 / 招聘投递 / 开源合作 — 一封邮件 24 小时回复。',
                             en: 'Custom enterprise / hardware purchase / résumé / open-source partnership — replies within 24 hours.' },
    'about.s3.addr.tag':   { zh: 'ADDRESS · 地址', en: 'ADDRESS' },
    'about.s3.addr.city':  { zh: '上海·闵行', en: 'Shanghai · Minhang' },
    'about.s3.addr.full':  { zh: '上海市闵行区平阳路 258 号 1 层', en: '1F, No. 258 Pingyang Rd., Minhang District, Shanghai' },
    'about.s3.addr.hours': { zh: '⏱ 周一至周五 9:00-18:00', en: '⏱ Mon-Fri 09:00-18:00' },

    /* =========================  MARKETPLACE  ========================= */
    'market.title':       { zh: '数据集市场 · 海豚灵汐', en: 'Dataset Market · Dolphin Lynxi' },
    'market.head.h1':     { zh: '数据集市场', en: 'Dataset market' },
    'market.head.desc':   { zh: '真人采集 · 帧级对齐 · 直供 LeRobot / π0 / GR00T',
                            en: 'Human-captured · frame-aligned · ready for LeRobot / π0 / GR00T' },
    'market.filter.scene':  { zh: '场景', en: 'Scene' },
    'market.filter.arm':    { zh: '机械臂', en: 'Arm' },
    'market.filter.vendor': { zh: '供应方', en: 'Vendor' },
    'market.filter.search': { zh: '🔍 搜索数据集名称、ID、描述...', en: '🔍 Search by name, ID, description...' },
    'market.result':        { zh: '共 <strong>24</strong> 条结果', en: '<strong>24</strong> results' },

    /* =========================  TASKS  ========================= */
    'tasks.title':       { zh: '任务大厅 · 海豚灵汐', en: 'Task Hall · Dolphin Lynxi' },
    'tasks.head.h1':     { zh: '任务大厅', en: 'Task hall' },
    'tasks.head.desc':   { zh: '委托 / 自营 / 众包 / 标注 —— 按帧 / 集 / 总包结算',
                           en: 'Enterprise / platform / crowdsourced / labeling — billed per frame / episode / package' },
    'tasks.type.collect.title': { zh: '采集征集', en: 'Capture calls' },
    'tasks.type.collect.desc':  { zh: '定向采集需求 · 按集结算',
                                  en: 'Targeted capture jobs · pay-per-episode' },
    'tasks.type.verify.title':  { zh: '数据校验', en: 'Data verification' },
    'tasks.type.verify.desc':   { zh: '数据集打分 / 失败分类 · 按条结算',
                                  en: 'Score / classify failures · pay-per-item' },
    'tasks.type.label.title':   { zh: '众包标注', en: 'Crowd labeling' },
    'tasks.type.label.desc':    { zh: '分割 / 动作分段 / 语义标注 · 按帧结算',
                                  en: 'Segmentation / action / semantic labels · pay-per-frame' },
    'tasks.type.custom.title':  { zh: '定制大单', en: 'Custom mega-jobs' },
    'tasks.type.custom.desc':   { zh: '百万级订单 / SOP 项目，仅认证服务商投标',
                                  en: 'Million-scale orders / SOP projects, certified vendors only' },
    'tasks.type.filterHint':    { zh: '点击筛选 →', en: 'Click to filter →' },
    'tasks.filter.type':        { zh: '类型', en: 'Type' },
    'tasks.filter.scene':       { zh: '场景', en: 'Scene' },
    'tasks.filter.level':       { zh: '难度', en: 'Difficulty' },
    'tasks.filter.search':      { zh: '🔍 搜索任务...', en: '🔍 Search tasks...' },
    'tasks.result':             { zh: '共 <strong>12</strong> 个任务进行中', en: '<strong>12</strong> tasks in progress' },
    'tasks.cta.title':          { zh: '成为海豚认证采集服务商', en: 'Become a Dolphin Certified Capture Vendor' },
    'tasks.cta.desc':           { zh: '认证后优先承接大单 · 享流量扶持 · 长期稳定收益',
                                  en: 'Certified: priority on jobs · traffic support · steady revenue' },
    'tasks.cta.b1':             { zh: '申请认证', en: 'Apply for certification' },
    'tasks.cta.b2':             { zh: '了解认证体系', en: 'Learn about certification' },

    /* =========================  DASHBOARD  ========================= */
    'dash.title':        { zh: '数据管理平台 · 海豚灵汐', en: 'Data Management Platform · Dolphin Lynxi' },
    'dash.head.h1':      { zh: '数据管理平台', en: 'Data management platform' },
    'dash.head.desc':    { zh: '设备监控 / 任务编排 / 质检 / 算力 / 财务一站式',
                           en: 'Devices / tasks / QA / compute / billing — all in one cockpit' },
    'dash.demo.note':    { zh: '<strong style="color:var(--wave-cyan);">演示预览 · 仅 UI 模拟：</strong>下方数据均为示意，完整版本即将上线。',
                           en: '<strong style="color:var(--wave-cyan);">Demo preview · UI mock-up only.</strong> Data below is illustrative. Production version coming soon.' },
    'dash.side.ops':     { zh: '运营', en: 'Operations' },
    'dash.side.dev':     { zh: '设备', en: 'Devices' },
    'dash.side.model':   { zh: '模型', en: 'Models' },
    'dash.side.acct':    { zh: '账户', en: 'Account' },
    'dash.menu.cockpit': { zh: '📊 数据驾驶舱', en: '📊 Data cockpit' },
    'dash.menu.mydata':  { zh: '📂 我的数据集', en: '📂 My datasets' },
    'dash.menu.task':    { zh: '📥 采集任务', en: '📥 Capture tasks' },
    'dash.menu.qa':      { zh: '✅ 质检流水线', en: '✅ QA pipeline' },
    'dash.menu.cap':     { zh: '🦾 采集设备', en: '🦾 Capture devices' },
    'dash.menu.cam':     { zh: '📸 摄像头节点', en: '📸 Camera nodes' },
    'dash.menu.gpu':     { zh: '☁️ GPU 算力', en: '☁️ GPU compute' },
    'dash.menu.train':   { zh: '🧠 训练任务', en: '🧠 Training jobs' },
    'dash.menu.repo':    { zh: '🚀 模型仓库', en: '🚀 Model registry' },
    'dash.menu.deploy':  { zh: '📡 推理部署', en: '📡 Inference deploy' },
    'dash.menu.wallet':  { zh: '💎 我的资源', en: '💎 My resources' },
    'dash.menu.bill':    { zh: '📑 财务账单', en: '📑 Billing' },
    'dash.menu.team':    { zh: '⚙️ 团队设置', en: '⚙️ Team settings' },
    'dash.greet':        { zh: '您好，某 EMS 客户 · 今日数据概览', en: 'Hello, EMS customer · today\'s data overview' },
    'dash.kpi.frames':   { zh: '今日采集帧数', en: 'Frames captured today' },
    'dash.kpi.devices':  { zh: '在线采集设备', en: 'Devices online' },
    'dash.kpi.qa':       { zh: '质检合格率', en: 'QA pass rate' },
    'dash.kpi.credits':  { zh: '本月处理帧数', en: 'Frames processed this month' },
    'dash.kpi.vsYesterday': { zh: 'vs 昨日', en: 'vs yesterday' },
    'dash.kpi.newOnline':   { zh: '台新上线', en: 'newly online' },
    'dash.kpi.vsLastMonth': { zh: 'vs 上月', en: 'vs last month' },
    'dash.chart.title':     { zh: '📈 近 14 天采集帧数趋势', en: '📈 Capture frame trend, last 14 days' },
    'dash.chart.unit':      { zh: '单位：万帧 · 实时', en: 'unit: 10k frames · live' },
    'dash.dev.title':       { zh: '🦾 在线采集设备 TOP 10', en: '🦾 Online capture devices · Top 10' },
    'dash.dev.viewAll':     { zh: '查看全部 →', en: 'View all →' },
    'dash.dev.col.id':      { zh: '设备 ID', en: 'Device ID' },
    'dash.dev.col.loc':     { zh: '位置', en: 'Location' },
    'dash.dev.col.frames':  { zh: '今日帧数', en: 'Frames today' },
    'dash.dev.col.status':  { zh: '状态', en: 'Status' },
    'dash.task.title':      { zh: '📥 进行中采集任务', en: '📥 Capture tasks in progress' },
    'dash.task.new':        { zh: '+ 新建任务', en: '+ New task' },
    'dash.task.col.task':   { zh: '任务', en: 'Task' },
    'dash.task.col.prog':   { zh: '进度', en: 'Progress' },
    'dash.task.col.bud':    { zh: '预算', en: 'Budget' },
    'dash.task.col.status': { zh: '状态', en: 'Status' },
    'dash.ord.title':       { zh: '📑 近期订单 / 财务流水', en: '📑 Recent orders / financial activity' },
    'dash.ord.export':      { zh: '导出账单 →', en: 'Export bill →' },
    'dash.ord.col.id':      { zh: '订单 ID', en: 'Order ID' },
    'dash.ord.col.type':    { zh: '类型', en: 'Type' },
    'dash.ord.col.desc':    { zh: '描述', en: 'Description' },
    'dash.ord.col.amt':     { zh: '金额', en: 'Amount' },
    'dash.ord.col.time':    { zh: '时间', en: 'Time' },
    'dash.ord.col.status':  { zh: '状态', en: 'Status' },
    'dash.dev.status.cap':  { zh: '采集中', en: 'Capturing' },
    'dash.dev.status.low':  { zh: '低速',   en: 'Slow' },
    'dash.dev.status.off':  { zh: '离线',   en: 'Offline' },
    'dash.task.status.ok':  { zh: '正常',   en: 'OK' },
    'dash.task.status.warn':{ zh: '告警',   en: 'Alert' },
  };

  /* ===== State / API ===== */
  const KEY = 'dl_lang';
  const state = {
    lang: (localStorage.getItem(KEY) === 'en') ? 'en' : 'zh',  // default ZH
  };

  function t(key) {
    const entry = DICT[key];
    if (!entry) return key;
    return entry[state.lang] ?? entry.en ?? key;
  }

  function applyTo(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!DICT[key]) return;
      el.textContent = t(key);
    });
    (root || document).querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (!DICT[key]) return;
      el.innerHTML = t(key);
    });
    (root || document).querySelectorAll('[data-i18n-attr]').forEach(el => {
      // Format: "attr:key,attr2:key2"
      const spec = el.getAttribute('data-i18n-attr') || '';
      spec.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key && DICT[key]) el.setAttribute(attr, t(key));
      });
    });
    // <title data-i18n-title="key">
    const titleEl = document.querySelector('title[data-i18n-title]');
    if (titleEl) {
      const k = titleEl.getAttribute('data-i18n-title');
      if (DICT[k]) titleEl.textContent = t(k);
    }
  }

  function setLang(lang) {
    state.lang = (lang === 'zh') ? 'zh' : 'en';
    localStorage.setItem(KEY, state.lang);
    document.documentElement.setAttribute('lang', state.lang === 'zh' ? 'zh-CN' : 'en');
    document.documentElement.setAttribute('data-lang', state.lang);
    applyTo(document);
    updateToggle();
    // notify listeners (e.g. for re-rendering dynamic cards)
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: state.lang } }));
  }

  function injectToggle() {
    const nav = document.querySelector('.nav-cta');
    if (!nav) return;
    if (nav.querySelector('.lang-toggle')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', 'Toggle language');
    btn.addEventListener('click', () => setLang(state.lang === 'en' ? 'zh' : 'en'));
    nav.insertBefore(btn, nav.firstChild);
    updateToggle();
  }

  function updateToggle() {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      // Show what you'd switch TO
      btn.innerHTML = state.lang === 'en'
        ? '<span class="lang-flag">🌐</span><span class="lang-label">中文</span>'
        : '<span class="lang-flag">🌐</span><span class="lang-label">EN</span>';
      btn.setAttribute('data-current', state.lang);
    });
  }

  function init() {
    document.documentElement.setAttribute('lang', state.lang === 'zh' ? 'zh-CN' : 'en');
    document.documentElement.setAttribute('data-lang', state.lang);
    injectToggle();
    applyTo(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ===== Export ===== */
  window.I18N = {
    t,
    get lang() { return state.lang; },
    setLang,
    apply: applyTo,
    dict: DICT,
  };
})();
