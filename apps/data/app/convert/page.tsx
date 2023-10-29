import { Metadata } from 'next'

import ConvertData from '@components/convert/ConvertData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'data | convert',
}

const ConvertPage = () => (
  <div className={styles.page}>
    <div>
      <ConvertData />
    </div>
  </div>
)

export default ConvertPage
