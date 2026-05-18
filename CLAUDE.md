# dolphinlynxi_index — AI 协作指引

## 项目定位（铁律）
**具身智能数据资产的运营商** / **Embodied-AI data-asset operator**

任何"数据服务商" / "data provider / service provider" 都是旧文案，**必须改回**新定位。

---

## 自动部署偏好（本项目专属）

本项目编辑后**自动 scp 部署**到生产，不需要等用户说"上传"。原因：静态站点 + 无在线用户 + 无 WS 长连，覆盖无副作用。

**远端目录**: `root@47.93.99.250:/www/wwwroot/robot.box2ai.com/datasets/`
**公网 URL**: <https://robot.box2ai.com/datasets/>
**主域不要碰**: `/www/wwwroot/robot.box2ai.com/`（这是 box2robot-app 前端，跟本项目不是一个东西）

**禁止部署的文件**：
- `README.md` / `CLAUDE.md`（本地工程文件，不上线）
- `backup/`（本地备份目录）
- `node_modules/` / `.git/` / `*.bak.*` / `.vscode/`

---

## 上传流程（每次必走的 5 步 · 含可粘贴命令）

### Step 1 · Baseline 检查
对每个要推的文件，**本地行数应 ≥ 远端行数**（或差异是本次预期改动）。本地远小于远端 = 回退版，**禁止推**。

```bash
echo "=== LOCAL ==="
wc -l F:/Box2Robot/dolphinlynxi_index/<file1> F:/Box2Robot/dolphinlynxi_index/<file2>
echo "=== REMOTE ==="
ssh -q root@47.93.99.250 "wc -l /www/wwwroot/robot.box2ai.com/datasets/<file1> /www/wwwroot/robot.box2ai.com/datasets/<file2>"
```

差异 ≠ 预期改动 → 停下来排查，不要硬推。

### Step 2 · 远端备份
带时间戳后缀，可回滚。

```bash
ssh -q root@47.93.99.250 "cd /www/wwwroot/robot.box2ai.com/datasets && TS=\$(date +%Y%m%d_%H%M) && \
  cp <file1> <file1>.bak.\$TS && \
  cp <file2> <file2>.bak.\$TS && \
  echo backup TS=\$TS done"
```

图片批量备份用专门目录（防文件名冲突）：
```bash
ssh -q root@47.93.99.250 "cd /www/wwwroot/robot.box2ai.com/datasets && \
  TS=\$(date +%Y%m%d_%H%M) && \
  mkdir -p assets/devices/backup_\$TS && \
  cp assets/devices/*.jpg assets/devices/*.jpeg assets/devices/backup_\$TS/ 2>/dev/null && \
  echo backup_\$TS done"
```

### Step 3 · SCP 推送（只推改动文件）
**禁止 `scp -r` 全量同步**，会把本地工程文件 / 备份目录 / node_modules 一起塞过去。

单文件：
```bash
scp -q F:/Box2Robot/dolphinlynxi_index/<file> \
  root@47.93.99.250:/www/wwwroot/robot.box2ai.com/datasets/<file>
```

多文件（同目录可一次 scp）：
```bash
scp -q F:/Box2Robot/dolphinlynxi_index/js/i18n.js \
       F:/Box2Robot/dolphinlynxi_index/js/data.js \
       F:/Box2Robot/dolphinlynxi_index/js/app.js \
  root@47.93.99.250:/www/wwwroot/robot.box2ai.com/datasets/js/
```

图片批量：
```bash
scp -q F:/Box2Robot/dolphinlynxi_index/assets/search/*.png \
       F:/Box2Robot/dolphinlynxi_index/assets/search/*.jpg \
       F:/Box2Robot/dolphinlynxi_index/assets/search/*.jpeg \
  root@47.93.99.250:/www/wwwroot/robot.box2ai.com/datasets/assets/search/
```

如果远端目录不存在，先 `ssh ... "mkdir -p <dir>"`。

