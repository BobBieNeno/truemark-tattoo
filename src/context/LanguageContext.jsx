/**
 * LanguageContext
 *
 * Global state สำหรับภาษา — ใช้งานได้ทุก component
 *
 * วิธีใช้ใน component:
 *   const { t, lang, toggleLang } = useLanguage()
 *   <h1>{t.hero.tagline}</h1>
 *   <button onClick={toggleLang}>{lang === 'th' ? 'EN' : 'TH'}</button>
 */
import { createContext, useContext, useState } from 'react'
import { translations } from '../data/translations'

// สร้าง context object
const LanguageContext = createContext(null)

// ── Provider: ครอบ App ทั้งหมด ──
export function LanguageProvider({ children }) {
  // ดึงภาษาที่เคยเลือกจาก localStorage (ถ้ามี) ค่าเริ่มต้น = 'th'
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('tm_lang') || 'th'
    } catch {
      return 'th'
    }
  })

  // สลับภาษา TH ↔ EN และบันทึกลง localStorage
  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'th' ? 'en' : 'th'
      try { localStorage.setItem('tm_lang', next) } catch {}
      return next
    })
  }

  // t = translations object ของภาษาปัจจุบัน
  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// ── Hook: เรียกใช้ใน component ──
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage ต้องใช้ภายใน <LanguageProvider>')
  }
  return ctx
}
