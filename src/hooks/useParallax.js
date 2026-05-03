/**
 * useParallax Hook
 * 
 * สร้าง smooth parallax effect โดยใช้ scroll position
 * คำนวณว่า element อยู่ห่างจาก viewport กี่ % แล้ว translate Y ตามสัดส่วน
 * 
 * วิธีใช้:
 *   const { ref, style } = useParallax(0.2)  // speed: 0 = ไม่ขยับ, 1 = เร็วมาก
 *   <div ref={ref} style={style}>...</div>
 */
import { useEffect, useRef, useState } from 'react'

function useParallax(speed = 0.2) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let animationFrame

    const handleScroll = () => {
      animationFrame = requestAnimationFrame(() => {
        const element = ref.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // คำนวณตำแหน่ง relative ของ element เทียบกับ viewport center
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        const distanceFromCenter = elementCenter - viewportCenter

        // ยิ่ง speed สูง ยิ่งขยับมาก
        setOffset(distanceFromCenter * speed)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // เรียกครั้งแรกเมื่อ mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrame)
    }
  }, [speed])

  const style = {
    transform: `translateY(${offset}px)`,
    willChange: 'transform', // บอก browser ล่วงหน้าเพื่อ GPU acceleration
  }

  return { ref, style }
}

export default useParallax
