import type { DictionaryEntry } from '../../types'

const modules = import.meta.glob('./*.json', {
  eager: true,
  import: 'default',
}) as Record<string, DictionaryEntry[]>

export const DICTIONARY: DictionaryEntry[] = Object.values(modules).flat()

export const CATEGORIES = Array.from(
  new Set(DICTIONARY.map((entry) => entry.category).filter(Boolean))
).sort((a, b) => a.localeCompare(b))

export const ENTRY_COUNT_BY_LANGUAGE = DICTIONARY.reduce<Record<string, number>>(
  (counts, entry) => {
    counts[entry.language] = (counts[entry.language] ?? 0) + 1
    return counts
  },
  {}
)
