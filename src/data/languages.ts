import languageData from './languages.json'
import type { LanguageOption, UILanguageCode } from '../types'

export const LANGUAGES = languageData as LanguageOption[]

export const DICTIONARY_LANGUAGES = LANGUAGES.filter(
  (language) => language.role === 'dictionary'
)

export const INTERFACE_LANGUAGES = LANGUAGES.filter(
  (language) => language.interfaceAvailable
) as Array<LanguageOption & { code: UILanguageCode }>

export const languageName = (code: string) =>
  LANGUAGES.find((language) => language.code === code)?.nativeName ?? code
