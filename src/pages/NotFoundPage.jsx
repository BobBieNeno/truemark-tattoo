import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.body')}</p>
      <Button variant="outline" to="/">{t('notFound.home')}</Button>
    </main>
  )
}

export default NotFoundPage
