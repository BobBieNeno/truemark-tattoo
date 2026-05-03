import { useState } from 'react'
import ProductCard from './ProductCard'
import RevealWrapper from '../ui/RevealWrapper'
import { products, getProductsByCategory } from '../../data/products'
import { useLanguage } from '../../context/LanguageContext'
import styles from './ProductGrid.module.css'

// Categories แปลตามภาษา
const CATEGORIES_TH = [
  { id:'all',       label:'ทั้งหมด'     },
  { id:'aftercare', label:'Aftercare'   },
  { id:'merch',     label:'Merchandise' },
  { id:'voucher',   label:'Gift Voucher'},
]
const CATEGORIES_EN = [
  { id:'all',       label:'All'         },
  { id:'aftercare', label:'Aftercare'   },
  { id:'merch',     label:'Merchandise' },
  { id:'voucher',   label:'Gift Voucher'},
]

function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { lang } = useLanguage()
  const categories = lang === 'th' ? CATEGORIES_TH : CATEGORIES_EN
  const filtered   = getProductsByCategory(activeCategory)

  return (
    <div className={styles.wrapper}>
      {/* Category filters */}
      <div className={styles.filters} role="tablist" aria-label="Product categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={[styles.filterBtn, activeCategory === cat.id ? styles.active : ''].join(' ')}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
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
        <p className={styles.empty}>
          {lang === 'th' ? 'ไม่มีสินค้าในหมวดหมู่นี้' : 'No products in this category.'}
        </p>
      )}
    </div>
  )
}

export default ProductGrid
