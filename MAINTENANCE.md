# Website Maintenance Guide

This document is the operational guide for maintaining the Basdogan Lab website.

## Agent-First Workflow

This repository should usually be updated through an AI coding agent rather than direct manual editing.

1. Ask the agent to make the requested website update.
2. Have a human review the resulting changes and preview the affected pages.
3. Approve the update or request follow-up fixes.
4. Use repo-local skills from `skills/<skill-name>/SKILL.md`.
5. For website maintenance in this repository, use `skills/basdoganlab-website-updater/SKILL.md`.

This workflow is preferred because the site spans Astro pages, Markdown, JSON, TypeScript data, and BibTeX. Agent-guided updates are less likely to miss linked source files or introduce formatting mistakes.

Repo-local skill conventions are documented in `skills/README.md`.

## 1. Run Locally

### Prerequisites

1. Install Node.js 20+.
2. Run commands from the repository root.

### Install dependencies

```bash
npm ci
```

### Development mode

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

Open:

- `http://127.0.0.1:4321/basdoganlab`

### Production preview

1. Build the site:

   ```bash
   npm run build
   ```

2. Preview the production output:

   ```bash
   npm run preview -- --host 127.0.0.1 --port 4321
   ```

3. Open:

- `http://127.0.0.1:4321/basdoganlab`

### Quick verification routes

- `/basdoganlab`
- `/basdoganlab/research`
- `/basdoganlab/news`
- `/basdoganlab/publications`
- `/basdoganlab/team`
- `/basdoganlab/contact`

## 2. Page-by-Page Update Guide

Use the data source for content updates whenever possible. Only edit page templates when changing layout or rendering behavior.

### Home

- Page: `src/pages/index.astro`

Update:

- hero title, subtitle, and call-to-action text
- homepage summary cards and links

Keep internal links using `getPermalink(...)`.

### Research

- Listing page: `src/pages/research.astro`
- Detail template: `src/pages/research/[slug].astro`
- Source data: `src/data/research.ts`

For routine updates, edit `src/data/research.ts`.

Each research area should include:

- `slug`
- `title`
- `summary`
- `overview`
- `focus`
- `methods`
- `recentDirections`
- optional `figures`

For figures:

- Prefer files in `src/assets/images/`
- Reference them as `~/assets/images/...`
- Include `alt` and `caption`
- Use optional `scale` when needed for display width

After updating Research, verify:

- `/research`
- `/research/<slug>` for each changed area

### News

- Page: `src/pages/news.astro`
- Collection schema: `src/content/config.ts`
- Entries: `src/content/news/*.md`

Add one Markdown file per news item using a name like:

- `YYYY-MM-DD-short-title.md`

Required frontmatter:

```md
---
title: "Your title"
date: 2026-02-20
summary: "One sentence summary."
tags: ["tag1", "tag2"]
draft: false
---
```

Notes:

- `draft: true` hides an item
- items are shown newest-first
- optional body text is allowed, but the current page only displays summary and tags

### Publications

- Page: `src/pages/publications.astro`
- Data file: `src/data/publications.bib`
- Parser: `src/utils/publications.ts`

Add or edit BibTeX entries in `src/data/publications.bib`.

Required practical fields:

- `title`
- `author`
- `year`
- one of `journal`, `booktitle`, `publisher`, `school`, or `howpublished`

Useful optional fields:

- `abstract`
- `doi`
- `url`
- `pdf`
- `keywords`
- `note`

Keep BibTeX syntax valid. If an entry does not render, check for missing required fields first.

### Team

- Team page: `src/pages/team.astro`
- PI profile page: `src/pages/team/pi.astro`
- Data file: `src/data/team.json`

For normal roster updates, edit `src/data/team.json`.

Common fields:

- `name`
- `role`
- `section`
- `photo`
- `email`
- `website`
- `bio`
- `researchInterests`
- `previousPosition`
- `timeAtLab`
- `currentPosition`

Sections:

- `pi`
- `current`
- `alumni`

Photo guidance:

- Put local photos in `public/images/`
- Reference them as `/images/...`

