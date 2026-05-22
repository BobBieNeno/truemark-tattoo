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

i18n
  .use(initReactI18next)   // ส่ง i18n instance ให้ react
  .init({
    // Translation resources
    resources: {
      th: { translation: th },
      en: { translation: en },
    },

    // ภาษาเริ่มต้น — ดึงจาก localStorage ที่บันทึกไว้ก่อน ไม่งั้นใช้ 'th'
    lng: (() => {
      try { return localStorage.getItem('tm_lang') || 'en' } catch { return 'en' }
    })(),

    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React ทำ XSS protection อยู่แล้ว ไม่ต้อง escape ซ้ำ
    },

    // ไม่ใช้ namespace เพื่อให้ code เรียบง่าย
    defaultNS: 'translation',
  })

export default i18n
