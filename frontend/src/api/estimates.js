const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

const demoAnalysis = {
  style: 'Fine Line / Illustrative',
  complexity: 'medium',
  colorMode: 'black-and-grey',
  estimatedCoveragePercent: 18,
  estimatedHours: { min: 3, max: 5 },
  confidence: 0.84,
  priceRange: { min: 4500, max: 7500, currency: 'THB' },
  detectedElements: ['fine linework', 'botanical details', 'light shading'],
  assumptions: ['Estimated for a medium-size placement on arm or calf', 'No cover-up work is required'],
  warnings: ['Final price depends on exact placement, skin condition and artist review'],
}

const normalizeAnalysis = (value) => {
  if (!value?.priceRange || typeof value.confidence !== 'number') {
    throw new Error('Invalid AI analysis response')
  }

  return {
    style: value.style || 'Unknown',
    complexity: value.complexity || 'unknown',
    colorMode: value.colorMode || 'unknown',
    estimatedCoveragePercent: Number(value.estimatedCoveragePercent) || 0,
    estimatedHours: {
      min: Number(value.estimatedHours?.min) || 0,
      max: Number(value.estimatedHours?.max) || 0,
    },
    confidence: Math.min(1, Math.max(0, value.confidence)),
    priceRange: {
      min: Number(value.priceRange.min) || 0,
      max: Number(value.priceRange.max) || 0,
      currency: value.priceRange.currency || 'THB',
    },
    detectedElements: Array.isArray(value.detectedElements) ? value.detectedElements : [],
    assumptions: Array.isArray(value.assumptions) ? value.assumptions : [],
    warnings: Array.isArray(value.warnings) ? value.warnings : [],
  }
}

export async function analyzeTattooImage({ image, placement, size, notes, language }) {
  if (!API_BASE_URL) {
    await new Promise((resolve) => setTimeout(resolve, 1800))
    return normalizeAnalysis(demoAnalysis)
  }

  const body = new FormData()
  body.append('image', image)
  body.append('placement', placement)
  body.append('size', size)
  body.append('notes', notes)
  body.append('language', language)

  const response = await fetch(`${API_BASE_URL}/api/estimates/analyze`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body,
  })

  if (!response.ok) throw new Error(`Unable to analyze image (${response.status})`)
  const result = await response.json()
  return normalizeAnalysis(result?.data || result)
}
