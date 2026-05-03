import { useState } from "react";
import TMLogo from "../components/ui/TMLogo";
import SectionLabel from "../components/ui/SectionLabel";
import RevealWrapper from "../components/ui/RevealWrapper";
import Button from "../components/ui/Button";
import useReveal from "../hooks/useReveal";
import useParallax from "../hooks/useParallax";
import { useLanguage } from "../context/LanguageContext";
import { services, processSteps } from "../data/services";
import styles from "./HomePage.module.css";

/* ─── Hero ─── */
function HeroSection() {
  const { t } = useLanguage();
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.18);

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.heroLines} aria-hidden="true">
        {[15, 30, 70, 85].map((left, i) => (
          <span
            key={i}
            className={styles.heroLine}
            style={{ left: `${left}%`, animationDelay: `${i * 1.2}s` }}
          />
        ))}
      </div>
      <div className={styles.spotlight} aria-hidden="true" />

      <div ref={parallaxRef} style={parallaxStyle} className={styles.heroLogo}>
        {/* ใช้รูปโลโก้จริงใน Hero ด้วย */}
        <img
          src="/Logo-true-mark.png"
          alt="True Mark Tattoo"
          className={styles.heroLogoImg}
          // width={200}
          // height={200}
        />
      </div>

      <div className={styles.heroBrand}>
        <h1 className={styles.heroTitle}>True Mark</h1>
        <p className={styles.heroSub}>{t.hero.sub}</p>
      </div>

      <div className={styles.heroDivider} aria-hidden="true">
        <span className={styles.heroDiamondLine} />
        <span className={styles.heroDiamond} />
        <span className={styles.heroDiamondLine} />
      </div>

      <p className={styles.heroTagline}>{t.hero.tagline}</p>

      <div className={styles.heroCtas}>
        <Button variant="ghost" to="/" sectionId="contact">
          {t.hero.cta}
        </Button>
        <Button variant="ghost" to="/shop">
          {t.hero.shop}
        </Button>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>{t.hero.scroll}</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}

