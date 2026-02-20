# Website Maintenance Instructions

This document is for lab members who maintain the Basdogan Lab website.

## 1. Quick Tasks

### Add a news post
1. Create a new file in `src/content/news/` using `YYYY-MM-DD-title.md`.
2. Use this frontmatter:
   ```md
   ---
   title: "Your title"
   date: 2026-02-20
   summary: "One sentence summary."
   tags: ["tag1", "tag2"]
   draft: false
   ---
   ```
3. Add body text below frontmatter.
4. Run `npm run build` locally.
5. Open a PR and merge to `main`.

### Add a publication
1. Edit `src/data/publications.json`.
2. Add a new object with fields:
   - `title`, `authors`, `venue`, `year`
   - optional: `doi`, `url`, `pdf`, `highlight`
3. Keep JSON valid (commas and quotes).
4. Run `npm run build` and merge via PR.

### Add or update a team member
1. Edit `src/data/team.json`.
2. Add/update member fields:
   - `name`, `role`, `photo`, `order`
   - optional: `email`, `website`, `researchInterests`
3. Upload photo to `public/images/` and reference path as `/images/...`.
4. Use `order` to control display sequence.
5. Run `npm run build` and merge via PR.

### Update PI bio or research summary
1. Home summary: `src/pages/index.astro`.
2. Research themes: `src/pages/research.astro`.
3. Keep language concise and externally readable.
4. Build and merge via PR.

### Change contact information
1. Edit `src/pages/contact.astro`.
2. Update email/office/application text.
3. Build and merge via PR.

## 2. Release Process

### Branch and PR workflow
1. Create feature branch: `git checkout -b feature/<short-name>`.
2. Commit changes with clear message.
3. Open pull request to `main`.
4. Require at least one reviewer before merge.

### Required checks before merge
1. `npm ci`
2. `npm run build`
3. Verify affected page locally with `npm run dev`.
4. Confirm JSON/Markdown schema compliance.

### Deploy verification checklist
1. Confirm GitHub Actions `deploy.yml` completed successfully.
2. Open public URL and verify:
   - Home loads
   - navigation links to all 6 pages
   - updated content visible
3. Check mobile viewport for layout regressions.
4. Confirm no console/network errors in browser dev tools.

### Rollback procedure
1. Identify last known-good commit from `main` history.
2. Revert bad commit(s):
   ```bash
   git checkout main
   git pull
   git revert <bad-commit-sha>
   git push
   ```
3. Wait for auto-deploy and verify site restored.

## 3. Operations Schedule

### Monthly
- Run dependency updates (`npm outdated`, then selective updates).
- Rebuild and verify deploy.

### Quarterly
- Link check on all pages.
- Remove stale announcements and outdated opportunities.

### Each semester
- Validate team roster and roles.
- Archive alumni or update positions.

### Yearly
- Clean publication metadata consistency:
  - author order
  - venue naming
  - DOI/link validity

## 4. Domain and DNS Operations

### CNAME ownership
- Source of truth: root `CNAME` file.
- Must match custom domain configured in GitHub Pages.

### DNS expectations
- Apex domain: A/ALIAS records for GitHub Pages.
- `www`: CNAME to `<org-or-user>.github.io`.
- DNS changes may take minutes to 48 hours.

### HTTPS verification
1. In GitHub Pages settings, wait until certificate is issued.
2. Enable "Enforce HTTPS".
3. Verify browser shows secure lock icon.
4. Verify no mixed-content warnings in console.

## 5. Troubleshooting

### Build fails
1. Run `npm ci` again to reset dependencies.
2. Check JSON syntax in `src/data/*.json`.
3. Check frontmatter fields in `src/content/news/*.md`.
4. Re-run `npm run build` and read first error.

### Missing image/content
1. Confirm file exists under `public/images/`.
2. Confirm path starts with `/images/...` in JSON/pages.
3. Confirm content file names are unique and valid.

### GitHub Pages propagation delay
- New deploys may take a few minutes.
- Domain and certificate changes can take significantly longer.
- Check Actions logs and Pages settings before re-deploying.

## 6. Ownership Matrix

- PI content delegate:
  - approves scientific wording, publication visibility, and people updates.
- Technical maintainer:
  - owns CI/CD workflow, deployment health, and DNS/domain settings.
- Backup reviewer:
  - can approve urgent hotfix PRs and execute rollback if primary maintainer is unavailable.
