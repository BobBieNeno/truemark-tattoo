import { useState }           from 'react'
import { useTranslation }     from 'react-i18next'
import TMLogo                 from '../components/ui/TMLogo'
import SectionLabel           from '../components/ui/SectionLabel'
import RevealWrapper          from '../components/ui/RevealWrapper'
import Button                 from '../components/ui/Button'
import SubmitButton           from '../components/ui/SubmitButton'
import useReveal              from '../hooks/useReveal'
import useParallax            from '../hooks/useParallax'
import { services, processSteps } from '../data/services'
import styles                 from './HomePage.module.css'

/* ─── Hero ─── */
function HeroSection() {
  const { t } = useTranslation()
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.18)

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.heroLines} aria-hidden="true">
        {[15,30,70,85].map((left,i) => (
          <span key={i} className={styles.heroLine}
            style={{left:`${left}%`, animationDelay:`${i*1.2}s`}} />
        ))}
      </div>
      <div className={styles.spotlight} aria-hidden="true" />

      <div ref={parallaxRef} style={parallaxStyle} className={styles.heroLogo}>
        <img src="/logo-true-mark.jpg" alt="True Mark Tattoo" className={styles.heroLogoImg} />
      </div>

      <div className={styles.heroBrand}>
        <h1 className={styles.heroTitle}>True Mark</h1>
        <p className={styles.heroSub}>Tattoo Studio</p>
      </div>

      <div className={styles.heroDivider} aria-hidden="true">
        <span className={styles.heroDiamondLine} />
        <span className={styles.heroDiamond} />
        <span className={styles.heroDiamondLine} />
      </div>

      {/* เปลี่ยนตามภาษา */}
      <p className={styles.heroTagline}>{t('hero.tagline')}</p>

      <div className={styles.heroCtas}>
        <Button variant="outline" to="/ai-estimate">{t('hero.cta')}</Button>
        <Button variant="ghost"   to="/shop">{t('hero.shop')}</Button>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>{t('hero.scroll')}</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}

