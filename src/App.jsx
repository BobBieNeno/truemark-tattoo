/**
 * App.jsx — Root component
 *
 * ไม่ต้องมี LanguageProvider แล้ว
 * react-i18next จัดการ global state ให้เอง
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar    from './components/layout/Navbar'
import Footer    from './components/layout/Footer'
import HomePage  from './pages/HomePage'
import ShopPage  from './pages/ShopPage'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"     element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
