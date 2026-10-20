import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UILanguageCode } from '../types'

interface ProgressState {
  reviewed: number
  correct: number
  streak: number
  lastStudyDate?: string
}

interface AppState {
  theme: 'light' | 'dark' | 'system'
  uiLanguage: UILanguageCode
  studyLanguage: string | 'all'
  favorites: string[]
  history: string[]
  progress: ProgressState
  setTheme: (theme: AppState['theme']) => void
  setUiLanguage: (language: UILanguageCode) => void
  setStudyLanguage: (language: AppState['studyLanguage']) => void
  toggleFavorite: (entryId: string) => void
  addHistory: (entryId: string) => void
  recordAnswer: (correct: boolean) => void
  resetProgress: () => void
}

const today = () => new Date().toISOString().slice(0, 10)

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      uiLanguage: 'en',
      studyLanguage: 'all',
      favorites: [],
      history: [],
      progress: { reviewed: 0, correct: 0, streak: 0 },
      setTheme: (theme) => set({ theme }),
      setUiLanguage: (uiLanguage) => set({ uiLanguage }),
      setStudyLanguage: (studyLanguage) => set({ studyLanguage }),
      toggleFavorite: (entryId) =>
        set((state) => ({
          favorites: state.favorites.includes(entryId)
            ? state.favorites.filter((id) => id !== entryId)
            : [entryId, ...state.favorites],
        })),
      addHistory: (entryId) =>
        set((state) => ({
          history: [entryId, ...state.history.filter((id) => id !== entryId)].slice(0, 25),
        })),
      recordAnswer: (correct) =>
        set((state) => {
          const date = today()
          const last = state.progress.lastStudyDate
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
          const streak =
            last === date
              ? state.progress.streak
              : last === yesterday
                ? state.progress.streak + 1
                : 1

          return {
            progress: {
              reviewed: state.progress.reviewed + 1,
              correct: state.progress.correct + (correct ? 1 : 0),
              streak,
              lastStudyDate: date,
            },
          }
        }),
      resetProgress: () => set({ progress: { reviewed: 0, correct: 0, streak: 0 } }),
    }),
    { name: 'linguanaija-state-v1' }
  )
)
