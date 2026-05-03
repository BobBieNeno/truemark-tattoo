/**
 * Footer Component
 * 
 * แก้ไข: ใช้ useScrollTo แทน <Link> ทั้งหมด
 * เพื่อให้ทุกลิงก์ scroll ไปยัง section ที่ถูกต้อง
 */
import TMLogo from '../ui/TMLogo'
import useScrollTo from '../../hooks/useScrollTo'
import styles from './Footer.module.css'

// ─── ข้อมูล footer links ───
const NAV_COL = [
  { label: 'Home',     path: '/',     sectionId: null       },
  { label: 'Concept',  path: '/',     sectionId: 'concept'  },
  { label: 'Services', path: '/',     sectionId: 'services' },
  { label: 'Gallery',  path: '/',     sectionId: 'gallery'  },
  { label: 'Shop',     path: '/shop', sectionId: null       },
  { label: 'Contact',  path: '/',     sectionId: 'contact'  },
]

const SOCIAL_COL = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook',  href: 'https://facebook.com'  },
  { label: 'LINE OA',   href: 'https://line.me'       },
  { label: 'TikTok',    href: 'https://tiktok.com'    },
]

function Footer() {
  const year     = new Date().getFullYear()
  const scrollTo = useScrollTo()

  const handleNavClick = (e, path, sectionId) => {
    e.preventDefault()
    scrollTo(path, sectionId)
    // scroll ขึ้นบนก่อนถ้าไม่มี section (เช่น Home)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>

        {/* Brand column */}
        <div className={styles.brand}>
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/', null)}
            aria-label="True Mark Tattoo Home"
          >
            <TMLogo size={50} />
          </a>
          <p className={styles.tagline}>รอยแห่งตัวตนที่แท้จริง</p>
          <p className={styles.brandDesc}>
            Udon Thani, Thailand<br />
            อังคาร – อาทิตย์  11:00 – 20:00
          </p>
        </div>

        {/* Navigation column */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Navigation</p>
          <nav className={styles.colLinks} aria-label="Footer navigation">
            {NAV_COL.map((link) => (
              <a
                key={link.label}
                href={link.sectionId ? `/#${link.sectionId}` : link.path}
                className={styles.colLink}
                onClick={(e) => handleNavClick(e, link.path, link.sectionId)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Social column */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Connect</p>
          <nav className={styles.colLinks} aria-label="Social media links">
            {SOCIAL_COL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.colLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact column */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Contact</p>
          <div className={styles.colLinks}>
            <p className={styles.colText}>@truemark.tattoo</p>
            <p className={styles.colText}>@truemarktattoo (LINE)</p>
            <a
              href="/#contact"
              className={[styles.colLink, styles.colLinkCta].join(' ')}
              onClick={(e) => handleNavClick(e, '/', 'contact')}
            >
              นัดปรึกษาฟรี →
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copy}>© {year} True Mark Tattoo. All rights reserved.</p>
        <p className={styles.copy}>Designed with intention.</p>
      </div>
    </footer>
  )
}

export default Footer
