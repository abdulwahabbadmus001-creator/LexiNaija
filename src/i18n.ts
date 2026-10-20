import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: { translation: {
    home: 'Home', dictionary: 'Dictionary', learn: 'Learn', saved: 'Saved', settings: 'Settings',
    searchPlaceholder: 'Search a word, meaning or exampleâ€¦', wordOfDay: 'Word of the day', explore: 'Explore the dictionary',
    studyNow: 'Study now', savedWords: 'Saved words', recent: 'Recent', offlineReady: 'Offline ready',
    language: 'Language', allLanguages: 'All languages', category: 'Category', allCategories: 'All categories',
    noResults: 'No matching words yet.', save: 'Save', savedLabel: 'Saved',
    example: 'Example', meaning: 'Meaning', startQuiz: 'Start quiz', next: 'Next', check: 'Check answer',
    correct: 'Correct', incorrect: 'Not quite', progress: 'Progress', reviewed: 'Reviewed', accuracy: 'Accuracy', streak: 'Streak',
    appearance: 'Appearance', dataAndPrivacy: 'Data & privacy', about: 'About LinguaNaija'
  }},
  yo: { translation: {
    home: 'IlÃ©', dictionary: 'ÃŒwÃ©-á»ŒÌ€rá»Ì€', learn: 'Ká»Ì áº¸Ì€ká»Ì', saved: 'Fipamá»Ì', settings: 'ÃˆtÃ²',
    searchPlaceholder: 'WÃ¡ á»Ì€rá»Ì€, Ã¬tumá»Ì€ tÃ bÃ­ Ã páº¹áº¹ráº¹â€¦', wordOfDay: 'á»ŒÌ€rá»Ì€ á»já»Ì', explore: 'á¹¢Ã wÃ¡rÃ­ Ã¬wÃ©-á»Ì€rá»Ì€',
    studyNow: 'Báº¹Ì€ráº¹Ì€ áº¹Ì€ká»Ì', savedWords: 'á»ŒÌ€rá»Ì€ tÃ­ a fipamá»Ì', recent: 'Ã€Ã¬páº¹Ì', offlineReady: 'á¹¢etan lÃ¡Ã¬sÃ­ Ã­Å„tÃ¡náº¹Ìáº¹Ì€tÃ¬',
    language: 'ÃˆdÃ¨', allLanguages: 'Gbogbo Ã¨dÃ¨', category: 'áº¸Ì€ka', allCategories: 'Gbogbo áº¹Ì€ka', noResults: 'A kÃ² rÃ­ á»Ì€rá»Ì€ tÃ³ bÃ¡ mu.',
    save: 'Fipamá»Ì', savedLabel: 'Ti fipamá»Ì', example: 'Ã€páº¹áº¹ráº¹', meaning: 'ÃŒtumá»Ì€', startQuiz: 'Báº¹Ì€ráº¹Ì€ Ã¬dÃ¡nwÃ²',
    next: 'Táº¹Ì€sÃ­wÃ¡jÃº', check: 'á¹¢Ã yáº¹Ì€wÃ²', correct: 'Ã“ tá»Ì', incorrect: 'KÃ² tÃ­Ã¬ tá»Ì', progress: 'ÃŒlá»sÃ­wÃ¡jÃº', reviewed: 'TÃ­ a káº¹Ìká»Ì€á»Ì', accuracy: 'ÃŒpÃ©ye', streak: 'á»Œjá»Ì táº¹Ì€lÃ© ara wá»n', appearance: 'ÃŒrÃ­sÃ­', dataAndPrivacy: 'DÃ¡tÃ  Ã ti Ã¬pamá»Ì', about: 'NÃ­pa LinguaNaija'
  }},
  ha: { translation: {
    home: 'Gida', dictionary: 'Æ˜amus', learn: 'Koyo', saved: 'Ajiyewa', settings: 'Saituna', searchPlaceholder: 'Nemo kalma, maâ€™ana ko misaliâ€¦',
    wordOfDay: 'Kalmar rana', explore: 'Binciki Æ™amus', studyNow: 'Fara koyo', savedWords: 'Kalmomin da aka ajiye', recent: 'Na baya-bayan nan', offlineReady: 'Yana aiki ba tare da intanet ba',
    language: 'Harshe', allLanguages: 'Duk harsuna', category: 'Rukuni', allCategories: 'Duk rukuni', noResults: 'Ba a sami kalma ba.', save: 'Ajiye', savedLabel: 'An ajiye', example: 'Misali', meaning: 'Maâ€™ana', startQuiz: 'Fara gwaji', next: 'Na gaba', check: 'Duba amsa', correct: 'Daidai', incorrect: 'Ba daidai ba', progress: 'Ci gaba', reviewed: 'An duba', accuracy: 'Daidaito', streak: 'Jerin kwanaki', appearance: 'Bayyanar', dataAndPrivacy: 'Bayanai da sirri', about: 'Game da LinguaNaija'
  }},
  ig: { translation: {
    home: 'á»¤lá»', dictionary: 'á»Œká»wa okwu', learn: 'Má»¥ta', saved: 'Echekwara', settings: 'Ntá»ala', searchPlaceholder: 'Chá»á» okwu, nká»wa ma á» bá»¥ á»má»¥maatá»¥â€¦',
    wordOfDay: 'Okwu á»¥bá»chá»‹', explore: 'Nyochaa á»ká»wa okwu', studyNow: 'Bido á»‹má»¥', savedWords: 'Okwu echekwara', recent: 'Na nso nso', offlineReady: 'á»Œ na-ará»¥ á»rá»¥ nâ€™enweghá»‹ á»‹ntanetá»‹', language: 'Asá»¥sá»¥', allLanguages: 'Asá»¥sá»¥ niile', category: 'á»¤dá»‹', allCategories: 'á»¤dá»‹ niile', noResults: 'Enweghá»‹ okwu dabara.', save: 'Chekwaa', savedLabel: 'Echekwara', example: 'á»Œmá»¥maatá»¥', meaning: 'Nká»wa', startQuiz: 'Bido ajá»¥já»¥', next: 'Na-esote', check: 'Lelee azá»‹za', correct: 'Ziri ezi', incorrect: 'á»Œ bá»¥ghá»‹ ya', progress: 'á»Œganihu', reviewed: 'A má»¥rá»¥', accuracy: 'Nkenke', streak: 'á»¤bá»chá»‹ nâ€™usoro', appearance: 'á»Œdá»‹dá»‹', dataAndPrivacy: 'Data na nzuzo', about: 'Banyere LinguaNaija'
  }},
  pcm: { translation: {
    home: 'Home', dictionary: 'Dictionary', learn: 'Learn', saved: 'Saved', settings: 'Settings', searchPlaceholder: 'Search word, meaning or exampleâ€¦',
    wordOfDay: 'Word for today', explore: 'Check dictionary', studyNow: 'Start learning', savedWords: 'Words wey you save', recent: 'Recent', offlineReady: 'E fit work without data', language: 'Language', allLanguages: 'All languages', category: 'Category', allCategories: 'All categories', noResults: 'We no see matching word.', save: 'Save', savedLabel: 'Saved', example: 'Example', meaning: 'Meaning', startQuiz: 'Start quiz', next: 'Next', check: 'Check answer', correct: 'Correct', incorrect: 'No be am', progress: 'Progress', reviewed: 'Reviewed', accuracy: 'Accuracy', streak: 'Streak', appearance: 'Appearance', dataAndPrivacy: 'Data & privacy', about: 'About LinguaNaija'
  }}
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n

