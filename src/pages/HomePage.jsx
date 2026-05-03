import { useRef } from "react";
import { Link } from "react-router-dom";
import TMLogo from "../components/ui/TMLogo";
import SectionLabel from "../components/ui/SectionLabel";
import RevealWrapper from "../components/ui/RevealWrapper";
import Button from "../components/ui/Button";
import useReveal from "../hooks/useReveal";
import useParallax from "../hooks/useParallax";
import { services, processSteps } from "../data/services";
import styles from "./HomePage.module.css";

/* Hero */
function HeroSection() {
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
        <TMLogo size={170} />
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

      <p className={styles.heroTagline}>รอยแห่งตัวตนที่แท้จริง</p>

      <div className={styles.heroCtas}>
        <Button variant="ghost" to="/" sectionId="contact">
          นัดหมายสัก
        </Button>
        <Button variant="ghost" to="/shop">
          ดูสินค้า
        </Button>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        {/* <span className={styles.scrollLabel}>Scroll</span> */}
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}

/* Concept */
function ConceptSection() {
  const sectionRef = useReveal();
  const cards = [
    {
      letter: "T",
      title: "Truth & Stability",
      desc: "ตัว T สื่อถึงความจริงและความมั่นคง ทุกรอยสักที่เราสร้างสรรค์มาจากความจริงใจและความตั้งใจในการทำงาน",
    },
    {
      letter: "M",
      title: "Mark & Meaning",
      desc: "ตัว M สื่อถึงรอยที่มีความหมาย ทุกลวดลายถูกออกแบบเพื่อสะท้อนตัวตนและเรื่องราวของผู้สวมใส่",
    },
    {
      letter: "TM",
      title: "True Mark",
      desc: 'เมื่อรวมกัน คือ "รอยแห่งตัวตนที่แท้จริง" รอยสักที่บอกเล่าตัวคุณได้อย่างสมบูรณ์',
    },
  ];
  return (
    <section id="concept" className={styles.section} ref={sectionRef}>
      <div className={styles.conceptGrid}>
        <div className={styles.conceptLeft}>
          <div className={styles.conceptBgText} aria-hidden="true">
            TM
          </div>
          <div className="reveal">
            <SectionLabel>— Concept</SectionLabel>
            <h2 className={styles.sectionHeading}>
              ปรัชญา
              <br />
              ที่อยู่เบื้องหลัง
              <br />
              ทุกรอยสัก
            </h2>
            <p className={styles.bodyText}>
              รอยสักไม่ใช่เพียงแค่ลวดลายบนผิวหนัง แต่คือการบันทึกความทรงจำ
              ความเชื่อ และตัวตนที่แท้จริงของคุณ ที่ True Mark
              เราสร้างงานศิลป์ที่มีความหมาย
            </p>
          </div>
        </div>
        <div className={styles.conceptCards}>
          {cards.map((card, i) => (
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

/* Services */
function ServicesSection() {
  const sectionRef = useReveal();
  return (
    <section id="services" className={styles.section} ref={sectionRef}>
      <div className={styles.servicesHeader}>
        <div className="reveal">
          <SectionLabel>— Services</SectionLabel>
          <h2 className={styles.sectionHeading}>บริการของเรา</h2>
        </div>
        <p className={`${styles.bodyText} ${styles.servicesSubtext} reveal`}>
          ทุกสไตล์ ทุกขนาด ทุกความฝัน
          เราพร้อมถ่ายทอดออกมาเป็นงานศิลป์บนร่างกายคุณ
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

/* Process */
function ProcessSection() {
  const sectionRef = useReveal();
  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="reveal">
        <SectionLabel>— Process</SectionLabel>
        <h2 className={styles.sectionHeading} style={{ marginBottom: "4rem" }}>
          ขั้นตอนการทำงาน
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

/* Gallery */
function GallerySection() {
  const sectionRef = useReveal();
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.12);
  const galleryItems = [
    { label: "Featured Work", span: true },
    { label: "Blackwork" },
    { label: "Fine Line" },
    { label: "Realism" },
    { label: "Custom Design" },
  ];
  return (
    <section id="gallery" className={styles.section} ref={sectionRef}>
      <div className={styles.galleryHeader}>
        <div className="reveal">
          <SectionLabel>— Gallery</SectionLabel>
          <h2 className={styles.sectionHeading}>ผลงาน</h2>
        </div>
        <Button variant="outline" to="/" sectionId="contact">
          นัดปรึกษาฟรี
        </Button>
      </div>
      <div className={`${styles.galleryGrid} reveal`}>
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className={[
              styles.galleryItem,
              item.span ? styles.gallerySpan : "",
            ].join(" ")}
          >
            {item.span && (
              <div
                ref={parallaxRef}
                style={parallaxStyle}
                className={styles.galleryWatermark}
              >
                <TMLogo size={100} />
              </div>
            )}
            <span className={styles.galleryLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Quote */
function QuoteSection() {
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
        <blockquote className={styles.quoteText}>
          "รอยสักที่ดีไม่ได้เพียงแค่ตกแต่งร่างกาย
          แต่บอกเล่าเรื่องราวที่คำพูดไม่สามารถอธิบายได้"
        </blockquote>
        <p className={styles.quoteAuthor}>— True Mark Tattoo Studio</p>
      </RevealWrapper>
    </section>
  );
}

/* Contact */
function ContactSection() {
  const sectionRef = useReveal();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("ขอบคุณสำหรับข้อความ เราจะติดต่อกลับโดยเร็ว");
  };
  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.contactGrid}>
        <div className="reveal">
          <SectionLabel>— Contact</SectionLabel>
          <h2
            className={styles.sectionHeading}
            style={{ marginBottom: "1.5rem" }}
          >
            เริ่มต้น
            <br />
            เรื่องราวของคุณ
          </h2>
          <p className={styles.bodyText} style={{ marginBottom: "3rem" }}>
            พร้อมเปลี่ยนความฝันให้กลายเป็นรอยที่มีความหมาย
            ติดต่อเราเพื่อนัดหมายหรือปรึกษาฟรี
          </p>
          <dl className={styles.contactInfo}>
            {[
              { label: "Location", value: "Udon Thani, Thailand" },
              { label: "Instagram", value: "@truemark.tattoo" },
              { label: "LINE", value: "@truemarktattoo" },
              { label: "Hours", value: "อังคาร – อาทิตย์  11:00 – 20:00" },
            ].map(({ label, value }) => (
              <div key={label} className={styles.contactItem}>
                <dt className={styles.contactLabel}>{label}</dt>
                <dd className={styles.contactValue}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          className={`${styles.contactForm} reveal`}
          onSubmit={handleSubmit}
          noValidate
        >
          {[
            {
              id: "name",
              label: "ชื่อ",
              type: "text",
              placeholder: "ชื่อ – นามสกุล",
            },
            {
              id: "contact",
              label: "ติดต่อ",
              type: "text",
              placeholder: "เบอร์โทรศัพท์ / LINE ID",
            },
          ].map((f) => (
            <div key={f.id} className={styles.formGroup}>
              <label htmlFor={f.id} className={styles.formLabel}>
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                placeholder={f.placeholder}
                className={styles.formInput}
                required
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label htmlFor="style" className={styles.formLabel}>
              สไตล์
            </label>
            <select id="style" className={styles.formInput} defaultValue="">
              <option value="" disabled>
                สไตล์ที่สนใจ
              </option>
              {[
                "Custom Design",
                "Fine Line",
                "Blackwork",
                "Realism",
                "Cover Up",
                "ยังไม่แน่ใจ",
              ].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              ข้อความ
            </label>
            <textarea
              id="message"
              placeholder="บอกเล่าไอเดียหรือความต้องการของคุณ..."
              className={styles.formInput}
              rows={4}
            />
          </div>

          <Button variant="arrow" onClick={handleSubmit}>
            ส่งข้อความ
          </Button>
        </form>
      </div>
    </section>
  );
}

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
