import { useLanguage } from '../../context/LanguageContext'
import useScrollTo from '../../hooks/useScrollTo'
import styles from './Footer.module.css'

const NAV_PATHS = [
  { path:'/', sectionId: null      },
  { path:'/', sectionId:'concept'  },
  { path:'/', sectionId:'services' },
  { path:'/', sectionId:'gallery'  },
  { path:'/shop', sectionId: null  },
  { path:'/', sectionId:'contact'  },
]
const SOCIAL = [
  { label:'Instagram', href:'https://instagram.com' },
  { label:'Facebook',  href:'https://facebook.com'  },
  { label:'LINE OA',   href:'https://line.me'        },
  { label:'TikTok',    href:'https://tiktok.com'     },
]

function Footer() {
  const year     = new Date().getFullYear()
  const { t }    = useLanguage()
  const scrollTo = useScrollTo()
  const ft       = t.footer

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
          <p className={styles.tagline}>{ft.tagline}</p>
          <p className={styles.brandDesc}>Udon Thani, Thailand<br />{ft.hours}</p>
        </div>

        {/* Navigation */}
        <div className={styles.col}>
          <p className={styles.colTitle}>{ft.navTitle}</p>
          <nav className={styles.colLinks}>
            {ft.nav.map((label, i) => (
              <a key={label} href={NAV_PATHS[i].sectionId ? `/#${NAV_PATHS[i].sectionId}` : NAV_PATHS[i].path}
                className={styles.colLink}
                onClick={(e) => handleClick(e, NAV_PATHS[i].path, NAV_PATHS[i].sectionId)}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Social */}
        <div className={styles.col}>
          <p className={styles.colTitle}>{ft.socialTitle}</p>
          <nav className={styles.colLinks}>
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} className={styles.colLink}
                target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <p className={styles.colTitle}>{ft.contactTitle}</p>
          <div className={styles.colLinks}>
            <p className={styles.colText}>@truemark.tattoo</p>
            <p className={styles.colText}>@truemarktattoo (LINE)</p>
            <a href="/#contact"
              className={[styles.colLink, styles.colLinkCta].join(' ')}
              onClick={(e) => handleClick(e,'/', 'contact')}>
              {ft.freeCta}
            </a>
          </div>
        </div>

      </div>
      <div className={styles.bottom}>
        <p className={styles.copy}>© {year} True Mark Tattoo. {ft.rights}.</p>
        <p className={styles.copy}>{ft.designed}</p>
      </div>
    </footer>
  )
}
export default Footer
