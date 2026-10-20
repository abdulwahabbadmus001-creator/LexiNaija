import { ArrowRight, BarChart3, BookOpen, CheckCircle2, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DICTIONARY, ENTRY_COUNT_BY_LANGUAGE } from '../data/dictionary'
import { DICTIONARY_LANGUAGES } from '../data/languages'
import { useAppStore } from '../store/useAppStore'

export function ProgressPage() {
  const progress = useAppStore((state) => state.progress)
  const resetProgress = useAppStore((state) => state.resetProgress)
  const accuracy = progress.reviewed ? Math.round((progress.correct / progress.reviewed) * 100) : 0

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Progress</span>
        <h1>Your learning, clearly tracked.</h1>
        <p>LexiNaija stores quiz progress locally on this device so your learning record remains available offline.</p>
      </section>

      <section className="progress-overview-grid">
        <article className="panel progress-stat"><BarChart3 /><div><strong>{accuracy}%</strong><span>Quiz accuracy</span></div></article>
        <article className="panel progress-stat"><BookOpen /><div><strong>{progress.reviewed}</strong><span>Words reviewed</span></div></article>
        <article className="panel progress-stat"><CheckCircle2 /><div><strong>{progress.correct}</strong><span>Correct answers</span></div></article>
        <article className="panel progress-stat"><Flame /><div><strong>{progress.streak}</strong><span>Day streak</span></div></article>
      </section>

      <section className="panel progress-detail-panel">
        <div className="panel-heading">
          <div><span className="eyebrow">Language coverage</span><h2>8,000 source-backed entries available to practise.</h2></div>
          <Link to="/quiz" className="primary-button">Continue learning <ArrowRight size={16} /></Link>
        </div>
        <div className="progress-language-grid">
          {DICTIONARY_LANGUAGES.map((language) => (
            <Link key={language.code} to={`/dictionary?lang=${language.code}`} className="progress-language-row">
              <span className={`language-badge language-badge--${language.code}`}>{language.nativeName}</span>
              <div><strong>{ENTRY_COUNT_BY_LANGUAGE[language.code] ?? 0}</strong><small>dictionary entries</small></div>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
        <div className="progress-footer">
          <span>{DICTIONARY.length.toLocaleString()} total entries Â· progress stored locally</span>
          <button className="ghost-button" onClick={resetProgress}>Reset learning progress</button>
        </div>
      </section>
    </div>
  )
}
