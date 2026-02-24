# Conventions

## TypeScript

- **Strict mode** — enabled in `tsconfig.json`
- **No `any`** — use `unknown` and narrow with type guards
- **No `@ts-ignore`** — fix the underlying type issue
- **Consistent type imports** — `import type { Foo } from "bar"`
- **Prefer interfaces** for object shapes, `type` for unions/intersections

## React Components

- **Named exports** — `export function Button() {}`, not default exports
- **Functional components only** — no class components
- **Server Components by default** — only add `"use client"` when the component needs browser APIs, state, or event handlers
- **Props typing** — define inline or with a dedicated `Props` type above the component

```tsx
export function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}</p>;
}
```

## File Naming

- **Files:** `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Components:** `PascalCase` (e.g., `UserProfile`)
- **Hooks:** `use-kebab-case.ts` (e.g., `use-auth.ts`)
- **Tests:** colocated in `__tests__/` directory, named `*.test.tsx`

## Import Order

1. React / Next.js
2. External libraries
3. `@/` aliased imports
4. Relative imports
5. Type-only imports

## Styling

- **Tailwind CSS utility classes** — no custom CSS unless absolutely necessary
- **`cn()` for conditional classes** — import from `@/lib/utils`
- **shadcn/ui for UI primitives** — add via `pnpm dlx shadcn@latest add <component>`
- **No inline styles** — use Tailwind classes

## Git

### Branch Protection

`main` is a **protected branch**. Direct commits and force-pushes to `main` are forbidden.

All changes must be submitted via pull request:

1. Create a feature branch from `main`
2. Make changes and commit on the feature branch
3. Push the branch and open a PR via `gh pr create`
4. CI must pass and the PR must be approved before merging
5. PRs are squash-merged; the branch is auto-deleted after merge

### Branches

- `main` — production, protected, **never commit directly**
- `feat/<name>` — new features
- `fix/<name>` — bug fixes
- `docs/<name>` — documentation changes
- `refactor/<name>` — code refactoring

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve hydration mismatch in sidebar
docs: update API documentation
refactor: simplify error handling logic
```

- Header max 72 characters
- Use imperative mood ("add", not "added" or "adds")
- Reference issue numbers when applicable: `fix: resolve crash (#42)`

## Error Handling

- **Validate at system boundaries** — user input, API responses, environment variables
- **Use Next.js error boundaries** — `error.tsx` for route-level errors
- **No silent failures** — always handle or propagate errors explicitly
- **Structured errors** — prefer typed error objects over string messages

## Security

- **Never commit secrets** — use environment variables
- **Validate all user input** — sanitize before use
- **Use `rel="noopener noreferrer"`** on external links
- **Keep dependencies updated** — Dependabot handles this automatically
