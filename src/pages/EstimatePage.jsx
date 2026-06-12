import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import SectionLabel from '../components/ui/SectionLabel'
import styles from './EstimatePage.module.css'

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const STEPS = ['reference', 'placement', 'details', 'review']
const SIZE_MULTIPLIERS = { small: 1, medium: 1.8, large: 3, sleeve: 5 }
const STYLE_MULTIPLIERS = { fineline: 1, blackwork: 1.25, realism: 1.8, custom: 1.45, other: 1.2 }

const initialForm = {
  image: null,
  imagePreview: '',
  size: '',
  placement: '',
  style: '',
  color: 'black',
  coverUp: false,
  details: '',
  contact: '',
  consent: false,
}

function EstimatePage() {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [fileError, setFileError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const priceRange = useMemo(() => {
    const size = SIZE_MULTIPLIERS[form.size] || 1
    const style = STYLE_MULTIPLIERS[form.style] || 1
    const coverUp = form.coverUp ? 1.35 : 1
    const color = form.color === 'color' ? 1.2 : 1
    const midpoint = Math.round((1800 * size * style * coverUp * color) / 100) * 100
    return {
      min: Math.max(1500, Math.round(midpoint * 0.8 / 100) * 100),
      max: Math.max(2500, Math.round(midpoint * 1.35 / 100) * 100),
    }
  }, [form])

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    setFileError('')
    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError(t('estimate.fileTypeError'))
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(t('estimate.fileSizeError'))
      return
    }
    if (form.imagePreview) URL.revokeObjectURL(form.imagePreview)
    setForm((current) => ({ ...current, image: file, imagePreview: URL.createObjectURL(file) }))
  }

  const canContinue = [
    Boolean(form.image),
    Boolean(form.size && form.placement),
    Boolean(form.style && form.details.trim()),
    Boolean(form.contact.trim() && form.consent),
  ][step]

  const submit = () => {
    if (!canContinue) return
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <main className={styles.successPage}>
        <span className={styles.successMark}>TM</span>
        <SectionLabel>{t('estimate.successLabel')}</SectionLabel>
        <h1>{t('estimate.successTitle')}</h1>
        <p>{t('estimate.successBody')}</p>
        <div className={styles.successActions}>
          <Button variant="outline" to="/">{t('estimate.backHome')}</Button>
          <button className={styles.textButton} onClick={() => { setForm(initialForm); setStep(0); setSubmitted(false) }}>
            {t('estimate.newEstimate')}
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <SectionLabel>{t('estimate.label')}</SectionLabel>
        <h1>{t('estimate.title')}</h1>
        <p>{t('estimate.intro')}</p>
      </header>

      <div className={styles.shell}>
        <ol className={styles.progress} aria-label={t('estimate.progressLabel')}>
          {STEPS.map((name, index) => (
            <li key={name} className={index <= step ? styles.progressActive : ''}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{t(`estimate.steps.${name}`)}</p>
            </li>
          ))}
        </ol>

        <section className={styles.panel}>
          {step === 0 && (
            <>
              <div className={styles.panelHeading}>
                <p>{t('estimate.stepCount', { current: 1, total: 4 })}</p>
                <h2>{t('estimate.referenceTitle')}</h2>
                <span>{t('estimate.referenceBody')}</span>
              </div>
              <button className={styles.upload} type="button" onClick={() => inputRef.current?.click()}>
                {form.imagePreview ? (
                  <img src={form.imagePreview} alt={t('estimate.previewAlt')} />
                ) : (
                  <>
                    <strong>+</strong>
                    <span>{t('estimate.upload')}</span>
                    <small>{t('estimate.uploadHint')}</small>
                  </>
                )}
              </button>
              <input ref={inputRef} className={styles.hiddenInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} />
              {fileError && <p className={styles.error} role="alert">{fileError}</p>}
              <p className={styles.privacy}>{t('estimate.privacy')}</p>
            </>
          )}

          {step === 1 && (
            <>
              <div className={styles.panelHeading}>
                <p>{t('estimate.stepCount', { current: 2, total: 4 })}</p>
                <h2>{t('estimate.placementTitle')}</h2>
                <span>{t('estimate.placementBody')}</span>
              </div>
              <fieldset className={styles.fieldset}>
                <legend>{t('estimate.sizeLabel')}</legend>
                <div className={styles.optionGrid}>
                  {['small', 'medium', 'large', 'sleeve'].map((value) => (
                    <button key={value} type="button" className={form.size === value ? styles.selected : ''} onClick={() => update('size', value)}>
                      <strong>{t(`estimate.sizes.${value}.title`)}</strong>
                      <span>{t(`estimate.sizes.${value}.desc`)}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className={styles.field}>
                <span>{t('estimate.placementLabel')}</span>
                <input value={form.placement} onChange={(event) => update('placement', event.target.value)} placeholder={t('estimate.placementPlaceholder')} />
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <div className={styles.panelHeading}>
                <p>{t('estimate.stepCount', { current: 3, total: 4 })}</p>
                <h2>{t('estimate.detailsTitle')}</h2>
                <span>{t('estimate.detailsBody')}</span>
              </div>
              <div className={styles.twoColumns}>
                <label className={styles.field}>
                  <span>{t('estimate.styleLabel')}</span>
                  <select value={form.style} onChange={(event) => update('style', event.target.value)}>
                    <option value="">{t('estimate.select')}</option>
                    {['fineline', 'blackwork', 'realism', 'custom', 'other'].map((value) => (
                      <option key={value} value={value}>{t(`estimate.styles.${value}`)}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>{t('estimate.colorLabel')}</span>
                  <select value={form.color} onChange={(event) => update('color', event.target.value)}>
                    <option value="black">{t('estimate.colors.black')}</option>
                    <option value="color">{t('estimate.colors.color')}</option>
                  </select>
                </label>
              </div>
              <label className={styles.check}>
                <input type="checkbox" checked={form.coverUp} onChange={(event) => update('coverUp', event.target.checked)} />
                <span>{t('estimate.coverUp')}</span>
              </label>
              <label className={styles.field}>
                <span>{t('estimate.detailsLabel')}</span>
                <textarea rows="5" value={form.details} onChange={(event) => update('details', event.target.value)} placeholder={t('estimate.detailsPlaceholder')} />
              </label>
            </>
          )}

          {step === 3 && (
            <>
              <div className={styles.panelHeading}>
                <p>{t('estimate.stepCount', { current: 4, total: 4 })}</p>
                <h2>{t('estimate.reviewTitle')}</h2>
                <span>{t('estimate.reviewBody')}</span>
              </div>
              <div className={styles.reviewGrid}>
                <img src={form.imagePreview} alt={t('estimate.previewAlt')} />
                <dl>
                  <div><dt>{t('estimate.sizeLabel')}</dt><dd>{t(`estimate.sizes.${form.size}.title`)}</dd></div>
                  <div><dt>{t('estimate.placementLabel')}</dt><dd>{form.placement}</dd></div>
                  <div><dt>{t('estimate.styleLabel')}</dt><dd>{t(`estimate.styles.${form.style}`)}</dd></div>
                  <div><dt>{t('estimate.colorLabel')}</dt><dd>{t(`estimate.colors.${form.color}`)}</dd></div>
                </dl>
              </div>
              <div className={styles.priceBox}>
                <span>{t('estimate.rangeLabel')}</span>
                <strong>฿{priceRange.min.toLocaleString()} - ฿{priceRange.max.toLocaleString()}</strong>
                <p>{t('estimate.disclaimer')}</p>
              </div>
              <label className={styles.field}>
                <span>{t('estimate.contactLabel')}</span>
                <input value={form.contact} onChange={(event) => update('contact', event.target.value)} placeholder={t('estimate.contactPlaceholder')} />
              </label>
              <label className={styles.check}>
                <input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} />
                <span>{t('estimate.consent')}</span>
              </label>
            </>
          )}

          <div className={styles.actions}>
            {step > 0 ? <button className={styles.textButton} onClick={() => setStep((current) => current - 1)}>{t('estimate.back')}</button> : <span />}
            <button className={styles.primaryButton} disabled={!canContinue} onClick={() => step === 3 ? submit() : setStep((current) => current + 1)}>
              {step === 3 ? t('estimate.submit') : t('estimate.continue')}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default EstimatePage
