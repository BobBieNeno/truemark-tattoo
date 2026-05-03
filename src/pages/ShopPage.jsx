/**
 * ShopPage — True Mark Tattoo
 * 
 * หน้าร้านค้า ประกอบด้วย:
 * 1. Hero banner — brand identity
 * 2. Intro — อธิบายว่าสินค้าคืออะไร
 * 3. ProductGrid — สินค้าทั้งหมด + filter
 * 4. CTA — ลิงก์กลับไปนัดสัก
 */
import SectionLabel from '../components/ui/SectionLabel'
import RevealWrapper from '../components/ui/RevealWrapper'
import Button from '../components/ui/Button'
import ProductGrid from '../components/shop/ProductGrid'
import TMLogo from '../components/ui/TMLogo'
import useParallax from '../hooks/useParallax'
import styles from './ShopPage.module.css'

/* ─── Shop Hero ─── */
function ShopHero() {
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.15)

  return (
    <section className={styles.hero} aria-label="Shop hero">
      {/* Background pattern lines */}
      <div className={styles.heroBg} aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={styles.bgLine} style={{ left: `${i * 20}%`, animationDelay: `${i * 0.5}s` }} />
        ))}
      </div>

      <div className={styles.heroContent}>
        {/* Small logo */}
        <div ref={parallaxRef} style={parallaxStyle} className={styles.heroLogo}>
          <TMLogo size={60} />
        </div>

        <div className={styles.heroBadge}>Shop</div>
        <h1 className={styles.heroTitle}>True Mark<br />Collection</h1>
        <p className={styles.heroSub}>
          สินค้าและผลิตภัณฑ์ที่คัดเลือกมาเพื่อดูแลรอยสักของคุณ
        </p>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Button variant="ghost" to="/">Home</Button>
          <span className={styles.breadcrumbSep} aria-hidden="true">—</span>
          <span className={styles.breadcrumbCurrent}>Shop</span>
        </nav>
      </div>
    </section>
  )
}

/* ─── Shop Intro ─── */
function ShopIntro() {
  const features = [
    { icon: '◈', title: 'คัดสรรมาเพื่อคุณ',   desc: 'ทุกผลิตภัณฑ์ผ่านการทดสอบโดยช่างสักและผู้เชี่ยวชาญด้านผิวหนัง' },
    { icon: '◇', title: 'ส่งตรงถึงมือ',        desc: 'บริการจัดส่งทั่วประเทศ พร้อมคำแนะนำการใช้งานจาก True Mark' },
    { icon: '◆', title: 'รับประกันคุณภาพ',     desc: 'ถ้าไม่พอใจยินดีคืนเงินภายใน 7 วัน ไม่มีเงื่อนไข' },
  ]

  return (
    <section className={styles.intro}>
      <RevealWrapper>
        <SectionLabel>— Our Products</SectionLabel>
        <h2 className={styles.introHeading}>ดูแลรอยสักของคุณ<br />ให้คงความสวยงามยาวนาน</h2>
      </RevealWrapper>

      <div className={styles.featureGrid}>
        {features.map((f, i) => (
          <RevealWrapper key={f.title} delay={i * 100}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}

/* ─── Products Area ─── */
function ProductsArea() {
  return (
    <section className={styles.productsArea}>
      <RevealWrapper>
        <div className={styles.productsHeader}>
          <SectionLabel>— All Products</SectionLabel>
          <h2 className={styles.productsHeading}>สินค้าทั้งหมด</h2>
        </div>
      </RevealWrapper>

      <ProductGrid />
    </section>
  )
}

/* ─── Bottom CTA ─── */
function ShopCTA() {
  return (
    <section className={styles.cta} aria-label="Call to action">
      <RevealWrapper>
        <div className={styles.ctaInner}>
          <TMLogo size={50} />
          <div className={styles.ctaText}>
            <h2 className={styles.ctaHeading}>พร้อมที่จะสร้าง<br />รอยของคุณหรือยัง?</h2>
            <p className={styles.ctaSub}>ปรึกษาฟรี ไม่มีข้อผูกมัด ติดต่อได้เลย</p>
          </div>
          <div className={styles.ctaBtns}>
            <Button variant="outline" to="/" sectionId="contact">นัดหมายสัก</Button>
            <Button variant="ghost" to="/">กลับหน้าหลัก</Button>
          </div>
        </div>
      </RevealWrapper>
    </section>
  )
}

/* ─── Main Page ─── */
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
