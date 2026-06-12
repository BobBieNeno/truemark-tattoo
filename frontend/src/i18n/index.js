/**
 * i18n/index.js — react-i18next configuration
 *
 * วิธีใช้ใน component:
 *   import { useTranslation } from 'react-i18next'
 *   const { t, i18n } = useTranslation()
 *   t('hero.tagline')          → string ตามภาษาปัจจุบัน
 *   i18n.changeLanguage('en')  → เปลี่ยนภาษา
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import th from './th.json'
import en from './en.json'

const STORAGE_KEY = 'tm_lang'
const DEFAULT_LANGUAGE = 'en'
const supportedLanguages = ['th', 'en']

const getStoredLanguage = () => {
  try {
    const language = localStorage.getItem(STORAGE_KEY)
    return supportedLanguages.includes(language) ? language : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

const syncLanguage = (language) => {
  const resolvedLanguage = language?.split('-')[0]
  if (!supportedLanguages.includes(resolvedLanguage)) return

  document.documentElement.lang = resolvedLanguage
  try {
    localStorage.setItem(STORAGE_KEY, resolvedLanguage)
  } catch {
    // The selected language still works when storage is unavailable.
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: th },
      en: { translation: en },
    },
    lng: getStoredLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: supportedLanguages,
    load: 'languageOnly',

    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'translation',
  })

i18n.on('languageChanged', syncLanguage)
syncLanguage(i18n.resolvedLanguage || i18n.language)

export default i18n
