/**
 * useScrollTo Hook
 * 
 * จัดการ navigation + scroll behavior ทั้งหมด
 * 
 * สิ่งที่ทำ:
 * 1. ถ้า path ต่างกัน → navigate ไปหน้าใหม่ก่อน แล้วค่อย scroll
 * 2. ถ้า path เดียวกัน + มี sectionId → scroll ไปที่ section นั้น
 * 3. ถ้าเป็น Home (ไม่มี sectionId) → scroll กลับ top
 * 
 * วิธีใช้:
 *   const scrollTo = useScrollTo()
 *   scrollTo('/')           → scroll top
 *   scrollTo('/', 'concept') → scroll ไปที่ #concept
 */
import { useNavigate, useLocation } from 'react-router-dom'

function useScrollTo() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = (path, sectionId = null) => {
    const isSamePage = location.pathname === path

    if (isSamePage) {
      // อยู่หน้าเดิมอยู่แล้ว → scroll ทันที
      handleScroll(sectionId)
    } else {
      // ต้อง navigate ไปหน้าใหม่ก่อน แล้วค่อย scroll
      navigate(path)
      // รอให้ React render หน้าใหม่เสร็จก่อน (2 frame)
      setTimeout(() => handleScroll(sectionId), 100)
    }
  }

  return scrollTo
}

// ─── Helper: scroll ไปที่ section หรือ top ───
function handleScroll(sectionId) {
  if (!sectionId) {
    // ไม่มี section → scroll กลับ top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const element = document.getElementById(sectionId)
  if (element) {
    // มี element → scroll ไปที่ element นั้น
    // offset 80px เพื่อหลีกเลี่ยง Navbar ที่ fixed อยู่
    const navbarHeight = 80
    const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default useScrollTo
