import { formatTimestamp } from 'chora/utils'

import styles from './FeegrantAllowance.module.css'

const FeegrantAllowance = ({ allowance }: any) => {
  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'granter'}</h3>
        <p>{allowance.granter}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'grantee'}</h3>
        <p>{allowance.grantee}</p>
      </div>
      {allowance['allowance']['@type'] ===
        '/cosmos.feegrant.v1beta1.BasicAllowance' && (
        <>
          {allowance['allowance']['spend_limit'].map(
            (spendLimit: any, i: number) => (
              <div className={styles.boxText} key={i}>
                <h3>{'spend limit'}</h3>
                <p>{spendLimit['amount'] + spendLimit['denom']}</p>
              </div>
            ),
          )}
          <div className={styles.boxText}>
            <h3>{'expiration'}</h3>
            <p>{formatTimestamp(allowance['allowance']['expiration'])}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default FeegrantAllowance