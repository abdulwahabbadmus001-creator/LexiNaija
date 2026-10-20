import { CheckCircle2, RotateCcw, Sparkles, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DICTIONARY } from '../data/dictionary'
import { DICTIONARY_LANGUAGES, languageName } from '../data/languages'
import { useAppStore } from '../store/useAppStore'

export function LearnPage() {
  const { t } = useTranslation()
  const studyLanguage = useAppStore((state) => state.studyLanguage)
  const setStudyLanguage = useAppStore((state) => state.setStudyLanguage)
  const progress = useAppStore((state) => state.progress)
  const recordAnswer = useAppStore((state) => state.recordAnswer)
  const resetProgress = useAppStore((state) => state.resetProgress)

  const pool = useMemo(
    () =>
      studyLanguage === 'all'
        ? DICTIONARY
        : DICTIONARY.filter((entry) => entry.language === studyLanguage),
    [studyLanguage]
  )

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(false)

  if (!pool.length) {
    return (
      <div className="page-stack">
        <section className="page-header">
          <span className="eyebrow">Practice</span>
          <h1>No entries are available for this language yet.</h1>
          <p>Build the dictionary data before using the quiz for this language.</p>
        </section>
      </div>
    )
  }

  const current = pool[index % pool.length]

  const options = useMemo(() => {
    const others = pool
      .filter((entry) => entry.id !== current.id)
      .map((entry) => entry.translation)
    const picks = Array.from(new Set([current.translation, ...others])).slice(0, 4)
    return picks.sort((a, b) => a.localeCompare(b))
  }, [current, pool])

  const accuracy = progress.reviewed
    ? Math.round((progress.correct / progress.reviewed) * 100)
    : 0

  const check = () => {
    if (!selected || checked) return
    recordAnswer(selected === current.translation)
    setChecked(true)
  }

  const next = () => {
    setIndex((value) => (value + 1) % pool.length)
    setSelected('')
    setChecked(false)
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Practice</span>
        <h1>Learn with short, repeatable sessions.</h1>
        <p>Quiz yourself on practical words and phrases. Progress is stored locally on your device.</p>
      </section>

      <section className="learning-layout">
        <div className="quiz-card panel">
          <div className="quiz-top">
            <span className="pill"><Sparkles size={14} /> {languageName(current.language)}</span>
            <select
              value={studyLanguage}
              onChange={(event) => {
                setStudyLanguage(event.target.value)
                setIndex(0)
                setSelected('')
                setChecked(false)
              }}
            >
              <option value="all">All languages</option>
              {DICTIONARY_LANGUAGES.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.nativeName}
                </option>
              ))}
            </select>
          </div>

          <div className="quiz-prompt">
            <small>What does this mean?</small>
            <h2>{current.term}</h2>
          </div>

          <div className="quiz-options">
            {options.map((option) => {
              const isCorrect = checked && option === current.translation
              const isWrong = checked && selected === option && option !== current.translation
              return (
                <button
                  key={option}
                  className={`${selected === option ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  onClick={() => !checked && setSelected(option)}
                >
                  {option}
                  {isCorrect && <CheckCircle2 size={18} />}
                  {isWrong && <XCircle size={18} />}
                </button>
              )
            })}
          </div>

          {checked && (
            <div className={`answer-note ${selected === current.translation ? 'answer-note--correct' : 'answer-note--wrong'}`}>
              <strong>{selected === current.translation ? t('correct') : t('incorrect')}</strong>
              {(current.example || current.exampleTranslation) && (
                <span>{[current.example, current.exampleTranslation].filter(Boolean).join(' — ')}</span>
              )}
            </div>
          )}

          <div className="quiz-actions">
            <button className="secondary-button" onClick={resetProgress}>
              <RotateCcw size={16} /> Reset progress
            </button>
            {checked ? (
              <button className="primary-button" onClick={next}>{t('next')}</button>
            ) : (
              <button className="primary-button" disabled={!selected} onClick={check}>{t('check')}</button>
            )}
          </div>
        </div>

        <aside className="panel progress-panel">
          <span className="eyebrow">{t('progress')}</span>
          <div className="metric-large"><strong>{accuracy}%</strong><span>{t('accuracy')}</span></div>
          <div className="progress-list">
            <div><span>{t('reviewed')}</span><strong>{progress.reviewed}</strong></div>
            <div><span>Correct</span><strong>{progress.correct}</strong></div>
            <div><span>{t('streak')}</span><strong>{progress.streak} days</strong></div>
          </div>
        </aside>
      </section>
    </div>
  )
}
