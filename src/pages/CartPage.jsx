import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import Button from '../components/ui/Button'
import styles from './Commerce.module.css'

function CartPage() {
  const { t, i18n } = useTranslation()
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const isThai = i18n.language === 'th'

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p>{t('cart.label')}</p>
        <h1>{t('cart.title')}</h1>
      </header>

      {items.length === 0 ? (
        <section className={styles.empty}>
          <h2>{t('cart.emptyTitle')}</h2>
          <p>{t('cart.emptyBody')}</p>
          <Button variant="outline" to="/shop">{t('cart.shop')}</Button>
        </section>
      ) : (
        <div className={styles.commerceGrid}>
          <section className={styles.itemList}>
            {items.map((item) => (
              <article className={styles.cartItem} key={item.id}>
                <div className={styles.productIcon}>{item.icon}</div>
                <div className={styles.itemInfo}>
                  <h2>{isThai ? item.nameTh : item.name}</h2>
                  <p>฿{item.price.toLocaleString()}</p>
                  <button onClick={() => removeItem(item.id)}>{t('cart.remove')}</button>
                </div>
                <div className={styles.quantity} aria-label={t('cart.quantity')}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </article>
            ))}
          </section>
          <aside className={styles.summary}>
            <h2>{t('cart.summary')}</h2>
            <div><span>{t('cart.subtotal')}</span><strong>฿{subtotal.toLocaleString()}</strong></div>
            <div><span>{t('cart.shipping')}</span><span>{t('cart.calculated')}</span></div>
            <p>{t('cart.priceNotice')}</p>
            <Button variant="submit" to="/checkout">{t('cart.checkout')}</Button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CartPage
