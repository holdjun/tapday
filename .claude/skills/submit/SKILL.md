# Submit Skill

Complete code-to-PR workflow. Run all quality checks, squash into a single commit, push, and open a pull request.

**IMPORTANT: Never commit directly to `main`. All changes must go through a feature branch and PR.**

## Steps

### 1. Ensure Feature Branch

Check the current branch. If on `main`, create a feature branch and move any uncommitted changes over:

```bash
git branch --show-current

# Only if on main:
git checkout -b <type>/<short-description>
```

If already on a feature branch, stay on it.

### 2. Quality Checks (iterate until all pass)

```bash
pnpm format
pnpm lint:fix
pnpm type-check
pnpm test
pnpm build
```

### 3. Self-Review

```bash
git diff HEAD
```

Check for:

- Debug statements (`console.log`, `debugger`)
- Leaked secrets or credentials
- Unrelated changes that should be in a separate PR

Remove any issues found, then re-run quality checks.

### 4. Update Documentation

Review the changes and determine if any of the following docs need updating:

- `README.md` — project overview, quick start
- `docs/ARCHITECTURE.md` — tech decisions, data flow, deployment
- `docs/CONVENTIONS.md` — coding standards, patterns, rules

Update docs when changes affect:

- New or removed dependencies / environment variables
- Changed directory structure or file conventions
- New or modified commands, scripts, or workflows
- Altered architecture (auth, routing, data flow, deployment)
- Modified GitHub or CI configuration

Skip if changes are purely internal (bug fixes, refactors with no API/config surface change). If any docs were updated, re-run Step 2 before committing.

### 5. Squash and Commit

All changes on the branch must be squashed into a **single commit** before pushing. This keeps history clean and avoids divergence after PR merge.

```bash
# Sync with latest main
git fetch origin main

# Soft reset to main — all changes become staged
git reset --soft origin/main

# Create a single commit
git add <specific-files>
git commit -m "<type>: <description>"
```

- Use specific file paths, not `git add -A`
- Conventional commits (enforced by commitlint hook)

### 6. Push

Force push is required since history was rewritten by squash. If the remote branch was deleted (e.g., after a previous PR merge), fall back to a regular push:

```bash
git push --force-with-lease -u origin HEAD || git push -u origin HEAD
```

### 7. Create or Update PR

If a PR already exists for the current branch, skip this step — the push already updated it.

Otherwise, create a new PR:

```bash
gh pr create --title "<type>: <description>" --body "$(cat <<'EOF'
## Summary

<brief description>

## Changes

- <change 1>
- <change 2>

## Type of Change

- [ ] Bug fix
- [x] New feature
- [ ] Refactor
- [ ] Documentation
EOF
)"
```

### 8. Monitor CI

```bash
gh pr checks --watch
```

If CI fails:

1. Read the failure logs
2. Fix the issue locally
3. Run quality checks again (Step 2)
4. Commit and push the fix
5. Re-monitor CI
