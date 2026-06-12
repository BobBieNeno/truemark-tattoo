import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createCardCheckoutSession } from '../api/payments'
import Button from '../components/ui/Button'
import styles from './Commerce.module.css'

const initialCustomer = {
  name: '',
  email: '',
  phone: '',
  address: '',
  district: '',
  province: '',
  postalCode: '',
}

function CheckoutPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, subtotal } = useCart()
  const [customer, setCustomer] = useState(initialCustomer)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key, value) => setCustomer((current) => ({ ...current, [key]: value }))
  const valid = Object.values(customer).every((value) => value.trim())

  const payByCard = async (event) => {
    event.preventDefault()
    if (!valid || !items.length) return
    setStatus('loading')
    setError('')
    try {
      const session = await createCardCheckoutSession({
        items: items.map(({ id, quantity }) => ({ productId: id, quantity })),
        customer,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      })
      if (session.url.startsWith('/')) navigate(session.url)
      else window.location.assign(session.url)
    } catch {
      setStatus('error')
      setError(t('checkout.error'))
    }
  }

  if (!items.length) {
    return (
      <main className={styles.page}>
        <section className={styles.empty}>
          <h1>{t('checkout.empty')}</h1>
          <Button variant="outline" to="/shop">{t('cart.shop')}</Button>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p>{t('checkout.label')}</p>
        <h1>{t('checkout.title')}</h1>
      </header>
      <form className={styles.commerceGrid} onSubmit={payByCard}>
        <section className={styles.checkoutForm}>
          <h2>{t('checkout.contact')}</h2>
          <div className={styles.fields}>
            {['name', 'email', 'phone', 'address', 'district', 'province', 'postalCode'].map((key) => (
              <label key={key} className={key === 'address' ? styles.wide : ''}>
                <span>{t(`checkout.fields.${key}`)}</span>
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={customer[key]}
                  onChange={(event) => update(key, event.target.value)}
                  required
                />
              </label>
            ))}
          </div>
          <div className={styles.paymentMethod}>
            <div className={styles.cardMark}>CARD</div>
            <div>
              <h2>{t('checkout.cardTitle')}</h2>
              <p>{t('checkout.cardBody')}</p>
            </div>
            <span>Visa · Mastercard</span>
          </div>
          <div className={styles.securityNotice}>
            <strong>{t('checkout.secureTitle')}</strong>
            <p>{t('checkout.secureBody')}</p>
          </div>
        </section>
        <aside className={styles.summary}>
          <h2>{t('checkout.orderSummary')}</h2>
          {items.map((item) => (
            <div key={item.id}><span>{item.name} × {item.quantity}</span><strong>฿{(item.price * item.quantity).toLocaleString()}</strong></div>
          ))}
          <div className={styles.total}><span>{t('cart.subtotal')}</span><strong>฿{subtotal.toLocaleString()}</strong></div>
          {error && <p className={styles.paymentError} role="alert">{error}</p>}
          <button className={styles.payButton} type="submit" disabled={!valid || status === 'loading'}>
            {status === 'loading' ? t('checkout.redirecting') : t('checkout.payCard')}
          </button>
          <p>{t('checkout.finalNotice')}</p>
        </aside>
      </form>
    </main>
  )
}

export default CheckoutPage
