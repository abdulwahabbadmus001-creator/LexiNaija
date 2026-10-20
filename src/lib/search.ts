import type { DictionaryEntry } from '../types'

const normalize = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()

export function searchEntries(entries: DictionaryEntry[], query: string) {
  const q = normalize(query)
  if (!q) return entries

  return entries
    .map((entry) => {
      const fields = [
        entry.term,
        entry.translation,
        entry.example ?? '',
        entry.exampleTranslation ?? '',
        entry.partOfSpeech ?? '',
        ...(entry.tags ?? []),
      ]
      const normalized = fields.map(normalize)
      let score = 0
      if (normalize(entry.term) === q || normalize(entry.translation) === q) score += 100
      if (normalize(entry.term).startsWith(q) || normalize(entry.translation).startsWith(q)) score += 40
      normalized.forEach((field) => {
        if (field.includes(q)) score += 10
      })
      return { entry, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entry)
}
