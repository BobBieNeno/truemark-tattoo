/**
 * Products Data — True Mark Tattoo Shop
 * 
 * เพิ่มสินค้าใหม่ได้ที่นี่เพียงที่เดียว
 * Component จะ render ตาม array นี้โดยอัตโนมัติ
 * 
 * categories: 'aftercare' | 'merch' | 'voucher'
 * badge: ป้ายพิเศษ (optional) เช่น 'Best Seller', 'New', 'Limited'
 */
export const products = [
  // --- Aftercare Products ---
  {
    id: 1,
    category: 'aftercare',
    name: 'True Mark Aftercare Balm',
    nameTh: 'บาล์มดูแลรอยสัก',
    description: 'สูตรเฉพาะจากธรรมชาติ ช่วยให้ผิวชุ่มชื้น รอยสักคมชัดยาวนาน',
    price: 290,
    unit: 'บาท / 30ml',
    badge: 'Best Seller',
    icon: '◈',
    available: true,
  },
  {
    id: 2,
    category: 'aftercare',
    name: 'Healing Foam Cleanser',
    nameTh: 'โฟมล้างทำความสะอาดรอยสัก',
    description: 'อ่อนโยนต่อผิวใหม่ ลดการอักเสบ pH สมดุล เหมาะสำหรับ 1–2 สัปดาห์แรก',
    price: 220,
    unit: 'บาท / 100ml',
    badge: null,
    icon: '◇',
    available: true,
  },
  {
    id: 3,
    category: 'aftercare',
    name: 'SPF 50+ Tattoo Sunscreen',
    nameTh: 'ครีมกันแดดสำหรับรอยสัก',
    description: 'ปกป้องรอยสักจาก UV ป้องกันสีซีด ใช้ได้ทุกวันเมื่อผิวหายดี',
    price: 350,
    unit: 'บาท / 50ml',
    badge: 'New',
    icon: '◆',
    available: true,
  },

  // --- Merch ---
  {
    id: 4,
    category: 'merch',
    name: 'TM Logo Tee',
    nameTh: 'เสื้อยืด True Mark',
    description: 'Cotton 100% Premium ตัดเย็บ oversized สกรีน TM Monogram โทนซิลเวอร์',
    price: 690,
    unit: 'บาท / ตัว',
    badge: 'Limited',
    icon: '◉',
    available: true,
  },
  {
    id: 5,
    category: 'merch',
    name: 'Aftercare Kit Set',
    nameTh: 'เซ็ตดูแลรอยสักครบชุด',
    description: 'รวม Balm + Foam + Sunscreen ในกล่องของขวัญ True Mark ประหยัดกว่าซื้อแยก',
    price: 790,
    unit: 'บาท / เซ็ต',
    badge: 'Best Value',
    icon: '◈',
    available: true,
  },

  // --- Voucher ---
  {
    id: 6,
    category: 'voucher',
    name: 'Gift Voucher',
    nameTh: 'บัตรของขวัญ',
    description: 'มอบประสบการณ์สักให้คนพิเศษ เลือกมูลค่าได้ตั้งแต่ 500 – 5,000 บาท',
    price: 500,
    unit: 'บาท ขึ้นไป',
    badge: 'Gift',
    icon: '◎',
    available: true,
  },
]

// Filter helper functions — ใช้ใน component เพื่อกรองตาม category
export const getProductsByCategory = (category) => {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export const categories = [
  { id: 'all',       label: 'ทั้งหมด' },
  { id: 'aftercare', label: 'Aftercare' },
  { id: 'merch',     label: 'Merchandise' },
  { id: 'voucher',   label: 'Gift Voucher' },
]
