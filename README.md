# Basdogan Lab Website

Academic group website built with [Astro](https://astro.build/) and structured using patterns from the public [AstroWind](https://github.com/onwidget/astrowind) template.

## Scope
This repository contains the v1 website with six core pages:

- `/` Home
- `/research`
- `/news`
- `/publications`
- `/team`
- `/contact`

## Tech stack
- Astro (static site generation)
- Tailwind CSS (styling)
- Markdown content collection for News
- JSON data files for Team and Publications
- GitHub Actions + GitHub Pages deployment

## Quick start
1. Install Node.js 20+.
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Run locally:
   ```bash
   npm run dev
   ```
4. Build production output:
   ```bash
   npm run build
   ```

## Content model

### News posts
- Folder: `src/content/news/`
- One `.md` file per post
- Frontmatter schema:
  - `title: string`
  - `date: YYYY-MM-DD`
  - `summary: string`
  - `tags?: string[]`
  - `draft?: boolean` (default `false`)

### Team
- File: `src/data/team.json`
- Schema:
  - `name: string`
  - `role: string`
  - `photo: string`
  - `email?: string`
  - `website?: string`
  - `researchInterests?: string[]`
  - `order: number`

### Publications
- File: `src/data/publications.json`
- Schema:
  - `title: string`
  - `authors: string[]`
  - `venue: string`
  - `year: number`
  - `doi?: string`
  - `url?: string`
  - `pdf?: string`
  - `highlight?: boolean`

## Deployment

### GitHub Pages workflow
- Workflow file: `.github/workflows/deploy.yml`
- Trigger: push to `main` (or `master` fallback)
- Action:
  - installs deps (`npm ci`)
  - builds Astro site (`npm run build`)
  - publishes `dist/` to GitHub Pages

### Custom domain setup
1. Replace `lab.example.edu` in `CNAME` with your real domain.
2. In GitHub repo settings, enable Pages and set source to "GitHub Actions".
3. Add DNS records at your registrar:
   - Apex/root domain: A/ALIAS to GitHub Pages endpoints
   - `www`: CNAME to `<your-org-or-user>.github.io`
4. Enable "Enforce HTTPS" in GitHub Pages settings after DNS propagation.

## Attribution and license
- This project is customized from public Astro patterns and layout ideas from AstroWind.
- Original template source: [onwidget/astrowind](https://github.com/onwidget/astrowind)
- AstroWind license file is retained in `LICENSE.md`.

## Maintenance guide
See `MAINTENANCE.md` for operational procedures, release checks, rollback steps, and role ownership.
