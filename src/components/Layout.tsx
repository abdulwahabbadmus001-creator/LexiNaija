import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { BookOpen, Bookmark, GraduationCap, Home, Menu, Moon, Search, Settings, Sun, Wifi, WifiOff, X } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store/useAppStore'

export function Layout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)
  const [online, setOnline] = useState(navigator.onLine)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  }, [theme])

  const nextTheme = useMemo(() => theme === 'dark' ? 'light' : 'dark', [theme])
  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    if (query.trim()) navigate(`/dictionary?q=${encodeURIComponent(query.trim())}`)
  }

  const nav = [
    { to: '/', label: t('home'), icon: Home },
    { to: '/dictionary', label: t('dictionary'), icon: BookOpen },
    { to: '/learn', label: t('learn'), icon: GraduationCap },
    { to: '/saved', label: t('saved'), icon: Bookmark },
    { to: '/settings', label: t('settings'), icon: Settings },
  ]

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <div className="brand-row">
          <NavLink to="/" className="brand"><img src="/linguanaija-logo.svg" alt="LinguaNaija" className="brand-logo" /></NavLink>
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(false)}><X size={22} /></button>
        </div>
        <p className="brand-note">Nigeria's languages, within reach.</p>
        <nav className="nav-list">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={19} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-card">
          <div className="status-row">{online ? <Wifi size={16} /> : <WifiOff size={16} />}<strong>{online ? 'Online' : t('offlineReady')}</strong></div>
          <small>Your saved words and core learning tools stay on this device.</small>
        </div>
        <NavLink to="/about" className="sidebar-about">{t('about')}</NavLink>
      </aside>

      {menuOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <div className="main-column">
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(true)}><Menu size={22} /></button>
          <form className="top-search" onSubmit={submitSearch}>
            <Search size={18} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchPlaceholder')} />
          </form>
          <button className="icon-button" title="Toggle theme" onClick={() => setTheme(nextTheme)}>
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </header>
        <main className="page"><Outlet /></main>
      </div>
    </div>
  )
}
