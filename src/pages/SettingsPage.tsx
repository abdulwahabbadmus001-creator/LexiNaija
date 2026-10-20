import { ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { LANGUAGES } from '../data/languages'
import { useAppStore } from '../store/useAppStore'

export function SettingsPage() {
  const { t } = useTranslation()
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)
  const uiLanguage = useAppStore((state) => state.uiLanguage)
  const setUiLanguage = useAppStore((state) => state.setUiLanguage)

  const setLanguage = async (code: typeof uiLanguage) => {
    setUiLanguage(code)
    await i18n.changeLanguage(code)
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">{t('preferences')}</span>
        <h1>{t('makeLexiNaijaYours')}</h1>
        <p>{t('preferencesDescription')}</p>
      </section>

      <section className="settings-grid">
        <div className="panel settings-card">
          <span className="eyebrow">{t('language')}</span>
          <h3>{t('interfaceLanguage')}</h3>
          <p className="muted">{t('interfaceLanguageHelp')}</p>
          <select value={uiLanguage} onChange={(event) => setLanguage(event.target.value as typeof uiLanguage)}>
            {LANGUAGES.map((language) => <option key={language.code} value={language.code}>{language.nativeName}</option>)}
          </select>
        </div>

        <div className="panel settings-card">
          <span className="eyebrow">{t('appearance')}</span>
          <h3>{t('theme')}</h3>
          <div className="segmented">
            {(['light', 'dark', 'system'] as const).map((option) => (
              <button key={option} className={theme === option ? 'active' : ''} onClick={() => setTheme(option)}>{t(option)}</button>
            ))}
          </div>
        </div>

        <div className="panel settings-card settings-card--wide">
          <div className="settings-icon"><ShieldCheck size={21} /></div>
          <span className="eyebrow">{t('dataAndPrivacy')}</span>
          <h3>{t('offlineFirstTitle')}</h3>
          <p className="muted">{t('offlineFirstBody')}</p>
        </div>
      </section>
    </div>
  )
}
