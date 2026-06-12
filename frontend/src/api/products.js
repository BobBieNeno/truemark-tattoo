import { products as localProducts } from '../data/products'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

const normalizeProducts = (payload) => {
  const items = Array.isArray(payload) ? payload : payload?.data
  if (!Array.isArray(items)) throw new Error('Invalid product response')
  return items
}

export async function getProducts() {
  if (!API_BASE_URL) {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return localProducts
  }

  const response = await fetch(`${API_BASE_URL}/api/products`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status})`)
  }

  return normalizeProducts(await response.json())
}
