# 海豚灵汐官网 · Dolphin Lynxi Home

**具身智能数据资产的运营商**
**Embodied-AI data-asset operator**

线上地址: <https://robot.box2ai.com/datasets/>

---

## 当前阶段

仓库当前状态：

- 前端已统一迁移到 `web/`（React + TypeScript + Next.js）
- 根目录旧静态 HTML 页面已移除
- `services/api/` 为 Python + FastAPI 后端骨架

当前目标是基于 monorepo 持续迭代 `web/` 与 `services/api/`，逐步接入订单、用户、渠道等业务域。

---

## 目录结构

```
dolphinlynxi_home/
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
