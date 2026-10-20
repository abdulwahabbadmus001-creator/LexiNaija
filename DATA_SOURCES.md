# LinguaNaija 8,000-entry release — verified source register

LinguaNaija does **not** generate dictionary words or translations with AI. The dataset builder downloads credited open resources, selects only source-provided terms and source-provided English meanings, normalises whitespace/Unicode, deduplicates, and stops with an error if a language cannot supply 2,000 usable sourced entries.

Every generated entry contains `source`, `sourceUrl` and `sourceLicense`. Where the upstream source exposes a stable record/provenance identifier, LinguaNaija also retains it as `sourceRecordId`.

## Yorùbá (`yo`) — 2,000 entries
- Source: Kaikki/Wiktionary Yoruba machine-readable dictionary.
- Provenance: English Wiktionary data extracted with Wiktextract and published by Kaikki.
- Current Kaikki index reports 4,876 distinct Yoruba word forms, so the build can select 2,000 unique non-name/non-character dictionary terms without filler.
- Licence: CC BY-SA 3.0 for underlying English Wiktionary content.
- Source page: https://kaikki.org/dictionary/Yoruba/

## Hausa (`ha`) — 2,000 entries
LinguaNaija combines two credited Wiktionary-derived open sources and deduplicates by Hausa term:

1. Kaikki/Wiktionary Hausa machine-readable dictionary.
   - Current Kaikki index reports 2,010 distinct Hausa word forms.
   - Licence: CC BY-SA 3.0 for underlying English Wiktionary content.
   - Source page: https://kaikki.org/dictionary/Hausa/

2. Murya / `adab-tech/hausa-ai` open Hausa→English lexicon.
   - Source entries are extracted from Hausa Wiktionary/Kaikki and carry provenance metadata.
   - Licence: CC BY-SA 4.0 source entries.
   - Source page: https://github.com/adab-tech/hausa-ai

The second source supplies additional unique Hausa terms after Kaikki filtering; the builder never duplicates a Hausa headword merely to reach 2,000.

## Igbo (`ig`) — 2,000 entries
LinguaNaija combines two credited open dictionary sources and deduplicates by Igbo headword:

1. Afri-Dict by The African Research Collective.
   - Data: bilingual dictionary records with headword, part of speech and definition.
   - Licence: MIT.
   - Source page: https://huggingface.co/datasets/taresco/afri-dict

2. Nkọwa okwu / Igbo API open-source Igbo-English dictionary.
   - Repository purpose: an API exposing Igbo words, definitions and related dictionary data.
   - The repository contains both a common-word Igbo-English dictionary and a larger dictionary file; LinguaNaija uses these only to supplement unique headwords missing from Afri-Dict.
   - Licence: Apache-2.0 repository licence.
   - Source page: https://github.com/nkowaokwu/igbo_api

Afri-Dict is preferred first. The builder then fills only the remaining gap with unique source-provided Nkọwa okwu entries. It rejects cross-references such as “see …”, morphological fragments with leading/trailing hyphens, malformed terms, duplicate headwords and empty definitions. No generated Igbo or generated English meaning is used.

## Nigerian Pidgin (`pcm`) — 2,000 entries
- Source: Okwu African Language Parallel Corpus.
- Data: Nigerian Pidgin paired with English; the public schema includes `verified`, `record_id`, provenance and source fields.
- Verification: Okwu defines `verified` as human bidirectional validation. LinguaNaija accepts only records where `verified` is true.
- Licence: CDLA-Permissive-2.0.
- Source page: https://huggingface.co/datasets/Okwu/african-language-parallel-corpus
- Important: Okwu is a parallel corpus containing single-word vocabulary, short phrases and full sentences. To keep LinguaNaija dictionary-like without inventing content, the builder sorts verified unique records by source-text length and takes the 2,000 shortest source-provided entries. Therefore some Pidgin entries can be short phrases rather than single lexical headwords.

## What the builder is allowed to change
- Unicode normalisation (NFC)
- whitespace cleanup
- safe display metadata such as category/tags
- deduplication and deterministic selection

## What the builder does not do
- invent words
- translate text
- paraphrase definitions
- use an LLM or machine-translation model
- create filler entries to force a target count

If any source changes so that fewer than 2,000 qualifying records are available, `npm run data:build` fails instead of fabricating replacements.
