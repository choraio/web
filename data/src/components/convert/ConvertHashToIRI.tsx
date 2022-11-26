import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./ConvertIRIToHash.module.css"

const convertIRIToHash = "/regen/data/v1/convert-hash-to-iri"
const hashPlaceholder = `{
  "content_hash": {
    "graph": {
      "hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      "digest_algorithm": "DIGEST_ALGORITHM_BLAKE2B_256",
      "canonicalization_algorithm": "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015",
      "merkle_tree": "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"
    }
  }
}`

const ConvertHashToIRI = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  const [hash, setIri] = useState("")
  const [error, setError] = useState("")
  const [result, setResult] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setResult("")

    fetch(chainInfo.rest + convertIRIToHash, {
      method: "POST",
      body: hash,
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setResult(data.iri)
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="hash">
            {"content hash"}
            <textarea
              id="hash"
              value={hash}
              placeholder={hashPlaceholder}
              onChange={event => setIri(event.target.value)}
            />
          </label>
          <SelectNetwork />
          <button type="submit">
            {"convert"}
          </button>
        </form>
      </div>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {result != "" && (
        <div>
          <pre>
            {result}
          </pre>
        </div>
      )}
    </>
  )
}

export default ConvertHashToIRI
