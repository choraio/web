'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import { regenRedwood } from 'chora/chains'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'
import Account from '@components/chain/account/Account'
import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: regenRedwood.chainId,
// }

const RegenRedwoodPage = () => {
  const searchParams = useSearchParams()

  const address = searchParams.get('address')
  const tx = searchParams.get('tx')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{regenRedwood.chainName}</h1>
        </div>
        <div>
          <h3>{`(${regenRedwood.chainId})`}</h3>
        </div>
      </div>
      {address && (
        <div className={styles.content}>
          <Account rest={regenRedwood.rest} address={address} />
        </div>
      )}
      {tx && (
        <div className={styles.content}>
          <Transaction rest={regenRedwood.rest} tx={tx} />
        </div>
      )}
      {!address && !tx && (
        <div className={styles.content}>
          <Validators rest={regenRedwood.rest} />
          <Accounts chainId={regenRedwood.chainId} rest={regenRedwood.rest} />
          <Transactions
            chainId={regenRedwood.chainId}
            rest={regenRedwood.rest}
          />
        </div>
      )}
    </div>
  )
}

export default RegenRedwoodPage