/**
 * Navbar Component
 * แก้ไข:
 * - เปลี่ยนโลโก้จาก SVG → รูปจริง (logo-true-mark.jpg)
 * - เพิ่ม LanguageToggle
 * - ใช้ translations จาก useLanguage
 */
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LanguageToggle from '../ui/LanguageToggle'
import useScrollTo from '../../hooks/useScrollTo'
import { useLanguage } from '../../context/LanguageContext'
import styles from './Navbar.module.css'

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location                  = useLocation()
  const scrollTo                  = useScrollTo()
  const { t }                     = useLanguage()

  // Nav links ใช้ label จาก translations
  const NAV_LINKS = [
    { label: t.nav.home,     path: '/',     sectionId: null       },
    { label: t.nav.concept,  path: '/',     sectionId: 'concept'  },
    { label: t.nav.services, path: '/',     sectionId: 'services' },
    { label: t.nav.shop,     path: '/shop', sectionId: null       },
    { label: t.nav.contact,  path: '/',     sectionId: 'contact'  },
  ]

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

        {/* ── Logo (รูปจริง) ── */}
        <a
          href="/"
          className={styles.logoLink}
          onClick={(e) => handleNavClick(e, '/', null)}
          aria-label="True Mark Tattoo — Home"
        >
          <img
            src="/logo-true-mark.jpg"
            alt="True Mark Tattoo Logo"
            className={styles.logoImg}
            width={38}
            height={38}
          />
          <span className={styles.logoText}>True Mark</span>
        </a>

        {/* ── Desktop links ── */}
        <ul className={styles.links} role="menubar">
          {NAV_LINKS.map((link) => (
            <li key={link.label} role="none">
              <a
                href={link.sectionId ? `/#${link.sectionId}` : link.path}
                role="menuitem"
                className={[
                  styles.link,
                  location.pathname === '/shop' && link.path === '/shop' ? styles.active : '',
                ].join(' ')}
                onClick={(e) => handleNavClick(e, link.path, link.sectionId)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right: Language toggle + Hamburger ── */}
        <div className={styles.rightGroup}>
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

      {/* ── Mobile dropdown ── */}
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
        {/* Language toggle ใน mobile menu */}
        <div className={styles.mobileLangWrap}>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}

export default Navbar
