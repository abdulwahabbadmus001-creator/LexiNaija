import { Database, HeartHandshake, Languages, WifiOff } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">About</span>
        <h1>A practical digital home for Nigerian languages.</h1>
        <p>LexiNaija is an offline-first multilingual dictionary and learning experience built around access, source traceability, representation and practical everyday learning.</p>
      </section>

      <section className="feature-grid">
        <div className="panel feature-card"><WifiOff /><h3>Offline access</h3><p>Core language data, favourites, recent activity and learning progress remain useful when connectivity is weak or unavailable.</p></div>
        <div className="panel feature-card"><Languages /><h3>Four launch languages</h3><p>The current release provides 2,000 entries each for Yorùbá, Hausa, Igbo and Nigerian Pidgin.</p></div>
        <div className="panel feature-card"><HeartHandshake /><h3>Source-aware preservation</h3><p>The release dataset is assembled from credited open language resources, with source and licence information retained for traceability.</p></div>
        <div className="panel feature-card"><Database /><h3>8,000 validated entries</h3><p>The build pipeline validates counts and provenance and stops instead of fabricating missing dictionary entries.</p></div>
      </section>
    </div>
  )
}
