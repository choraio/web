'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { ResultTx } from 'chora/components'
import { MsgSealBatch as MsgInputs } from 'chora/components/ecocredit'
import { signAndBroadcast } from 'chora/utils'

import styles from './MsgSealBatch.module.css'

const MsgSealBatch = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [message, setMessage] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    await signAndBroadcast(chainInfo, wallet['bech32Address'], [message])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="msg-seal-batch" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgSealBatch'}</h2>
        <p>{'seal an unsealed credit batch'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs
          network={network}
          setMessage={setMessage}
          useWallet={true}
          wallet={wallet}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default MsgSealBatch
