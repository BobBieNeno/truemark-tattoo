/**
 * useReveal Hook
 * 
 * ใช้ IntersectionObserver เพื่อ detect ว่า element เข้ามาใน viewport แล้วหรือยัง
 * เมื่อเข้ามาแล้วจะ add class "visible" เพื่อ trigger CSS animation
 * 
 * วิธีใช้:
 *   const ref = useReveal()
 *   <div ref={ref} className="reveal">...</div>
 */
import { useEffect, useRef } from 'react'

function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // หยุด observe หลังจาก trigger แล้ว (performance)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    // Observe ทุก element ที่มี class "reveal" ภายใน ref
    const reveals = element.querySelectorAll('.reveal')
    if (element.classList.contains('reveal')) {
      observer.observe(element)
    }
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

export default useReveal
