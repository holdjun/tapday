# Setup Skill

Automate GitHub repository configuration for a new project created from this template. Idempotent — re-running applies the same settings without side effects.

## Steps

### 1. Detect Repository

```bash
gh repo view --json owner,name --jq '"\(.owner.login)/\(.name)"'
```

Save the result as `{owner}/{repo}` for subsequent API calls.

### 2. Check Node Version

Read `.nvmrc` and compare with the current `node --version`. If the major version doesn't match, warn the user and suggest running `nvm use` or installing the correct version before proceeding.

### 3. Install Dependencies

Check if `node_modules` exists. If missing, run:

```bash
pnpm install
```

If it already exists, skip this step.

### 4. Configure Branch Protection

Protect the `main` branch to require CI checks:

```bash
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field "required_status_checks[strict]=true" \
  --field "required_status_checks[contexts][]=ci" \
  --field "enforce_admins=true" \
  --field "restrictions=null"
```

If this returns a 403 error, inform the user they need admin permissions on the repository and skip this step.

Note: this is a PUT that overwrites the full protection config. Re-running applies the same settings.

### 5. Configure PR Merge Strategy

Set the repository to rebase-only merging with auto-delete branches:

```bash
gh api repos/{owner}/{repo} \
  --method PATCH \
  --field "allow_squash_merge=false" \
  --field "allow_merge_commit=false" \
  --field "allow_rebase_merge=true" \
  --field "delete_branch_on_merge=true"
```

If this returns a 403 error, inform the user and skip.

### 6. Supabase Configuration (optional)

Check if `.env.local` exists and contains non-empty `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` values.

**If both values are present:** confirm Supabase is configured and skip to Step 7.

**If missing or empty:** tell the user Supabase is not configured yet. It's not required to start development — they can configure it later by re-running `/setup` with Supabase credentials ready. Print a one-line reminder:

> Supabase not configured. When ready, re-run `/setup` with your project URL and anon key.

Then move to Step 7. Do **not** start a multi-step guided Supabase walkthrough unless the user explicitly asks.

**If the user provides Supabase credentials** (either in the `/setup` invocation or in response to the prompt):

1. Create `.env.local` from the example if it doesn't exist:
   ```bash
   cp .env.example .env.local
   ```
2. Write the credentials to `.env.local`
3. Remind the user to:
   - Run the migration SQL in `supabase/migrations/00001_initial_schema.sql` via the Supabase SQL Editor
   - Enable **Email** auth in Supabase → Authentication → Providers
4. After Supabase is configured, print Vercel setup instructions:
   > **Connect Vercel:**
   >
   > 1. Import your GitHub repo at [vercel.com/new](https://vercel.com/new)
   > 2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables
   > 3. Deploy — Vercel auto-deploys on every push to `main`
   > 4. Set your Vercel URL as **Site URL** in Supabase → Authentication → URL Configuration
   > 5. Add `https://<your-app>.vercel.app/auth/callback` to **Redirect URLs**

### 7. Verify Build

```bash
pnpm build
```

If the build fails, diagnose the error and help fix it before proceeding.

### 8. Summary

Print a checklist of what was configured:

```
Setup complete:
  ✓ Node version verified
  ✓ Dependencies installed
  ✓ Branch protection configured
  ✓ PR merge strategy set (rebase only, auto-delete branches)
  ✓ Supabase configured       (or: ⏭ Supabase — not configured yet)
  ✓ Build passing

Next step: run /kickoff to plan your product and replace template content.
```

Adjust the checklist to reflect which steps were actually completed vs. skipped.
