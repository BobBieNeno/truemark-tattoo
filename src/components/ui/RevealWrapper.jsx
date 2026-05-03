/**
 * RevealWrapper Component
 * 
 * Wrapper ที่ทำให้ children fade + slide ขึ้นเมื่อ scroll ถึง
 * 
 * Props:
 *   delay    — delay ก่อน animation เริ่ม (ms)
 *   stagger  — ถ้า true, children แต่ละตัวจะ animate ทีละชิ้น
 *   children — content ข้างใน
 * 
 * ตัวอย่าง:
 *   <RevealWrapper delay={200}>
 *     <h2>หัวข้อ</h2>
 *   </RevealWrapper>
 */
import { useEffect, useRef } from 'react'

function RevealWrapper({ children, delay = 0, stagger = false, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ใส่ delay ก่อน add class visible
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay])

  const classes = [
    'reveal',
    stagger ? 'reveal-stagger' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
}

export default RevealWrapper
