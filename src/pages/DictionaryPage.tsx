import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { WordCard } from '../components/WordCard'
import { CATEGORIES, DICTIONARY } from '../data/dictionary'
import { LANGUAGES } from '../data/languages'
import { searchEntries } from '../lib/search'
import type { DictionaryEntry } from '../types'

export function DictionaryPage() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const language = params.get('lang') ?? 'all'
  const category = params.get('category') ?? 'all'

  const results = useMemo(() => {
    let entries: DictionaryEntry[] = [...DICTIONARY]
    if (language !== 'all') entries = entries.filter((entry) => entry.language === language)
    if (category !== 'all') entries = entries.filter((entry) => entry.category === category)
    return searchEntries(entries, query)
  }, [query, language, category])

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value === 'all' || !value) next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Dictionary</span>
        <h1>Find a word. Learn it in context.</h1>
        <p>Search by Nigerian-language term, English meaning, example or topic.</p>
      </section>

      <section className="dictionary-toolbar panel">
        <label className="search-field"><Search size={19} /><input value={query} onChange={(e) => { setQuery(e.target.value); updateParam('q', e.target.value) }} placeholder={t('searchPlaceholder')} /></label>
        <div className="filter-row">
          <span className="filter-icon"><SlidersHorizontal size={18} /></span>
          <label><span>{t('language')}</span><select value={language} onChange={(e) => updateParam('lang', e.target.value)}><option value="all">{t('allLanguages')}</option>{LANGUAGES.filter((item) => item.code !== 'en').map((item) => <option key={item.code} value={item.code}>{item.nativeName}</option>)}</select></label>
          <label><span>{t('category')}</span><select value={category} onChange={(e) => updateParam('category', e.target.value)}><option value="all">{t('allCategories')}</option>{CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        </div>
      </section>

      <div className="results-meta"><strong>{results.length}</strong> results</div>
      {results.length ? <section className="cards-grid">{results.map((entry) => <WordCard key={entry.id} entry={entry} />)}</section> : <section className="empty-state"><Search size={34} /><h3>{t('noResults')}</h3><p>Try a shorter spelling, an English meaning or another language filter.</p></section>}
    </div>
  )
}
