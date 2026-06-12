/**
 * SectionLabel — "— Concept" / "— Services" labels
 * Font size เพิ่มเป็น 0.72rem เพื่อให้อ่านง่ายขึ้น
 */
function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "var(--font-display)",
      fontSize: '0.72rem',      /* เดิม 0.55rem */
      letterSpacing: '0.42em',
      color: 'var(--color-silver-dim)',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}
export default SectionLabel
