import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Balances from '@components/groups/vouchers/Balances'
import Voucher from '@components/groups/vouchers/Voucher'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const VoucherPage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="vouchers" />
      <h1>{'voucher'}</h1>
      <Voucher />
      <h1>{'balances'}</h1>
      <Balances />
    </div>
  </div>
)

export default VoucherPage
