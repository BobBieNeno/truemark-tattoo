/**
 * SubmitButton — ปุ่ม submit form โดยเฉพาะ
 *
 * แยกออกจาก Button หลักเพราะ:
 * - ไม่ต้องการ useScrollTo (ไม่ navigate ไปไหน)
 * - ไม่มี dependency กับ Router
 * - มี state: idle → sending → done
 * - Design: full-width, พื้นสีเงิน, lift on hover
 *
 * Props:
 *   status    — 'idle' | 'sending' | 'done'
 *   label     — ข้อความปุ่ม (idle state)
 *   sending   — ข้อความขณะส่ง
 *   disabled  — ปิดการใช้งาน
 *   onClick   — click handler (form submit)
 */
import styles from './SubmitButton.module.css'

function SubmitButton({
  status   = 'idle',
  label    = 'Submit',
  sending  = '...',
  disabled = false,
  onClick,
}) {
  const isSending  = status === 'sending'
  const isDisabled = disabled || isSending

  return (
    <button
      type="submit"
      className={`${styles.btn} ${isSending ? styles.sending : ''}`}
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={isSending}
    >
      {/* Loading spinner (แสดงตอน sending) */}
      {isSending && (
        <span className={styles.spinner} aria-hidden="true" />
      )}

      {/* ข้อความ */}
      <span className={styles.label}>
        {isSending ? sending : label}
      </span>
    </button>
  )
}

export default SubmitButton
