/**
 * main.jsx — Entry point
 * React app เริ่มต้นที่นี่
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
