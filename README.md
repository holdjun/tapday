# Tapday

一个可以变成任何打卡场景的 PWA 网页应用。用户自定义名字、图标、打卡样式，安装到桌面后就像一个专属的打卡 App。

## 核心理念

Tapday 不是一个通用打卡工具，它是一个**打卡模板**。用户装到桌面上的是属于自己的、独一无二的打卡 App — 可能叫"咖啡日记"，也可能叫"今天跑了吗"。

## 功能

- **个性化 Setup** — 自定义名称、图标、打卡标记、主题色
- **月历打卡** — 点击即打卡，弹性动效 + 粒子效果
- **PWA 安装** — 添加到桌面，图标和名称跟随用户设置
- **纯本地存储** — 数据保存在 IndexedDB，无需注册
- **暗色模式** — 自动跟随系统

## 技术栈

- **Next.js 16** — App Router, Turbopack, React 19
- **TypeScript** — strict mode
- **Tailwind CSS 4** + **shadcn/ui**
- **Framer Motion** — 动画
- **IndexedDB** (via idb) — 本地存储
- **Vitest** + **Testing Library**
- **pnpm** — 包管理

## Commands

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # Lint check
pnpm lint:fix     # Lint auto-fix
pnpm type-check   # TypeScript check
pnpm format       # Format code
pnpm format:check # Check formatting
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — 技术决策、目录结构、部署
- [Conventions](docs/CONVENTIONS.md) — 代码风格、Git 工作流
- [Plan](PLAN.md) — 实施计划
