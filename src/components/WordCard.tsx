import { Bookmark, BookmarkCheck, Copy, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { languageName } from '../data/languages'
import { useAppStore } from '../store/useAppStore'
import type { DictionaryEntry } from '../types'

interface Props {
  entry: DictionaryEntry
  compact?: boolean
}

export function WordCard({ entry, compact = false }: Props) {
  const { t } = useTranslation()
  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const addHistory = useAppStore((state) => state.addHistory)
  const saved = favorites.includes(entry.id)
  const hasExample = Boolean(entry.example?.trim()) || Boolean(entry.exampleTranslation?.trim())

  return (
    <article
      className={`word-card ${compact ? 'word-card--compact' : ''}`}
      onMouseEnter={() => addHistory(entry.id)}
    >
      <div className="word-card__top">
        <div>
          <div className="eyebrow">
            {languageName(entry.language)} · {entry.category}
          </div>
          <h3>{entry.term}</h3>
        </div>

        <button
          className="icon-button"
          onClick={() => toggleFavorite(entry.id)}
          aria-label={saved ? 'Remove saved word' : 'Save word'}
        >
          {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      <div className="meaning-block">
        <span>{t('meaning')}</span>
        <strong>{entry.translation}</strong>
        {entry.partOfSpeech && <small>{entry.partOfSpeech}</small>}
      </div>

      {!compact && hasExample && (
        <div className="example-block">
          <span>{t('example')}</span>
          {entry.example && <p>{entry.example}</p>}
          {entry.exampleTranslation && <small>{entry.exampleTranslation}</small>}
        </div>
      )}

      <div className="word-card__actions">
        <button
          className="ghost-button"
          onClick={() => navigator.clipboard?.writeText(`${entry.term} — ${entry.translation}`)}
        >
          <Copy size={17} /> Copy
        </button>
        {!compact && entry.sourceUrl && (
          <a className="ghost-button source-link" href={entry.sourceUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={15} /> Source
          </a>
        )}
      </div>
    </article>
  )
}
