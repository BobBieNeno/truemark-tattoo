/**
 * Button Component — True Mark branded button
 * 
 * Props:
 *   variant   — 'arrow' | 'outline' | 'ghost'
 *   to        — React Router path (ถ้าใส่จะ render เป็น <a> + scroll)
 *   sectionId — section ที่จะ scroll ไป (ใช้คู่กับ to)
 *   href      — external URL (เปิด tab ใหม่)
 *   onClick   — custom click handler
 *   children  — ข้อความ
 */
import styles from './Button.module.css'
import useScrollTo from '../../hooks/useScrollTo'

function Button({ variant = 'arrow', to, sectionId, href, onClick, children, className = '' }) {
  const scrollTo = useScrollTo()

  const classes = [styles.btn, styles[variant] || '', className].filter(Boolean).join(' ')

  const content = (
    <>
      {variant === 'arrow' && <span className={styles.arrow} aria-hidden="true" />}
      <span className={styles.text}>{children}</span>
    </>
  )

  // Internal navigation → ใช้ scrollTo
  if (to) {
    const handleClick = (e) => {
      e.preventDefault()
      scrollTo(to, sectionId || null)
    }
    return (
      <a
        href={sectionId ? `${to}#${sectionId}` : to}
        className={classes}
        onClick={handleClick}
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

  // Custom button
  return (
    <button onClick={onClick} className={classes} type="button">
      {content}
    </button>
  )
}

export default Button