/* ─── Concept ─── */
function ConceptSection() {
  const { t } = useLanguage();
  const sectionRef = useReveal();

  return (
    <section id="concept" className={styles.section} ref={sectionRef}>
      <div className={styles.conceptGrid}>
        <div className={styles.conceptLeft}>
          <div className={styles.conceptBgText} aria-hidden="true">
            TM
          </div>
          <div className="reveal">
            <SectionLabel>{t.concept.label}</SectionLabel>
            <h2 className={styles.sectionHeading}>
              {t.concept.heading.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className={styles.bodyText}>{t.concept.body}</p>
          </div>
        </div>
        <div className={styles.conceptCards}>
          {t.concept.cards.map((card, i) => (
            <div
              key={card.letter}
              className={`${styles.conceptCard} reveal`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <span className={styles.conceptLetter} aria-hidden="true">
                {card.letter}
              </span>
              <h3 className={styles.conceptCardTitle}>{card.title}</h3>
              <p className={styles.conceptCardDesc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ─── */
function ServicesSection() {
  const { t } = useLanguage();
  const sectionRef = useReveal();

  return (
    <section id="services" className={styles.section} ref={sectionRef}>
      <div className={styles.servicesHeader}>
        <div className="reveal">
          <SectionLabel>{t.services.label}</SectionLabel>
          <h2 className={styles.sectionHeading}>{t.services.heading}</h2>
        </div>
        <p className={`${styles.bodyText} ${styles.servicesSubtext} reveal`}>
          {t.services.sub}
        </p>
      </div>
      <div className={`${styles.servicesGrid} reveal`}>
        {services.map((svc) => (
          <div key={svc.id} className={styles.serviceItem}>
            <p className={styles.serviceNum}>{svc.number}</p>
            <div className={styles.serviceLine} />
            <h3 className={styles.serviceTitle}>{svc.title}</h3>
            <p className={styles.serviceDesc}>{svc.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Process ─── */
function ProcessSection() {
  const { t } = useLanguage();
  const sectionRef = useReveal();

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="reveal">
        <SectionLabel>{t.process.label}</SectionLabel>
        <h2 className={styles.sectionHeading} style={{ marginBottom: "4rem" }}>
          {t.process.heading}
        </h2>
      </div>
      <div className={styles.processGrid}>
        {processSteps.map((step, i) => (
          <div
            key={step.id}
            className={`${styles.processStep} reveal`}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className={styles.stepDot} aria-hidden="true" />
            <h3 className={styles.processTitle}>{step.title}</h3>
            <p className={styles.processDesc}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Gallery ─── */
function GallerySection() {
  const { t } = useLanguage();
  const sectionRef = useReveal();
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.12);

  return (
    <section id="gallery" className={styles.section} ref={sectionRef}>
      <div className={styles.galleryHeader}>
        <div className="reveal">
          <SectionLabel>{t.gallery.label}</SectionLabel>
          <h2 className={styles.sectionHeading}>{t.gallery.heading}</h2>
        </div>
        <Button variant="outline" to="/" sectionId="contact">
          {t.gallery.cta}
        </Button>
      </div>
      <div className={`${styles.galleryGrid} reveal`}>
        {t.gallery.items.map((label, i) => (
          <div
            key={i}
            className={[
              styles.galleryItem,
              i === 0 ? styles.gallerySpan : "",
            ].join(" ")}
          >
            {i === 0 && (
              <div
                ref={parallaxRef}
                style={parallaxStyle}
                className={styles.galleryWatermark}
              >
                <TMLogo size={100} />
              </div>
            )}
            <span className={styles.galleryLabel}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Quote ─── */
function QuoteSection() {
  const { t } = useLanguage();
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.1);

  return (
    <section className={styles.quoteSection} aria-label="Brand quote">
      <div
        ref={parallaxRef}
        style={parallaxStyle}
        className={styles.quoteBg}
        aria-hidden="true"
      >
        "
      </div>
      <RevealWrapper>
        <blockquote className={styles.quoteText}>{t.quote.text}</blockquote>
        <p className={styles.quoteAuthor}>{t.quote.author}</p>
      </RevealWrapper>
    </section>
  );
}

/* ─── Contact ─── */
function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useReveal();
  const f = t.contact.form;

  // Form state
  const [fields, setFields] = useState({
    name: "",
    contact: "",
    style: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [touched, setTouched] = useState({});

  const update = (key, val) => setFields((prev) => ({ ...prev, [key]: val }));
  const touch = (key) => setTouched((prev) => ({ ...prev, [key]: true }));

  // Validation
  const errors = {
    name: !fields.name.trim() ? f.namePlaceholder : null,
    contact: !fields.contact.trim() ? f.contactPlaceholder : null,
  };
  const isValid = !errors.name && !errors.contact;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields as touched เพื่อ show errors
    setTouched({ name: true, contact: true });
    if (!isValid) return;

    setStatus("sending");
    // Simulate async submit (ต่อไปเชื่อม API จริงได้)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
    setFields({ name: "", contact: "", style: "", message: "" });
    setTouched({});
  };

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.contactGrid}>
        {/* ── Left: Info ── */}
        <div className="reveal">
          <SectionLabel>{t.contact.label}</SectionLabel>
          <h2
            className={styles.sectionHeading}
            style={{ marginBottom: "1.5rem" }}
          >
            {t.contact.heading.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className={styles.bodyText} style={{ marginBottom: "3rem" }}>
            {t.contact.body}
          </p>

          <dl className={styles.contactInfo}>
            {t.contact.info.map(({ label, value }) => (
              <div key={label} className={styles.contactItem}>
                <dt className={styles.contactLabel}>{label}</dt>
                <dd className={styles.contactValue}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Right: Form ── */}
        <form
          className={`${styles.contactForm} reveal`}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              {f.nameLabel}
            </label>
            <input
              id="name"
              type="text"
              placeholder={f.namePlaceholder}
              className={[
                styles.formInput,
                touched.name && errors.name ? styles.inputError : "",
              ].join(" ")}
              value={fields.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => touch("name")}
              autoComplete="name"
            />
            {touched.name && errors.name && (
              <span className={styles.errorMsg} role="alert">
                กรุณากรอก{f.nameLabel}
              </span>
            )}
          </div>

          {/* Contact */}
          <div className={styles.formGroup}>
            <label htmlFor="contact" className={styles.formLabel}>
              {f.contactLabel}
            </label>
            <input
              id="contact"
              type="text"
              placeholder={f.contactPlaceholder}
              className={[
                styles.formInput,
                touched.contact && errors.contact ? styles.inputError : "",
              ].join(" ")}
              value={fields.contact}
              onChange={(e) => update("contact", e.target.value)}
              onBlur={() => touch("contact")}
              autoComplete="tel"
            />
            {touched.contact && errors.contact && (
              <span className={styles.errorMsg} role="alert">
                กรุณากรอกข้อมูลติดต่อ
              </span>
            )}
          </div>

          {/* Style */}
          <div className={styles.formGroup}>
            <label htmlFor="style" className={styles.formLabel}>
              {f.styleLabel}
            </label>
            <select
              id="style"
              className={styles.formInput}
              value={fields.style}
              onChange={(e) => update("style", e.target.value)}
            >
              <option value="" disabled>
                {f.styleDefault}
              </option>
              {f.styles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              {f.messageLabel}
            </label>
            <textarea
              id="message"
              placeholder={f.messagePlaceholder}
              className={styles.formInput}
              rows={4}
              value={fields.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>

          {/* Submit — ใช้ variant="submit" ที่ redesign แล้ว */}
          {status === "done" ? (
            <div className={styles.successMsg} role="status">
              {f.success}
            </div>
          ) : (
            <Button
              variant="submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "..." : f.submit}
            </Button>
          )}
        </form>
      </div>
    </section>
  );
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
  );
}

export default HomePage;
