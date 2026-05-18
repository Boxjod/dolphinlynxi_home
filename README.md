# 海豚灵汐官网 · Dolphin Lynxi Index

**具身智能数据资产的运营商** · 数据如潮，灵汐而至
**Embodied-AI data-asset operator** · Data flows like tide

线上地址: <https://robot.box2ai.com/datasets/>

---

## 项目简介

海豚灵汐官网静态站点，7 个 HTML 页面构成的双语（中文/英文）品牌主站。无构建工具、无后端依赖，纯 HTML/CSS/原生 JS。

| 页面 | 入口 | 内容 |
|---|---|---|
| 首页 | `index.html` | Hero · 我们提供的 4 项服务 · 优势 · 数据 · 合作伙伴 |
| 产品 | `products.html` | ① 数据集 ② 灵汐工具链（三步走） ③ 数采设备矩阵 ④ 兼容硬件生态 |
| 开发者中心 | `developer.html` | 一站式平台 · 技能商店 · 入门级机械臂 · 开源数据集 · 培训学院 |
| 数据集市场 | `marketplace.html` | 24 个数据集筛选与浏览 |
| 任务大厅 | `tasks.html` | 12 个数采 / 标注 / 质检任务 |
| 后台演示 | `dashboard.html` | 数据驾驶舱 mockup（仅 UI 演示） |
| 关于我们 | `about.html` | 公司简介 · 招聘 · 联系方式 |

---

## 目录结构

```
dolphinlynxi_index/
├── *.html                    # 7 个页面
├── css/
│   └── style.css             # 全站样式（含响应式 + 价格隐藏 CSS）
├── js/
│   ├── i18n.js               # 中英双语字典（zh/en）
│   ├── data.js               # 24 数据集 + 12 任务 + 6 设备 + 课程（中文）
│   ├── data-i18n.js          # 上述数据的英文映射（按 ID 匹配）
│   └── app.js                # 渲染函数 + 筛选 + 抽屉
├── assets/
│   ├── logo.png              # 品牌 logo
│   ├── devices/              # 自营设备图（EXO / EGO / VR / MoCap …）
│   ├── search/               # 服务/设备主图（5 张）
│   ├── scenes/               # 场景图（物流 / 工业 / 家庭 / 医疗）
│   ├── datasets-feat/        # 24 个数据集封面
│   └── research/             # 第三方生态参考图
├── backup/                   # 本地改动备份（带日期后缀）
├── README.md                 # 本文件
└── CLAUDE.md                 # AI 开发协作指引
```

---

## 本地开发

无需安装，启动一个静态服务器即可：

```bash
cd F:/Box2Robot/dolphinlynxi_index
python -m http.server 5500
# 浏览器访问 http://localhost:5500/
```

调试响应式：Chrome DevTools 切设备模式 → iPhone 12（390×844）。

---

## 部署到生产

> ⚠️ 部署到 `/www/wwwroot/robot.box2ai.com/datasets/`，**不影响主域 `/`**（box2robot-app 前端在根目录）

```bash
# 1. baseline 检查（防回退版）
wc -l <local-file>
ssh -q root@47.93.99.250 "wc -l /www/wwwroot/robot.box2ai.com/datasets/<remote-file>"

# 2. 备份远端
ssh -q root@47.93.99.250 "cd /www/wwwroot/robot.box2ai.com/datasets && TS=\$(date +%Y%m%d_%H%M) && cp <file> <file>.bak.\$TS"

# 3. 推送
scp -q <local-file> root@47.93.99.250:/www/wwwroot/robot.box2ai.com/datasets/<file>

# 4. 验证
curl -sI "https://robot.box2ai.com/datasets/" | head -2
curl -sI "https://robot.box2ai.com/" | head -2
```

**部署前检查清单**：
- 本地行数 ≥ 远端行数（或差异为本次改动）
- 备份完成（`*.bak.YYYYMMDD_HHMM`）
- 不要部署 `README.md` / `CLAUDE.md` / `backup/`

---

## 双语与文案

- **i18n 字典**: `js/i18n.js`，键值 `{ zh: '...', en: '...' }`
- **数据驱动**: `js/data.js` 中文为主，`js/data-i18n.js` 提供 EN override（按 ID 匹配）
- HTML 中标记: `data-i18n="key"` / `data-i18n-html="key"` / `data-i18n-title="key"`
- 默认语言: 英文（导航栏右上角切换）

---

## 图片资产策略

- **官方设备图**: 使用 `scripts/doubao_image_gen.py` (火山方舟 Seedream 4.5) 批量生成
- **手工补图**: 直接放到 `assets/search/` 或对应分类文件夹
- 命名约定: 小写连字符 (`exo-arm.jpg` / `mocap-pro.jpg`)
- 替换图片**前先备份**到 `assets/devices/backup_YYYYMMDD/`

---

## 价格与积分

全站不展示价格（¥/$/€）和积分（credits）。`css/style.css` 中用类隐藏：

```css
.eco-price, .ds-card-price, .device-card-price,
.course-price, .skill-price, .dataset-price,
.task-card-reward { display: none !important; }
```

新增卡片时如果包含价格元素，沿用上述类即可自动隐藏；如果是行内文本中的价格，需要直接删除文本。

---

## 联系

`plumpost@sina.com` · 上海·闵行
