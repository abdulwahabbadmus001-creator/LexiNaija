import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Search,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'\nimport { useTranslation } from 'react-i18next'
import { DICTIONARY, ENTRY_COUNT_BY_LANGUAGE } from '../data/dictionary'
import { DICTIONARY_LANGUAGES, languageName } from '../data/languages'
import { searchEntries } from '../lib/search'
import { useAppStore } from '../store/useAppStore'
import type { DictionaryEntry } from '../types'

const LANGUAGE_CLASS: Record<string, string> = {
  yo: 'language-tile--yo',
  ha: 'language-tile--ha',
  ig: 'language-tile--ig',
  pcm: 'language-tile--pcm',
}

function firstEntryFor(language: string) {
  return DICTIONARY.find((entry) => entry.language === language)
}

export function HomePage() {
  const navigate = useNavigate()
  const favorites = useAppStore((state) => state.favorites)
  const history = useAppStore((state) => state.history)
  const progress = useAppStore((state) => state.progress)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const addHistory = useAppStore((state) => state.addHistory)
  const recordAnswer = useAppStore((state) => state.recordAnswer)

  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('all')
  const [quizOffset, setQuizOffset] = useState(0)
  const [quickSelected, setQuickSelected] = useState('')
  const [quickChecked, setQuickChecked] = useState(false)

  const dayIndex = Math.floor(Date.now() / 86400000) % DICTIONARY.length
  const dailyWord = DICTIONARY[dayIndex]
  const quizWord = DICTIONARY[(dayIndex + 17 + quizOffset) % DICTIONARY.length]
  const accuracy = progress.reviewed ? Math.round((progress.correct / progress.reviewed) * 100) : 0

  const defaultPreview = useMemo(
    () => DICTIONARY_LANGUAGES.map((item) => firstEntryFor(item.code)).filter(Boolean) as DictionaryEntry[],
    [],
  )

  const liveResults = useMemo(() => {
    const pool = language === 'all' ? DICTIONARY : DICTIONARY.filter((entry) => entry.language === language)
    if (!query.trim()) {
      return language === 'all' ? defaultPreview : pool.slice(0, 4)
    }
    return searchEntries(pool, query).slice(0, 4)
  }, [defaultPreview, language, query])

  const quickOptions = useMemo(() => {
    const values = [quizWord.translation]
    for (let step = 1; values.length < 4 && step < DICTIONARY.length; step += 1) {
      const candidate = DICTIONARY[(dayIndex + 17 + quizOffset + step) % DICTIONARY.length].translation
      if (!values.includes(candidate)) values.push(candidate)
    }
    return values.sort((a, b) => a.localeCompare(b))
  }, [dayIndex, quizOffset, quizWord.translation])

  const favouriteEntries = favorites
    .map((id) => DICTIONARY.find((entry) => entry.id === id))
    .filter(Boolean)
    .slice(0, 5) as DictionaryEntry[]

  const recentEntries = history
    .map((id) => DICTIONARY.find((entry) => entry.id === id))
    .filter(Boolean)
    .slice(0, 5) as DictionaryEntry[]

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (language !== 'all') params.set('lang', language)
    navigate(`/dictionary${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const checkQuickAnswer = () => {
    if (!quickSelected || quickChecked) return
    recordAnswer(quickSelected === quizWord.translation)
    setQuickChecked(true)
  }

  const nextQuickQuestion = () => {
    setQuizOffset((value) => value + 1)
    setQuickSelected('')
    setQuickChecked(false)
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <span className="eyebrow eyebrow--gold"><Sparkles size={14} /> {t('sourceBackedEntries')}</span>
          <h1>{t('discoverNigerianLanguages')}</h1>
          <p>{t('heroDescription')}</p>

          <form className="dashboard-search" onSubmit={submit}>
            <Search size={21} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label="Search dictionary"
            />
            <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language filter">
              <option value="all">{t('allLanguages')}</option>
              {DICTIONARY_LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.nativeName}</option>)}
            </select>
            <button type="submit">{t('search')}</button>
          </form>

          <div className="popular-searches">
            <span>{t('popularSearches')}</span>
            {defaultPreview.slice(0, 4).map((entry) => (
              <button key={entry.id} onClick={() => setQuery(entry.term)}>{entry.term}</button>
            ))}
          </div>
        </div>

        <div className="dashboard-hero__statement" aria-label="LexiNaija purpose">
          <strong>{t('languages')}</strong>
          <span>{t('people')}</span>
          <span>{t('culture')}</span>
          <span>{t('strongerNaija')}</span>
          <i />
        </div>
      </section>

      <section className="language-strip" aria-label="Browse by language">
        {DICTIONARY_LANGUAGES.map((item) => (
          <button
            key={item.code}
            className={`language-tile ${LANGUAGE_CLASS[item.code] ?? ''}`}
            onClick={() => navigate(`/dictionary?lang=${item.code}`)}
          >
            <span className="language-tile__short">{item.short}</span>
            <div>
              <strong>{item.nativeName}</strong>
              <small>{ENTRY_COUNT_BY_LANGUAGE[item.code] ?? 0} {t('entries')}</small>
            </div>
            <ArrowRight size={18} />
          </button>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-results panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{t('dictionaryResults')}</span>
              <h2>{query.trim() ? `Results for “${query.trim()}”` : t('exploreDictionary')}</h2>
            </div>
            <Link to={query.trim() ? `/dictionary?q=${encodeURIComponent(query.trim())}` : '/dictionary'} className="text-link">
              {t('seeAllResults')} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="result-list">
            {liveResults.length ? liveResults.map((entry) => {
              const saved = favorites.includes(entry.id)
              return (
                <article className="result-row" key={entry.id} onClick={() => addHistory(entry.id)}>
                  <div className="result-row__main">
                    <div className="result-row__title">
                      <h3>{entry.term}</h3>
                      <span className={`language-badge language-badge--${entry.language}`}>{languageName(entry.language)}</span>
                      {entry.partOfSpeech && <span className="part-badge">{entry.partOfSpeech}</span>}
                    </div>
                    <p>{entry.translation}</p>
                    {(entry.example || entry.exampleTranslation) && (
                      <small>{[entry.example, entry.exampleTranslation].filter(Boolean).join(' — ')}</small>
                    )}
                  </div>
                  <div className="result-row__source">
                    <span>{t('source')}</span>
                    <a href={entry.sourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>{entry.source}</a>
                  </div>
                  <button
                    className="save-icon"
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleFavorite(entry.id)
                    }}
                    aria-label={saved ? 'Remove favourite' : 'Save favourite'}
                  >
                    {saved ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
                  </button>
                </article>
              )
            }) : (
              <div className="compact-empty"><Search size={26} /><span>{t('noMatchingEntries')}</span></div>
            )}
          </div>
        </div>

        <div className="dashboard-middle">
          <article className="panel dashboard-card word-day-card">
            <div className="dashboard-card__head">
              <span><CalendarDays size={17} /> {t('wordOfDay')}</span>
              <small>{new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</small>
            </div>
            <h2>{dailyWord.term}</h2>
            <div className="tag-row">
              <span className={`language-badge language-badge--${dailyWord.language}`}>{languageName(dailyWord.language)}</span>
              {dailyWord.partOfSpeech && <span className="part-badge">{dailyWord.partOfSpeech}</span>}
            </div>
            <p>{dailyWord.translation}</p>
            {(dailyWord.example || dailyWord.exampleTranslation) && <small>{[dailyWord.example, dailyWord.exampleTranslation].filter(Boolean).join(' â€” ')}</small>}
            <div className="source-line"><span>{t('source')}:</span><a href={dailyWord.sourceUrl} target="_blank" rel="noreferrer">{dailyWord.source}</a></div>
            <button className="primary-button" onClick={() => toggleFavorite(dailyWord.id)}>
              {favorites.includes(dailyWord.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              {favorites.includes(dailyWord.id) ? t('savedLabel') : t('saveWord')}
            </button>
          </article>

          <article className="panel dashboard-card quick-quiz-card">
            <div className="dashboard-card__head">
              <span><BookOpen size={17} /> {t('quickQuiz')}</span>
              <small>{languageName(quizWord.language)}</small>
            </div>
            <p className="quiz-question">{t('whatMeaning')} <strong>“{quizWord.term}”</strong>?</p>
            <div className="quick-options">
              {quickOptions.map((option) => {
                const correct = quickChecked && option === quizWord.translation
                const wrong = quickChecked && option === quickSelected && option !== quizWord.translation
                return (
                  <button
                    key={option}
                    className={`${quickSelected === option ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}
                    onClick={() => !quickChecked && setQuickSelected(option)}
                  >
                    <span>{option}</span>
                    {correct && <CheckCircle2 size={17} />}
                    {wrong && <XCircle size={17} />}
                  </button>
                )
              })}
            </div>
            <div className="quick-quiz-actions">
              {quickChecked ? (
                <button className="primary-button" onClick={nextQuickQuestion}>{t('nextQuestion')}</button>
              ) : (
                <button className="primary-button" disabled={!quickSelected} onClick={checkQuickAnswer}>{t('submitAnswer')}</button>
              )}
              <Link to="/quiz" className="text-link">{t('fullQuiz')} <ArrowRight size={14} /></Link>
            </div>
          </article>
        </div>

        <aside className="dashboard-side">
          <article className="panel dashboard-card progress-card">
            <span className="eyebrow">{t('myLearningProgress')}</span>
            <div className="dashboard-progress-ring" style={{ '--progress': `${Math.max(accuracy, 2)}%` } as CSSProperties}>
              <div><strong>{accuracy}%</strong><span>Accuracy</span></div>
            </div>
            <div className="progress-mini-list">
              <div><span>Reviewed</span><strong>{progress.reviewed}</strong></div>
              <div><span>Correct</span><strong>{progress.correct}</strong></div>
              <div><span>Streak</span><strong>{progress.streak} days</strong></div>
            </div>
            <Link to="/progress" className="secondary-button">{t('viewDetailedProgress')} <ArrowRight size={15} /></Link>
          </article>

          <article className="panel dashboard-card mini-list-card">
            <div className="dashboard-card__head"><span>{t('myFavourites')} ({favorites.length})</span><Link to="/saved">{t('seeAll')}</Link></div>
            {favouriteEntries.length ? favouriteEntries.map((entry) => (
              <Link className="mini-entry" key={entry.id} to={`/dictionary?q=${encodeURIComponent(entry.term)}`}>
                <strong>{entry.term}</strong><span>{languageName(entry.language)}</span><Bookmark size={14} />
              </Link>
            )) : <p className="muted mini-empty">Save words from the dictionary and they will appear here.</p>}
          </article>

          <article className="panel dashboard-card mini-list-card">
            <div className="dashboard-card__head"><span>{t('recentSearches')}</span><Link to="/history">See all</Link></div>
            {recentEntries.length ? recentEntries.map((entry) => (
              <Link className="mini-entry" key={entry.id} to={`/dictionary?q=${encodeURIComponent(entry.term)}`}>
                <strong>{entry.term}</strong><span>{languageName(entry.language)}</span><Search size={14} />
              </Link>
            )) : <p className="muted mini-empty">Recent dictionary activity will appear here.</p>}
          </article>
        </aside>
      </section>
    </div>
  )
}