### Step 4 · 推后核验
```bash
# 远端行数 == 本地行数
ssh -q root@47.93.99.250 "wc -l /www/wwwroot/robot.box2ai.com/datasets/<file>"

# 关键字命中（确认是新版本，不是旧版本仍躺在那儿）
ssh -q root@47.93.99.250 "grep -c '<新版本特征关键字>' /www/wwwroot/robot.box2ai.com/datasets/<file>"

# 公网 200 OK（强刷绕缓存：URL 后面加 ?v=2）
curl -sI "https://robot.box2ai.com/datasets/<file>" | head -2
curl -sI "https://robot.box2ai.com/" | head -2          # 主域不能被波及
```

### Step 5 · 报告
对用户输出：改了哪些文件 / 远端行数 / 备份名 / 公网可访问。**不要无声完成**。

---

## 部署命令对账模板（直接套用）

把 `<files>` 改成实际文件，全套粘贴执行：

```bash
# A. Baseline
echo "=== LOCAL ===" ; wc -l F:/Box2Robot/dolphinlynxi_index/<files>
echo "=== REMOTE ===" ; ssh -q root@47.93.99.250 "wc -l /www/wwwroot/robot.box2ai.com/datasets/<files>"

# B. 备份 + 推 + 验证（一气呵成）
ssh -q root@47.93.99.250 "cd /www/wwwroot/robot.box2ai.com/datasets && TS=\$(date +%Y%m%d_%H%M) && for f in <files>; do cp \"\$f\" \"\$f.bak.\$TS\"; done && echo backup TS=\$TS done" && \
scp -q F:/Box2Robot/dolphinlynxi_index/<files> root@47.93.99.250:/www/wwwroot/robot.box2ai.com/datasets/<...dest> && \
ssh -q root@47.93.99.250 "wc -l /www/wwwroot/robot.box2ai.com/datasets/<files>" && \
curl -sI "https://robot.box2ai.com/datasets/" | head -2 && \
curl -sI "https://robot.box2ai.com/" | head -2
```

---

## 回滚（万一推错了）

每次部署都有 `*.bak.YYYYMMDD_HHMM` 备份，单条命令即可还原：

```bash
ssh -q root@47.93.99.250 "cd /www/wwwroot/robot.box2ai.com/datasets && \
  cp <file>.bak.<YYYYMMDD_HHMM> <file> && \
  echo rollback to <YYYYMMDD_HHMM> done"
```

找最近备份：
```bash
ssh -q root@47.93.99.250 "ls -t /www/wwwroot/robot.box2ai.com/datasets/<file>.bak.* | head -3"
```

---

## 远端 SSH 命令避坑

| 现象 | 原因 | 规避 |
|---|---|---|
| Exit code 1 但没有错误信息 | grep 没匹配返回 1 被 `&&` 链断 | 用 `\|\| true` 兜底；或换 `;` 分隔 |
| `OpenSSH post-quantum` 警告 | 协议提示，不是错误 | 加 `-q` 静音 |
| `venv/bin/python: No such file` | cwd 漂了 | 用绝对路径 |
| 单条 SSH > 30s | 多步串联接近 timeout | 拆多次 SSH 调用 |

**单条 SSH 命令保持 < 20s**，逼近 30s timeout 就拆开。

---

## 文件组织约定

| 类型 | 位置 | 规则 |
|---|---|---|
| 页面 | 根目录 `*.html` | 单页 ≤500 行；分 section 用 `<!-- ============ ① 标题 ============ -->` 注释 |
| 样式 | `css/style.css` | 1 个文件全站共用；末尾有 mobile patch 区（@900px / @680px） |
| 文案 | `js/i18n.js` | 双语字典 `{ zh, en }`；新增 key 必须同步两个键 |
| 数据 | `js/data.js` + `js/data-i18n.js` | 中文是主数据源，英文按 ID override |
| 渲染 | `js/app.js` | `renderDatasetCard / renderDeviceCard / renderTaskCard / renderCourseCard` 等纯函数 |

