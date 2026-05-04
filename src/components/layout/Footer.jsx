/**
 * Footer — ใช้ useTranslation จาก react-i18next
 * Nav labels: English เสมอ
 * Content (tagline, hours, cta): เปลี่ยนตามภาษา
 */
import { useTranslation } from 'react-i18next'
import useScrollTo        from '../../hooks/useScrollTo'
import styles             from './Footer.module.css'

const NAV_ITEMS = [
  { label:'Home',      path:'/', sectionId: null       },
  { label:'Concept',   path:'/', sectionId:'concept'   },
  { label:'Services',  path:'/', sectionId:'services'  },
  { label:'Portfolio', path:'/', sectionId:'gallery'   },
  { label:'Shop',      path:'/shop', sectionId: null   },
  { label:'Contact',   path:'/', sectionId:'contact'   },
]
const SOCIAL = [
  { label:'Instagram', href:'https://instagram.com' },
  { label:'Facebook',  href:'https://facebook.com'  },
  { label:'LINE OA',   href:'https://line.me'        },
  { label:'TikTok',    href:'https://tiktok.com'     },
]

function Footer() {
  const { t }    = useTranslation()
  const year     = new Date().getFullYear()
  const scrollTo = useScrollTo()

  const handleClick = (e, path, sectionId) => {
    e.preventDefault()
    scrollTo(path, sectionId)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>

        {/* Brand */}
        <div className={styles.brand}>
          <a href="/" onClick={(e) => handleClick(e,'/',null)} aria-label="True Mark Home">
            <img src="/logo-true-mark.jpg" alt="True Mark" className={styles.footerLogo} />
          </a>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
          <p className={styles.brandDesc}>
            Udon Thani, Thailand<br />{t('footer.hours')}
          </p>
        </div>

        {/* Navigation — English เสมอ */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Navigation</p>
          <nav className={styles.colLinks}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.sectionId ? `/#${item.sectionId}` : item.path}
                className={styles.colLink}
                onClick={(e) => handleClick(e, item.path, item.sectionId)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Social — English เสมอ */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Connect</p>
          <nav className={styles.colLinks}>
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} className={styles.colLink}
                target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Contact</p>
          <div className={styles.colLinks}>
            <p className={styles.colText}>@truemark.tattoo</p>
            <p className={styles.colText}>@truemarktattoo (LINE)</p>
            <a
              href="/#contact"
              className={[styles.colLink, styles.colLinkCta].join(' ')}
              onClick={(e) => handleClick(e,'/', 'contact')}
            >
              {t('footer.freeCta')}
            </a>
          </div>
        </div>

      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© {year} True Mark Tattoo. {t('footer.rights')}.</p>
        <p className={styles.copy}>{t('footer.designed')}</p>
      </div>
    </footer>
  )
}

export default Footer
