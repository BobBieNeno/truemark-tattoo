/**
 * LanguageToggle — ปุ่มสลับภาษา TH / EN
 * ใช้ useTranslation จาก react-i18next
 */
import { useTranslation } from 'react-i18next'
import styles from './LanguageToggle.module.css'

function LanguageToggle() {
  const { i18n } = useTranslation()
  const current  = i18n.language  // 'th' หรือ 'en'

  const handleToggle = () => {
    const next = current === 'th' ? 'en' : 'th'
    i18n.changeLanguage(next)
    // บันทึกลง localStorage ให้ persist ข้ามหน้า
    try { localStorage.setItem('tm_lang', next) } catch {}
  }

  return (
    <button
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={current === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
      title={current === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
    >
      <span className={`${styles.pill} ${current === 'th' ? styles.active : ''}`}>
        TH
      </span>
      <span className={styles.sep} aria-hidden="true">|</span>
      <span className={`${styles.pill} ${current === 'en' ? styles.active : ''}`}>
        EN
      </span>
    </button>
  )
}

export default LanguageToggle
