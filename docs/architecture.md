# True Mark Commerce and Tattoo Estimate Architecture

## 1. Product Goals

ระบบแบ่งเป็น 3 ส่วนหลัก:

1. ร้านค้าออนไลน์สำหรับขายสินค้า aftercare, merchandise และ voucher
2. ระบบ AI ช่วยประเมินช่วงราคารอยสักจากรูปอ้างอิงและข้อมูลลูกค้า
3. ระบบหลังบ้านสำหรับจัดการสินค้า ออเดอร์ กฎราคา และตรวจสอบใบประเมิน

หลักสำคัญของระบบประเมินราคา:

- AI วิเคราะห์ภาพและแปลงข้อมูลที่ลูกค้าให้มาเป็นข้อมูลแบบมีโครงสร้าง
- Pricing engine ที่ร้านกำหนดเป็นผู้คำนวณราคา
- ผลลัพธ์เป็นช่วงราคาเบื้องต้น ไม่ใช่ราคายืนยัน
- ช่างหรือแอดมินยืนยันราคาสุดท้ายก่อนรับนัด

## 2. MVP Scope

### Customer

- ดูรายการสินค้าและรายละเอียดสินค้า
- เพิ่มสินค้าลงตะกร้าและสั่งซื้อ
- ตรวจสอบสถานะคำสั่งซื้อ
- อัปโหลดรูปอ้างอิงรอยสัก
- ระบุขนาด ตำแหน่ง สี สไตล์ และรายละเอียดเพิ่มเติม
- รับช่วงราคา ระยะเวลาที่คาดการณ์ และเหตุผลประกอบ
- ส่งใบประเมินให้ช่างตรวจสอบและขอนัดหมาย

### Admin

- จัดการสินค้า ราคา สต็อก และรูปสินค้า
- ดูและอัปเดตสถานะคำสั่งซื้อ
- ตั้งค่ากฎคำนวณราคารอยสัก
- ตรวจสอบผลวิเคราะห์จาก AI
- แก้ไขและยืนยันราคาประเมิน
- ดูประวัติการแก้ราคาเพื่อปรับปรุงกฎ

### Not In MVP

- Marketplace สำหรับช่างหลายร้าน
- ระบบสะสมแต้ม
- ระบบจัดตารางช่างแบบเต็มรูปแบบ
- AI สร้างลายสัก
- คำนวณราคาสุดท้ายโดย AI แบบไม่มีคนตรวจสอบ

## 3. Recommended Architecture

เริ่มต้นด้วย modular monolith เพื่อให้พัฒนาและ deploy ง่าย แต่แบ่งขอบเขต module
ชัดเจนเพื่อแยก service ภายหลังได้

```text
Browser
  |
  v
React + Vite Web App
  |
  v
Node.js API
  |-- Auth Module
  |-- Catalog Module
  |-- Cart and Order Module
  |-- Payment Module
  |-- Tattoo Estimate Module
  |-- Admin Module
  |
  |-- PostgreSQL
  |-- Object Storage
  |-- AI Provider API
  |-- Payment Provider
  `-- Email / LINE Notification
```

### Technology Choices

| Area | Recommendation | Reason |
|---|---|---|
| Frontend | React + Vite ที่มีอยู่ | ลดงานย้ายระบบและใช้ UI เดิมต่อได้ |
| Backend | Node.js + Fastify หรือ Express | เข้ากับ JavaScript project ปัจจุบัน |
| Validation | Zod | ใช้ schema เดียวตรวจ request และ AI output |
| Database | PostgreSQL | เหมาะกับสินค้า ออเดอร์ และข้อมูลราคา |
| ORM | Prisma | schema และ migration อ่านง่าย |
| Image storage | S3-compatible object storage | ไม่เก็บไฟล์รูปขนาดใหญ่ใน database |
| Authentication | Session หรือ JWT ใน httpOnly cookie | ลดความเสี่ยง token ใน browser storage |
| Payments | Payment provider ที่รองรับตลาดเป้าหมาย | สร้าง payment session จาก backend เท่านั้น |
| AI | Vision-capable model ผ่าน backend | ไม่เปิดเผย API key และบังคับ structured output |

## 4. Repository Structure

โครงสร้างปัจจุบันและเป้าหมายที่ต่อยอดจาก repository:

```text
truemark-tattoo/
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- data/
|   |   |-- hooks/
|   |   |-- i18n/
|   |   |-- pages/
|   |   `-- styles/
|   |-- package.json
|   `-- vite.config.js
|-- backend/
|   |-- app/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- database/
|   |   |-- helpers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   `-- utils/
|   |-- public/
|   |-- samples/
|   |-- test/
|   |-- package.json
|   `-- server.js
|-- docs/
|-- context.md
`-- package.json
```

frontend และ backend แยก package แล้ว โดย root package ใช้เป็นตัวเรียกคำสั่งของทั้งสองส่วน

## 5. Core User Flows

### Shop Checkout

