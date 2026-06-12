# True Mark Tattoo Project Context

## Project Summary

True Mark Tattoo เป็นระบบเว็บสองส่วนที่แยกจากกันอย่างชัดเจน:

- `frontend/`: React + Vite สำหรับหน้าเว็บไซต์ ร้านค้า และหน้าประเมินราคารอยสัก
- `backend/`: Node.js + Express สำหรับ API, business rules, database และ integrations

เป้าหมายผลิตภัณฑ์:

1. ขายสินค้า tattoo aftercare, merchandise และ voucher
2. ให้ลูกค้ากรอกข้อมูลเพื่อรับช่วงราคารอยสักเบื้องต้น
3. เพิ่ม AI เพื่อช่วยวิเคราะห์รูปอ้างอิงในภายหลัง
4. ให้ช่างหรือแอดมินตรวจสอบราคาก่อนยืนยันกับลูกค้า

เอกสารสถาปัตยกรรมเชิงผลิตภัณฑ์ฉบับเต็มอยู่ที่ `docs/architecture.md`

## Repository Structure

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
|   |-- index.html
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
|   |-- server.js
|   `-- package.json
|-- docs/
|-- context.md
|-- package.json
`-- README.md
```

## Backend Layer Responsibilities

โครงสร้าง backend ได้แรงบันดาลใจจาก Rails แต่ใช้หลักการของ Node.js API:

### `app/config/`

- อ่านและจัดรูปแบบ environment configuration
- ตั้งค่า application และ database
- `init.js` ประกอบ Express application
- ห้ามใส่ business logic
- ห้าม commit secret หรือกำหนด production secret เป็นค่า default

### `app/database/`

- สร้างและปิด connection ของ database, cache และ storage
- รวม initialization ไว้ใน `database/init.js`
- controller ห้ามเปิด connection เอง

### `app/routes/`

- ระบุ HTTP method, URL และ middleware ของ route
- ส่งงานไป controller
- ห้ามใส่ business logic หรือ query database โดยตรง
- ทุก route group ต้องถูก register ใน `routes/init.js`

### `app/controllers/`

- รับ request และส่ง response
- validate และ normalize input ก่อนส่งต่อ
- เรียก helper หรือ service ที่รับผิดชอบ business logic
- controller ต้องสั้นและไม่ผูกกับรายละเอียด database

### `app/models/`

- นิยามรูปแบบข้อมูล constants และ domain rules ที่ติดกับ entity
- เมื่อเพิ่ม ORM ให้เก็บ schema/repository ที่เกี่ยวข้องกับ entity ในชั้นนี้
- ห้ามสร้าง HTTP response จาก model

### `app/helpers/`

- เก็บ business logic ที่ใช้ซ้ำและไม่มี HTTP concern
- ฟังก์ชันควรรับ input และ return output ที่ทดสอบได้
- ตัวอย่าง: pricing engine, order total calculation และ pagination

หาก business logic โตขึ้น ให้เพิ่ม `app/services/` แทนการทำ helper ขนาดใหญ่

### `app/middleware/`

- authentication, authorization, validation, rate limiting และ error handling
- middleware ทั้งหมด register ผ่าน `middleware/init.js`

### `app/utils/`

- utility ระดับ infrastructure เช่น logger, date และ identifier
- ห้ามใส่ business rule

### `public/`

- ใช้เฉพาะไฟล์ public ที่ backend ต้องให้บริการ
- รูปอ้างอิงรอยสักของลูกค้าห้ามเก็บใน public

### `samples/`

- เก็บตัวอย่าง config และ environment variables
- ห้ามเก็บ secret จริง

## Backend Request Flow

ทุก request ควรไหลตามลำดับนี้:

```text
route
-> middleware
-> controller
-> helper/service
-> model/repository
-> database or external provider
-> controller response
-> error middleware
```

ตัวอย่างการประเมินราคารอยสัก:

```text
POST /api/estimates
-> validate request
-> normalize size/style/placement
-> analyze image with AI service (future)
-> calculate price with TattooPricing helper
-> persist estimate
-> return price range and disclaimer
```

## API Conventions

### URL

- API ทุก endpoint เริ่มด้วย `/api`
- ใช้ resource noun แบบพหูพจน์ เช่น `/api/products`
- ใช้ kebab-case เมื่อ URL มีหลายคำ

### Success Response

```json
{
  "data": {},
  "meta": {}
}
```

`meta` ไม่จำเป็นสำหรับ response ที่ไม่มี pagination หรือ metadata

### Error Response

```json
{
  "error": {
    "code": "INVALID_ESTIMATE_SIZE",
    "message": "widthCm and heightCm must be positive numbers",
    "details": {}
  }
}
```

ห้ามส่ง stack trace หรือข้อมูล secret ให้ client

### HTTP Status

- `200`: อ่านหรือแก้ไขสำเร็จ
- `201`: สร้าง resource สำเร็จ
- `204`: สำเร็จโดยไม่มี response body
- `400`: input ไม่ถูกต้อง
- `401`: ยังไม่ authenticate
- `403`: ไม่มีสิทธิ์
- `404`: ไม่พบ resource
- `409`: ข้อมูลขัดแย้ง
- `422`: input ถูก syntax แต่ไม่ผ่าน business rule
- `500`: server error ที่ไม่คาดคิด

## Frontend Rules

- หน้าและ component เรียก backend ผ่าน `/api` เท่านั้น
- ห้ามเรียก database, AI provider หรือ payment provider จาก frontend โดยตรง
- ห้ามเชื่อราคา ยอดรวม ส่วนลด และ stock ที่ frontend ส่งมา
- ข้อความที่เปลี่ยนตามภาษาเก็บใน `frontend/src/i18n/`
- shared UI อยู่ใน `frontend/src/components/ui/`
- component เฉพาะ feature ควรอยู่ใต้ feature หรือ component group ของตัวเอง
- API client ควรแยกไว้ใน `frontend/src/api/` เมื่อเริ่มเชื่อม backend

## Commerce Rules

- ราคาสินค้าและยอดรวมคำนวณใหม่ที่ backend เสมอ
- order item ต้องเก็บ snapshot ของ SKU, ชื่อ และราคาขณะสั่งซื้อ
- payment webhook ต้องตรวจ signature
- webhook handler ต้องรองรับ event ซ้ำโดยไม่สร้างผลลัพธ์ซ้ำ
- ห้ามเก็บข้อมูลบัตรชำระเงินในระบบ

## Tattoo Estimate Rules

- AI ทำหน้าที่วิเคราะห์รูปและสร้าง structured attributes เท่านั้น
- AI ห้ามกำหนดราคาสุดท้าย
- `TattooPricing.helper.js` หรือ pricing service เป็นผู้คำนวณราคา
- ทุกใบประเมินต้องมี `pricingRuleVersion`
- ผลลัพธ์ต้องเป็นช่วงราคาและมี disclaimer
- ราคาสุดท้ายต้องผ่านการตรวจสอบจากช่างหรือแอดมิน
- รูปลูกค้าต้องเป็น private object และเข้าถึงผ่าน signed URL อายุสั้น
- ต้อง validate ชนิดไฟล์ ขนาดไฟล์ และจำนวนไฟล์ก่อนอัปโหลด

## Security Rules

- secret อยู่ใน environment variables เท่านั้น
- ใช้ `backend/samples/.env.sample` เป็นรายการตัวแปรที่ต้องตั้งค่า
- ห้าม commit `.env`
- authentication token ควรอยู่ใน secure httpOnly cookie
- admin endpoint ต้องมี authentication และ role authorization
- estimate endpoint, authentication และ checkout ต้องมี rate limiting
- ห้ามบันทึกรูปลูกค้า ข้อความส่วนตัว token หรือ secret ลง application log
- validate external provider response ก่อนใช้งานทุกครั้ง

## Naming Conventions

- ชื่อไฟล์ backend ใช้รูปแบบ `Domain.layer.js`
- ตัวอย่าง: `Product.controller.js`, `Product.routes.js`, `Logger.util.js`
- initializer ของแต่ละ layer ใช้ชื่อ `init.js`
- function และ variable ใช้ camelCase
- constants ใช้ UPPER_SNAKE_CASE
- API JSON fields ใช้ camelCase
- database columns ใช้ snake_case

## Environment Variables

ค่าพื้นฐานปัจจุบัน:

```text
NODE_ENV
PORT
CORS_ORIGINS
DATABASE_URL
SESSION_SECRET
```

เมื่อเพิ่ม integrations ให้เพิ่มตัวแปรลง `backend/samples/.env.sample` ก่อน และอ่านผ่าน
ไฟล์ใน `backend/app/config/`

## Commands

รันจาก repository root:

```bash
npm run dev:frontend
npm run dev:backend
npm run build
npm run check
npm start
```

ค่าเริ่มต้น:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Health check: `GET http://localhost:3000/api/health`

## Implementation Order

1. สร้าง PostgreSQL schema และ repository
2. ย้ายสินค้า static จาก frontend ไป backend/database
3. เชื่อมหน้า shop กับ `GET /api/products`
4. สร้าง cart, order และ checkout
5. สร้าง estimate form และเก็บใบประเมิน
6. ทำ pricing rules และ admin review
7. เพิ่ม AI image analysis หลัง pricing workflow ทำงานเสถียร

## Definition Of Done

งาน backend ถือว่าเสร็จเมื่อ:

- route มี validation และ error response ตาม convention
- business logic แยกออกจาก controller
- มี test สำหรับ business rule สำคัญ
- ไม่มี secret หรือข้อมูลส่วนตัวใน log
- documentation และ `.env.sample` ถูกอัปเดต
- `npm run check` ผ่าน

งาน frontend ถือว่าเสร็จเมื่อ:

- loading, empty และ error state ถูกจัดการ
- รองรับภาษาไทยและอังกฤษเมื่อข้อความนั้นเปลี่ยนตามภาษา
- ไม่เชื่อข้อมูลราคาและสิทธิ์จาก client
- `npm run build` ผ่าน
