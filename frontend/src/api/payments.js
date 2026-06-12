const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

export async function createCardCheckoutSession(payload) {
  if (!API_BASE_URL) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { url: '/payment/success?demo=1' }
  }

  const response = await fetch(`${API_BASE_URL}/api/payments/session`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`Unable to create payment session (${response.status})`)
  const result = await response.json()
  const session = result?.data || result
  if (!session?.url) throw new Error('Payment session URL is missing')
  return session
}
