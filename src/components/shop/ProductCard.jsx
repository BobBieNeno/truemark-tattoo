import { useLanguage } from '../../context/LanguageContext'
import styles from './ProductCard.module.css'

const BADGE_STYLES = {
  'Best Seller': styles.badgeSeller,
  'New':         styles.badgeNew,
  'Limited':     styles.badgeLimited,
  'Best Value':  styles.badgeValue,
  'Gift':        styles.badgeGift,
}

function ProductCard({ product }) {
  const { name, nameTh, description, price, unit, badge, icon, available } = product
  const { t, lang } = useLanguage()
  const s = t.shop

  // แสดงชื่อตามภาษา
  const displayName = lang === 'th' ? nameTh : name

  const handleContact = () => {
    window.location.href = '/#contact'
  }

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
        {/* แสดง nameTh หรือ name ตามภาษา */}
        <p className={styles.nameTh}>{lang === 'th' ? name : nameTh}</p>
        <h3 className={styles.name}>{displayName}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.priceWrap}>
          <span className={styles.price}>{price.toLocaleString()}</span>
          <span className={styles.unit}>{unit}</span>
        </div>
        <button
          className={styles.ctaBtn}
          onClick={handleContact}
          disabled={!available}
          aria-label={`${s.askBtn} ${displayName}`}
        >
          {available ? s.askBtn : s.soldOut}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
