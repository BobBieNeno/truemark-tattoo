/**
 * products.js — Static product data
 * descriptions ย้ายไปอยู่ใน i18n/th.json และ i18n/en.json
 * key: shop.products[index].desc
 */
export const products = [
  { id:1, category:'aftercare', name:'True Mark Aftercare Balm',  nameTh:'บาล์มดูแลรอยสัก',       price:290, unit:'บาท / 30ml',  badge:'Best Seller', icon:'◈', available:true },
  { id:2, category:'aftercare', name:'Healing Foam Cleanser',     nameTh:'โฟมล้างรอยสัก',          price:220, unit:'บาท / 100ml', badge:null,          icon:'◇', available:true },
  { id:3, category:'aftercare', name:'SPF 50+ Tattoo Sunscreen',  nameTh:'ครีมกันแดดสำหรับรอยสัก', price:350, unit:'บาท / 50ml',  badge:'New',         icon:'◆', available:true },
  { id:4, category:'merch',     name:'TM Logo Tee',               nameTh:'เสื้อยืด True Mark',     price:690, unit:'บาท / ตัว',   badge:'Limited',     icon:'◉', available:true },
  { id:5, category:'merch',     name:'Aftercare Kit Set',         nameTh:'เซ็ตดูแลรอยสักครบชุด',   price:790, unit:'บาท / เซ็ต',  badge:'Best Value',  icon:'◈', available:true },
  { id:6, category:'voucher',   name:'Gift Voucher',              nameTh:'บัตรของขวัญ',             price:500, unit:'บาท ขึ้นไป',  badge:'Gift',        icon:'◎', available:true },
]

export const getProductsByCategory = (category) => {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}
