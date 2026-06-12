import { useEffect, useState } from 'react'
import { useTranslation }  from 'react-i18next'
import ProductCard         from './ProductCard'
import RevealWrapper       from '../ui/RevealWrapper'
import { getProducts } from '../../api/products'
import styles              from './ProductGrid.module.css'

// Category ids คงที่ — labels เปลี่ยนตามภาษา
const CATEGORY_IDS = ['all', 'aftercare', 'merch', 'voucher']

function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const { t } = useTranslation()

  // Labels แบบ dynamic ตามภาษา
  const categoryLabels = {
    all:       t('shop.filterAll'),
    aftercare: 'Aftercare',
    merch:     'Merchandise',
    voucher:   'Gift Voucher',
  }

  const loadProducts = async () => {
    setStatus('loading')
    try {
      setProducts(await getProducts())
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((product) => product.category === activeCategory)

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

      {status === 'loading' && (
        <div className={styles.state} role="status">
          <span className={styles.loader} />
          <p>{t('shop.loading')}</p>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.state} role="alert">
          <p>{t('shop.loadError')}</p>
          <button className={styles.retryBtn} onClick={loadProducts}>{t('shop.retry')}</button>
        </div>
      )}

      {/* Grid */}
      {status === 'ready' && (
      <div className={styles.grid}>
        {filtered.map((product, index) => (
          <RevealWrapper key={product.id} delay={index * 80}>
            <ProductCard product={product} />
          </RevealWrapper>
        ))}
      </div>
      )}

      {status === 'ready' && filtered.length === 0 && (
        <p className={styles.empty}>{t('shop.emptyCategory')}</p>
      )}
    </div>
  )
}

export default ProductGrid