```text
Catalog -> Product detail -> Cart -> Customer details
-> Backend creates order from current database prices
-> Payment provider -> Payment webhook
-> Backend marks order as paid -> Admin fulfills order
```

ห้ามเชื่อราคา ยอดรวม หรือส่วนลดที่ส่งมาจาก frontend ต้องคำนวณใหม่ที่ backend เสมอ

### Tattoo Estimate

```text
Customer fills estimate form
-> Backend validates fields and image
-> Image is stored with a private URL
-> AI analyzes image into structured attributes
-> Pricing engine calculates deterministic price range
-> Result and assumptions are shown to customer
-> Customer requests artist review
-> Admin adjusts or approves estimate
-> Customer receives final consultation response
```

## 6. Tattoo Estimate Inputs

ข้อมูลที่ควรให้ลูกค้ากรอก:

| Field | Type | Required |
|---|---|---|
| Reference images | image[] | Yes |
| Width and height in centimeters | number | Yes |
| Body placement | enum | Yes |
| Style | enum or unsure | Yes |
| Color mode | black, limited-color, full-color | Yes |
| Cover-up | boolean | Yes |
| Detail notes | text | No |
| Preferred date | date | No |

ข้อมูลที่ AI วิเคราะห์:

```json
{
  "detectedStyle": "realism",
  "complexity": 4,
  "colorMode": "full-color",
  "estimatedCoveragePercent": 70,
  "fineDetailLevel": 5,
  "confidence": 0.82,
  "warnings": [
    "Reference image does not show the full design"
  ]
}
```

ใช้ schema validation ตรวจ output ทุกครั้ง หาก AI output ไม่ผ่าน schema ต้องหยุดคำนวณ
หรือใช้ค่าที่ปลอดภัยและส่งให้แอดมินตรวจสอบ

## 7. Pricing Engine

AI ไม่ควรส่งตัวเลขราคาสุดท้ายโดยตรง ให้ pricing engine คำนวณจากกฎที่ร้านแก้ไขได้

ตัวอย่างสูตรเริ่มต้น:

```text
basePrice
+ areaPrice(width * height)
+ styleMultiplier
+ complexitySurcharge
+ placementSurcharge
+ colorSurcharge
+ coverUpSurcharge
= estimatedMidpoint

minimum = estimatedMidpoint * 0.85
maximum = estimatedMidpoint * 1.20
```

ตัวอย่าง config:

```json
{
  "minimumShopPrice": 1500,
  "pricePerSquareCm": 45,
  "styleMultipliers": {
    "fine-line": 1.0,
    "blackwork": 1.1,
    "realism": 1.5
  },
  "placementMultipliers": {
    "arm": 1.0,
    "rib": 1.25,
    "hand": 1.35
  },
  "colorMultiplier": 1.2,
  "coverUpMultiplier": 1.4
}
```

ทุกผลประเมินต้องเก็บ `pricingRuleVersion` เพื่อทราบว่าใช้กฎชุดใด และควรเก็บราคา
ที่แอดมินยืนยันเพื่อวัดความแม่นยำของระบบในภายหลัง

## 8. Database Model

### Commerce

```text
users
- id
- email
- phone
- role
- created_at

products
- id
- slug
- sku
- name_th
- name_en
- description_th
- description_en
- price
- stock_quantity
- status
- created_at
- updated_at

product_images
- id
- product_id
- storage_key
- sort_order

carts
- id
- user_id or guest_token
- expires_at

cart_items
- cart_id
- product_id
- quantity

orders
- id
- user_id nullable
- order_number
- status
- payment_status
- subtotal
- shipping_fee
- total
- customer_snapshot_json
- created_at

order_items
- order_id
- product_id nullable
- sku_snapshot
- name_snapshot
- unit_price
- quantity
```

### Tattoo Estimate

```text
tattoo_estimates
- id
- user_id nullable
- status
- width_cm
- height_cm
- placement
- requested_style
- requested_color_mode
- is_cover_up
- customer_notes
- ai_analysis_json
- ai_confidence
- pricing_rule_version
- estimated_min
- estimated_max
- final_price_min nullable
- final_price_max nullable
- admin_notes nullable
- created_at
- reviewed_at nullable

estimate_images
- id
- estimate_id
- storage_key
- mime_type
- created_at

pricing_rules
- id
- version
- config_json
- is_active
- created_by
- created_at

estimate_audit_logs
- id
- estimate_id
- actor_id nullable
- action
- before_json
- after_json
- created_at
```

## 9. API Design

### Public and Customer APIs

```text
GET    /api/products
GET    /api/products/:slug
POST   /api/cart/items
PATCH  /api/cart/items/:id
DELETE /api/cart/items/:id
POST   /api/orders
GET    /api/orders/:orderNumber
POST   /api/payments/session
POST   /api/estimates
GET    /api/estimates/:id
POST   /api/estimates/:id/request-review
```

### Webhooks

```text
POST /api/webhooks/payment
```

