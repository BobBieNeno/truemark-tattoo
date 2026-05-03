/**
 * ProductGrid Component
 * 
 * แสดง grid ของ ProductCard พร้อม filter ตาม category
 * รับ products array และ categories จาก products.js
 */
import { useState } from 'react'
import ProductCard from './ProductCard'
import RevealWrapper from '../ui/RevealWrapper'
import { categories, getProductsByCategory } from '../../data/products'
import styles from './ProductGrid.module.css'

function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = getProductsByCategory(activeCategory)

  return (
    <div className={styles.wrapper}>
      {/* Category filter tabs */}
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

      {/* Product grid */}
      <div className={styles.grid}>
        {filtered.map((product, index) => (
          <RevealWrapper key={product.id} delay={index * 80}>
            <ProductCard product={product} />
          </RevealWrapper>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className={styles.empty}>ไม่มีสินค้าในหมวดหมู่นี้</p>
      )}
    </div>
  )
}

export default ProductGrid
