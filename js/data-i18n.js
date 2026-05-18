/* ============================================================
 * Dolphin Lynxi · data EN translations
 * Map original Chinese data records (data.js) → English by ID.
 * Used by app.js render functions when I18N.lang === 'en'.
 * ============================================================ */
(function () {
  'use strict';

  // -------- Datasets (24) --------
  const datasetsEn = {
    'DLX-DS-1001': { name: 'Barista · Latte Art',                 description: 'Captured at partner specialty coffee shops — espresso extraction, milk foaming, tulip / heart / swan latte-art. Includes hand motion from senior certified baristas.' },
    'DLX-DS-1002': { name: 'Fold T-shirt · Cotton Tee',           description: 'Top-3 on LeRobot ACT / π0 / GR00T public benchmarks. Covers cotton, chiffon, linen × 5 prints, wrinkled / un-wrinkled states.' },
    'DLX-DS-1003': { name: 'PCB SMT Component Pick',              description: 'Captured at a top-tier EMS plant in Shenzhen, 0402/0603/0805 packages. Includes training samples tolerating 0.1mm-level positioning error.' },
    'DLX-DS-1004': { name: 'Parcel Sort · Small Packages',        description: 'Captured at a partner logistics sortation hub. Envelopes / boxes / irregulars across 4 zones (A/B/C/D).' },
    'DLX-DS-1005': { name: 'Desktop Tidy · Cluttered Scene',      description: '200 real-home desktops × 3 clutter levels. Each episode: 8-15 objects with semantic zone annotation.' },
    'DLX-DS-1006': { name: 'Claw Machine · Plush Grab',           description: 'Captured at multiple claw-machine arcades. Spring / gravity / hinged claw types with success annotations.' },
    'DLX-DS-1007': { name: 'Herbal Sort · Morphology Recognition',description: 'Joint capture with a TCM partner institution. 21 common herbs sorted into 4 grades (whole / broken / moldy / pest). 200+ samples each.' },
    'DLX-DS-1008': { name: 'Hotpot Tripe · 7-Up-8-Down Rhythm',   description: 'Co-developed with a leading hotpot chain. Standard tripe blanching rhythm. Robust to steam/vapor visual interference.' },
    'DLX-DS-1009': { name: 'Convenience Restock',                 description: 'Co-developed with a leading convenience-store chain. Drinks / instant-noodles / liquor shelves. FIFO placement strategy annotated.' },
    'DLX-DS-1010': { name: 'Screwdriving · M3-M8 Multi-spec',     description: '6 specs × 3 materials (carbon / stainless / aluminum) × 4 torque levels. 200 negatives (stripped, slipped).' },
    'DLX-DS-1011': { name: 'Fold Towel · Hotel 4-Fold',           description: 'Demonstrated by international hotel-chain housekeepers. 4-fold / 3-fold / roll. Bath / face / hand-towel size variants.' },
    'DLX-DS-1012': { name: 'Dual-Arm · Open Bottle Cap',          description: '20 cap types — twist / pull-ring / flip / vacuum. Includes 80 failure-recovery strategies.' },
    'DLX-DS-1013': { name: 'Surgical Tool Handoff · Laparoscopy', description: 'Captured with a top-tier partner hospital\'s minimally-invasive surgery unit. 14 instruments per delivery protocol. [Medical device certification in progress]' },
    'DLX-DS-1014': { name: 'Bubble-Tea Cup Sealing',              description: 'Captured at partner tea-chain stores. Irregular cups / flat-rim / topping-filled variants.' },
    'DLX-DS-1015': { name: 'Electronics Packing · EVA Inserts',   description: 'Joint capture with a (confidential) TWS earbud brand. 4 SKU packing SOPs.' },
    'DLX-DS-1016': { name: 'Make Bed · Sheets & Duvet',           description: '1.5m × 2m mattress, cotton / silk / brushed. Corner tucking + flatten-out full flow.' },
    'DLX-DS-1017': { name: 'Ikebana · Three Heaven-Earth-Human',  description: 'Co-developed with a floral-art partner organisation. 3 ICH inheritors demo the Three (heaven/earth/human) primary branches.' },
    'DLX-DS-1018': { name: 'Wipe Table · Coffee-Stain Cleanup',   description: '120 tables × 5 soiling levels. Spiral / linear / Z-shape wiping trajectories compared.' },
    'DLX-DS-1019': { name: 'LEGO Build · 8-Step Method',          description: '15 LEGO classic sets disassembled and labeled with ≤8-step build sequences.' },
    'DLX-DS-1020': { name: 'Fruit Slicing · Apples & Oranges',    description: '4 fruits × 2 knife types. Safety-envelope annotated. Comes with knife-grip module.' },
    'DLX-DS-1021': { name: 'Lens Wipe · Anti-fog Cloth',          description: 'Captured at a partner optical-chain training center. Resin / glass / blue-light lens wiping pressure curves.' },
    'DLX-DS-1022': { name: 'Bookshelf Sort · By Color',           description: '50 books × 6 colors. Beginner-friendly for VLA training, includes instruction-tuned text prompts.' },
    'DLX-DS-1023': { name: 'Hotel Tray Arrangement',              description: 'Standard room SOP at a 5-star hotel. Coffee cup / sugar / cream / tray 5-piece placement.' },
    'DLX-DS-1024': { name: 'Dual-Arm · Fold Parcel Box',          description: 'Fold/seal flow for 4 box sizes with tape-application force control.' },
  };

  // -------- Tasks (12) --------
  const tasksEn = {
    'TASK-2001': { title: 'Chinese Noodle Pulling · Capture',      client: 'Major restaurant chain', description: 'Reproduce hand-pulled noodle motion. Dual-arm sync ≤5ms, full force data required.' },
    'TASK-2002': { title: 'Dishwasher Loading Strategy',           client: 'Top white-goods brand',  description: 'Optimal in-rack placement strategies for 5 dish types across 3 dishwasher models.' },
    'TASK-2003': { title: 'Fold-Clothes · Crowd Verification',     client: 'Dolphin platform',       description: 'Score completion 0-100 + 1-of-5 failure-cause label on DLX-DS-1002 episodes.' },
    'TASK-2004': { title: '[Exclusive] 3C Factory Load/Unload SOP',client: 'Top-3 EMS plant',        description: 'Joint capture at 2 plants (Shenzhen / Suzhou). 200 stations standard motions + 30+ exception cases. Bidding open to certified vendors only.' },
    'TASK-2005': { title: 'Pet Feeding Bowl Placement',            client: 'Pet smart-home brand',   description: 'Bowl placement + avoidance strategies when pets approach.' },
    'TASK-2006': { title: 'Object Segmentation · Crowd Labeling',  client: 'Dolphin in-house + Lingchu', description: 'Mask 100 common home-scene object classes for VLA pre-training.' },
    'TASK-2007': { title: 'Chinese-Food Takeaway Boxing',          client: 'Food-delivery platform', description: 'Reproduce real takeaway packaging — main dish, soup sealing, utensil insertion. 30 dishes.' },
    'TASK-2008': { title: '[Inquiry] Eldercare Feeding Robot',     client: 'Provincial eldercare group', description: 'On-site capture across 20 facilities, ~500k dataset scale. Submit custom proposal for bidding.' },
    'TASK-2009': { title: 'Convenience-Store Checkout',            client: 'Leading convenience chain', description: 'Scan / weigh / pay across 1500 SKUs.' },
    'TASK-2010': { title: '[Negatives] Industrial Screw Failures', client: 'Dolphin in-house',       description: 'Add negatives to DLX-DS-1010: label 8 failure modes (stripped, slipped, misaligned, jammed, etc.).' },
    'TASK-2011': { title: 'Ikebana · Festival Themes',             client: 'Floral-art partner organisation', description: 'Spring Festival / Mid-Autumn / wedding etc. — 6 themes × 25 episodes with instruction-tuned descriptions.' },
    'TASK-2012': { title: '[Major] Logistics Stress / Damage',     client: 'Top logistics company',  description: 'Capture extreme conditions (damaged / smeared labels / crushed packages) for VLA robustness.' },
  };

  // -------- Devices (6) --------
  const devicesEn = {
    'DEV-3006': { name: 'Lynxi EXO · Leader-Follower Exoskeleton', category: 'EXO exoskeleton',  status: 'In stock',
      features: ['🦾 Single-arm · 7 DOF · force feedback ±5N','🤲 Dual-arm · 5GHz sync','🧍 Half-body humanoid · 14+3 DOF','🧤 Tactile gloves · 16-channel fingertip force (optional)','Teleop latency < 5ms · works with all mainstream arms'],
      desc: 'One product line covering single-arm / dual-arm / half-body humanoid + optional tactile gloves. Wearable "exo arm" with 1:1 motion mapping. Co-developed with multiple leading humanoid robot OEMs.' },
    'DEV-3013': { name: 'Lynxi VR-Pro · Handle Teleop Kit',  category: 'VR controllers',          status: 'In stock',
      features: ['Meta Quest 3 / PICO 4 compatible','6-DOF dual-handle tracking','Handle → arm pose mapping','30Hz sync capture'],
      desc: 'Low-cost teleop using consumer VR. Quest 3 + Dolphin adapter — start high-quality capture out of the box.' },
    'DEV-3014': { name: 'Lynxi Vision-XR · Vision Pro Kit', category: 'XR immersive teleop',     status: 'Pre-order',
      features: ['Apple Vision Pro fully supported','Eye + hand tracking dual input','Immersive stereoscopic teleop','Dual-arm sync supported'],
      desc: 'High-fidelity teleop via Vision Pro eye + gesture tracking. No extra controllers. Pro-grade capture, 3× precision over conventional handles.' },
  };

  // -------- Courses (5) --------
  const coursesEn = {
    'EDU-4001': { title: 'Zero-to-Hero · 3 Days on Robot Arms', format: 'On-site · Shanghai', duration: '3 days / 24h', priceLabel: 'Inquire',
      desc: 'For complete beginners. Day 1: get hands-on. Day 2: capture. Day 3: train your own small model.' },
    'EDU-4002': { title: 'ACT Imitation Learning · Hands-on',    format: 'Online · self-paced',  duration: '12 sessions',
      desc: 'LeRobot ACT algorithm explained line-by-line, paired with Dolphin in-house datasets for training.' },
    'EDU-4003': { title: 'Dataset Quality Auditor Certification', format: 'Online + on-site',    duration: '4 weeks',
      desc: 'Official Dolphin Lynxi QC certification. Pass → take on platform QC crowd-jobs, paid per task.' },
    'EDU-4004': { title: 'Enterprise Capture Team Enablement',   format: 'On-site consulting',   duration: '8 weeks',  priceLabel: 'Inquire',
      desc: 'Build an in-house capture team from 0 to 1 for enterprise customers — complete hiring criteria / SOP / toolchain delivery package.' },
    'EDU-4005': { title: 'VLA Fine-tuning Bootcamp',             format: 'On-site bootcamp',     duration: '4 weeks',
      desc: 'For LeRobot-experienced engineers. Graduates can independently fine-tune VLA models for any vertical.' },
  };

  // -------- Skills (8) --------
  const skillsEn = {
    'SKILL-5001': { name: 'Fold T-Shirt Skill Pack v2.1', desc: 'LeRobot π0 fine-tune, covering 4 fabric types × 5 prints. 20Hz closed-loop inference.', license: 'Commercial', requires: 'Dolphin-Dual' },
    'SKILL-5002': { name: 'Latte Art Skill Pack',         desc: 'ACT v2 fine-tune. 92.4% tulip-art success. Built for specialty-cafe deployment.',     license: 'Commercial', requires: 'Dolphin-Arm + espresso module' },
    'SKILL-5003': { name: 'Parcel Sort Skill Pack',       desc: 'GR00T fine-tune, 96.8% success on 4-zone sort. Fully open + LeRobot format.',         license: 'Apache 2.0 (open-source)', requires: 'Dolphin-Arm or compatible' },
    'SKILL-5004': { name: 'Industrial Screwdriving',      desc: '6 specs × 3 materials × 4 torque levels with auto-retry on failures. Built for EMS factory scenarios.', license: 'Enterprise license', requires: 'Dolphin-Arm+Pro · with tactile skin' },
    'SKILL-5005': { name: 'Hotpot Tripe Pick · Skill',    desc: 'Co-tuned with a leading hotpot chain. Standard 7-up-8-down rhythm with steam-robustness boost.',    license: 'Commercial', requires: 'Dolphin-Arm' },
    'SKILL-5006': { name: 'Convenience-Store Checkout',   desc: 'SmolVLA lightweight inference (edge-deployable). Generic 1500-SKU scan model.',       license: 'Apache 2.0 (open-source)', requires: 'Dolphin-Dual' },
    'SKILL-5007': { name: 'Fold & Seal Parcel Box',       desc: 'Generic across 4 box sizes with tape-application force control. Built for warehouse-hub deployment.', license: 'Commercial', requires: 'Dolphin-Dual' },
    'SKILL-5008': { name: 'Ikebana · Three Heaven-Earth-Human (Intro)', desc: 'Beginner-level Zen ikebana with generative strategy for the three primary branches. Academy discount available.', license: 'Creative license', requires: 'Dolphin-Arm' },
  };

  // -------- Open-source datasets (12) --------
  const ossEn = {
    'OXE':         { name: 'Open X-Embodiment',           org: 'Google DeepMind + 22 labs',   license: 'Apache 2.0',          scale: '1M+ trajectories', metric: '22 robot embodiments',
                     desc: 'The "ImageNet moment" of robotics. Aggregated by 22 global labs; RT-X / OpenVLA / Octo / π0 / RDT are pre-trained from this.' },
    'AgiBotWorld': { name: 'AgiBot World Beta',           org: 'AgiBot · Shanghai',           license: 'CC BY-NC-SA 4.0',     scale: '1M+ trajectories', metric: '2,976h · 100 G1 units',
                     desc: 'China\'s ImageNet moment. 4,000-m² data factory + 100 G1 humanoids + hundreds of "robot nannies". Long-horizon data 10× the scale of OXE.' },
    'DROID':       { name: 'DROID',                       org: 'Stanford + Berkeley + 13 labs', license: 'CC-BY 4.0',         scale: '76k trajectories · 350h', metric: '564 real scenes',
                     desc: '18 labs, 12 months of joint capture. Franka + ZED + Quest 2 unified hardware. Half of π0 / π0.5\'s gains come from DROID fine-tuning.' },
    'LeRobot':     { name: 'LeRobot Hub',                 org: 'HuggingFace + Pollen Robotics', license: 'Mixed',             scale: '26,991 datasets', metric: 'Largest HF category',
                     desc: 'ROS is the engineer\'s protocol; LeRobot is the ML + enthusiast protocol. 22.7k GitHub stars · ICLR 2026 accepted · 96 new datasets daily.' },
    'RoboMIND':    { name: 'RoboMIND 2.0',                org: 'National Embodied-AI Innovation Center', license: 'Academic free-apply', scale: '310k trajectories', metric: '12k tactile sequences',
                     desc: 'Certified by China\'s National Data Bureau as a "high-quality dataset exemplar". Multi-embodiment + tactile, first choice for Chinese-scenario research.' },
    'NVIDIA-GR00T':{ name: 'NVIDIA Physical AI / GR00T',  org: 'NVIDIA',                      license: 'Partial on HuggingFace', scale: '24k sim + 1,700h driving', metric: 'GR00T base training',
                     desc: 'Jensen at CES 2025: "If you don\'t have data, create it." Cosmos generated 780k trajectories in 11 hours — equivalent to 9 months of human demos.' },
    '1X-World':    { name: '1X World Model (1xgpt)',      org: '1X Technologies',             license: 'Apache 2.0',          scale: '100+ hours',       metric: 'EVE first-person',
                     desc: 'One of the few truly-open commercial humanoid datasets. EVE robot first-person video for world-model pre-training.' },
    'SynGrasp':    { name: 'SynGrasp-1B',                 org: 'Galbot',                      license: 'Academic free',       scale: '1B frames',        metric: 'Vision-Language-Action pairs',
                     desc: 'The purely-synthetic path taken to the extreme. 1B VLA pairs — currently the largest synthetic dataset.' },
    'ALOHA':       { name: 'ALOHA / Mobile ALOHA',        org: 'Stanford · Tony Zhao',        license: 'MIT',                 scale: '50 episodes / task', metric: 'ACT paper supplement',
                     desc: '"Dataset anxiety belongs to companies, not you." 50 demos per task can train dual-arm folding clothes, lacing shoes, zipping.' },
    'Fourier-Action': { name: 'Fourier ActionNet',        org: 'Fourier Intelligence',        license: 'Proprietary',         scale: '30k+ real-robot',  metric: 'GR-1/GR-2 full blueprints',
                     desc: 'A hardcore Chinese open-source example: not only open data, but also full robot-body blueprints.' },
    'RH20T':       { name: 'RH20T',                       org: 'SJTU · Qiongche Intelligence', license: 'CC-BY 4.0',          scale: '110k trajectories', metric: '147 tasks · with tactile',
                     desc: 'A rare open dataset that includes tactile data. Multi-task + multi-embodiment + tactile — essential for tactile researchers.' },
    'OpenLoong':   { name: 'OpenLoong',                   org: 'National Innovation Center',  license: 'Commercial OK',        scale: 'Loong humanoid',   metric: 'Body + data both open',
                     desc: 'National-team-led fully-open humanoid project. Robot body design + training data + control framework all open.' },
  };

  // -------- Scene / vendor / arm constants (Chinese → English) --------
  const sceneEn = {
    '餐饮': 'F&B', '家庭服务': 'Home service', '工业制造': 'Industrial',
    '物流仓储': 'Logistics', '医疗医药': 'Medical', '零售连锁': 'Retail chain',
    '服务连锁': 'Service chain', '教育': 'Education', '教育玩具': 'Edu toys',
    '艺术文创': 'Arts', '清洁服务': 'Cleaning', '精细服务': 'Precision',
    '娱乐零售': 'Entertainment', '通用': 'General',
  };
  const vendorEn = {
    '海豚自营': 'Dolphin in-house',
    '精选合集': 'Curated collection',
    '众包采集': 'Crowdsourced',
  };
  const armEn = { 'single': 'Single-arm', 'dual': 'Dual-arm' };

  // -------- Tag translation (best-effort, used by ds-card / skill-card) --------
  const tagEn = {
    '柔性液体': 'Soft liquid', 'VLA适用': 'VLA-ready', 'SOTA数据': 'SOTA',
    '双臂协同': 'Dual-arm coord', '柔性物体': 'Soft objects', '高难度': 'Hard',
    '工业级': 'Industrial', '精密': 'Precision', '力觉反馈': 'Force feedback',
    '精选收录': 'Featured', '物流': 'Logistics', '高节拍': 'High-cadence',
    '众包': 'Crowdsourced', '趣味场景': 'Fun scene', '视觉抓取': 'Visual grasp',
    '医药级': 'Medical-grade', '形态学': 'Morphology', '长程任务': 'Long-horizon',
    '开放场景': 'Open scene', '艺术': 'Arts', '创意': 'Creative', '小众高质': 'Niche-quality',
    '零售': 'Retail', '双臂': 'Dual-arm', '酒店服务': 'Hotel service', '酒店标准': 'Hotel SOP',
    '家政标准': 'Housekeeping SOP', '医疗级': 'Medical-grade', '无菌环境': 'Sterile env',
    '超高价值': 'Premium', '连锁餐饮': 'F&B chain', '入门友好': 'Beginner-friendly',
    '分类': 'Classification', '安全标注': 'Safety annotated', '刀具操作': 'Knife operation',
    '餐饮': 'F&B', '清洁': 'Cleaning', '闭环反馈': 'Closed-loop feedback',
    '精细操作': 'Fine manipulation', '小众': 'Niche', '力觉': 'Force', '网红场景': 'Trending',
    '大尺寸柔性': 'Large deformable', '教育': 'Education', '触觉': 'Tactile',
    // OSS tags
    'VLA 预训练': 'VLA pre-training', '跨本体': 'Cross-embodiment', 'ImageNet 时刻': 'ImageNet moment',
    '国产首发': 'CN first', '人形机器人': 'Humanoid', '大规模': 'Large-scale',
    '野外采集': 'In the wild', 'π0 微调': 'π0 fine-tune', 'in-the-wild': 'In the wild',
    '社区爆炸': 'Community boom', '一键上下': 'One-click upload',
    '国家队': 'National team', '含触觉': 'With tactile', '中文场景': 'Chinese scenes',
    '合成数据': 'Synthetic data', '世界模型': 'World model', 'GR00T 基座': 'GR00T base',
    '商业开源': 'Commercial OSS', '人形 EGO': 'Humanoid EGO',
    '超大规模': 'Ultra-large', '另一条路': 'Alternative path',
    'ACT 经典': 'ACT classic', '小数据 work': 'Small-data', '双臂遥操': 'Dual-arm teleop',
    '国产': 'Made in China', '开数据 + 开硬件': 'Open data + open hardware',
    '多任务': 'Multi-task', '多本体': 'Multi-embodiment',
    '人形': 'Humanoid', '软硬全开': 'Soft+hard open',
  };

  function localize(item, kind) {
    if (!item) return item;
    if (!window.I18N || window.I18N.lang !== 'en') return item;
    const out = Object.assign({}, item);

    if (kind === 'dataset') {
      const en = datasetsEn[item.id]; if (en) Object.assign(out, en);
      if (out.scene  && sceneEn[out.scene])  out.scene  = sceneEn[out.scene];
      if (out.vendor && vendorEn[out.vendor]) out.vendor = vendorEn[out.vendor];
      if (Array.isArray(out.tags)) out.tags = out.tags.map(t => tagEn[t] || t);
    } else if (kind === 'task') {
      const en = tasksEn[item.id]; if (en) Object.assign(out, en);
      if (out.scene && sceneEn[out.scene]) out.scene = sceneEn[out.scene];
    } else if (kind === 'device') {
      const en = devicesEn[item.id]; if (en) Object.assign(out, en);
    } else if (kind === 'course') {
      const en = coursesEn[item.id]; if (en) Object.assign(out, en);
    } else if (kind === 'skill') {
      const en = skillsEn[item.id]; if (en) Object.assign(out, en);
      if (out.scene && sceneEn[out.scene]) out.scene = sceneEn[out.scene];
    } else if (kind === 'oss') {
      const en = ossEn[item.id]; if (en) Object.assign(out, en);
      if (Array.isArray(out.tags)) out.tags = out.tags.map(t => tagEn[t] || t);
    }
    return out;
  }

  function localizeValue(v, dictName) {
    if (!window.I18N || window.I18N.lang !== 'en') return v;
    const dict = { scene: sceneEn, vendor: vendorEn, arm: armEn, tag: tagEn }[dictName];
    return (dict && dict[v]) || v;
  }

  window.DOLPHIN_I18N = {
    localize,
    localizeValue,
    isEn() { return window.I18N && window.I18N.lang === 'en'; },
    sceneEn, vendorEn, armEn, tagEn,
  };
})();
