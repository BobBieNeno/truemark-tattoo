import SectionLabel from '../components/ui/SectionLabel'
import RevealWrapper from '../components/ui/RevealWrapper'
import Button from '../components/ui/Button'
import ProductGrid from '../components/shop/ProductGrid'
import useParallax from '../hooks/useParallax'
import { useLanguage } from '../context/LanguageContext'
import styles from './ShopPage.module.css'

function ShopHero() {
  const { t } = useLanguage()
  const s = t.shop
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.15)

  return (
    <section className={styles.hero} aria-label="Shop hero">
      <div className={styles.heroBg} aria-hidden="true">
        {Array.from({length:6}).map((_,i) => (
          <span key={i} className={styles.bgLine} style={{left:`${i*20}%`,animationDelay:`${i*0.5}s`}} />
        ))}
      </div>
      <div className={styles.heroContent}>
        <div ref={parallaxRef} style={parallaxStyle} className={styles.heroLogo}>
          <img src="/logo-true-mark.jpg" alt="True Mark" className={styles.heroLogoImg} />
        </div>
        <div className={styles.heroBadge}>{s.badge}</div>
        <h1 className={styles.heroTitle}>{s.title[0]}<br />{s.title[1]}</h1>
        <p className={styles.heroSub}>{s.sub}</p>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Button variant="ghost" to="/">Home</Button>
          <span className={styles.breadcrumbSep} aria-hidden="true">—</span>
          <span className={styles.breadcrumbCurrent}>{s.breadcrumb}</span>
        </nav>
      </div>
    </section>
  )
}

function ShopIntro() {
  const { t } = useLanguage()
  const s = t.shop
  const icons = ['◈','◇','◆']

  return (
    <section className={styles.intro}>
      <RevealWrapper>
        <SectionLabel>{t.shop.productsLabel}</SectionLabel>
        <h2 className={styles.introHeading}>
          {s.introHeading[0]}<br />{s.introHeading[1]}
        </h2>
      </RevealWrapper>
      <div className={styles.featureGrid}>
        {s.features.map((f,i) => (
          <RevealWrapper key={f.title} delay={i*100}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">{icons[i]}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}

function ProductsArea() {
  const { t } = useLanguage()
  const s = t.shop
  return (
    <section className={styles.productsArea}>
      <RevealWrapper>
        <div className={styles.productsHeader}>
          <SectionLabel>{s.productsLabel}</SectionLabel>
          <h2 className={styles.productsHeading}>{s.productsHeading}</h2>
        </div>
      </RevealWrapper>
      <ProductGrid />
    </section>
  )
}

function ShopCTA() {
  const { t } = useLanguage()
  const s = t.shop
  return (
    <section className={styles.cta} aria-label="Call to action">
      <RevealWrapper>
        <div className={styles.ctaInner}>
          <img src="/logo-true-mark.jpg" alt="True Mark" className={styles.ctaLogo} />
          <div className={styles.ctaText}>
            <h2 className={styles.ctaHeading}>{s.ctaHeading[0]}<br />{s.ctaHeading[1]}</h2>
            <p className={styles.ctaSub}>{s.ctaSub}</p>
          </div>
          <div className={styles.ctaBtns}>
            <Button variant="outline" to="/" sectionId="contact">{s.ctaBook}</Button>
            <Button variant="ghost"   to="/">{s.ctaHome}</Button>
          </div>
        </div>
      </RevealWrapper>
    </section>
  )
}

function ShopPage() {
  return (
    <main>
      <ShopHero />
      <ShopIntro />
      <ProductsArea />
      <ShopCTA />
    </main>
  )
}
export default ShopPage
