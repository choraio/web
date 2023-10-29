import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora | blockchain modules',
}

const HomePage = () => (
  <div className={styles.page} style={{ alignItems: 'center' }}>
    <div>
      <h1>{'blockchain modules'}</h1>
    </div>
  </div>
)

export default HomePage