---

## 响应式断点

| 断点 | 适配场景 | 主要变化 |
|---|---|---|
| @1280px | 大屏 | TOC 隐藏 |
| @1100px | 笔记本 | grid-4 → 2, dash-grid → 单列, flow-wrap → 单列 |
| @900px | 平板 | 内联多列 grid 兜底（属性选择器 + !important） |
| @680px | 手机 | 单列 + padding 收敛 + table 横滚 + 字体缩小 |
| @420px | 小手机 | footer 单列 |

**行内 grid 兜底**: 当 HTML 内有 `style="display:grid;grid-template-columns:..."` 时，CSS 中用 `[style*="..."]` 属性选择器 + `!important` 覆盖，集中放在 `style.css` 末尾的"手机适配补丁"区。

---

## 价格 / 积分隐藏（铁律）

**全站不展示**任何价格符号（¥/$/€）和积分（credits / 积分）。

CSS 已隐藏的类（继续使用）：
```css
.eco-price, .ds-card-price, .device-card-price,
.course-price, .skill-price, .dataset-price,
.task-card-reward
```

新增价格元素时直接套用上面任一类即可。如果是行内文本中的价格（例如 `Dolphin-Mini from ¥1,299`），必须**删除整段价格描述**，不能用 CSS 解决。

旧 i18n key 留着无伤大雅（不渲染就不显示），新写文案就不要带价格了。

---

## 重要 i18n 键索引

| 键前缀 | 用途 |
|---|---|
| `nav.*` | 顶部导航 |
| `home.*` | 首页 |
| `home.hero.*` | 首页 Hero |
| `home.svc.*` | 首页"我们提供的服务"4 张卡 |
| `home.why.*` | 首页"为什么选我们" |
| `products.p1/p2/p3/p4.*` | 产品页 4 板块（数据集/工具链/设备/生态） |
| `products.p2.flow.*` | 工具链三步走（采集接入 / 加工提质 / 训练交付） |
| `dev.s1/s2/s3/s4/s5.*` | 开发者页 5 板块 |
| `about.s1/s2/s3.*` | 关于页 3 板块 |
| `footer.*` | 底部 |
| `common.*` | 跨页面通用（按钮/单位/场景标签） |

---

## 设备图重新生成

如果 `gpt_image_gen2.py` 网关不可用（`model_not_found`），改用：

```bash
cd F:/Box2Robot
PYTHONIOENCODING=utf-8 python scripts/doubao_image_gen.py --filter device
```

MANIFEST 在脚本里写死了 7 张设备图的 prompt（exo-arm / exo-glove / vr-pro / vision-xr / ego-kit / mocap-pro / mocap-lite），生成完直接覆盖 `assets/devices/`，会自动裁底部 12% 水印。

替换前必须先备份到 `assets/devices/backup_YYYYMMDD/`。

---

## 常见错误避坑

1. **行数对比**：local < remote 大概率是回退版，**禁止推**
2. **属性选择器**：CSS 用 `[style*="..."]` 时空格要 1:1 对应 HTML 的内联样式
3. **i18n 漏 key**：在 HTML 加新的 `data-i18n="x.y"` 必须在 i18n.js 加对应键
4. **路径大小写**：Windows 不区分，Linux 区分 — 远端 `EXO.png` 必须大写
5. **CDN 缓存**：刷新看效果用 `Ctrl+Shift+R` 强刷绕缓存

---

## 服务器位置速查

```bash
# SSH 进远端
ssh -q root@47.93.99.250

# 远端路径
cd /www/wwwroot/robot.box2ai.com/datasets/

# 备份目录
ls *.bak.* | tail   # 文件备份
ls assets/devices/backup_*  # 图片批量备份

# 主域不要碰（box2robot-app）
ls /www/wwwroot/robot.box2ai.com/    # 这里是另一个项目
```

---

## 联系开发者

需要更复杂的 CMS / 后台 / 真实数据接入，找 `plumpost@sina.com`
