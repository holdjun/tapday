# Kickoff Skill

Guide the user from template to product. Understand what they're building, generate an implementation plan, and replace template content.

## Steps

### 1. Understand the Product

If the user has already provided product details (description, PRD, feature list, etc.), extract the relevant information and skip to Step 2. Do not re-ask for information already given.

If details are missing, ask the user conversationally (plain text, not AskUserQuestion — these are open-ended):

- What is your product? (name, one-line description)
- Who are the target users?
- What are the core features for MVP?
- Any design preferences? (color scheme, style — optional)

### 2. Generate Product Plan

Based on the product info, create `PLAN.md` in the project root. The plan must cover:

- **Product overview** — name, description, target users
- **Template file audit** — for every existing template file, decide: **keep**, **modify**, or **remove**
  - Files to remove (e.g., auth/login/dashboard if not needed for MVP)
  - Files to modify (e.g., layout.tsx, page.tsx, README.md)
  - Files to keep as-is
- **New files needed** — new pages, components, API routes, with their paths
- **Phase 1 (MVP)** — features mapped to concrete file changes
- **Phase 2 (Enhancements)** — future features beyond MVP
- **Data model** — tables to add/modify/remove vs. the template schema (if Supabase is in use)

If the user provided their own plan, use it as the starting point — refine, fill gaps, and suggest improvements rather than starting from scratch.

After writing `PLAN.md`, output a summary of the key decisions (what to keep, remove, add) and wait for the user to confirm before proceeding to Step 3. Do not continue until the user approves.

### 3. Replace Template Content

Based on the approved plan, make all changes in a single pass:

**Update files:**

- **`src/app/layout.tsx`** — update `metadata.title` and `metadata.description`
- **`src/app/page.tsx`** — redesign the landing page for the product
- **`README.md`** — rewrite as the product's README (keep the Commands section and Documentation links)
- **`docs/ARCHITECTURE.md`** — update to reflect the product's purpose and architecture

**Remove files** that the plan marked for removal. Delete them, don't leave empty stubs.

**Update tests** — after modifying pages or components, update the corresponding tests in `__tests__/` directories so they match the new content. Do not leave tests asserting against old template text.

### 4. Update Schema If Needed

Skip if Supabase is not configured or no schema changes are needed for MVP.

If the plan includes data model changes:

- Keep the `profiles` table (commonly needed for auth)
- Modify or remove template tables as appropriate
- Create new migration files in `supabase/migrations/` (sequential numbering, e.g., `00002_*.sql`)

### 5. Verify

```bash
pnpm build
```

Ensure the project builds and tests pass after all changes. Fix any issues.

### 6. Next Steps

Tell the user:

> Your project is ready to build. Here's how to start:
>
> 1. Create a feature branch: `git checkout -b feat/your-first-feature origin/main`
> 2. Build your feature with Claude Code
> 3. When ready, type `/submit` to run checks and open a PR
>
> Refer to `PLAN.md` for your implementation roadmap.
