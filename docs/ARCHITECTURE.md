# Architecture

## Tech Stack

| Layer           | Technology                 | Why                                              |
| --------------- | -------------------------- | ------------------------------------------------ |
| Framework       | Next.js 16 (App Router)    | Server Components, file-based routing, Turbopack |
| Language        | TypeScript (strict)        | Type safety, better DX                           |
| Styling         | Tailwind CSS 4 + shadcn/ui | Utility-first, copy-paste components             |
| Animation       | Framer Motion              | 声明式动画，spring 物理引擎                      |
| Effects         | canvas-confetti            | 轻量打卡粒子效果                                 |
| Storage         | IndexedDB (idb)            | 本地持久化，支持二进制数据                       |
| Testing         | Vitest + Testing Library   | Fast, Vite-native, React support                 |
| Package Manager | pnpm                       | Fast, strict, disk-efficient                     |
| Linting         | ESLint + Prettier          | Consistent code style                            |
| CI              | GitHub Actions             | PR-gated quality checks                          |
| Deployment      | Vercel                     | Zero-config Next.js hosting                      |

## Directory Structure

```
tapday/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (metadata, PWA tags, AppShell)
│   │   ├── page.tsx             # Home — Setup or Calendar view
│   │   ├── globals.css          # Global styles + Tailwind + theme system
│   │   ├── stats/page.tsx       # Statistics page (V1.1)
│   │   ├── settings/page.tsx    # Settings page
│   │   └── __tests__/           # Page-level tests
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components (CLI-managed)
│   │   ├── app-shell.tsx        # Root client shell (config, theme, manifest)
│   │   ├── setup/               # Setup wizard components
│   │   ├── calendar/            # Calendar view components
│   │   ├── settings/            # Settings panel components
│   │   ├── common/              # Shared components (bottom nav, pickers)
│   │   ├── pwa/                 # PWA manifest management
│   │   └── __tests__/           # Component-level tests
│   ├── hooks/
│   │   ├── use-app-config.ts    # User config CRUD (IndexedDB)
│   │   ├── use-check-ins.ts     # Check-in records + stats
│   │   └── use-theme.ts         # Theme color + dark mode
│   └── lib/
│       ├── db.ts                # IndexedDB wrapper (idb)
│       ├── manifest.ts          # PWA meta tag + cookie sync
│       ├── pwa-cookie.ts        # Cookie bridge for cross-context persistence
│       ├── icons.ts             # Emoji→PNG, image compression
│       ├── constants.ts         # Preset colors, markers, emoji categories
│       └── utils.ts             # Shared utilities (cn())
├── docs/                        # Project documentation
├── .claude/                     # Claude Code configuration
└── .github/                     # CI, templates, Dependabot
```

## Data Flow

V1 is fully client-side with local storage + cookie bridge:

```
User opens app
    │
    ▼
AppShell loads config from IndexedDB
    │
    ├─ IndexedDB empty + cookie exists → restore from cookie (iOS standalone bridge)
    │
    ├─ First visit → Setup wizard → save config → sync cookie → update manifest
    │
    └─ Returning visit → Calendar view → read/write check-ins
                             │
                             ▼
                     IndexedDB (primary) + cookie (bridge)
```

## Dynamic PWA Manifest

The key product feature — personalized PWA installation:

1. `/api/manifest` route serves dynamic manifest JSON, reading config from `tapday-pwa` cookie
2. `/api/icon` route renders emoji or letter-based icons as PNG via `ImageResponse` (next/og)
3. After setup, client syncs config to cookie and updates `<link rel="manifest">` href with cache-busting param
4. iOS meta tags (`apple-mobile-web-app-title`, `apple-touch-icon`) updated client-side
5. User is guided to "Add to Home Screen" after manifest is ready

Cookie bridge solves iOS storage isolation: Safari and standalone PWA share cookies but NOT IndexedDB. On first standalone launch, config is restored from cookie to IndexedDB.

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
