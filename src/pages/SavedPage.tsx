import { Bookmark, Clock3 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WordCard } from '../components/WordCard'
import { DICTIONARY } from '../data/dictionary'
import { useAppStore } from '../store/useAppStore'

export function SavedPage() {
  const { t } = useTranslation()
  const favorites = useAppStore((state) => state.favorites)
  const history = useAppStore((state) => state.history)
  const savedEntries = favorites.map((id) => DICTIONARY.find((entry) => entry.id === id)).filter(Boolean)
  const recentEntries = history.map((id) => DICTIONARY.find((entry) => entry.id === id)).filter(Boolean).slice(0, 8)

  return <div className="page-stack">
    <section className="page-header"><span className="eyebrow">Library</span><h1>Your words, kept close.</h1><p>Saved words and recent activity remain available on this device, including when you are offline.</p></section>
    <section><div className="section-heading"><div className="heading-with-icon"><Bookmark size={20} /><div><span className="eyebrow">{t('savedWords')}</span><h2>{savedEntries.length} saved</h2></div></div></div>{savedEntries.length ? <div className="cards-grid">{savedEntries.map((entry) => entry && <WordCard key={entry.id} entry={entry} />)}</div> : <div className="empty-state"><Bookmark size={32} /><h3>No saved words yet.</h3><p>Use the bookmark icon on any dictionary card to keep it here.</p></div>}</section>
    <section><div className="section-heading"><div className="heading-with-icon"><Clock3 size={20} /><div><span className="eyebrow">{t('recent')}</span><h2>Recently viewed</h2></div></div></div>{recentEntries.length ? <div className="cards-grid cards-grid--compact">{recentEntries.map((entry) => entry && <WordCard key={entry.id} entry={entry} compact />)}</div> : <p className="muted">Your recent dictionary activity will appear here.</p>}</section>
  </div>
}
