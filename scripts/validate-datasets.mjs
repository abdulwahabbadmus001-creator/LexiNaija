import fs from 'node:fs/promises'
import path from 'node:path'

const dir = path.join(process.cwd(), 'src', 'data', 'dictionary')
const expected = { yo: 2000, ha: 2000, ig: 2000, pcm: 2000 }
let total = 0
const ids = new Set()

for (const [code, count] of Object.entries(expected)) {
  const file = path.join(dir, `${code}.json`)
  const rows = JSON.parse(await fs.readFile(file, 'utf8'))
  if (!Array.isArray(rows)) throw new Error(`${code}.json is not an array`)
  if (rows.length !== count) throw new Error(`${code}.json has ${rows.length}; expected ${count}`)

  const termKeys = new Set()
  for (const row of rows) {
    if (!row.id || !row.term || !row.translation || row.language !== code) {
      throw new Error(`Invalid ${code} entry: ${JSON.stringify(row)}`)
    }
    if (!row.source || !row.sourceUrl || !row.sourceLicense) {
      throw new Error(`Missing provenance for ${row.id}`)
    }
    if (!/^https:\/\//.test(row.sourceUrl)) {
      throw new Error(`Invalid source URL for ${row.id}: ${row.sourceUrl}`)
    }
    if (ids.has(row.id)) throw new Error(`Duplicate ID: ${row.id}`)
    ids.add(row.id)

    const termKey = row.term.normalize('NFC').toLocaleLowerCase()
    if (termKeys.has(termKey)) throw new Error(`Duplicate ${code} term: ${row.term}`)
    termKeys.add(termKey)
  }

  total += rows.length
  console.log(`${code}: ${rows.length} sourced, unique entries`)
}

if (total !== 8000) throw new Error(`Expected 8,000; got ${total}`)
console.log('VALIDATION PASSED: 8,000 entries, 2,000 per language, unique terms/IDs, provenance present.')
