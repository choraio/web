import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora | data management',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'data management'}</h1>
    </div>
  </div>
)

export default HomePage
