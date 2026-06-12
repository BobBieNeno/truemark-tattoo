/**
 * main.jsx — Entry point
 *
 * import './i18n/index.js' ต้องมาก่อน App
 * เพื่อให้ i18next init เสร็จก่อน component render
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index.js'   // ← i18next init ที่นี่
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
)
