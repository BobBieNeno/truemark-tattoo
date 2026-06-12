import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import Button from '../components/ui/Button'
import styles from './Commerce.module.css'

function PaymentResultPage({ status }) {
  const { t } = useTranslation()
  const { clearCart } = useCart()
  const success = status === 'success'

  useEffect(() => {
    if (success) clearCart()
  }, [success])

  return (
    <main className={styles.resultPage}>
      <div className={success ? styles.resultSuccess : styles.resultCancel}>
        <span>{success ? '✓' : '×'}</span>
      </div>
      <p className={styles.resultLabel}>{t(`payment.${status}.label`)}</p>
      <h1>{t(`payment.${status}.title`)}</h1>
      <p>{t(`payment.${status}.body`)}</p>
      <div className={styles.resultActions}>
        <Button variant="outline" to={success ? '/' : '/checkout'}>{t(`payment.${status}.action`)}</Button>
        {!success && <Button variant="ghost" to="/shop">{t('cart.shop')}</Button>}
      </div>
    </main>
  )
}

export default PaymentResultPage
