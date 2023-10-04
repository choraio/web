import { ConnectWallet, Faucet } from 'chora/components'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora | faucet',
}

const FaucetPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'token faucet'}</h1>
      <ConnectWallet />
      <Faucet />
    </div>
  </div>
)

export default FaucetPage
