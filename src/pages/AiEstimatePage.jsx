import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { analyzeTattooImage } from '../api/estimates'
import Button from '../components/ui/Button'
import SectionLabel from '../components/ui/SectionLabel'
import styles from './AiEstimatePage.module.css'

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

function AiEstimatePage() {
  const { t, i18n } = useTranslation()
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [placement, setPlacement] = useState('')
  const [size, setSize] = useState('')
  const [notes, setNotes] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState(null)

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    setError('')
    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError(t('aiEstimate.fileTypeError'))
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(t('aiEstimate.fileSizeError'))
      return
    }
    if (preview) URL.revokeObjectURL(preview)
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setAnalysis(null)
  }

  const analyze = async (event) => {
    event.preventDefault()
    if (!image || !placement || !size || !consent) return
    setStatus('loading')
    setError('')
    try {
      setAnalysis(await analyzeTattooImage({
        image,
        placement,
        size,
        notes,
        language: i18n.resolvedLanguage || i18n.language,
      }))
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
      setError(t('aiEstimate.analysisError'))
    }
  }

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview)
    setImage(null)
    setPreview('')
    setAnalysis(null)
    setStatus('idle')
    setError('')
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <SectionLabel>{t('aiEstimate.label')}</SectionLabel>
        <h1>{t('aiEstimate.title')}</h1>
        <p>{t('aiEstimate.intro')}</p>
        <div className={styles.geminiBadge}>Gemini Vision · Structured Analysis</div>
      </header>

      {!analysis ? (
        <form className={styles.workspace} onSubmit={analyze}>
          <section className={styles.uploadPanel}>
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div><h2>{t('aiEstimate.uploadTitle')}</h2><p>{t('aiEstimate.uploadBody')}</p></div>
            </div>
            <button className={styles.upload} type="button" onClick={() => inputRef.current?.click()}>
              {preview ? <img src={preview} alt={t('aiEstimate.previewAlt')} /> : (
                <><strong>+</strong><span>{t('aiEstimate.upload')}</span><small>{t('aiEstimate.uploadHint')}</small></>
              )}
            </button>
            <input ref={inputRef} className={styles.hidden} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} />
          </section>

          <section className={styles.detailsPanel}>
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div><h2>{t('aiEstimate.detailsTitle')}</h2><p>{t('aiEstimate.detailsBody')}</p></div>
            </div>
            <label className={styles.field}>
              <span>{t('aiEstimate.placement')}</span>
              <input value={placement} onChange={(event) => setPlacement(event.target.value)} placeholder={t('aiEstimate.placementPlaceholder')} />
            </label>
            <label className={styles.field}>
              <span>{t('aiEstimate.size')}</span>
              <select value={size} onChange={(event) => setSize(event.target.value)}>
                <option value="">{t('aiEstimate.select')}</option>
                {['small', 'medium', 'large', 'full'].map((value) => <option key={value} value={value}>{t(`aiEstimate.sizes.${value}`)}</option>)}
              </select>
            </label>
            <label className={styles.field}>
              <span>{t('aiEstimate.notes')}</span>
              <textarea rows="4" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder={t('aiEstimate.notesPlaceholder')} />
            </label>
            <label className={styles.consent}>
              <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
              <span>{t('aiEstimate.consent')}</span>
            </label>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.analyzeButton} type="submit" disabled={!image || !placement || !size || !consent || status === 'loading'}>
              {status === 'loading' ? t('aiEstimate.analyzing') : t('aiEstimate.analyze')}
            </button>
            <p className={styles.notice}>{t('aiEstimate.security')}</p>
          </section>
        </form>
      ) : (
        <section className={styles.result}>
          <div className={styles.resultTop}>
            <img src={preview} alt={t('aiEstimate.previewAlt')} />
            <div className={styles.resultIntro}>
              <SectionLabel>{t('aiEstimate.resultLabel')}</SectionLabel>
              <h2>{t('aiEstimate.resultTitle')}</h2>
              <div className={styles.confidence}>
                <div><span>{t('aiEstimate.confidence')}</span><strong>{Math.round(analysis.confidence * 100)}%</strong></div>
                <div className={styles.meter}><span style={{ width: `${analysis.confidence * 100}%` }} /></div>
              </div>
            </div>
          </div>

          <div className={styles.priceBox}>
            <span>{t('aiEstimate.priceRange')}</span>
            <strong>฿{analysis.priceRange.min.toLocaleString()} - ฿{analysis.priceRange.max.toLocaleString()}</strong>
            <p>{t('aiEstimate.priceDisclaimer')}</p>
          </div>

          <div className={styles.analysisGrid}>
            <article><span>{t('aiEstimate.style')}</span><strong>{analysis.style}</strong></article>
            <article><span>{t('aiEstimate.complexity')}</span><strong>{analysis.complexity}</strong></article>
            <article><span>{t('aiEstimate.coverage')}</span><strong>{analysis.estimatedCoveragePercent}%</strong></article>
            <article><span>{t('aiEstimate.hours')}</span><strong>{analysis.estimatedHours.min} - {analysis.estimatedHours.max}</strong></article>
          </div>

          <div className={styles.lists}>
            <ResultList title={t('aiEstimate.detected')} items={analysis.detectedElements} />
            <ResultList title={t('aiEstimate.assumptions')} items={analysis.assumptions} />
            <ResultList title={t('aiEstimate.warnings')} items={analysis.warnings} warning />
          </div>
          <div className={styles.actions}>
            <button onClick={reset}>{t('aiEstimate.tryAnother')}</button>
            <Button variant="outline" to="/" sectionId="contact">{t('aiEstimate.artistReview')}</Button>
          </div>
        </section>
      )}
    </main>
  )
}

function ResultList({ title, items = [], warning = false }) {
  return (
    <article className={warning ? styles.warningList : styles.resultList}>
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
  )
}

export default AiEstimatePage
