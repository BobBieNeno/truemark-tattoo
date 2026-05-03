/**
 * App.jsx — Root component
 * 
 * จัดการ routing และ layout ทั้งหมด
 * ทุก page จะ render ผ่านตรงนี้
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      {/* Navbar แสดงทุกหน้า */}
      <Navbar />

      {/* Page content */}
      <Routes>
        <Route path="/"     element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        {/* เพิ่ม page ใหม่ได้ตรงนี้ เช่น:
            <Route path="/about" element={<AboutPage />} /> */}
      </Routes>

      {/* Footer แสดงทุกหน้า */}
      <Footer />
    </BrowserRouter>
  )
}

export default App
