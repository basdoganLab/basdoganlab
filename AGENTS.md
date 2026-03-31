# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Project Overview

Astro 5 static site for the Basdogan Lab (academic research group). Uses TypeScript, Tailwind CSS, and Markdown/BibTeX content sources. Deployed via GitHub Pages.

**Agent-first workflow**: This repo is designed for AI agent maintenance. Prefer data file edits over template changes for content updates.

## Commands

### Development

```bash
npm ci                    # Install dependencies (use when deps change or fresh clone)
npm run dev               # Start dev server at http://127.0.0.1:4321/basdoganlab
npm run build             # Production build to dist/
npm run preview           # Preview production build
```

### Linting & Formatting

```bash
npm run check             # Run all checks (Astro types + ESLint + Prettier)
npm run check:astro       # TypeScript/Astro type checking
npm run check:eslint      # ESLint only
npm run check:prettier    # Prettier format check only

npm run fix               # Auto-fix ESLint + Prettier
npm run fix:eslint        # Auto-fix ESLint only
npm run fix:prettier      # Auto-format with Prettier
```

### Verification

Always run before completing any task:

```bash
npm run build             # Must pass - catches type errors, invalid data, broken imports
```

For visual changes, also verify affected routes at `http://127.0.0.1:4321/basdoganlab/`.

**No test suite exists** - this is a content site without automated tests.

## Code Style

### TypeScript

- **Strict null checks enabled** - handle `undefined`/`null` explicitly
- **Path alias**: Use `~/` for imports from `src/` (e.g., `~/utils/permalinks`)
- **No type suppressions**: Never use `as any`, `@ts-ignore`, `@ts-expect-error`

### Naming Conventions

| Entity               | Convention       | Example                          |
| -------------------- | ---------------- | -------------------------------- |
| Variables, functions | camelCase        | `getFormattedDate`, `headerData` |
| Types, interfaces    | PascalCase       | `ResearchArea`, `MetaData`       |
| Files                | kebab-case       | `research.ts`, `team.json`       |
| Components           | PascalCase.astro | `Header.astro`                   |

### Imports

Group imports in order:

1. External packages (`astro`, `zod`, etc.)
2. Internal aliases (`~/utils/...`, `~/components/...`)
3. Relative imports (`./`, `../`)

```typescript
import { defineCollection, z } from 'astro:content';
import { getPermalink } from '~/utils/permalinks';
import type { ResearchArea } from './research';
```

### Formatting (Prettier)

- **120 char** line width
- **2 spaces** indentation (no tabs)
- **Single quotes** for strings
- **Semicolons** required
- **ES5 trailing commas** in arrays/objects
- **LF line endings**

### ESLint Rules

- Unused variables must be prefixed with `_` (e.g., `_unusedParam`)
- Non-null assertions (`!`) are allowed
- Astro component files use `astro-eslint-parser`

### Error Handling

- Minimal explicit error handling in this codebase
- TypeScript types are the primary safety mechanism
- Build failures surface data/syntax errors

## Architecture

### Content Sources

| Page         | Data Source                             | Notes                                   |
| ------------ | --------------------------------------- | --------------------------------------- |
| Research     | `src/data/research.ts`                  | TypeScript array, data-driven           |
| News         | `src/content/news/*.md`                 | Markdown collection, frontmatter schema |
| Publications | `src/data/publications.bib`             | BibTeX, parsed at build time            |
| Team         | `src/data/team.json`                    | JSON array                              |
| Contact      | `src/pages/contact.astro`               | Hardcoded in template                   |
| PI Profile   | `src/pages/team/pi.astro` + `team.json` | Mixed: header from JSON, body hardcoded |

### Key Directories

```
src/
  assets/images/     # Build-time optimized images (use ~/assets/images/...)
  components/        # Astro components
  content/news/      # Markdown news items
  data/              # TypeScript, JSON, BibTeX data files
  layouts/           # Page layouts
  pages/             # Astro page routes
  utils/             # Utility functions
public/
  images/            # Static images (use /images/... paths)
```

### Path Conventions

- **Build-time images**: `src/assets/images/` - reference as `~/assets/images/filename.png`
- **Static images**: `public/images/` - reference as `/images/filename.png`
- **Internal links**: Use `getPermalink('/path')` from `~/utils/permalinks`

## Repo-Local Skills

This repository has agent skills in `skills/<skill-name>/SKILL.md`.

**For website content updates**: Load `skills/basdoganlab-website-updater/SKILL.md` for detailed guidance on each content type, data sources, and verification steps.

## Gotchas

- `public/decapcms/config.yml` is **stale** - ignore it, site uses file-based content
- Publications with missing required fields are **silently dropped** from render
- Team page sorts by section > role > JSON order (not by `order` field)
- Site base path is `/basdoganlab` - all preview URLs include this prefix
- PI profile page is split: header from `team.json`, body text hardcoded in `.astro` file
