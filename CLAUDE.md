# AI Coding Agent Template

## Project Overview

A Next.js template optimized for AI-driven development workflows. 100% AI-runnable — only PR review and merge requires human intervention.

**Tech Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Vitest · pnpm

## Core Principles

- **Elegant, efficient, concise** — generated code and docs must not be overcomplicated or redundant
- **Leverage existing tools** — use MCP servers, skills, `gh` CLI, and established ecosystems; don't reinvent the wheel
- **Strict TypeScript** — no `any`, no `@ts-ignore`, use `unknown` and narrow types properly
- **Server-first** — default to React Server Components; use `"use client"` only when necessary

## Directory Structure

```
src/
├── app/
│   ├── auth/callback/ # OAuth/magic link callback handler
│   ├── dashboard/     # Protected dashboard page
│   ├── login/         # Login/signup page + server actions
│   └── __tests__/     # Page-level tests
├── components/
│   ├── ui/            # shadcn/ui components (managed by CLI)
│   └── __tests__/     # Component-level tests
├── hooks/             # Custom React hooks
├── lib/
│   ├── supabase/      # Supabase client factories (client.ts, server.ts)
│   └── utils.ts       # Shared utilities (cn(), etc.)
└── middleware.ts       # Auth session refresh + route protection
supabase/
└── migrations/        # SQL migrations (RLS, triggers)
docs/                  # Architecture, conventions
.claude/               # Claude Code settings, skills, agents
.github/               # CI workflows, PR/issue templates, Dependabot
```

## Common Commands

```bash
pnpm dev              # Start dev server (Turbopack)
pnpm build            # Production build
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm type-check       # TypeScript check (tsc --noEmit)
pnpm format           # Prettier format all files
pnpm format:check     # Prettier check formatting
pnpm test             # Run tests (Vitest)
pnpm test:watch       # Run tests in watch mode
```

## Key Rules

1. **Never commit directly to `main`** — `main` is protected; all changes must go through feature branches and PRs. **You MUST use the `/submit` skill to submit all PRs** — no exceptions.
2. **Never run the dev server** — use `pnpm build` to verify changes
3. **Always use pnpm** — never npm or yarn
4. **Add shadcn components via CLI** — `pnpm dlx shadcn@latest add <component>`
5. **Conventional commits** — `feat:`, `fix:`, `docs:`, `refactor:`, etc. (max 72 chars)
6. **Never commit secrets** — no `.env` files, API keys, or tokens in git
7. **No `console.log` in production code** — remove debug statements before committing
8. **Every feature must include tests** — no PR without corresponding test coverage

## Git Workflow

All development must be based on the **latest `main`**. Before starting any work, sync and branch from `origin/main`:

```bash
git fetch origin main
git checkout -b <type>/<short-description> origin/main
```

If you're already on a stale branch, reset to the latest `main` first: `git rebase origin/main` or start a new branch.

All changes follow this flow — no exceptions:

```
1. git fetch origin main && git checkout -b feat/my-change origin/main
2. (make changes)                    # Implement
3. pnpm format && pnpm lint:fix      # Auto-fix
4. pnpm type-check && pnpm test      # Verify
5. pnpm build                        # Final check
6. git add <files> && git commit     # Conventional commit
7. git push -u origin HEAD           # Push branch
8. gh pr create                      # Open PR
9. gh pr checks --watch              # Wait for CI, fix if needed
```

Never use `git push origin main`. Never commit on `main`. If you realize you're on `main`, stash your changes, create a branch, then apply.

## Code Style

- **Functional components** with named exports: `export function MyComponent() {}`
- **`cn()` for class composition** — import from `@/lib/utils`
- **Prefer Server Components** — add `"use client"` only for interactivity
- **Import order** — React/Next → external libs → `@/` aliases → relative → types
- **File naming** — `kebab-case` for files, `PascalCase` for components

## Pre-PR Checklist

Before creating a PR, run all checks:

```bash
pnpm format && pnpm lint:fix && pnpm type-check && pnpm test && pnpm build
```

Use the `/submit` skill for the complete code-to-PR workflow.

## Further Reading

- [Architecture](docs/ARCHITECTURE.md) — tech decisions, deployment pipeline, data flow
- [Conventions](docs/CONVENTIONS.md) — TypeScript rules, component patterns, git workflow
