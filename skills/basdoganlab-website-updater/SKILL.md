---
name: basdoganlab-website-updater
description: Use this skill when updating the Basdogan Lab website content or structure, especially the Research, News, Publications, Team, PI profile, and Contact pages. This skill explains where each page's source data lives, which files are data-driven versus hardcoded, how to add images and content safely, and what to verify before finishing.
---

# Basdogan Lab Website Updater

This repo is an Astro site with a small number of content entry points. Before editing, inspect the current files and avoid assuming the site is CMS-driven.

## Quick map

- Research listing page: `src/pages/research.astro`
- Research detail template: `src/pages/research/[slug].astro`
- Research data: `src/data/research.ts`
- News page: `src/pages/news.astro`
- News collection schema: `src/content/config.ts`
- News entries: `src/content/news/*.md`
- Publications page: `src/pages/publications.astro`
- Publications parser: `src/utils/publications.ts`
- Publications data: `src/data/publications.bib`
- Team page: `src/pages/team.astro`
- PI profile page: `src/pages/team/pi.astro`
- Team data: `src/data/team.json`
- Contact page: `src/pages/contact.astro`
- Navigation/footer links: `src/navigation.ts`
- Maintenance notes: `MAINTENANCE.md`

## Update workflow

1. Read the relevant page file and its backing data file before editing.
2. Prefer updating data sources over changing page templates when the request is content-only.
3. If a request affects wording shared across pages, check both the page source and `src/navigation.ts`.
4. After edits, run `npm run build`.
5. If the change is substantial or visual, also run `npm run dev -- --host 127.0.0.1 --port 4321` and inspect the affected routes.

## Content model by section

### Research

Update `src/data/research.ts`.

Each research area is an object in `researchAreas` with:

- `slug`
- `title`
- `summary`
- `overview`
- `focus`
- `methods`
- `recentDirections`
- optional `figures`

The listing page reads from this data automatically. The detail page route is generated from `slug`.

For research images:

- Prefer files in `src/assets/images/`
- Reference them as `~/assets/images/...`
- Include meaningful `alt` and `caption`
- `scale` is optional and controls max display width on detail pages

Only edit `src/pages/research.astro` or `src/pages/research/[slug].astro` when changing layout, labels, or rendering behavior.

### News

Add or edit Markdown files in `src/content/news/`.

Use one file per item, ideally named:

`YYYY-MM-DD-short-title.md`

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

- `draft: true` hides an entry
- The page sorts items newest-first by date
- Optional body text is allowed below the frontmatter, but the current page only shows summary and tags

If a request asks for full news post pages, that is not currently implemented and will require new routing and templates.

### Publications

Update `src/data/publications.bib`.

The page parses BibTeX at build time. Keep syntax valid.

Required practical fields per entry:

- `title`
- `author`
- `year`
- one venue field:
  - `journal`
  - `booktitle`
  - `publisher`
  - `school`
  - `howpublished`

Useful optional fields:

- `abstract`
- `doi`
- `url`
- `pdf`
- `keywords`
- `note`

Behavior to remember:

- author names can be plain or `Last, First`
- DOI links are normalized automatically
- entries missing required fields are silently dropped from the rendered page
- publications are sorted by year descending, then title

If a user says a paper is "missing" after adding it, validate the BibTeX fields first.

### Team

Update `src/data/team.json` for normal roster changes.

Supported fields already used by the page include:

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

Photo handling:

- Put local photos in `public/images/`
- Reference them as `/images/...`
- External image URLs also work

Sorting behavior:

- The Team page sorts by section, then by role priority, then by original JSON order
- Do not assume the `order` field controls display; the current page does not use it
- To rearrange members within the same role/section, reorder the JSON entries unless you are also updating the sort logic

### PI profile page

The PI page is partially data-driven and partially hardcoded.

Basic header info comes from the team member whose `role` is `PI` in `src/data/team.json`.

Long-form page content still lives directly in:

- `src/pages/team/pi.astro`

Update that file when changing:

- biography
- research program description
- mentorship or open position text

If the request is to make PI content editable from JSON or Markdown, that is a structural improvement, not a routine content update.

### Contact

Update `src/pages/contact.astro`.

This page is currently hardcoded. Edit it directly for:

- PI name
- email
- office/location
- mailing address
- application instructions
- collaboration text

If the same contact details appear elsewhere, also check:

- `src/navigation.ts`
- `src/data/team.json`

## Important repo quirks

- `public/decapcms/config.yml` is stale and does not represent the actual content model used by this site.
- The current site is maintained through Astro pages plus local data files, not a working CMS workflow for these sections.
- The build output is static and generated into `dist/`.

## Safe editing guidance

- For content updates, avoid changing layout classes unless requested.
- Preserve `getPermalink(...)` usage when editing navigation or internal links.
- Keep image paths consistent with the existing conventions:
  - `src/assets/images/` for imported build-time assets
  - `public/images/` for direct public paths
- When editing JSON or BibTeX, be careful with commas, quotes, and braces; small syntax errors can hide content or break the build.

## Verification checklist

Always run:

```bash
npm run build
```

For targeted verification, inspect the affected routes:

- `/research`
- `/research/<slug>`
- `/news`
- `/publications`
- `/team`
- `/team/pi`
- `/contact`

If using the local dev server for visual checks in this repo, the documented preview route is:

- `http://127.0.0.1:4321/basdoganlab`

## When to inspect more files

Read `src/navigation.ts` when:

- nav labels change
- footer links change
- contact email or external links change

Read `MAINTENANCE.md` when:

- you need the maintainer workflow
- you need the expected local preview commands
- you need release or verification steps

## Good defaults for future agents

- Assume content requests should be handled in data files first
- Assume PI profile and Contact updates require direct page edits unless the user asks for a refactor
- If a publication or news item does not render, validate schema and file syntax before debugging layout
- If a user wants easier future maintenance, consider making PI profile and Contact data-driven from the same content sources already used elsewhere
