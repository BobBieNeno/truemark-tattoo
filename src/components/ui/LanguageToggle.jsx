/**
 * LanguageToggle Component
 * ปุ่มสลับภาษา TH / EN
 * วางใน Navbar ด้านขวา
 */
import { useLanguage } from '../../context/LanguageContext'
import styles from './LanguageToggle.module.css'

function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      className={styles.toggle}
      onClick={toggleLang}
      aria-label={lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
      title={lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
    >
      {/* TH pill */}
      <span className={`${styles.pill} ${lang === 'th' ? styles.active : ''}`}>
        TH
      </span>

      {/* Divider */}
      <span className={styles.sep} aria-hidden="true">|</span>

      {/* EN pill */}
      <span className={`${styles.pill} ${lang === 'en' ? styles.active : ''}`}>
        EN
      </span>
    </button>
  )
}

export default LanguageToggle
