import { Metadata } from 'next'

import Authz from '@components/Authz'
import Feegrant from '@components/Feegrant'
import Account from '@components/groups/accounts/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const AccountPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group account'}</h1>
      <Account />
      <h1>{'authorizations'}</h1>
      <Authz />
      <h1>{'fee allowances'}</h1>
      <Feegrant />
    </div>
  </div>
)

export default AccountPage