/**
 * Navbar — ใช้ useTranslation จาก react-i18next
 * Nav labels: English เสมอ (hardcode)
 */
import { useState, useEffect } from 'react'
import { useLocation }         from 'react-router-dom'
import LanguageToggle          from '../ui/LanguageToggle'
import useScrollTo             from '../../hooks/useScrollTo'
import styles                  from './Navbar.module.css'
import { useCart }             from '../../context/CartContext'

// Nav links — label English เสมอ
const NAV_LINKS = [
  { label: 'Home',     path: '/',     sectionId: null       },
  { label: 'Concept',  path: '/',     sectionId: 'concept'  },
  { label: 'Services', path: '/',     sectionId: 'services' },
  { label: 'Shop',     path: '/shop', sectionId: null       },
  { label: 'Estimate', path: '/estimate', sectionId: null   },
  { label: 'AI Price', path: '/ai-estimate', sectionId: null },
  { label: 'Contact',  path: '/',     sectionId: 'contact'  },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location                = useLocation()
  const scrollTo                = useScrollTo()
  const { itemCount }           = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleNavClick = (e, path, sectionId) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(path, sectionId)
  }

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
      <nav className={styles.nav}>

        {/* Logo */}
        <a
          href="/"
          className={styles.logoLink}
          onClick={(e) => handleNavClick(e, '/', null)}
          aria-label="True Mark Tattoo — Home"
        >
          <img
            src="/logo-true-mark.jpg"
            alt="True Mark Tattoo"
            className={styles.logoImg}
            width={38} height={38}
          />
          <span className={styles.logoText}>True Mark</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="menubar">
          {NAV_LINKS.map((link) => (
            <li key={link.label} role="none">
              <a
                href={link.sectionId ? `/#${link.sectionId}` : link.path}
                role="menuitem"
                className={[
                  styles.link,
                  location.pathname === link.path && link.path !== '/' ? styles.active : '',
                ].join(' ')}
                onClick={(e) => handleNavClick(e, link.path, link.sectionId)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Language toggle + hamburger */}
        <div className={styles.rightGroup}>
          <a href="/cart" className={styles.cartLink} onClick={(e) => handleNavClick(e, '/cart', null)}>
            Cart <span>{itemCount}</span>
          </a>
          <LanguageToggle />
          <button
            className={[styles.hamburger, menuOpen ? styles.open : ''].join(' ')}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

      </nav>

      {/* Mobile dropdown */}
      <div
        className={[styles.mobileMenu, menuOpen ? styles.mobileOpen : ''].join(' ')}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.sectionId ? `/#${link.sectionId}` : link.path}
            className={styles.mobileLink}
            onClick={(e) => handleNavClick(e, link.path, link.sectionId)}
          >
            {link.label}
          </a>
        ))}
        <div className={styles.mobileLangWrap}>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}

export default Navbar