/* ─── Concept ─── */
function ConceptSection() {
  const { t }      = useTranslation()
  const sectionRef = useReveal()

  const cardLetters = ['T', 'M', 'TM']
  const cardTitles  = ['Truth & Stability', 'Mark & Meaning', 'True Mark']
  // ดึง array ด้วย returnObjects
  const cards = t('concept.cards', { returnObjects: true })

  return (
    <section id="concept" className={styles.section} ref={sectionRef}>
      <div className={styles.conceptGrid}>
        <div className={styles.conceptLeft}>
          <div className={styles.conceptBgText} aria-hidden="true">TM</div>
          <div className="reveal">
            <SectionLabel>— Concept</SectionLabel>
            <h2 className={styles.sectionHeading}>
              The Philosophy<br />Behind Every<br />Tattoo
            </h2>
            <p className={styles.bodyText}>{t('concept.body')}</p>
          </div>
        </div>

        <div className={styles.conceptCards}>
          {cardLetters.map((letter, i) => (
            <div key={letter}
              className={`${styles.conceptCard} reveal`}
              style={{transitionDelay:`${i*0.15}s`}}>
              <span className={styles.conceptLetter} aria-hidden="true">{letter}</span>
              <h3 className={styles.conceptCardTitle}>{cardTitles[i]}</h3>
              <p className={styles.conceptCardDesc}>
                {Array.isArray(cards) ? cards[i]?.desc : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
function ServicesSection() {
  const { t }      = useTranslation()
  const sectionRef = useReveal()
  // descriptions จาก i18n — เปลี่ยนตามภาษา
  const serviceItems = t('services.items', { returnObjects: true })

  return (
    <section id="services" className={styles.section} ref={sectionRef}>
      <div className={styles.servicesHeader}>
        <div className="reveal">
          <SectionLabel>— Services</SectionLabel>
          <h2 className={styles.sectionHeading}>Our Services</h2>
        </div>
        <p className={`${styles.bodyText} ${styles.servicesSubtext} reveal`}>
          {t('services.sub')}
        </p>
      </div>

      <div className={`${styles.servicesGrid} reveal`}>
        {services.map((svc, i) => (
          <div key={svc.id} className={styles.serviceItem}>
            <p className={styles.serviceNum}>{svc.number}</p>
            <div className={styles.serviceLine} />
            {/* title — English เสมอ */}
            <h3 className={styles.serviceTitle}>{svc.title}</h3>
            {/* desc — เปลี่ยนตามภาษา */}
            <p className={styles.serviceDesc}>
              {Array.isArray(serviceItems) ? serviceItems[i]?.desc : ''}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Process ─── */
function ProcessSection() {
  const { t }      = useTranslation()
  const sectionRef = useReveal()
  // descriptions จาก i18n — เปลี่ยนตามภาษา
  const processItems = t('process.steps', { returnObjects: true })

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="reveal">
        <SectionLabel>— Process</SectionLabel>
        <h2 className={styles.sectionHeading} style={{marginBottom:'4rem'}}>
          How We Work
        </h2>
      </div>
      <div className={styles.processGrid}>
        {processSteps.map((step, i) => (
          <div key={step.id}
            className={`${styles.processStep} reveal`}
            style={{transitionDelay:`${i*0.12}s`}}>
            <div className={styles.stepDot} aria-hidden="true" />
            {/* title — English เสมอ */}
            <h3 className={styles.processTitle}>{step.title}</h3>
            {/* desc — เปลี่ยนตามภาษา */}
            <p className={styles.processDesc}>
              {Array.isArray(processItems) ? processItems[i]?.desc : ''}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Gallery ─── */
function GallerySection() {
  const { t }      = useTranslation()
  const sectionRef = useReveal()
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(
    0.12,
    (offset) => `translate(-50%, calc(-50% + ${offset}px))`
  )

  const galleryItems = [
    { label:'Featured Work', span:true },
    { label:'Blackwork'  },
    { label:'Fine Line'  },
    { label:'Realism'    },
    { label:'Custom Design' },
  ]

  return (
    <section id="gallery" className={styles.section} ref={sectionRef}>
      <div className={styles.galleryHeader}>
        <div className="reveal">
          <SectionLabel>— Portfolio</SectionLabel>
          <h2 className={styles.sectionHeading}>Portfolio</h2>
        </div>
        <Button variant="outline" to="/" sectionId="contact">
          {t('gallery.cta')}
        </Button>
      </div>

      <div className={`${styles.galleryGrid} reveal`}>
        {galleryItems.map((item, i) => (
          <div key={i}
            className={[styles.galleryItem, item.span ? styles.gallerySpan : ''].join(' ')}>
            {item.span && (
              <div ref={parallaxRef} style={parallaxStyle} className={styles.galleryWatermark}>
                <TMLogo size={100} />
              </div>
            )}
            <span className={styles.galleryLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Quote ─── */
function QuoteSection() {
  const { t } = useTranslation()
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(
    0.1,
    (offset) => `translate(-50%, ${offset}px)`
  )

  return (
    <section className={styles.quoteSection} aria-label="Brand quote">
      <div ref={parallaxRef} style={parallaxStyle} className={styles.quoteBg} aria-hidden="true">"</div>
      <RevealWrapper>
        <blockquote className={styles.quoteText}>{t('quote.text')}</blockquote>
        <p className={styles.quoteAuthor}>{t('quote.author')}</p>
      </RevealWrapper>
    </section>
  )
}

/* ─── Contact ─── */
function ContactSection() {
  const { t }      = useTranslation()
  const sectionRef = useReveal()

  // Form state
  const [fields,  setFields]  = useState({ name:'', contact:'', style:'', message:'' })
  const [status,  setStatus]  = useState('idle')   // idle | sending | done
  const [touched, setTouched] = useState({})

  const update = (key, val) => setFields(prev => ({ ...prev, [key]: val }))
  const touch  = (key)      => setTouched(prev => ({ ...prev, [key]: true }))

  // Validation errors
  const errors = {
    name:    !fields.name.trim()    ? t('contact.form.requiredName')    : null,
    contact: !fields.contact.trim() ? t('contact.form.requiredContact') : null,
  }
  const isValid = !errors.name && !errors.contact

  // Submit handler
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setTouched({ name: true, contact: true })
    if (!isValid) return

    setStatus('sending')
    // TODO: เชื่อม API จริงตรงนี้
    await new Promise(r => setTimeout(r, 1200))
    setStatus('done')
    setFields({ name:'', contact:'', style:'', message:'' })
    setTouched({})
  }

  // ดึง styles list
  const styleOptions = t('contact.form.styles', { returnObjects: true })

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.contactGrid}>

        {/* Info */}
        <div className="reveal">
          <SectionLabel>— Contact</SectionLabel>
          <h2 className={styles.sectionHeading} style={{marginBottom:'1.5rem'}}>
            Begin Your<br />Story
          </h2>
          <p className={styles.bodyText} style={{marginBottom:'3rem'}}>
            {t('contact.body')}
          </p>

          <dl className={styles.contactInfo}>
            {/* Location */}
            <div className={styles.contactItem}>
              <dt className={styles.contactLabel}>{t('contact.info.locationLabel')}</dt>
              <dd className={styles.contactValue}>{t('contact.info.locationValue')}</dd>
            </div>
            {/* Instagram */}
            <div className={styles.contactItem}>
              <dt className={styles.contactLabel}>Instagram</dt>
              <dd className={styles.contactValue}>@truemark.tattoo</dd>
            </div>
            {/* LINE */}
            <div className={styles.contactItem}>
              <dt className={styles.contactLabel}>LINE</dt>
              <dd className={styles.contactValue}>@truemarktattoo</dd>
            </div>
            {/* Hours */}
            <div className={styles.contactItem}>
              <dt className={styles.contactLabel}>{t('contact.info.hoursLabel')}</dt>
              <dd className={styles.contactValue}>{t('contact.info.hoursValue')}</dd>
            </div>
          </dl>
        </div>

        {/* Form */}
        <form
          className={`${styles.contactForm} reveal`}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              {t('contact.form.nameLabel')}
            </label>
            <input
              id="name" type="text"
              placeholder={t('contact.form.namePlaceholder')}
              className={[
                styles.formInput,
                touched.name && errors.name ? styles.inputError : '',
              ].join(' ')}
              value={fields.name}
              onChange={e => update('name', e.target.value)}
              onBlur={() => touch('name')}
              autoComplete="name"
            />
            {touched.name && errors.name && (
              <span className={styles.errorMsg} role="alert">{errors.name}</span>
            )}
          </div>

          {/* Contact */}
          <div className={styles.formGroup}>
            <label htmlFor="contact" className={styles.formLabel}>
              {t('contact.form.contactLabel')}
            </label>
            <input
              id="contact" type="text"
              placeholder={t('contact.form.contactPlaceholder')}
              className={[
                styles.formInput,
                touched.contact && errors.contact ? styles.inputError : '',
              ].join(' ')}
              value={fields.contact}
              onChange={e => update('contact', e.target.value)}
              onBlur={() => touch('contact')}
              autoComplete="tel"
            />
            {touched.contact && errors.contact && (
              <span className={styles.errorMsg} role="alert">{errors.contact}</span>
            )}
          </div>

          {/* Style */}
          <div className={styles.formGroup}>
            <label htmlFor="style" className={styles.formLabel}>
              {t('contact.form.styleLabel')}
            </label>
            <select
              id="style"
              className={styles.formInput}
              value={fields.style}
              onChange={e => update('style', e.target.value)}
            >
              <option value="" disabled>{t('contact.form.styleDefault')}</option>
              {Array.isArray(styleOptions) && styleOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              {t('contact.form.messageLabel')}
            </label>
            <textarea
              id="message" rows={4}
              placeholder={t('contact.form.messagePlaceholder')}
              className={styles.formInput}
              value={fields.message}
              onChange={e => update('message', e.target.value)}
            />
          </div>

          {/* ─── Submit area ─── */}
          {status === 'done' ? (
            /* Success message */
            <div className={styles.successMsg} role="status">
              {t('contact.form.success')}
            </div>
          ) : (
            /* SubmitButton แยกจาก Button หลัก — ไม่มี error */
            <SubmitButton
              status={status}
              label={t('contact.form.submit')}
              sending={t('contact.form.sending')}
            />
          )}
        </form>

      </div>
    </section>
  )
}

/* ─── Main ─── */
function HomePage() {
  return (
    <main>
      <HeroSection />
      <div className={styles.divider} />
      <ConceptSection />
      <div className={styles.divider} />
      <ServicesSection />
      <div className={styles.divider} />
      <ProcessSection />
      <div className={styles.divider} />
      <GallerySection />
      <div className={styles.divider} />
      <QuoteSection />
      <div className={styles.divider} />
      <ContactSection />
    </main>
  )
}

export default HomePage
