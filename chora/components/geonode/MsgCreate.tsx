import * as React from "react"
import { useEffect, useState } from "react"

import { MsgCreate as Msg } from "../../api/chora/geonode/v1/msg"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"

const MsgCreate = ({ network, setMessage, useWallet, wallet }: any) => {

  const [curator, setCurator] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.geonode.v1.MsgCreate",
        curator: wallet ? wallet.bech32Address : curator,
        metadata: metadata,
    } as Msg

    const msgAny = {
        typeUrl: "/chora.geonode.v1.MsgCreate",
        value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [curator, metadata, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-create-curator"
          label="curator"
          long={true}
          network={network}
          address={curator}
          setAddress={setCurator}
        />
      )}
      <InputIRI
        id="msg-create-metadata"
        label="metadata"
        iri={metadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgCreate