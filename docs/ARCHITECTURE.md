# Architecture

## Tech Stack

| Layer           | Technology                 | Why                                              |
| --------------- | -------------------------- | ------------------------------------------------ |
| Framework       | Next.js 16 (App Router)    | Server Components, file-based routing, Turbopack |
| Language        | TypeScript (strict)        | Type safety, better DX for AI agents             |
| Styling         | Tailwind CSS 4 + shadcn/ui | Utility-first, copy-paste components             |
| Auth & DB       | Supabase (Auth + Postgres) | OSS, row-level security, real-time               |
| Testing         | Vitest + Testing Library   | Fast, Vite-native, React support                 |
| Package Manager | pnpm                       | Fast, strict, disk-efficient                     |
| Linting         | ESLint + Prettier          | Consistent code style                            |
| CI              | GitHub Actions             | PR-gated quality checks                          |
| Deployment      | Vercel                     | Zero-config Next.js hosting                      |

## Directory Structure

```
coding-agent-template/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (fonts, metadata)
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles + Tailwind
│   │   ├── auth/callback/       # OAuth/magic link callback route
│   │   ├── dashboard/page.tsx   # Protected dashboard (Server Component)
│   │   ├── login/
│   │   │   ├── page.tsx         # Login page (Server Component)
│   │   │   └── actions.ts       # Server Actions (login, signup, logout)
│   │   └── __tests__/           # Page-level tests
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components (CLI-managed)
│   │   ├── login-form.tsx       # Login/signup form (Client Component)
│   │   ├── dashboard-content.tsx # Dashboard UI (Client Component)
│   │   └── __tests__/           # Component-level tests
│   ├── hooks/                   # Custom React hooks
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Browser Supabase client
│   │   │   └── server.ts        # Server Supabase client
│   │   └── utils.ts             # Shared utilities (cn(), etc.)
│   └── middleware.ts            # Auth session refresh + route protection
├── supabase/
│   └── migrations/              # SQL migrations (RLS, triggers)
├── docs/                        # Project documentation
├── .claude/                     # Claude Code configuration
│   ├── settings.json            # Permissions and hooks
│   ├── skills/                  # Invokable workflows (/submit)
│   └── agents/                  # Specialized agents (reviewer)
└── .github/                     # CI, templates, Dependabot
```

## Deployment Pipeline

```
Developer/AI pushes to feature branch
        │
        ▼
  GitHub Actions CI
  (lint → format → type-check → test → build)
        │
        ▼
  PR created → Human reviews → Merge to main
        │
        ▼
  Vercel auto-deploys from main
```

## Data Flow

**Phase 2 (Current):** Supabase handles authentication and data persistence.

```
Browser → Middleware (refresh session) → Server Component → Supabase
                                          ↓
                                    Client Component ← user prop
                                          ↓
                                    Server Action → Supabase (mutate)
```

- **Middleware** refreshes the auth session on every request and enforces route protection
- **Server Components** read user/data via the server Supabase client
- **Client Components** receive data as props; mutations go through Server Actions
- **RLS policies** on Postgres enforce row-level access — no server-side auth checks needed for data queries