ต้องตรวจ signature ของ webhook และทำให้ handler รองรับ event ซ้ำโดยไม่สร้างผลลัพธ์ซ้ำ

### Admin APIs

```text
GET    /api/admin/orders
PATCH  /api/admin/orders/:id/status
POST   /api/admin/products
PATCH  /api/admin/products/:id
GET    /api/admin/estimates
PATCH  /api/admin/estimates/:id/review
GET    /api/admin/pricing-rules
POST   /api/admin/pricing-rules
```

## 10. Frontend Pages

```text
/
/shop
/shop/:slug
/cart
/checkout
/order/:orderNumber
/estimate
/estimate/:id
/admin
/admin/products
/admin/orders
/admin/estimates
/admin/pricing
```

หน้า `/estimate` ควรเป็น wizard:

1. อัปโหลดรูปอ้างอิง
2. ระบุขนาดและตำแหน่ง
3. ระบุสไตล์ สี cover-up และรายละเอียด
4. ตรวจสอบข้อมูลและยอมรับเงื่อนไข
5. แสดงช่วงราคา สมมติฐาน และปุ่มขอให้ช่างตรวจสอบ

## 11. Security and Privacy

- เรียก AI และ payment provider จาก backend เท่านั้น
- จำกัดชนิดไฟล์ ขนาดไฟล์ และจำนวนรูป
- เก็บรูปประเมินแบบ private และใช้ signed URL อายุสั้น
- แจ้งลูกค้าว่ารูปจะถูกใช้เพื่อประเมินราคาและกำหนดระยะเวลาลบข้อมูล
- ไม่ใช้รูปของลูกค้าเพื่อ train model โดยไม่ได้รับความยินยอม
- Rate limit endpoint ประเมินราคาและ checkout
- ตรวจ authorization ทุก admin endpoint
- บันทึก audit log เมื่อแอดมินแก้ราคา
- ไม่เก็บข้อมูลบัตรชำระเงินในระบบ
- แสดงชัดเจนว่าราคา AI เป็นราคาเบื้องต้นและอาจเปลี่ยนหลังปรึกษาช่าง

## 12. Observability

ควรเก็บ metric ต่อไปนี้:

- Conversion จากเปิดหน้าสินค้าไปชำระเงิน
- จำนวน payment webhook ที่ล้มเหลว
- จำนวนใบประเมินที่ AI วิเคราะห์ไม่สำเร็จ
- เวลาเฉลี่ยในการสร้างใบประเมิน
- ส่วนต่างระหว่างราคาประเมินกับราคาที่ช่างยืนยัน
- สัดส่วนใบประเมินที่เปลี่ยนเป็นการนัดหมาย

ห้ามเก็บรูปหรือข้อความลูกค้าใน application log โดยตรง

## 13. Delivery Roadmap

### Phase 1: Commerce Foundation

- สร้าง backend, database และ migrations
- ย้ายสินค้าออกจาก `frontend/src/data/products.js` ไป database
- ทำ catalog, cart, checkout และ order
- ทำ payment webhook และ admin order list

### Phase 2: Estimate Without AI

- ทำ estimate wizard และอัปโหลดรูป
- สร้าง pricing engine จากข้อมูลที่ลูกค้ากรอก
- ทำหน้า admin ตรวจสอบและยืนยันราคา
- เก็บ audit log และ pricing rule version

### Phase 3: AI-Assisted Estimate

- เพิ่ม AI image analysis แบบ structured output
- แสดง confidence, assumptions และ warnings
- เพิ่ม fallback เมื่อ AI วิเคราะห์ไม่สำเร็จ
- เปรียบเทียบราคาประเมินกับราคาที่แอดมินยืนยัน

### Phase 4: Optimization

- ปรับ pricing rules จากข้อมูลจริง
- เพิ่ม notification และ appointment flow
- เพิ่ม dashboard conversion และ estimate accuracy
- เพิ่ม automated tests และ load tests ใน endpoint สำคัญ

## 14. First Implementation Slice

งานชุดแรกที่ให้คุณค่าเร็วและลดความเสี่ยง:

1. เพิ่ม backend และ PostgreSQL
2. สร้าง `products`, `orders`, `order_items`, `tattoo_estimates`,
   `estimate_images` และ `pricing_rules`
3. ย้ายหน้า Shop ให้โหลดสินค้าจาก `GET /api/products`
4. สร้างหน้า `/estimate` โดยยังไม่เรียก AI
5. สร้าง pricing engine และแสดงช่วงราคา
6. เพิ่มหน้า admin สำหรับตรวจใบประเมิน
7. หลังมีข้อมูลจริงแล้วจึงเพิ่ม AI analysis

ลำดับนี้ทำให้ร้านเริ่มขายสินค้าและทดสอบสูตรราคาได้ก่อนลงทุนใน AI และช่วยให้มีข้อมูล
สำหรับวัดว่า AI ทำให้ระบบดีขึ้นจริงหรือไม่
