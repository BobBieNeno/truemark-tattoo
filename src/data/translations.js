/**
 * translations.js
 * เก็บข้อความทุก string ใน 2 ภาษา
 * วิธีเพิ่มข้อความใหม่: เพิ่ม key ใน th และ en พร้อมกัน
 */
export const translations = {
  th: {
    // ── Navbar ──
    nav: {
      home:     'หน้าหลัก',
      concept:  'แนวคิด',
      services: 'บริการ',
      shop:     'ร้านค้า',
      contact:  'ติดต่อ',
    },

    // ── Hero ──
    hero: {
      sub:     'สตูดิโอสัก',
      tagline: 'รอยแห่งตัวตนที่แท้จริง',
      cta:     'นัดหมายสัก',
      shop:    'ดูสินค้า',
      scroll:  'เลื่อนลง',
    },

    // ── Concept ──
    concept: {
      label: '— แนวคิด',
      heading: ['ปรัชญา', 'ที่อยู่เบื้องหลัง', 'ทุกรอยสัก'],
      body: 'รอยสักไม่ใช่เพียงแค่ลวดลายบนผิวหนัง แต่คือการบันทึกความทรงจำ ความเชื่อ และตัวตนที่แท้จริงของคุณ ที่ True Mark เราสร้างงานศิลป์ที่มีความหมาย',
      cards: [
        { letter: 'T',  title: 'ความจริง & ความมั่นคง', desc: 'ตัว T สื่อถึงความจริงและความมั่นคง ทุกรอยสักที่เราสร้างสรรค์มาจากความจริงใจและความตั้งใจในการทำงาน' },
        { letter: 'M',  title: 'รอย & ความหมาย',       desc: 'ตัว M สื่อถึงรอยที่มีความหมาย ทุกลวดลายถูกออกแบบเพื่อสะท้อนตัวตนและเรื่องราวของผู้สวมใส่' },
        { letter: 'TM', title: 'True Mark',              desc: 'เมื่อรวมกัน คือ "รอยแห่งตัวตนที่แท้จริง" รอยสักที่บอกเล่าตัวคุณได้อย่างสมบูรณ์' },
      ],
    },

    // ── Services ──
    services: {
      label:   '— บริการ',
      heading: 'บริการของเรา',
      sub:     'ทุกสไตล์ ทุกขนาด ทุกความฝัน เราพร้อมถ่ายทอดออกมาเป็นงานศิลป์บนร่างกายคุณ',
    },

    // ── Process ──
    process: {
      label:   '— ขั้นตอน',
      heading: 'ขั้นตอนการทำงาน',
    },

    // ── Gallery ──
    gallery: {
      label:   '— ผลงาน',
      heading: 'ผลงาน',
      cta:     'นัดปรึกษาฟรี',
      items:   ['ผลงานเด่น', 'Blackwork', 'Fine Line', 'Realism', 'Custom Design'],
    },

    // ── Quote ──
    quote: {
      text:   '"รอยสักที่ดีไม่ได้เพียงแค่ตกแต่งร่างกาย แต่บอกเล่าเรื่องราวที่คำพูดไม่สามารถอธิบายได้"',
      author: '— True Mark Tattoo Studio',
    },

    // ── Contact ──
    contact: {
      label:       '— ติดต่อ',
      heading:     ['เริ่มต้น', 'เรื่องราวของคุณ'],
      body:        'พร้อมเปลี่ยนความฝันให้กลายเป็นรอยที่มีความหมาย ติดต่อเราเพื่อนัดหมายหรือปรึกษาฟรี',
      info: [
        { label: 'ที่อยู่',    value: 'อุดรธานี, ประเทศไทย' },
        { label: 'Instagram', value: '@truemark.tattoo'     },
        { label: 'LINE',      value: '@truemarktattoo'      },
        { label: 'เวลาทำการ', value: 'อังคาร – อาทิตย์  11:00 – 20:00' },
      ],
      form: {
        namePlaceholder:    'ชื่อ – นามสกุล',
        contactPlaceholder: 'เบอร์โทรศัพท์ / LINE ID',
        styleLabel:         'สไตล์ที่สนใจ',
        styleDefault:       'เลือกสไตล์',
        styles:             ['Custom Design', 'Fine Line', 'Blackwork', 'Realism', 'Cover Up', 'ยังไม่แน่ใจ'],
        messagePlaceholder: 'บอกเล่าไอเดียหรือความต้องการของคุณ...',
        submit:             'ส่งข้อความ',
        success:            'ขอบคุณสำหรับข้อความ เราจะติดต่อกลับโดยเร็ว',
        nameLabel:          'ชื่อ',
        contactLabel:       'ติดต่อ',
        messageLabel:       'ข้อความ',
      },
    },

    // ── Shop ──
    shop: {
      badge:       'ร้านค้า',
      title:       ['True Mark', 'Collection'],
      sub:         'สินค้าและผลิตภัณฑ์ที่คัดเลือกมาเพื่อดูแลรอยสักของคุณ',
      breadcrumb:  'ร้านค้า',
      introHeading: ['ดูแลรอยสักของคุณ', 'ให้คงความสวยงามยาวนาน'],
      features: [
        { title: 'คัดสรรมาเพื่อคุณ',   desc: 'ทุกผลิตภัณฑ์ผ่านการทดสอบโดยช่างสักและผู้เชี่ยวชาญด้านผิวหนัง' },
        { title: 'ส่งตรงถึงมือ',        desc: 'บริการจัดส่งทั่วประเทศ พร้อมคำแนะนำการใช้งานจาก True Mark' },
        { title: 'รับประกันคุณภาพ',     desc: 'ถ้าไม่พอใจยินดีคืนเงินภายใน 7 วัน ไม่มีเงื่อนไข' },
      ],
      productsLabel:   '— สินค้าทั้งหมด',
      productsHeading: 'สินค้าทั้งหมด',
      ctaHeading:      ['พร้อมที่จะสร้าง', 'รอยของคุณหรือยัง?'],
      ctaSub:          'ปรึกษาฟรี ไม่มีข้อผูกมัด ติดต่อได้เลย',
      ctaBook:         'นัดหมายสัก',
      ctaHome:         'กลับหน้าหลัก',
      askBtn:          'สอบถาม / สั่งซื้อ',
      soldOut:         'หมดสต็อก',
    },

    // ── Footer ──
    footer: {
      tagline:    'รอยแห่งตัวตนที่แท้จริง',
      hours:      'อังคาร – อาทิตย์  11:00 – 20:00',
      navTitle:   'เมนู',
      socialTitle:'โซเชียล',
      contactTitle:'ติดต่อ',
      freeCta:    'นัดปรึกษาฟรี →',
      rights:     'สงวนลิขสิทธิ์',
      designed:   'ออกแบบด้วยความตั้งใจ',
      nav: ['หน้าหลัก','แนวคิด','บริการ','แกลเลอรี่','ร้านค้า','ติดต่อ'],
    },
  },

  // ─────────────────────────────────────────────────────
  en: {
    nav: {
      home:     'Home',
      concept:  'Concept',
      services: 'Services',
      shop:     'Shop',
      contact:  'Contact',
    },

    hero: {
      sub:     'Tattoo Studio',
      tagline: 'The Mark of Your True Self',
      cta:     'Book a Session',
      shop:    'Shop Now',
      scroll:  'Scroll',
    },

    concept: {
      label: '— Concept',
      heading: ['The Philosophy', 'Behind', 'Every Tattoo'],
      body: 'A tattoo is more than ink on skin — it is a record of memory, belief, and your true identity. At True Mark, we create art that carries meaning, not just beauty.',
      cards: [
        { letter: 'T',  title: 'Truth & Stability',  desc: 'T represents truth and stability. Every piece we create is driven by genuine intention and unwavering commitment to the craft.' },
        { letter: 'M',  title: 'Mark & Meaning',     desc: 'M represents a meaningful mark. Every design is crafted to reflect the identity and story of the person wearing it.' },
        { letter: 'TM', title: 'True Mark',           desc: 'Together, they form "The Mark of Your True Self" — a tattoo that expresses who you truly are.' },
      ],
    },

    services: {
      label:   '— Services',
      heading: 'Our Services',
      sub:     'Every style, every scale, every vision — we bring it to life on your skin.',
    },

    process: {
      label:   '— Process',
      heading: 'How We Work',
    },

    gallery: {
      label:   '— Gallery',
      heading: 'Portfolio',
      cta:     'Free Consultation',
      items:   ['Featured Work', 'Blackwork', 'Fine Line', 'Realism', 'Custom Design'],
    },

    quote: {
      text:   '"A great tattoo does not merely decorate the body — it tells stories that words cannot."',
      author: '— True Mark Tattoo Studio',
    },

    contact: {
      label:       '— Contact',
      heading:     ['Begin', 'Your Story'],
      body:        'Ready to turn your vision into a meaningful mark. Reach out to book a session or get a free consultation.',
      info: [
        { label: 'Location',  value: 'Udon Thani, Thailand'         },
        { label: 'Instagram', value: '@truemark.tattoo'             },
        { label: 'LINE',      value: '@truemarktattoo'              },
        { label: 'Hours',     value: 'Tue – Sun  11:00 – 20:00'    },
      ],
      form: {
        namePlaceholder:    'Full Name',
        contactPlaceholder: 'Phone Number / LINE ID',
        styleLabel:         'Style of Interest',
        styleDefault:       'Select a style',
        styles:             ['Custom Design', 'Fine Line', 'Blackwork', 'Realism', 'Cover Up', 'Not sure yet'],
        messagePlaceholder: 'Tell us your idea or what you have in mind...',
        submit:             'Send Message',
        success:            'Thank you! We will get back to you shortly.',
        nameLabel:          'Name',
        contactLabel:       'Contact',
        messageLabel:       'Message',
      },
    },

    shop: {
      badge:       'Shop',
      title:       ['True Mark', 'Collection'],
      sub:         'Products curated to care for your tattoo and express your True Mark.',
      breadcrumb:  'Shop',
      introHeading: ['Keep Your Tattoo', 'Looking Its Best'],
      features: [
        { title: 'Curated for You',     desc: 'Every product is tested by tattoo artists and skincare specialists.' },
        { title: 'Delivered to You',    desc: 'Nationwide delivery with usage guidance from True Mark.' },
        { title: 'Quality Guaranteed',  desc: 'Not satisfied? Full refund within 7 days, no questions asked.' },
      ],
      productsLabel:   '— All Products',
      productsHeading: 'All Products',
      ctaHeading:      ['Ready to Create', 'Your Mark?'],
      ctaSub:          'Free consultation, no commitment. Contact us anytime.',
      ctaBook:         'Book a Session',
      ctaHome:         'Back to Home',
      askBtn:          'Inquire / Order',
      soldOut:         'Out of Stock',
    },

    footer: {
      tagline:     'The Mark of Your True Self',
      hours:       'Tue – Sun  11:00 – 20:00',
      navTitle:    'Navigation',
      socialTitle: 'Connect',
      contactTitle:'Contact',
      freeCta:     'Free Consultation →',
      rights:      'All rights reserved',
      designed:    'Designed with intention.',
      nav: ['Home','Concept','Services','Gallery','Shop','Contact'],
    },
  },
}
