import { Metadata } from 'next'

import CreateVoucher from '@components/vouchers/CreateVoucher'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'create voucher'}</h1>
      <CreateVoucher />
    </div>
  </div>
)

export default CreatePage