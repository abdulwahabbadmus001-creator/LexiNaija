# LexiNaija

<p align="center">
  <img src="./public/lexinaija-logo.svg" alt="LexiNaija logo" width="520" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Zustand-5-433E38" alt="Zustand" />
  <img src="https://img.shields.io/badge/i18next-25-26A69A?logo=i18next&logoColor=white" alt="i18next" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Netlify-Deployment-00C7B7?logo=netlify&logoColor=white" alt="Netlify" />
  <img src="https://img.shields.io/badge/PWA-Offline_First-5A0FC8?logo=pwa&logoColor=white" alt="PWA" />
</p>

**LexiNaija** is an offline-first Nigerian language dictionary and learning web application built to make Nigerian languages easier to discover, study and use in digital environments.

The current release contains **8,000 source-backed entries** across four languages:

| Language | Code | Entries |
| --- | --- | ---: |
| Yorùbá | `yo` | 2,000 |
| Hausa | `ha` | 2,000 |
| Igbo | `ig` | 2,000 |
| Nigerian Pidgin | `pcm` | 2,000 |
| **Total** |  | **8,000** |

## Why I built LexiNaija

I built LexiNaija from a broader concern about **language, access and digital inclusion**.

A language can be widely spoken in everyday life and still remain comparatively difficult to use in digital products. Search systems, educational tools, datasets, speech technologies and other language technologies depend on structured digital resources. When those resources are limited, fragmented, difficult to discover or poorly validated, building useful technology for the language becomes harder.

UNESCO has long argued that multilingual access to cyberspace requires the creation and processing of educational, cultural and scientific content in local and indigenous languages. Its work on multilingualism also treats language access as part of participation in digital knowledge societies. Masakhane, an African NLP research community, similarly identifies limited resources, poor discoverability, weak benchmarking and reproducibility as recurring constraints in African-language technology.

LexiNaija is my attempt to work on one small but practical part of that problem: **making trustworthy Nigerian-language lexical resources easier to access through a usable, source-aware and offline-capable product**.

This project is therefore not only a dictionary interface. It is an experiment in how language data can be collected from open sources, attributed properly, validated systematically and turned into a product that remains useful under real connectivity constraints.

## The problem LexiNaija is addressing

LexiNaija is currently focused on five connected problems.

### 1. Limited digital representation

Many African languages have less structured and easily reusable digital language data than dominant global languages. This affects the development of dictionaries, search systems, educational software, NLP tools and language-learning products.

LexiNaija contributes at the lexical-resource level by assembling source-backed terms and meanings into a consistent, searchable structure.

### 2. Fragmented language resources

Useful datasets often exist across different repositories, projects and formats. A developer or learner may have to search several sources before finding reusable material.

LexiNaija normalises selected open resources into one common schema while preserving the original source and licence information for each record.

### 3. Data quality and provenance

A large dictionary is not useful if its entries are fabricated, duplicated or impossible to trace.

For that reason, LexiNaija's dataset pipeline does **not** create filler words or generate translations to reach a numerical target. If a language cannot provide enough qualifying entries from verified sources, the build fails.

### 4. Connectivity and access

A language-learning tool should not become useless simply because a connection is weak or unavailable.

The current application is therefore designed as an **offline-first Progressive Web App**. Its core dictionary data is bundled with the application, while favourites, history, learning progress and interface preferences are stored locally.

### 5. Responsible pronunciation support

Pronunciation is important, but inaccurate pronunciation can teach the wrong thing.

During development, synthetic speech models were tested for Nigerian languages. The results were not consistently accurate enough for a dictionary product, particularly where tone and language-specific pronunciation matter. Instead of shipping an unreliable feature, pronunciation audio was removed from this release and moved into future development.

## Research context

LexiNaija sits within a wider discussion about multilingualism, low-resource languages and digital participation.

UNESCO's **Recommendation concerning the Promotion and Use of Multilingualism and Universal Access to Cyberspace** calls for the development of multilingual digital content and systems, including local and indigenous content. UNESCO's continuing work on multilingualism and linguistic diversity also links language representation online with broader digital inclusion.

African NLP initiatives such as **Masakhane** have documented another side of the problem: African-language research is often constrained by low-resource conditions, fragmented datasets, limited discoverability and weak reproducibility. These issues matter not only for academic research but also for developers trying to build practical tools for African users.

LexiNaija does not claim to solve the entire African-language technology gap. Its current contribution is deliberately narrower: create a transparent, reproducible and usable Nigerian-language dictionary layer that can be improved over time.

### Selected background references

