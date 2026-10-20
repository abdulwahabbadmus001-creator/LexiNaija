# LinguaNaija

**LinguaNaija** is an offline-first Nigerian language dictionary and learning web application built with React, TypeScript and Vite.

The current release contains **8,000 source-backed entries** across four Nigerian languages:

| Language | Code | Entries |
| --- | --- | ---: |
| Yorùbá | `yo` | 2,000 |
| Hausa | `ha` | 2,000 |
| Igbo | `ig` | 2,000 |
| Nigerian Pidgin | `pcm` | 2,000 |
| **Total** |  | **8,000** |

LinguaNaija is designed around a simple principle: Nigerian language technology should remain useful even when connectivity is limited. The dictionary, search, favourites, learning activity and local progress therefore work without requiring an online account.

## Release status

**Current version:** `2.0.0`  
**Dataset:** 8,000 validated entries  
**Frontend:** React + TypeScript + Vite  
**Storage:** Local browser storage  
**Deployment target:** Netlify  
**Pronunciation audio:** Not included in this release

The four generated dictionary files committed under `src/data/dictionary/` are the exact datasets used by the application.

## Features

- Search across 8,000 Nigerian-language dictionary entries
- Language-specific browsing for Yorùbá, Hausa, Igbo and Nigerian Pidgin
- English meanings and source provenance for dictionary records
- Saved/favourite words
- Search and viewing history
- Word of the day
- Quiz and learning mode
- Local learning progress
- Light, dark and system themes
- Progressive Web App support
- Offline-first access after the application has been loaded/cached
- Responsive interface for desktop and mobile browsers
- Deterministic dataset validation before production builds

## Data integrity

LinguaNaija does **not** fabricate dictionary words or translations to satisfy a target count.

The dataset builder:

- downloads or reads credited open language resources;
- keeps source-provided terms and source-provided English meanings;
- normalises Unicode and whitespace;
- deduplicates entries;
- preserves provenance metadata;
- validates the required entry count; and
- fails the build if a language cannot provide enough qualifying records.

Every generated dictionary entry includes source information such as `source`, `sourceUrl` and `sourceLicense`.

See [DATA_SOURCES.md](./DATA_SOURCES.md) for the complete source register, licence notes and language-specific selection rules.

### Current data sources

- **Yorùbá:** Kaikki / English Wiktionary machine-readable data
- **Hausa:** Kaikki / English Wiktionary plus the Murya open Hausa-English lexicon
- **Igbo:** Afri-Dict plus Nkọwa okwu / Igbo API dictionary data
- **Nigerian Pidgin:** verified records from the Okwu African Language Parallel Corpus

No AI-generated words, machine-generated dictionary definitions or filler records are inserted by the dataset builder.

## Technology

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- i18next / react-i18next
- Lucide React
- Progressive Web App assets and service worker
- Netlify configuration

## Project structure

```text
LinguaNaija/
├── public/
│   ├── icon.svg
│   ├── linguanaija-logo.svg
│   ├── manifest.webmanifest
│   └── sw.js
├── scripts/
│   ├── build-datasets.mjs
│   └── validate-datasets.mjs
├── src/
│   ├── components/
│   ├── data/
│   │   └── dictionary/
│   │       ├── yo.json
│   │       ├── ha.json
│   │       ├── ig.json
│   │       └── pcm.json
│   ├── lib/
│   ├── pages/
│   ├── store/
│   ├── App.tsx
│   └── main.tsx
├── DATA_SOURCES.md
├── netlify.toml
├── package.json
└── vite.config.ts
```

## Getting started

### Requirements

- Node.js
- npm
- Git
- Windows PowerShell if using the included one-run setup script

Clone the repository:

```bash
git clone https://github.com/abdulwahabbadmus001-creator/LinguaNaija.git
cd LinguaNaija
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Dataset build

The repository already contains the validated release datasets.

To deliberately rebuild all four datasets from their credited sources:

```bash
npm run data:build
```

To validate the existing datasets:

```bash
npm run data:validate
```

On Windows, the complete source-build and production-build workflow can also be run with:

```powershell
powershell -ExecutionPolicy Bypass -File .\BUILD_LINGUANAIJA_8000.ps1
```

The data pipeline is intentionally strict: if a source changes and the required number of qualifying entries cannot be obtained, generation stops instead of creating replacements.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create the production build |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run TypeScript checks |
| `npm run data:build` | Rebuild the four language datasets from credited sources |
| `npm run data:validate` | Validate entry counts, IDs and provenance |

## Production build

Create a production build with:

```bash
npm run build
```

The generated site is written to:

```text
dist/
```

## Deployment

The repository includes `netlify.toml`, so Netlify can build directly from GitHub.

Recommended Netlify settings:

```text
Branch: main
Build command: npm run build
Publish directory: dist
```

No Firebase or cloud-sync environment variables are required for the current release.

The Netlify configuration also includes the single-page application redirect required for client-side routes.

## Offline behaviour

LinguaNaija is designed to keep its core dictionary and learning experience available locally.

After the application assets are loaded and cached, users can continue using core functionality such as:

- dictionary browsing and search;
- saved words;
- history;
- learning progress; and
- interface preferences.

Data created by the user is stored locally in the browser for this release.

## Pronunciation

Pronunciation audio is intentionally excluded from version 2.0.0.

Earlier synthetic-audio testing showed that language-specific TTS does not automatically guarantee dictionary-level pronunciation accuracy, particularly for tonal languages. Pronunciation will only be reintroduced when the audio pipeline can meet an appropriate native-language accuracy standard.

## Contributing

Contributions are welcome, particularly around:

- source-backed language-data improvements;
- data validation;
- accessibility;
- offline reliability;
- interface improvements; and
- additional Nigerian-language support.

Please do not add generated vocabulary or unsourced translations to the dictionary datasets.

## Source attribution

Language data remains subject to the licences and attribution requirements of its respective upstream sources. Review [DATA_SOURCES.md](./DATA_SOURCES.md) before redistributing or modifying the datasets.

## Author

**Wahab Opeyemi Badmus**

GitHub: [@abdulwahabbadmus001-creator](https://github.com/abdulwahabbadmus001-creator)

---

LinguaNaija is built to make Nigerian languages easier to explore, learn and preserve through accessible digital tools.
