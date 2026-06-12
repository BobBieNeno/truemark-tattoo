import { useTranslation } from 'react-i18next'
import SectionLabel       from '../components/ui/SectionLabel'
import RevealWrapper      from '../components/ui/RevealWrapper'
import Button             from '../components/ui/Button'
import ProductGrid        from '../components/shop/ProductGrid'
import useParallax        from '../hooks/useParallax'
import styles             from './ShopPage.module.css'

const FEATURE_TITLES  = ['Curated for You', 'Delivered to You', 'Quality Guaranteed']
const FEATURE_ICONS   = ['◈', '◇', '◆']

function ShopHero() {
  const { t } = useTranslation()
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.15)

  return (
    <section className={styles.hero} aria-label="Shop hero">
      <div className={styles.heroBg} aria-hidden="true">
        {Array.from({length:6}).map((_,i) => (
          <span key={i} className={styles.bgLine}
            style={{left:`${i*20}%`, animationDelay:`${i*0.5}s`}} />
        ))}
      </div>
      <div className={styles.heroContent}>
        <div ref={parallaxRef} style={parallaxStyle} className={styles.heroLogo}>
          <img src="/logo-true-mark.jpg" alt="True Mark" className={styles.heroLogoImg} />
        </div>
        <div className={styles.heroBadge}>Shop</div>
        <h1 className={styles.heroTitle}>True Mark<br />Collection</h1>
        <p className={styles.heroSub}>{t('shop.sub')}</p>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Button variant="ghost" to="/">Home</Button>
          <span className={styles.breadcrumbSep} aria-hidden="true">—</span>
          <span className={styles.breadcrumbCurrent}>Shop</span>
        </nav>
      </div>
    </section>
  )
}

function ShopIntro() {
  const { t }    = useTranslation()
  const features = t('shop.features', { returnObjects: true })

  return (
    <section className={styles.intro}>
      <RevealWrapper>
        <SectionLabel>— Our Products</SectionLabel>
        <h2 className={styles.introHeading}>
          Keep Your Tattoo<br />Looking Its Best
        </h2>
      </RevealWrapper>
      <div className={styles.featureGrid}>
        {FEATURE_TITLES.map((title, i) => (
          <RevealWrapper key={title} delay={i * 100}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">{FEATURE_ICONS[i]}</span>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureDesc}>
                {Array.isArray(features) ? features[i]?.desc : ''}
              </p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}

function ProductsArea() {
  return (
    <section className={styles.productsArea}>
      <RevealWrapper>
        <div className={styles.productsHeader}>
          <SectionLabel>— All Products</SectionLabel>
          <h2 className={styles.productsHeading}>All Products</h2>
        </div>
      </RevealWrapper>
      <ProductGrid />
    </section>
  )
}

function ShopCTA() {
  const { t } = useTranslation()

  return (
    <section className={styles.cta} aria-label="Call to action">
      <RevealWrapper>
        <div className={styles.ctaInner}>
          <img src="/logo-true-mark.jpg" alt="True Mark" className={styles.ctaLogo} />
          <div className={styles.ctaText}>
            <h2 className={styles.ctaHeading}>Ready to Create<br />Your Mark?</h2>
            <p className={styles.ctaSub}>{t('shop.ctaSub')}</p>
          </div>
          <div className={styles.ctaBtns}>
            <Button variant="outline" to="/" sectionId="contact">{t('shop.ctaBook')}</Button>
            <Button variant="ghost"   to="/">{t('shop.ctaHome')}</Button>
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