- UNESCO — [Recommendation concerning the Promotion and Use of Multilingualism and Universal Access to Cyberspace](https://www.unesco.org/en/legal-affairs/recommendation-concerning-promotion-and-use-multilingualism-and-universal-access-cyberspace)
- UNESCO — [Multilingualism and Linguistic Diversity](https://www.unesco.org/en/multilingualism-linguistic-diversity)
- UNESCO — [Multilingualism in Cyberspace](https://www.unesco.org/en/multilingualism-linguistic-diversity/multilingualism-cyberspace)
- Masakhane — [African language NLP community and low-resource research](https://www.masakhane.io/)

## Current scope

The current public release intentionally has a limited and clearly defined scope.

### Languages

- **Yorùbá:** 2,000 entries
- **Hausa:** 2,000 entries
- **Igbo:** 2,000 entries
- **Nigerian Pidgin:** 2,000 entries

### What the application currently supports

- dictionary search across 8,000 entries;
- language-specific browsing and filtering;
- English meanings;
- visible source provenance;
- saved/favourite words;
- search and viewing history;
- word of the day;
- quiz and learning mode;
- locally stored learning progress;
- light, dark and system themes;
- responsive desktop and mobile-browser layouts;
- Progressive Web App support; and
- offline-first use after application assets are cached.

### What this release does not yet claim to provide

- comprehensive coverage of any of the four languages;
- authoritative linguistic standardisation across all dialects;
- native-speaker-validated pronunciation audio;
- speech recognition;
- machine translation;
- generative language tutoring;
- a complete corpus for NLP model training; or
- coverage of all Nigerian languages.

Those are important distinctions. The current 8,000-entry dataset is a **starting lexical layer**, not a claim that four Nigerian languages have been completely digitised.

## Release status

**Current version:** `2.0.0`  
**Dataset:** 8,000 validated entries  
**Frontend:** React + TypeScript + Vite  
**Storage:** Local browser storage  
**Deployment target:** Netlify  
**Pronunciation audio:** Deferred pending stronger validation

The four generated dictionary files committed under `src/data/dictionary/` are the exact datasets used by the application.

## Data integrity and methodology

LexiNaija does **not** fabricate dictionary words or translations to satisfy a target count.

The dataset builder:

- downloads or reads credited open language resources;
- keeps source-provided terms and source-provided English meanings;
- normalises Unicode and whitespace;
- filters malformed records;
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

## Development roadmap

Development after the current release is centred on improving **depth, reliability and language coverage**, rather than adding features merely for quantity.

### 1. Expand Nigerian-language coverage

Additional Nigerian languages will be introduced gradually when sufficiently reliable and legally reusable source data can be identified.

The same rule used for the current four languages will remain in place: **no invented entries simply to reach a target count**.

### 2. Improve the existing four datasets

The current datasets can be strengthened through:

- better part-of-speech coverage;
- clearer semantic categories;
- improved example usage where licensed source material permits it;
- better handling of dialect and orthographic variants;
- stronger duplicate and ambiguity detection; and
- continued source and licence auditing.

### 3. Native-speaker-validated pronunciation

Audio remains a planned feature, but it will not return simply because a TTS model supports a language code.

Future pronunciation development will prioritise:

- native-speaker validation;
- correct tonal and phonological behaviour;
- carefully tested synthetic speech where appropriate;
- human recordings where practical; and
- offline-friendly audio delivery.

The goal is **accurate pronunciation**, not merely the presence of a speaker button.

### 4. Stronger learning tools

The learning layer can grow beyond the current quiz and word-of-the-day experience into features such as:

- spaced repetition;
- adaptive revision;
- topic-based vocabulary groups;
- progress statistics;
- more structured learning paths; and
- richer contextual examples.

### 5. Better offline and search performance

As the dataset grows beyond 8,000 entries, the project will need stronger local indexing and caching strategies so that search remains fast without sacrificing offline access.

### 6. Language-data API and reuse

A later phase can expose carefully structured LexiNaija data through an API so that cultural, educational and research products can reuse the same source-aware language layer instead of rebuilding separate dictionaries.

Any API work will retain the same provenance and licensing requirements as the application itself.

### 7. Community and linguistic review

Long-term quality cannot rely only on automated validation.

A future contribution model should make it possible for knowledgeable speakers, language researchers and contributors to flag errors, propose corrections, document variants and strengthen the quality of entries without weakening source traceability.

## Features

- Search across 8,000 Nigerian-language dictionary entries
- Language-specific browsing for Yorùbá, Hausa, Igbo and Nigerian Pidgin
- English meanings and source provenance for dictionary records
- Saved/favourite words
- Search and viewing history
- Word of the day
- Quiz/learning mode
- Local learning progress
- Light, dark and system themes
- Progressive Web App support
- Offline-first access after the application has been loaded/cached
- Responsive interface for desktop and mobile browsers
- Deterministic dataset validation before production builds

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
LexiNaija/
├── public/
│   ├── icon.svg
│   ├── lexinaija-logo.svg
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
git clone https://github.com/abdulwahabbadmus001-creator/LexiNaija.git
cd LexiNaija
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
powershell -ExecutionPolicy Bypass -File .\BUILD_LEXINAIJA_8000.ps1
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

LexiNaija is designed to keep its core dictionary and learning experience available locally.

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

LexiNaija is built to make Nigerian languages easier to explore, learn and preserve through accessible digital tools.
