import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { InputContentHash, InputContentHashJSON } from 'chora/components/data'

import SelectInput from '../SelectInput'

import styles from './QueryResolversByHash.module.css'

const queryResolversByHash = '/regen/data/v1/resolvers-by-hash'

const QueryResolversByHash = () => {
  const { chainInfo } = useContext(WalletContext)

  const [input, setInput] = useState('form')
  const [contentHash, setContentHash] = useState<any>(undefined)
  const [contentHashJson, setContentHashJson] = useState<string>('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    let body: string

    if (input == 'form') {
      body = JSON.stringify({ contentHash: contentHash })
    } else {
      let ch = ''
      try {
        ch = JSON.parse(contentHashJson)
      } catch (err) {
        setError('invalid json')
        return // exit on error
      }
      body = JSON.stringify({ contentHash: ch })
    }

    fetch(chainInfo.rest + queryResolversByHash, {
      method: 'POST',
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, '  '))
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  const handleSetInput = (input: string) => {
    setInput(input)
    setError(undefined)
    setSuccess(undefined)
  }

  return (
    <div id="query-resolvers-by-hash" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryResolversByHash'}</h2>
        <p>{'query data resolvers by the content hash of the data'}</p>
      </div>
      <SelectInput input={input} setInput={handleSetInput} />
      {input == 'form' ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputContentHash
            id="query-resolvers-by-hash-content-hash"
            contentHash={contentHash}
            setContentHash={setContentHash}
          />
          <button type="submit">{'search'}</button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputContentHashJSON
            id="query-resolvers-by-hash-content-hash"
            json={contentHashJson}
            setJson={setContentHashJson}
          />
          <button type="submit">{'search'}</button>
        </form>
      )}
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryResolversByHash