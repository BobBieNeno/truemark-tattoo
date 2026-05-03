/**
 * Button Component — True Mark branded
 *
 * Variants:
 *   'arrow'   — เส้น + ลูกศร + ตัวหนังสือ (ใช้ใน contact form)
 *   'outline' — กรอบสี่เหลี่ยม (CTA ทั่วไป)
 *   'ghost'   — minimal ไม่มีกรอบ
 *   'submit'  — ปุ่ม submit form โดยเฉพาะ (full-width, มี hover effect)
 *
 * Props:
 *   variant   — ชื่อ variant (default: 'arrow')
 *   to        — path สำหรับ internal link
 *   sectionId — scroll ไปที่ section นี้
 *   href      — external URL
 *   onClick   — click handler
 *   type      — button type ('button' | 'submit')
 *   disabled  — disable state
 *   children  — ข้อความ
 */
import styles from './Button.module.css'
import useScrollTo from '../../hooks/useScrollTo'

function Button({
  variant = 'arrow',
  to,
  sectionId,
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
}) {
  const scrollTo = useScrollTo()
  const classes  = [styles.btn, styles[variant] || '', className].filter(Boolean).join(' ')

  // ── Arrow variant content ──
  const arrowContent = (
    <span className={styles.arrowInner}>
      <span className={styles.arrowLine} aria-hidden="true">
        <span className={styles.arrowHead} />
      </span>
      <span className={styles.text}>{children}</span>
    </span>
  )

  // ── Other variant content ──
  const plainContent = <span className={styles.text}>{children}</span>

  const content = variant === 'arrow' ? arrowContent : plainContent

  // Internal navigation
  if (to) {
    const handleClick = (e) => {
      e.preventDefault()
      if (!disabled) scrollTo(to, sectionId || null)
    }
    return (
      <a
        href={sectionId ? `${to}#${sectionId}` : to}
        className={classes}
        onClick={handleClick}
        aria-disabled={disabled}
      >
        {content}
      </a>
    )
  }

  // External link
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  // Button (default)
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

export default Button
