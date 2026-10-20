import { ArrowRight, BookOpen, Bookmark, Flame, Languages, Search, Sparkles } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DICTIONARY } from '../data/dictionary'
import { LANGUAGES, languageName } from '../data/languages'
import { useAppStore } from '../store/useAppStore'
import { WordCard } from '../components/WordCard'

export function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const favorites = useAppStore((state) => state.favorites)
  const progress = useAppStore((state) => state.progress)
  const [query, setQuery] = useState('')
  const dayIndex = Math.floor(Date.now() / 86400000) % DICTIONARY.length
  const dailyWord = DICTIONARY[dayIndex]
  const accuracy = progress.reviewed ? Math.round((progress.correct / progress.reviewed) * 100) : 0

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (query.trim()) navigate(`/dictionary?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="pill"><Sparkles size={15} /> Built for Nigeria's languages</span>
          <h1>Learn the words that connect us.</h1>
          <p>Search, save and practise everyday expressions across Yorùbá, Hausa, Igbo and Nigerian Pidgin — with a web app designed to keep working offline.</p>
          <form className="hero-search" onSubmit={submit}>
            <Search size={20} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchPlaceholder')} />
            <button type="submit">Search</button>
          </form>
          <div className="language-chips">
            {LANGUAGES.filter((language) => language.code !== 'en').map((language) => (
              <button key={language.code} onClick={() => navigate(`/dictionary?lang=${language.code}`)}>{language.nativeName}</button>
            ))}
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="language-orbit orbit-1">Ẹ káàárọ̀</div>
          <div className="language-orbit orbit-2">Sannu</div>
          <div className="language-orbit orbit-3">Daalụ</div>
          <div className="language-orbit orbit-4">How you dey?</div>
          <div className="hero-logo">LN</div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><BookOpen size={21} /><div><strong>{DICTIONARY.length}</strong><span>dictionary entries</span></div></div>
        <div className="stat-card"><Languages size={21} /><div><strong>4</strong><span>Nigerian languages</span></div></div>
        <div className="stat-card"><Bookmark size={21} /><div><strong>{favorites.length}</strong><span>{t('savedWords')}</span></div></div>
        <div className="stat-card"><Flame size={21} /><div><strong>{progress.streak}</strong><span>day streak · {accuracy}% accuracy</span></div></div>
      </section>

      <section className="section-grid section-grid--wide">
        <div>
          <div className="section-heading">
            <div><span className="eyebrow">{t('wordOfDay')}</span><h2>Learn one useful word today.</h2></div>
            <Link to="/dictionary" className="text-link">{t('explore')} <ArrowRight size={16} /></Link>
          </div>
          <WordCard entry={dailyWord} />
        </div>
        <aside className="panel focus-panel">
          <span className="eyebrow">Your learning</span>
          <h3>Small steps, useful language.</h3>
          <div className="progress-ring"><strong>{accuracy}%</strong><span>quiz accuracy</span></div>
          <div className="mini-metrics"><div><strong>{progress.reviewed}</strong><span>reviewed</span></div><div><strong>{progress.streak}</strong><span>streak</span></div></div>
          <Link to="/learn" className="primary-button">{t('studyNow')} <ArrowRight size={17} /></Link>
        </aside>
      </section>

      <section>
        <div className="section-heading"><div><span className="eyebrow">Discover</span><h2>Browse by language</h2></div></div>
        <div className="language-grid">
          {LANGUAGES.filter((language) => language.code !== 'en').map((language) => {
            const count = DICTIONARY.filter((entry) => entry.language === language.code).length
            return <Link key={language.code} to={`/dictionary?lang=${language.code}`} className="language-card"><span>{language.short}</span><div><strong>{language.nativeName}</strong><small>{language.name} · {count} entries</small></div><ArrowRight size={18} /></Link>
          })}
        </div>
      </section>
    </div>
  )
}

