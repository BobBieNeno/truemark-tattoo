/**
 * TMLogo Component
 * 
 * SVG Monogram ของ True Mark ใช้ได้ทั่วทั้งเว็บ
 * Props:
 *   size  — ขนาด (default: 120)
 *   color — สี gradient (default: silver)
 */
function TMLogo({ size = 120, className = '' }) {
  const h = (size / 120) * 140

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="True Mark TM Logo"
    >
      <defs>
        <linearGradient id="tmSilver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#e8e8e8" />
          <stop offset="40%"  stopColor="#aaaaaa" />
          <stop offset="70%"  stopColor="#d0d0d0" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
      </defs>

      {/* T — crossbar */}
      <rect x="10" y="20" width="160" height="12" rx="1" fill="url(#tmSilver)" />

      {/* T — corner serifs */}
      <rect x="10"  y="20" width="18" height="6" fill="url(#tmSilver)" />
      <rect x="152" y="20" width="18" height="6" fill="url(#tmSilver)" />

      {/* T — vertical stem */}
      <rect x="76" y="20" width="28" height="130" rx="1" fill="url(#tmSilver)" />

      {/* M — left leg */}
      <rect x="28" y="55" width="16" height="100" rx="1" fill="url(#tmSilver)" />

      {/* M — right leg */}
      <rect x="136" y="55" width="16" height="100" rx="1" fill="url(#tmSilver)" />

      {/* M — left diagonal */}
      <polygon points="28,55 44,55 90,110 76,110" fill="url(#tmSilver)" />

      {/* M — right diagonal */}
      <polygon points="152,55 136,55 90,110 104,110" fill="url(#tmSilver)" />

      {/* Bottom serifs */}
      <rect x="18"  y="148" width="46" height="7" fill="url(#tmSilver)" />
      <rect x="116" y="148" width="46" height="7" fill="url(#tmSilver)" />
    </svg>
  )
}

export default TMLogo
