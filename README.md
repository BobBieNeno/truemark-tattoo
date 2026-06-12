# True Mark Tattoo Frontend

เว็บไซต์ True Mark Tattoo พัฒนาด้วย React และ Vite โดย source code อยู่ใน
`frontend/`

## วิธีรัน

ติดตั้ง dependencies และรันจาก repository root:

```bash
npm install
npm run dev
```

สร้าง production build:

```bash
npm run build
```

## เชื่อมต่อ Backend

คัดลอก `frontend/.env.example` เป็น `frontend/.env.local` และกำหนด URL ของ
backend:

```env
VITE_API_BASE_URL=http://localhost:3000
```

หากไม่ได้กำหนดตัวแปรนี้ หน้า Shop จะใช้ข้อมูล local สำหรับพัฒนา frontend

การชำระผ่านบัตรใช้ Hosted Checkout โดย frontend เรียก:

```text
POST /api/payments/session
```

Backend ต้องตรวจสอบราคาและสต็อกใหม่ทั้งหมด แล้วตอบกลับด้วย `{ "url": "..." }`
สำหรับ redirect ไปหน้าชำระเงินของ provider ระบบ frontend จะไม่รับหรือเก็บข้อมูลบัตร

การวิเคราะห์ภาพรอยสักด้วย Gemini ใช้ endpoint:

```text
POST /api/estimates/analyze
Content-Type: multipart/form-data
```

Backend ต้องเป็นผู้เก็บ `GEMINI_API_KEY`, เรียก Gemini Vision, ตรวจผลลัพธ์ด้วย
schema และส่ง structured analysis กลับมา ห้ามใส่ Gemini API key ในตัวแปร
`VITE_*` เพราะจะถูกเปิดเผยใน browser
