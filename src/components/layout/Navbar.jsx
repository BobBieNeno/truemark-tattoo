/**
 * Navbar Component
 * 
 * แก้ไข: ใช้ useScrollTo แทน <Link> สำหรับ section links
 * - Home → scroll top
 * - Concept / Services / Contact → scroll ไปที่ section ID
 * - Shop → navigate ไปหน้า /shop
 */
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TMLogo from '../ui/TMLogo'
import useScrollTo from '../../hooks/useScrollTo'
import styles from './Navbar.module.css'

// ─── ข้อมูล nav links ───
// path = หน้าที่จะไป, sectionId = id ของ section ที่จะ scroll ถึง
const NAV_LINKS = [
  { label: 'Home',     path: '/',     sectionId: null      },
  { label: 'Concept',  path: '/',     sectionId: 'concept'  },
  { label: 'Services', path: '/',     sectionId: 'services' },
  { label: 'Shop',     path: '/shop', sectionId: null      },
  { label: 'Contact',  path: '/',     sectionId: 'contact'  },
]

function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location                  = useLocation()
  const scrollTo                  = useScrollTo()

  // ตรวจ scroll เพื่อเพิ่ม backdrop blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ปิด mobile menu เมื่อ route เปลี่ยน
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // ─── click handler ───
  const handleNavClick = (e, path, sectionId) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(path, sectionId)
  }

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
      <nav className={styles.nav}>

        {/* Logo → Home (scroll top) */}
        <a
          href="/"
          className={styles.logoLink}
          onClick={(e) => handleNavClick(e, '/', null)}
          aria-label="True Mark Tattoo — กลับหน้าหลัก"
        >
          <TMLogo size={32} />
          <span className={styles.logoText}>True Mark</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="menubar">
          {NAV_LINKS.map((link) => {
            // Active state: Shop → เช็ก pathname, section links → เช็กว่าอยู่หน้า /
            const isActive =
              link.path === '/shop'
                ? location.pathname === '/shop'
                : location.pathname === '/' && !link.sectionId
                  ? false  // Home ไม่ highlight เมื่อ scroll
                  : false

            return (
              <li key={link.label} role="none">
                <a
                  href={link.sectionId ? `/#${link.sectionId}` : link.path}
                  role="menuitem"
                  className={[
                    styles.link,
                    location.pathname === link.path && link.path === '/shop' ? styles.active : '',
                  ].join(' ')}
                  onClick={(e) => handleNavClick(e, link.path, link.sectionId)}
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={[styles.hamburger, menuOpen ? styles.open : ''].join(' ')}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
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
      </div>
    </header>
  )
}

export default Navbar
