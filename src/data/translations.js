/**
 * translations.js
 *
 * เก็บเฉพาะ "เนื้อหา" ที่เปลี่ยนตามภาษา
 * หัวข้อ / Section labels / Nav → hardcode เป็น English ใน component
 */
export const translations = {
  th: {
    // ── Hero ──
    hero: {
      tagline: 'รอยแห่งตัวตนที่แท้จริง',
      cta:     'นัดหมายสัก',
      shop:    'ดูสินค้า',
      scroll:  'เลื่อนลง',
    },

    // ── Concept cards body ──
    concept: {
      body: 'รอยสักไม่ใช่เพียงแค่ลวดลายบนผิวหนัง แต่คือการบันทึกความทรงจำ ความเชื่อ และตัวตนที่แท้จริงของคุณ ที่ True Mark เราสร้างงานศิลป์ที่มีความหมาย',
      cards: [
        { desc: 'ตัว T สื่อถึงความจริงและความมั่นคง ทุกรอยสักที่เราสร้างสรรค์มาจากความจริงใจและความตั้งใจในการทำงาน' },
        { desc: 'ตัว M สื่อถึงรอยที่มีความหมาย ทุกลวดลายถูกออกแบบเพื่อสะท้อนตัวตนและเรื่องราวของผู้สวมใส่' },
        { desc: 'เมื่อรวมกัน คือ "รอยแห่งตัวตนที่แท้จริง" รอยสักที่บอกเล่าตัวคุณได้อย่างสมบูรณ์' },
      ],
    },

    // ── Services body ──
    services: {
      sub: 'ทุกสไตล์ ทุกขนาด ทุกความฝัน เราพร้อมถ่ายทอดออกมาเป็นงานศิลป์บนร่างกายคุณ',
    },

    // ── Gallery CTA ──
    gallery: {
      cta: 'นัดปรึกษาฟรี',
    },

    // ── Quote ──
    quote: {
      text:   '"รอยสักที่ดีไม่ได้เพียงแค่ตกแต่งร่างกาย แต่บอกเล่าเรื่องราวที่คำพูดไม่สามารถอธิบายได้"',
      author: '— True Mark Tattoo Studio',
    },

    // ── Contact ──
    contact: {
      body: 'พร้อมเปลี่ยนความฝันให้กลายเป็นรอยที่มีความหมาย ติดต่อเราเพื่อนัดหมายหรือปรึกษาฟรี',
      info: [
        { label: 'ที่อยู่',    value: 'อุดรธานี, ประเทศไทย'              },
        { label: 'Instagram', value: '@truemark.tattoo'               },
        { label: 'LINE',      value: '@truemarktattoo'                 },
        { label: 'เวลาทำการ', value: 'อังคาร – อาทิตย์  11:00 – 20:00' },
      ],
      form: {
        nameLabel:          'ชื่อ',
        namePlaceholder:    'ชื่อ – นามสกุล',
        contactLabel:       'ติดต่อ',
        contactPlaceholder: 'เบอร์โทรศัพท์ / LINE ID',
        styleLabel:         'สไตล์',
        styleDefault:       'เลือกสไตล์ที่สนใจ',
        styles:             ['Custom Design','Fine Line','Blackwork','Realism','Cover Up','ยังไม่แน่ใจ'],
        messageLabel:       'ข้อความ',
        messagePlaceholder: 'บอกเล่าไอเดียหรือความต้องการของคุณ...',
        submit:             'ส่งข้อความ',
        success:            'ขอบคุณสำหรับข้อความ เราจะติดต่อกลับโดยเร็ว',
        requiredName:       'กรุณากรอกชื่อ',
        requiredContact:    'กรุณากรอกข้อมูลติดต่อ',
      },
    },

    // ── Shop content ──
    shop: {
      sub:          'สินค้าและผลิตภัณฑ์ที่คัดเลือกมาเพื่อดูแลรอยสักของคุณ',
      features: [
        { desc: 'ทุกผลิตภัณฑ์ผ่านการทดสอบโดยช่างสักและผู้เชี่ยวชาญด้านผิวหนัง' },
        { desc: 'บริการจัดส่งทั่วประเทศ พร้อมคำแนะนำการใช้งานจาก True Mark' },
        { desc: 'ถ้าไม่พอใจยินดีคืนเงินภายใน 7 วัน ไม่มีเงื่อนไข' },
      ],
      ctaSub:   'ปรึกษาฟรี ไม่มีข้อผูกมัด ติดต่อได้เลย',
      ctaBook:  'นัดหมายสัก',
      ctaHome:  'กลับหน้าหลัก',
      askBtn:   'สอบถาม / สั่งซื้อ',
      soldOut:  'หมดสต็อก',
    },

    // ── Footer content ──
    footer: {
      tagline: 'รอยแห่งตัวตนที่แท้จริง',
      hours:   'อังคาร – อาทิตย์  11:00 – 20:00',
      freeCta: 'นัดปรึกษาฟรี →',
      rights:  'สงวนลิขสิทธิ์',
      designed:'ออกแบบด้วยความตั้งใจ',
    },
  },

  // ─────────────────────────────────────────
  en: {
    hero: {
      tagline: 'The Mark of Your True Self',
      cta:     'Book a Session',
      shop:    'Shop Now',
      scroll:  'Scroll',
    },

    concept: {
      body: 'A tattoo is more than ink on skin — it is a record of memory, belief, and your true identity. At True Mark, we create art that carries meaning, not just beauty.',
      cards: [
        { desc: 'T represents truth and stability. Every piece we create is driven by genuine intention and unwavering commitment to the craft.' },
        { desc: 'M represents a meaningful mark. Every design is crafted to reflect the identity and story of the person wearing it.' },
        { desc: 'Together, they form "The Mark of Your True Self" — a tattoo that expresses who you truly are.' },
      ],
    },

    services: {
      sub: 'Every style, every scale, every vision — we bring it to life on your skin.',
    },

    gallery: {
      cta: 'Free Consultation',
    },

    quote: {
      text:   '"A great tattoo does not merely decorate the body — it tells stories that words cannot."',
      author: '— True Mark Tattoo Studio',
    },

    contact: {
      body: 'Ready to turn your vision into a meaningful mark. Reach out to book a session or get a free consultation.',
      info: [
        { label: 'Location',  value: 'Udon Thani, Thailand'       },
        { label: 'Instagram', value: '@truemark.tattoo'           },
        { label: 'LINE',      value: '@truemarktattoo'            },
        { label: 'Hours',     value: 'Tue – Sun  11:00 – 20:00'  },
      ],
      form: {
        nameLabel:          'Name',
        namePlaceholder:    'Full Name',
        contactLabel:       'Contact',
        contactPlaceholder: 'Phone Number / LINE ID',
        styleLabel:         'Style',
        styleDefault:       'Select a style',
        styles:             ['Custom Design','Fine Line','Blackwork','Realism','Cover Up','Not sure yet'],
        messageLabel:       'Message',
        messagePlaceholder: 'Tell us your idea or what you have in mind...',
        submit:             'Send Message',
        success:            'Thank you! We will get back to you shortly.',
        requiredName:       'Please enter your name',
        requiredContact:    'Please enter your contact info',
      },
    },

    shop: {
      sub:      'Products curated to care for your tattoo and express your True Mark.',
      features: [
        { desc: 'Every product is tested by tattoo artists and skincare specialists.' },
        { desc: 'Nationwide delivery with usage guidance from True Mark.' },
        { desc: 'Not satisfied? Full refund within 7 days, no questions asked.' },
      ],
      ctaSub:  'Free consultation, no commitment. Contact us anytime.',
      ctaBook: 'Book a Session',
      ctaHome: 'Back to Home',
      askBtn:  'Inquire / Order',
      soldOut: 'Out of Stock',
    },

    footer: {
      tagline: 'The Mark of Your True Self',
      hours:   'Tue – Sun  11:00 – 20:00',
      freeCta: 'Free Consultation →',
      rights:  'All rights reserved',
      designed:'Designed with intention.',
    },
  },
}
