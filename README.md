# AI Coding Agent Template

A Next.js template for 100% AI-driven development. Only PR review and merge requires human intervention.

## Get Started

### Phase 1: Set Up Your Repo

Configure GitHub repo settings. Supabase and Vercel can be added when you're ready.

```
Open Claude Code → type /setup
```

### Phase 2: Plan & Customize

Describe your product, generate an implementation plan, and replace template content.

```
Type /kickoff → answer a few questions → get a tailored plan
```

This transforms the template into your product's codebase.

### Phase 3: Build

Create feature branches, build features with Claude Code, and submit PRs.

```
Type /submit when your feature is ready
```

## Tech Stack

- **Next.js 16** — App Router, Turbopack, React 19
- **TypeScript** — strict mode
- **Tailwind CSS 4** + **shadcn/ui**
- **Vitest** + **Testing Library**
- **Supabase** — auth, database, RLS
- **pnpm** — package management
- **GitHub Actions** — CI pipeline
- **Husky** + **lint-staged** + **commitlint** — git hooks

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

- [Architecture](docs/ARCHITECTURE.md) — tech decisions, directory structure, deployment
- [Conventions](docs/CONVENTIONS.md) — code style, git workflow, patterns

---

## 中文指南

AI 驱动的 Next.js 开发模板，仅 PR 审核与合并需要人工操作。

### 第一步：配置项目

配置 GitHub 仓库。Supabase 和 Vercel 可按需配置。

```
打开 Claude Code → 输入 /setup
```

### 第二步：规划与定制

描述你的产品，生成实施计划，替换模板内容。

```
输入 /kickoff → 回答几个问题 → 获得定制化方案
```

### 第三步：开发

创建功能分支，使用 Claude Code 开发，完成后提交 PR。

```
功能完成后输入 /submit
```
