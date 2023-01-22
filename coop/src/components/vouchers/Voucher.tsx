import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import * as styles from "./Voucher.module.css"

const queryVoucher = "chora/voucher/v1/voucher"
const serverUrl = "https://server.chora.io"

const Voucher = ({ voucherId }) => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [voucher, setVoucher] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setVoucher(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch voucher if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchVoucherAndMetadata = async () => {

        // voucher metadata
        let iri: string

        // fetch voucher from selected network
        await fetch(chainInfo.rest + "/" + queryVoucher + "/" + voucherId)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              setVoucher(res)
              iri = res["metadata"]
            }
          })

        // return on error (iri never set)
        if (typeof iri === "undefined") {
          return
        }

        // fetch voucher data from chora server
        await fetch(serverUrl + "/" + iri)
          .then(res => res.json())
          .then(res => {
            if (res.error) {
              setError(res.error)
              setMetadata(null)
            } else if (res.context !== "https://schema.chora.io/contexts/voucher.jsonld") {
              setError("unsupported metadata schema")
              setMetadata(null)
            } else {
              setError("")
              setMetadata(JSON.parse(res["jsonld"]))
            }
          })
          .catch(err => {
            setError(err.message)
          })
      }

      // call async function
      fetchVoucherAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!voucher && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {voucher && metadata && !error && (
        <div>
          <div className={styles.item}>
            <h3>
              {"name"}
            </h3>
            <p>
              {metadata["name"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"description"}
            </h3>
            <p>
              {metadata["description"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"issuer"}
            </h3>
            <p>
              {voucher["issuer"]}
            </p>
          </div>
        </div>
      )}
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Voucher