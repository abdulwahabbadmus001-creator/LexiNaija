import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  BarChart3,
  BookOpen,
  Bookmark,
  BrainCircuit,
  Clock3,
  Download,
  GraduationCap,
  Home,
  Menu,
  Moon,
  MoreHorizontal,
  Search,
  Sun,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store/useAppStore'

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export function Layout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)
  const [online, setOnline] = useState(navigator.onLine)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  useEffect(() => {
    const captureInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as InstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', captureInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', captureInstallPrompt)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  }, [theme])

  const nextTheme = useMemo(() => (theme === 'dark' ? 'light' : 'dark'), [theme])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    if (query.trim()) navigate(`/dictionary?q=${encodeURIComponent(query.trim())}`)
  }

  const installApp = async () => {
    if (!installPrompt) return
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  const topNav = [
    { to: '/', label: t('home'), icon: Home },
    { to: '/dictionary', label: t('dictionary'), icon: BookOpen },
    { to: '/learn', label: t('learn'), icon: GraduationCap },
    { to: '/quiz', label: t('quiz'), icon: BrainCircuit },
    { to: '/saved', label: t('favourites'), icon: Bookmark },
    { to: '/progress', label: t('progress'), icon: BarChart3 },
    { to: '/settings', label: t('more'), icon: MoreHorizontal },
  ]

  const sideNav = [
    { to: '/', label: t('home'), icon: Home },
    { to: '/dictionary', label: t('dictionary'), icon: BookOpen },
    { to: '/learn', label: t('learn'), icon: GraduationCap },
    { to: '/quiz', label: 'Quiz', icon: BrainCircuit },
    { to: '/saved', label: 'Favourites', icon: Bookmark },
    { to: '/history', label: t('searchHistory'), icon: Clock3 },
    { to: '/progress', label: t('progress'), icon: BarChart3 },
    { to: '/offline', label: t('offlineAccess'), icon: online ? Wifi : WifiOff },
  ]

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__brand-wrap">
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
            <Menu size={21} />
          </button>
          <NavLink to="/" className="brand" aria-label="LexiNaija home">
            <img src="/lexinaija-logo.svg" alt="LexiNaija" className="brand-logo" />
          </NavLink>
        </div>

        <nav className="topnav" aria-label="Primary navigation">
          {topNav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `topnav__item ${isActive ? 'active' : ''}`}>
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="topbar__actions">
          <form className="top-search" onSubmit={submitSearch}>
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label="Search LexiNaija"
            />
          </form>
          <button className="icon-button" title="Toggle theme" onClick={() => setTheme(nextTheme)} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className={`connection-dot ${online ? 'online' : 'offline'}`} title={online ? 'Online' : 'Offline'} />
        </div>
      </header>

      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <div className="mobile-sidebar-head mobile-only">
          <img src="/lexinaija-logo.svg" alt="LexiNaija" className="brand-logo" />
          <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>

        <div className="sidebar-summary">
          <span className="sidebar-summary__icon"><BookOpen size={24} /></span>
          <div>
            <strong>8,000+</strong>
            <span>{t('dictionaryEntries')}</span>
            <small>{t('sourceBackedOfflineReady')}</small>
          </div>
        </div>

        <nav className="nav-list" aria-label="Application navigation">
          {sideNav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="status-row">
            {online ? <Wifi size={18} /> : <WifiOff size={18} />}
            <div>
              <strong>{online ? t('onlineReady') : t('offlineReady')}</strong>
              <span>{t('coreLocal')}</span>
            </div>
          </div>
          <button className="install-button" onClick={installApp} disabled={!installPrompt}>
            <Download size={16} /> {installPrompt ? t('installApp') : t('pwaReady')}
          </button>
        </div>

        <NavLink to="/about" className="sidebar-about">{t('about')}</NavLink>
      </aside>

      {menuOpen && <button className="mobile-overlay" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}

      <div className="main-column">
        <main className="page"><Outlet /></main>
      </div>
    </div>
  )
}
