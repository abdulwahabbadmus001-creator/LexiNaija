export type UILanguageCode = 'en' | 'yo' | 'ha' | 'ig' | 'pcm'
export type DictionaryLanguageCode = string

export interface LanguageOption {
  code: string
  name: string
  nativeName: string
  short: string
  role: 'reference' | 'dictionary'
  interfaceAvailable?: boolean
}

export interface DictionaryEntry {
  id: string
  language: DictionaryLanguageCode
  term: string
  translation: string
  partOfSpeech?: string
  example: string
  exampleTranslation: string
  category: string
  tags: string[]
  dialect?: string
  alternativeSpellings?: string[]
  source: string
  sourceUrl: string
  sourceLicense: string
  sourceRecordId?: string
}

export interface QuizQuestion {
  id: string
  prompt: string
  answer: string
  options: string[]
  entryId: string
}
