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
import EstimatePage from './pages/EstimatePage'
import NotFoundPage from './pages/NotFoundPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import PaymentResultPage from './pages/PaymentResultPage'
import AiEstimatePage from './pages/AiEstimatePage'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route path="/"     element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/estimate" element={<EstimatePage />} />
        <Route path="/ai-estimate" element={<AiEstimatePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/success" element={<PaymentResultPage status="success" />} />
        <Route path="/payment/cancel" element={<PaymentResultPage status="cancel" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
