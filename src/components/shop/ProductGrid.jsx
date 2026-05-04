import { useState }        from 'react'
import { useTranslation }  from 'react-i18next'
import ProductCard         from './ProductCard'
import RevealWrapper       from '../ui/RevealWrapper'
import { getProductsByCategory } from '../../data/products'
import styles              from './ProductGrid.module.css'

// Category ids คงที่ — labels เปลี่ยนตามภาษา
const CATEGORY_IDS = ['all', 'aftercare', 'merch', 'voucher']

function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { t } = useTranslation()

  // Labels แบบ dynamic ตามภาษา
  const categoryLabels = {
    all:       t('shop.filterAll'),
    aftercare: 'Aftercare',
    merch:     'Merchandise',
    voucher:   'Gift Voucher',
  }

  const filtered = getProductsByCategory(activeCategory)

  return (
    <div className={styles.wrapper}>
      {/* Filter tabs */}
      <div className={styles.filters} role="tablist" aria-label="Product categories">
        {CATEGORY_IDS.map((id) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeCategory === id}
            className={[styles.filterBtn, activeCategory === id ? styles.active : ''].join(' ')}
            onClick={() => setActiveCategory(id)}
          >
            {categoryLabels[id]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((product, index) => (
          <RevealWrapper key={product.id} delay={index * 80}>
            <ProductCard product={product} />
          </RevealWrapper>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>{t('shop.emptyCategory')}</p>
      )}
    </div>
  )
}

export default ProductGrid
