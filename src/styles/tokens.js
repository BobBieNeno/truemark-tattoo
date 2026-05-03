/**
 * Design Tokens — True Mark Tattoo
 * 
 * ไฟล์นี้เก็บค่า design system ทั้งหมดไว้ในที่เดียว
 * เมื่อต้องการเปลี่ยน brand color หรือ font ให้แก้ที่นี่เพียงที่เดียว
 */

export const colors = {
  // Background layers (dark to slightly lighter)
  black:      '#080808',
  deep:       '#0d0d0d',
  surface:    '#111111',
  card:       '#161616',

  // Silver scale
  silverLight: '#e8e8e8',
  silver:      '#c8c8c8',
  silverDim:   '#888888',
  silverGhost: 'rgba(200,200,200,0.08)',

  // Accent — subtle warm gold for brand differentiation
  gold:        '#b8a06a',
  goldDim:     'rgba(184,160,106,0.2)',

  // Text
  textPrimary:   '#e8e8e8',
  textSecondary: '#888888',
  textMuted:     'rgba(200,200,200,0.3)',
}

export const fonts = {
  display: "'Cinzel', serif",        // Headings, logo, labels
  serif:   "'Cormorant Garamond', serif",  // Pull quotes, large text
  body:    "'Sarabun', sans-serif",  // Body text, UI
}

export const spacing = {
  xs:  '0.5rem',
  sm:  '1rem',
  md:  '2rem',
  lg:  '4rem',
  xl:  '8rem',
  xxl: '12rem',
}

export const animation = {
  // Parallax speed multipliers (lower = more subtle)
  parallaxSlow:   0.15,
  parallaxMedium: 0.25,
  parallaxFast:   0.4,

  // Transition timings
  fast:   '0.3s ease',
  normal: '0.5s ease',
  slow:   '0.8s ease',
}
