import { Globe2, HeartHandshake, Languages, WifiOff } from 'lucide-react'

export function AboutPage() {
  return <div className="page-stack">
    <section className="page-header"><span className="eyebrow">About</span><h1>A digital home for Nigerian languages.</h1><p>LinguaNaija is an offline-first multilingual dictionary and learning experience designed around access, representation, preservation and practical everyday learning.</p></section>
    <section className="feature-grid"><div className="panel feature-card"><WifiOff /><h3>Offline access</h3><p>Core language data, saved words and learning progress remain useful when connectivity is weak or unavailable.</p></div><div className="panel feature-card"><Languages /><h3>Local-language focus</h3><p>The first release centres English, YorÃ¹bÃ¡, Hausa, Igbo and Nigerian Pidgin, while the data model is designed to grow.</p></div><div className="panel feature-card"><HeartHandshake /><h3>Preservation with people</h3><p>The first-release dataset is assembled from credited open language resources, with source information retained in the project for traceability.</p></div><div className="panel feature-card"><Globe2 /><h3>Beyond a dictionary</h3><p>Learning tools, contextual examples and future translation features make the platform a broader language resource.</p></div></section>
  </div>
}
