import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { DictionaryPage } from './pages/DictionaryPage'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { ProgressPage } from './pages/ProgressPage'
import { SavedPage } from './pages/SavedPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/quiz" element={<LearnPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/history" element={<SavedPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/offline" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
