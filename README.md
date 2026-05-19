# 海豚灵汐官网 · Dolphin Lynxi Home

**具身智能数据资产的运营商**
**Embodied-AI data-asset operator**

线上地址: <https://robot.box2ai.com/datasets/>

---

## 当前阶段

仓库现在进入第一阶段重构：

- 根目录仍保留现有静态品牌站页面
- `web/` 用作 React + TypeScript + Next.js 平台壳
- `services/api/` 新增 Python + FastAPI 后端骨架

目标不是一次性把所有业务都拆成微前端，而是先建立一个可扩展的 monorepo 基础，再逐步接入订单、用户、渠道等业务域。

---

## 目录结构

```
dolphinlynxi_home/
├── about.html
├── dashboard.html
├── developer.html
├── index.html
├── marketplace.html
├── products.html
├── tasks.html
├── css/
├── js/
├── assets/
├── web/                     # Next.js 平台壳
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── src/app/
├── services/
│   └── api/                 # FastAPI 后端骨架
│       ├── pyproject.toml
│       └── app/main.py
├── package.json             # 根级 workspace 入口
└── README.md
```

---

## 技术栈建议

### 前端

- React 19
- TypeScript 5
- Next.js 16
- Tailwind CSS 4

### 后端

- Python 3.11+
- FastAPI
- Uvicorn

### 架构策略

- 先用 monorepo 管理展示站、平台壳和后端服务
- 先做模块化单体，不急着拆微前端
- 后续按业务域扩展：order / user / channel / admin / portal

---

## 本地开发

### 静态站

```bash
python -m http.server 5500
```

### Next.js 平台壳

```bash
npm run dev:web
```

### Python API

```bash
python -m uvicorn app.main:app --reload --app-dir services/api
```

---

## 下一步迁移建议

1. 把现有静态页面内容分批迁入 `web/` 的 marketing 路由
2. 在 `services/api/` 里先建立 identity / catalog / order 的模块边界
3. 增加统一鉴权、API client 和共享类型包
4. 等业务域稳定后，再评估是否拆微前端
