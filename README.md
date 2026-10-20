# LinguaNaija

LinguaNaija is an offline-first Nigerian language learning and dictionary web application built with React, TypeScript and Vite.

## Current release dataset

The release target is **8,000 source-backed dictionary entries**:

- YorÃ¹bÃ¡ â€” 2,000
- Hausa â€” 2,000
- Igbo â€” 2,000
- Nigerian Pidgin â€” 2,000

The deterministic dataset builder downloads credited open resources and uses only source-provided terms and English meanings. It does not generate dictionary words or translations. Each generated entry stores source name, source URL and source licence. See `DATA_SOURCES.md`.

Pronunciation/audio is intentionally **not part of this release**. It is reserved for a future development phase after native-speaker accuracy can be validated.

## One-run Windows setup

From the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\BUILD_LINGUANAIJA_8000.ps1
```

That command installs packages, downloads/builds the four datasets, validates all 8,000 entries, type-checks and creates the production build.

Then start the app:

```powershell
npm.cmd run dev
```

## Production / deployment

Netlify settings are provided in `netlify.toml`. Build command: `npm run build`. Publish directory: `dist`.

Commit the four generated JSON files under `src/data/dictionary/` after a successful build so deployment uses the exact validated dataset you tested locally.

## Main features

- Dictionary search and filters
- 2,000 entries per launch language
- Saved words and history
- Word of the day
- Quiz/learning mode
- Dark/light/system themes
- Offline/PWA support
- Per-entry source provenance
- Scalable JSON language-data architecture

