# Basdogan Lab Website

Academic group website built with [Astro](https://astro.build/) and adapted from the public [AstroWind](https://github.com/onwidget/astrowind) template patterns.

## Overview

This repository contains the lab website with six primary public pages:

- `/`
- `/research`
- `/news`
- `/publications`
- `/team`
- `/contact`

The site is a static Astro project deployed through GitHub Pages.

## Preferred Workflow

This repository uses an agent-first maintenance workflow.

- Prefer using an AI coding agent to update website content and structure.
- Humans should describe the requested changes, review the generated edits, and approve any follow-up fixes.
- Repo-local skills live under `skills/<skill-name>/SKILL.md`.
- For website maintenance in this repo, use `skills/basdoganlab-website-updater/SKILL.md`.

This is the preferred workflow because the site mixes Astro pages, Markdown, JSON, TypeScript data, and BibTeX. Agent-guided updates are less likely to miss connected source files or break formatting.

## Tech Stack

- Astro for static site generation
- Tailwind CSS for styling
- Markdown content collection for News
- JSON and TypeScript data files for site content
- BibTeX for Publications
- GitHub Actions and GitHub Pages for deployment

## Quick Start

1. Install Node.js 20+.
2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start local development:

   ```bash
   npm run dev -- --host 127.0.0.1 --port 4321
   ```

4. Build the production site:

   ```bash
   npm run build
   ```

5. Open the local site at `http://127.0.0.1:4321/basdoganlab`.

## Content Model

### Research

- Listing page: `src/pages/research.astro`
- Detail template: `src/pages/research/[slug].astro`
- Source data: `src/data/research.ts`

Research content is data-driven. Update `src/data/research.ts` for normal content changes.

### News

- Page: `src/pages/news.astro`
- Collection schema: `src/content/config.ts`
- Entries: `src/content/news/*.md`

Use one Markdown file per news item. Required frontmatter fields are:

- `title`
- `date`
- `summary`
- optional `tags`
- optional `draft`

### Publications

- Page: `src/pages/publications.astro`
- Data file: `src/data/publications.bib`
- Parser: `src/utils/publications.ts`

Publications are generated from BibTeX. Each entry needs:

- `title`
- `author`
- `year`
- one venue field such as `journal`, `booktitle`, `publisher`, `school`, or `howpublished`

Useful optional fields include `abstract`, `doi`, `url`, `pdf`, `keywords`, and `note`.

### Team

- Team page: `src/pages/team.astro`
- PI profile page: `src/pages/team/pi.astro`
- Team data: `src/data/team.json`

Normal roster updates belong in `src/data/team.json`. The PI profile header is driven from the `PI` entry in that file, but the long-form PI biography and mentorship sections are still hardcoded in `src/pages/team/pi.astro`.

### Contact

- Page: `src/pages/contact.astro`

The Contact page is currently hardcoded and should be edited directly.

## Deployment

### GitHub Pages workflow

- Workflow file: `.github/workflows/deploy.yml`
- Trigger: pushes to `main` with `master` fallback support
- Output: publishes `dist/` to GitHub Pages

### Custom domain setup

1. Replace `lab.example.edu` in `CNAME` with the actual domain.
2. In GitHub repository settings, enable Pages with GitHub Actions as the source.
3. Add DNS records at the registrar:
   - Apex/root domain: A or ALIAS records to GitHub Pages endpoints
   - `www`: CNAME to `<your-org-or-user>.github.io`
4. Enable HTTPS in GitHub Pages settings after DNS propagation.

## Documentation

- `MAINTENANCE.md` contains the detailed operating guide, verification flow, release steps, and troubleshooting notes.
- `skills/README.md` defines the standard convention for repo-local agent skills.
- `skills/basdoganlab-website-updater/SKILL.md` contains repo-local instructions for agents that update the site.

## Attribution and License

- This project is customized from public Astro patterns and layout ideas from AstroWind.
- Original template source: [onwidget/astrowind](https://github.com/onwidget/astrowind)
- AstroWind license file is retained in `LICENSE.md`.
