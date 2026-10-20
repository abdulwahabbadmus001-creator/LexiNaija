import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'src', 'data', 'dictionary')
const FORCE = process.argv.includes('--force')
const TARGET = 2000

const SOURCES = {
  yoKaikki: {
    name: 'Kaikki/Wiktionary Yoruba machine-readable dictionary',
    downloadUrl: 'https://kaikki.org/dictionary/Yoruba/kaikki.org-dictionary-Yoruba.jsonl',
    pageUrl: 'https://kaikki.org/dictionary/Yoruba/',
    license: 'CC BY-SA 3.0 (English Wiktionary content; extracted with Wiktextract/Kaikki)',
  },
  haKaikki: {
    name: 'Kaikki/Wiktionary Hausa machine-readable dictionary',
    downloadUrl: 'https://kaikki.org/dictionary/Hausa/kaikki.org-dictionary-Hausa.jsonl',
    pageUrl: 'https://kaikki.org/dictionary/Hausa/',
    license: 'CC BY-SA 3.0 (English Wiktionary content; extracted with Wiktextract/Kaikki)',
  },
  haMurya: {
    name: 'Murya Hausa open lexicon (Hausa Wiktionary/Kaikki)',
    downloadUrl: 'https://raw.githubusercontent.com/adab-tech/hausa-ai/main/data/processed/hausa_en_open/ha_en_pairs.jsonl',
    pageUrl: 'https://github.com/adab-tech/hausa-ai',
    license: 'CC BY-SA 4.0 source entries',
  },
  igAfri: {
    name: 'Afri-Dict Igbo dictionary',
    downloadUrl: 'https://huggingface.co/datasets/taresco/afri-dict/resolve/main/igbo/ibo_dictionary.csv?download=true',
    pageUrl: 'https://huggingface.co/datasets/taresco/afri-dict',
    license: 'MIT',
  },
  igNkowaCommon: {
    name: 'Nkọwa okwu / Igbo API common Igbo-English dictionary',
    downloadUrl: 'https://raw.githubusercontent.com/nkowaokwu/igbo_api/master/src/dictionaries/ig-en/ig-en_1000_common.json',
    pageUrl: 'https://github.com/nkowaokwu/igbo_api',
    license: 'Apache-2.0 (repository)',
  },
  igNkowaFull: {
    name: 'Nkọwa okwu / Igbo API Igbo-English dictionary',
    downloadUrl: 'https://raw.githubusercontent.com/nkowaokwu/igbo_api/master/src/dictionaries/ig-en/ig-en.json',
    pageUrl: 'https://github.com/nkowaokwu/igbo_api',
    license: 'Apache-2.0 (repository)',
  },
  pcm: {
    name: 'Okwu African Language Parallel Corpus — Nigerian Pidgin',
    downloadUrl: 'https://huggingface.co/datasets/Okwu/african-language-parallel-corpus/resolve/main/data/pcm-eng/pcm-eng.csv?download=true',
    pageUrl: 'https://huggingface.co/datasets/Okwu/african-language-parallel-corpus',
    license: 'CDLA-Permissive-2.0',
  },
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'LinguaNaija/2.0 source-backed dataset builder' },
  })
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`)
  return response.text()
}

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (ch === '"') {
        quoted = false
      } else {
        field += ch
      }
    } else if (ch === '"') {
      quoted = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n') {
      row.push(field.replace(/\r$/, ''))
      rows.push(row)
      row = []
      field = ''
    } else {
      field += ch
    }
  }

  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ''))
    rows.push(row)
  }
  if (!rows.length) return []

  const headers = rows[0].map((value) => value.trim())
  return rows
    .slice(1)
    .filter((r) => r.some((value) => String(value ?? '').trim()))
    .map((r) => Object.fromEntries(headers.map((header, index) => [header, r[index] ?? ''])))
}

function parseJsonl(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line)
      } catch {
        throw new Error(`Invalid JSONL record at line ${index + 1}`)
      }
    })
}

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function normaliseKey(value) {
  return clean(value).normalize('NFC').toLocaleLowerCase()
}

function asciiSlug(value) {
  return clean(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ẹ/gi, 'e')
    .replace(/ọ/gi, 'o')
    .replace(/ṣ/gi, 's')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 42) || 'entry'
}

function partOfSpeech(value = '') {
  const v = clean(value).toLowerCase()
  const map = {
    n: 'noun', noun: 'noun', v: 'verb', verb: 'verb',
    'transitive verb': 'verb', 'intransitive verb': 'verb',
    adj: 'adjective', adjective: 'adjective', adv: 'adverb', adverb: 'adverb',
    pron: 'pronoun', pronoun: 'pronoun', num: 'number', numeral: 'number',
    excl: 'expression', interjection: 'expression', preposition: 'preposition',
    phrase: 'expression', proverb: 'expression', determiner: 'determiner',
    conjunction: 'conjunction', particle: 'particle', contraction: 'contraction',
  }
  return map[v] ?? (v || undefined)
}

const groups = {
  Greetings: /hello|welcome|greet|good morning|good evening|thank|sorry|please|how are you|greeting/i,
  People: /father|mother|child|person|friend|family|brother|sister|husband|wife|woman|man|girl|boy|teacher|farmer|king|queen|chief|neighbour/i,
  Food: /food|eat|drink|water|rice|yam|bread|meat|fish|egg|soup|vegetable|salt|sugar|coffee|fruit|cassava|maize|corn|palm wine/i,
  Travel: /road|path|travel|journey|car|vehicle|go|come|arrive|return|walk|run|market|town|village|direction/i,
  Numbers: /\b(one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|forty|fifty|sixty|hundred|thousand|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)\b/i,
  Expressions: /what|who|why|when|where|how|yes|no|only|must|ought|please|thanks|sorry|welcome/i,
}

function category(gloss, pos, hint = '') {
  const text = `${gloss} ${hint}`
  for (const [name, re] of Object.entries(groups)) if (re.test(text)) return name
  if (pos === 'number') return 'Numbers'
  if (['expression', 'pronoun', 'preposition', 'determiner', 'conjunction', 'particle'].includes(pos)) return 'Expressions'
  return 'Daily life'
}

function tagsFrom(gloss) {
  return [...new Set(clean(gloss).toLowerCase().replace(/[^a-z0-9' -]/g, ' ').split(/\s+/).filter((word) => word.length > 2).slice(0, 6))]
}

function makeEntry(code, index, {
  term,
  translation,
  pos = '',
  categoryHint = '',
  source,
  sourceUrl,
  sourceLicense,
  sourceRecordId = '',
}) {
  const t = clean(term).normalize('NFC')
  const tr = clean(translation).normalize('NFC')
  const p = partOfSpeech(pos)
  if (!t || !tr || !source || !sourceUrl || !sourceLicense) {
    throw new Error(`Refusing to create an unsourced/empty ${code} entry`)
  }

  return {
    id: `${code}-${String(index + 1).padStart(4, '0')}-${asciiSlug(t)}`,
    language: code,
    term: t,
    translation: tr,
    ...(p ? { partOfSpeech: p } : {}),
    example: '',
    exampleTranslation: '',
    category: category(tr, p, categoryHint),
    tags: tagsFrom(tr),
    source,
    sourceUrl,
    sourceLicense,
    ...(sourceRecordId ? { sourceRecordId: clean(sourceRecordId) } : {}),
  }
}

function uniqueBy(items, keyFn) {
  const seen = new Set()
  return items.filter((item) => {
    const key = keyFn(item)
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function firstGoodGloss(record) {
  for (const sense of Array.isArray(record.senses) ? record.senses : []) {
    for (const gloss of Array.isArray(sense?.glosses) ? sense.glosses : []) {
      const value = clean(gloss)
      if (!value) continue
      if (/^(alternative|archaic|obsolete|rare) form of\b/i.test(value)) continue
      if (/^form of\b/i.test(value)) continue
      return value
    }
  }
  return ''
}

function canonicalKaikkiHeadword(record) {
  const canonical = (Array.isArray(record.forms) ? record.forms : []).find(
    (form) => Array.isArray(form?.tags) && form.tags.includes('canonical') && clean(form.form),
  )
  return clean(canonical?.form || record.word)
}

function validDictionaryTerm(term) {
  const value = clean(term)
  if (!value || value.length > 70 || /\d/.test(value)) return false
  if (/[\u0600-\u06FF]/.test(value)) return false
  return true
}

function fromKaikki(records, source, max = TARGET) {
  const rows = records
    .map((record) => ({
      term: canonicalKaikkiHeadword(record),
      gloss: firstGoodGloss(record),
      pos: clean(record.pos),
      record,
    }))
    .filter(({ term, gloss, pos }) => {
      if (!validDictionaryTerm(term) || !gloss || gloss.length > 180) return false
      if (['name', 'proper name', 'character', 'suffix', 'prefix', 'interfix'].includes(pos.toLowerCase())) return false
      return true
    })

  return uniqueBy(rows, (row) => normaliseKey(row.term)).slice(0, max).map((row) => ({
    term: row.term,
    translation: row.gloss,
    pos: row.pos,
    source: source.name,
    sourceUrl: source.pageUrl,
    sourceLicense: source.license,
    sourceRecordId: clean(row.record?.id || row.record?.word || ''),
  }))
}

async function buildYoruba() {
  const records = parseJsonl(await fetchText(SOURCES.yoKaikki.downloadUrl))
  const selected = fromKaikki(records, SOURCES.yoKaikki, TARGET)
  if (selected.length !== TARGET) {
    throw new Error(`Yorùbá verified sources yielded ${selected.length} unique usable entries; need ${TARGET}. No filler was generated.`)
  }
  return selected.map((row, index) => makeEntry('yo', index, row))
}

async function buildHausa() {
  const [kaikkiText, muryaText] = await Promise.all([
    fetchText(SOURCES.haKaikki.downloadUrl),
    fetchText(SOURCES.haMurya.downloadUrl),
  ])

  const selected = fromKaikki(parseJsonl(kaikkiText), SOURCES.haKaikki, TARGET)
  const seenTerms = new Set(selected.map((row) => normaliseKey(row.term)))

  for (const row of parseJsonl(muryaText)) {
    if (selected.length >= TARGET) break
    const term = clean(row.target_ha)
    const gloss = clean(row.source_en)
    const key = normaliseKey(term)
    if (!validDictionaryTerm(term) || !gloss || gloss.length > 180) continue
    if (row.context === 'name' || row.context === 'character') continue
    if (/letter of the hausa alphabet/i.test(gloss)) continue
    if (seenTerms.has(key)) continue
    seenTerms.add(key)
    selected.push({
      term,
      translation: gloss,
      pos: clean(row.context),
      source: SOURCES.haMurya.name,
      sourceUrl: SOURCES.haMurya.pageUrl,
      sourceLicense: SOURCES.haMurya.license,
      sourceRecordId: clean(row.provenance),
    })
  }

  if (selected.length !== TARGET) {
    throw new Error(`Hausa verified sources yielded ${selected.length} unique usable entries; need ${TARGET}. No filler was generated.`)
  }
  return selected.map((row, index) => makeEntry('ha', index, row))
}

function firstIgboHeadword(value) {
  return clean(value)
    .replace(/^['"]|['"]$/g, '')
    .split(',')[0]
    .replace(/\s+\d+\.?$/, '')
    .trim()
}

function validIgboSupplementTerm(term) {
  const value = clean(term).normalize('NFC')
  if (!validDictionaryTerm(value) || value.length > 60) return false
  if (value.startsWith('-') || value.endsWith('-')) return false
  if (/[()[\]{};=<>]/.test(value)) return false
  if (value.split(/\s+/).filter(Boolean).length > 4) return false
  return /^[\p{L}\p{M}][\p{L}\p{M} ’'’-]*$/u.test(value)
}

function firstNkowaDefinition(record) {
  for (const definition of Array.isArray(record?.definitions) ? record.definitions : []) {
    const value = clean(definition)
    if (!value || value.length > 160) continue
    if (/^(see(?:\s|-)|cf\.|compare\s)/i.test(value)) continue
    return value
  }
  return ''
}

function nkowaCandidates(dictionary, source, useObjectKey = false) {
  const candidates = []

  for (const [headword, records] of Object.entries(dictionary || {})) {
    if (!Array.isArray(records)) continue
    for (const record of records) {
      const term = clean(useObjectKey ? headword : (record?.word || headword)).normalize('NFC')
      const translation = firstNkowaDefinition(record)
      if (!validIgboSupplementTerm(term) || !translation) continue
      candidates.push({
        term,
        translation,
        pos: clean(record?.wordClass),
        source: source.name,
        sourceUrl: source.pageUrl,
        sourceLicense: source.license,
      })
      break
    }
  }

  return uniqueBy(
    candidates.sort((a, b) => {
      const aWords = a.term.split(/\s+/).filter(Boolean).length
      const bWords = b.term.split(/\s+/).filter(Boolean).length
      return aWords - bWords || a.term.length - b.term.length || a.term.localeCompare(b.term, 'ig')
    }),
    (row) => normaliseKey(row.term),
  )
}

async function buildIgbo() {
  const [afriText, nkowaCommonText, nkowaFullText] = await Promise.all([
    fetchText(SOURCES.igAfri.downloadUrl),
    fetchText(SOURCES.igNkowaCommon.downloadUrl),
    fetchText(SOURCES.igNkowaFull.downloadUrl),
  ])

  const afriRows = parseCsv(afriText)
  const selected = uniqueBy(
    afriRows
      .map((row) => ({
        term: firstIgboHeadword(row.word),
        translation: clean(row.definition),
        pos: clean(row.pos),
        source: SOURCES.igAfri.name,
        sourceUrl: SOURCES.igAfri.pageUrl,
        sourceLicense: SOURCES.igAfri.license,
        sourceRecordId: clean(row.entry_id || ''),
      }))
      .filter(({ term, translation, pos }) => {
        if (!validDictionaryTerm(term) || !translation || translation.length > 180) return false
        if (/^see\b|used in:|\[check\]/i.test(translation)) return false
        if (/proper name/i.test(pos)) return false
        return true
      }),
    (row) => normaliseKey(row.term),
  )

  const afriCount = selected.length
  const seenTerms = new Set(selected.map((row) => normaliseKey(row.term)))

  const supplement = (rows) => {
    for (const row of rows) {
      if (selected.length >= TARGET) break
      const key = normaliseKey(row.term)
      if (!key || seenTerms.has(key)) continue
      seenTerms.add(key)
      selected.push(row)
    }
  }

  // Prefer Nkọwa okwu's common-word dictionary, then use the larger dictionary only if needed.
  // No generated translations or filler are introduced: both files are source dictionaries.
  supplement(nkowaCandidates(JSON.parse(nkowaCommonText), SOURCES.igNkowaCommon, true))
  supplement(nkowaCandidates(JSON.parse(nkowaFullText), SOURCES.igNkowaFull, false))

  if (selected.length < TARGET) {
    throw new Error(`Igbo verified sources yielded ${selected.length} unique usable entries; need ${TARGET}. No filler was generated.`)
  }

  const finalRows = selected.slice(0, TARGET)
  console.log(`ig: ${Math.min(afriCount, TARGET)} Afri-Dict entries + ${Math.max(0, TARGET - Math.min(afriCount, TARGET))} Nkọwa okwu supplemental entries`)

  return finalRows.map((row, index) => makeEntry('ig', index, row))
}

function truthy(value) {
  if (typeof value === 'boolean') return value
  return ['true', '1', 'yes'].includes(clean(value).toLowerCase())
}

function wordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length
}

async function buildPidgin() {
  const rows = parseCsv(await fetchText(SOURCES.pcm.downloadUrl))
  const usable = uniqueBy(
    rows
      .filter((row) => truthy(row.verified))
      .filter((row) => !clean(row.source_lang) || clean(row.source_lang) === 'pcm')
      .map((row) => ({
        term: clean(row.source_text_normalized || row.source_text),
        translation: clean(row.english_translation),
        sourceRecordId: clean(row.record_id),
        originalSource: clean(row.source),
      }))
      .filter(({ term, translation }) => validDictionaryTerm(term) && translation && translation.length <= 220)
      .sort((a, b) => wordCount(a.term) - wordCount(b.term) || a.term.length - b.term.length || a.term.localeCompare(b.term)),
    (row) => normaliseKey(row.term),
  ).slice(0, TARGET)

  if (usable.length !== TARGET) {
    throw new Error(`Nigerian Pidgin human-verified source yielded ${usable.length} unique usable entries; need ${TARGET}. No filler was generated.`)
  }

  const longestSelected = Math.max(...usable.map((row) => wordCount(row.term)))
  console.log(`pcm: selecting the ${TARGET} shortest unique human-verified source entries (longest selected: ${longestSelected} words)`)

  return usable.map((row, index) => makeEntry('pcm', index, {
    term: row.term,
    translation: row.translation,
    categoryHint: row.originalSource,
    source: row.originalSource ? `${SOURCES.pcm.name} — ${row.originalSource}` : SOURCES.pcm.name,
    sourceUrl: SOURCES.pcm.pageUrl,
    sourceLicense: SOURCES.pcm.license,
    sourceRecordId: row.sourceRecordId,
  }))
}

async function existingIsValid() {
  try {
    for (const code of ['yo', 'ha', 'ig', 'pcm']) {
      const parsed = JSON.parse(await fs.readFile(path.join(OUT, `${code}.json`), 'utf8'))
      if (!Array.isArray(parsed) || parsed.length !== TARGET || parsed.some((row) => row.language !== code || !row.source || !row.sourceUrl || !row.sourceLicense)) return false
    }
    return true
  } catch {
    return false
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  if (!FORCE && await existingIsValid()) {
    console.log('LinguaNaija datasets already ready: 2,000 entries x 4 languages = 8,000.')
    return
  }

  console.log('Building LinguaNaija 8,000-entry release from credited open sources only...')
  console.log('No AI-generated words, translations or filler are used by this builder.')

  const datasets = {
    yo: await buildYoruba(),
    ha: await buildHausa(),
    ig: await buildIgbo(),
    pcm: await buildPidgin(),
  }

  for (const [code, items] of Object.entries(datasets)) {
    if (items.length !== TARGET) throw new Error(`${code}: expected ${TARGET}, got ${items.length}`)
    await fs.writeFile(path.join(OUT, `${code}.json`), `${JSON.stringify(items, null, 2)}\n`, 'utf8')
    console.log(`${code}: ${items.length} sourced entries`)
  }

  const all = Object.values(datasets).flat()
  const ids = new Set(all.map((row) => row.id))
  if (all.length !== TARGET * 4 || ids.size !== TARGET * 4) throw new Error('Final dataset validation failed')
  console.log('DONE: 8,000 source-backed entries generated (2,000 per language).')
}

main().catch((error) => {
  console.error(`DATASET BUILD FAILED: ${error.message}`)
  process.exit(1)
})
