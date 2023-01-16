import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./GroupProposalPreview.module.css"

const serverUrl = "https://server.chora.io"

const GroupProposalPreview = ({ proposal }) => {

  // error and success
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setMetadata(null)
    setError("")

    // async function workaround
    const fetchMetadata = async () => {

      // fetch proposal data from chora server
      await fetch(serverUrl + "/" + proposal["metadata"])
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
            setMetadata(null)
          } else if (res.context !== "https://schema.chora.io/contexts/group_proposal.jsonld") {
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
    fetchMetadata().catch(err => {
      setError(err.message)
    })
  }, [proposal["metadata"]])

  return (
    <div className={styles.container}>
      <div>
        {!proposal && !metadata && !error && (
          <div>
            {"loading..."}
          </div>
        )}
        {proposal && metadata && !error && (
          <div>
            <div className={styles.item}>
              <h3>
                {"status"}
              </h3>
              <p>
                {proposal["status"]}
              </p>
            </div>
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
                {"voting period end"}
              </h3>
              <p>
                {formatTimestamp(proposal["voting_period_end"])}
              </p>
            </div>
            <Link to={`/proposals/?id=${proposal["id"]}`}>
              {"view proposal"}
            </Link>
          </div>
        )}
        {error && (
          <div>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupProposalPreview
