import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../contexts/WalletContext"

import Result from "../Result"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryNodes.module.css"

const queryNodes = "/chora/geonode/v1/nodes"

const QueryNodes = () => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryNodes)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, "  "))
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
          <SelectNetwork />
          <button type="submit">
            {"search"}
          </button>
        </form>
      </div>
      <Result
        error={error}
        success={success}
      />
    </>
  )
}

export default QueryNodes