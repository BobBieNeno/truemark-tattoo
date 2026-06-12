import { useTranslation } from 'react-i18next'
import styles             from './ProductCard.module.css'
import { useCart }        from '../../context/CartContext'

const BADGE_STYLES = {
  'Best Seller': styles.badgeSeller,
  'New':         styles.badgeNew,
  'Limited':     styles.badgeLimited,
  'Best Value':  styles.badgeValue,
  'Gift':        styles.badgeGift,
}

function ProductCard({ product }) {
  const { name, nameTh, price, unit, badge, icon, available, id } = product
  const { t, i18n } = useTranslation()
  const isThai      = i18n.language === 'th'
  const { addItem } = useCart()

  // ชื่อสินค้าตามภาษา
  const displayName = isThai ? nameTh : name

  // description ดึงจาก i18n ตาม index (id เริ่มจาก 1)
  const productDescs = t('shop.products', { returnObjects: true })
  const desc = Array.isArray(productDescs) ? (productDescs[id - 1]?.desc || '') : ''

  return (
    <article className={styles.card}>
      {badge && (
        <span className={[styles.badge, BADGE_STYLES[badge] || styles.badgeDefault].join(' ')}>
          {badge}
        </span>
      )}
      <div className={styles.iconWrap} aria-hidden="true">
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.info}>
        <p className={styles.nameTh}>{isThai ? name : nameTh}</p>
        <h3 className={styles.name}>{displayName}</h3>
        {/* description เปลี่ยนตามภาษา */}
        <p className={styles.description}>{desc}</p>
      </div>
      <div className={styles.footer}>
        <div className={styles.priceWrap}>
          <span className={styles.price}>{price.toLocaleString()}</span>
          <span className={styles.unit}>{unit}</span>
        </div>
        <button
          className={styles.ctaBtn}
          onClick={() => addItem(product)}
          disabled={!available}
          aria-label={`${t(available ? 'shop.addToCart' : 'shop.soldOut')} — ${displayName}`}
        >
          {available ? t('shop.addToCart') : t('shop.soldOut')}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