Sorting guidance:

- The current Team page sorts by section, then role, then JSON order
- Do not rely on `order` to control display unless the page logic is updated
- Reorder entries in `src/data/team.json` when you need a different order within the same section and role

### PI profile page

The PI profile is split across two sources:

- basic profile data in `src/data/team.json`
- long-form page text in `src/pages/team/pi.astro`

Edit `src/pages/team/pi.astro` when updating:

- biography
- research program description
- mentorship philosophy
- open position language

### Contact

- Page: `src/pages/contact.astro`

This page is currently hardcoded. Edit it directly for:

- PI name
- email
- office and mailing address
- collaboration text
- application instructions

If contact details change, also check:

- `src/data/team.json`
- `src/navigation.ts`

## 3. Standard Update Sequence

1. Create a branch such as `feature/<short-name>`.
2. Make changes in the correct data file or page template.
3. Run:

   ```bash
   npm run build
   ```

4. If the change is visual or substantial, preview locally with:

   ```bash
   npm run dev -- --host 127.0.0.1 --port 4321
   ```

5. Verify the affected routes.
6. Open a pull request to `main`.

Run `npm ci` only when dependencies change or the local install is missing or broken.

## 4. Release Process

### Branch and PR workflow

1. Create a feature branch.
2. Commit changes with a clear message.
3. Open a pull request to `main`.
4. Require at least one reviewer before merge.

### Required checks before merge

1. `npm run build`
2. Visual verification of affected pages
3. Schema and syntax checks for edited Markdown, JSON, TypeScript data, and BibTeX

### Deploy verification checklist

1. Confirm the GitHub Actions deploy workflow completed successfully.
2. Open the public site and verify:
   - the affected page loads
   - updated content appears
   - navigation still works
3. Check mobile layout for regressions.
4. Confirm there are no obvious console or network errors in the browser.

### Rollback procedure

1. Identify the last known-good commit on `main`.
2. Revert the bad commit or commits:

   ```bash
   git checkout main
   git pull
   git revert <bad-commit-sha>
   git push
   ```

3. Wait for redeploy and verify the site is restored.

## 5. Operations Schedule

### Monthly

- review dependency updates
- rebuild and verify deploy health

### Quarterly

- check links across all public pages
- remove stale announcements and outdated opportunities

### Each semester

- update the team roster and roles
- move former members into alumni as needed

### Yearly

- clean publication metadata consistency
- review DOI and external links
- review domain and certificate health

## 6. Domain and DNS Operations

### CNAME ownership

- the source of truth is the root `CNAME` file
- it must match the custom domain configured in GitHub Pages

### DNS expectations

- apex domain should point to GitHub Pages endpoints with A or ALIAS records
- `www` should be a CNAME to `<org-or-user>.github.io`
- DNS changes can take minutes to 48 hours

### HTTPS verification

1. Wait for the GitHub Pages certificate to be issued.
2. Enable HTTPS enforcement in repository settings.
3. Confirm the site loads securely without mixed-content warnings.

## 7. Troubleshooting

### Build fails

1. Re-run `npm run build` and read the first error carefully.
2. Check JSON syntax in `src/data/*.json`.
3. Check frontmatter and filenames in `src/content/news/*.md`.
4. Check BibTeX syntax in `src/data/publications.bib`.
5. If dependencies are broken locally, run `npm ci`.

### Content does not appear

1. Confirm the edited file is the real source for that page.
2. Confirm required schema fields are present.
3. Confirm the content is not hidden by `draft: true`.
4. Confirm image paths follow the repo conventions.

### Images do not load

1. For public images, confirm the file exists under `public/images/` and the path starts with `/images/...`.
2. For build-time research images, confirm the file exists under `src/assets/images/` and is referenced as `~/assets/images/...`.

### GitHub Pages delay

- new deploys may take a few minutes
- domain or certificate changes can take much longer
- check GitHub Actions logs and Pages settings before retrying

## 8. Notes

- `public/decapcms/config.yml` is stale and does not represent the actual content workflow for this site.
- The current content model is file-based and should be treated as the source of truth.
