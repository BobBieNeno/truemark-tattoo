# True Mark Tattoo — Website

## 🚀 วิธีรัน

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. รัน development server
npm run dev

# 3. เปิดเบราว์เซอร์ที่ http://localhost:5173
```

## 📁 โครงสร้างไฟล์

```
src/
├── components/
│   ├── ui/          ← Reusable UI components
│   ├── layout/      ← Navbar, Footer
│   └── shop/        ← ProductCard, ProductGrid
├── pages/
│   ├── HomePage.jsx ← หน้าหลัก
│   └── ShopPage.jsx ← หน้าร้านค้า
├── data/
│   ├── services.js  ← ✏️ แก้บริการที่นี่
│   └── products.js  ← ✏️ เพิ่มสินค้าที่นี่
├── hooks/
│   ├── useReveal.js    ← Scroll animation
│   └── useParallax.js  ← Parallax effect
└── styles/
    ├── tokens.js    ← Design system values
    └── global.css   ← Global CSS variables
```

## ✏️ วิธีเพิ่มสินค้า

เปิดไฟล์ `src/data/products.js` แล้ว copy object ด้านล่าง:

```js
{
  id: 7,                        // ← ต้องไม่ซ้ำกับตัวอื่น
  category: 'aftercare',        // aftercare | merch | voucher
  name: 'Product Name',
  nameTh: 'ชื่อสินค้าภาษาไทย',
  description: 'รายละเอียดสินค้า',
  price: 390,
  unit: 'บาท / ชิ้น',
  badge: 'New',                 // หรือ null ถ้าไม่มี badge
  icon: '◈',
  available: true,
}
```

## 🎨 วิธีเปลี่ยนสี / Font

แก้ที่ `src/styles/global.css` ในส่วน `:root { ... }`
