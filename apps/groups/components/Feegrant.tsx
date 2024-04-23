'use client'

import { WalletContext } from 'chora/contexts'
import { useFeeGrants } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import FeegrantAllowance from '@components/FeegrantAllowance'

import styles from './Feegrant.module.css'

const Feegrant = () => {
  const { address } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch feegrant allowances by address from selected network
  const [feeGrantee, feeGranter, error] = useFeeGrants(chainInfo, `${address}`)

  // view options
  const [filter, setFilter] = useState<string>('grantee')

  // reset state on address or network change
  useEffect(() => {
    setFilter('grantee')
  }, [address, chainInfo?.chainId])

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={filter === 'grantee' ? styles.boxOptionActive : undefined}
          onClick={() => setFilter('grantee')}
        >
          {'grantee'}
        </button>
        <button
          className={filter === 'granter' ? styles.boxOptionActive : undefined}
          onClick={() => setFilter('granter')}
        >
          {'granter'}
        </button>
      </div>
      {!error && !feeGrantee && !feeGranter && <div>{'loading...'}</div>}
      {filter === 'grantee' && (
        <div>
          {Array.isArray(feeGrantee) &&
            feeGrantee.map((allowance, i) => (
              <FeegrantAllowance key={i} allowance={allowance} />
            ))}
          {feeGrantee && feeGrantee.length === 0 && (
            <div>{'no fee allowances granted to this account'}</div>
          )}
        </div>
      )}
      {filter === 'granter' && (
        <div>
          {Array.isArray(feeGranter) &&
            feeGranter.map((allowance, i) => (
              <FeegrantAllowance key={i} allowance={allowance} />
            ))}
          {feeGranter && feeGranter.length === 0 && (
            <div>{'no fee allowances granted by this account'}</div>
          )}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}

export default Feegrant
