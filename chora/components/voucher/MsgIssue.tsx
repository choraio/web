import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgIssue as Msg } from "../../api/chora/voucher/v1/msg"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputNumber from "../InputNumber"
import InputTimestamp from "../InputTimestamp"

const MsgIssue = ({ network, setMessage, useWallet, wallet }: any) => {

  const [id, setId] = useState<string>("")
  const [issuer, setIssuer] = useState<string>("")
  const [recipient, setRecipient] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [expiration, setExpiration] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.voucher.v1.MsgIssue",
        id: Long.fromString(id || "0"),
        issuer: wallet ? wallet.bech32Address : issuer,
        recipient: recipient,
        amount: amount,
        expiration: new Date(expiration),
        metadata: metadata,
    } as Msg

    const msgAny = {
        typeUrl: "/chora.voucher.v1.MsgIssue",
        value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [id, issuer, recipient, amount, expiration, metadata, wallet])

  return (
    <>
      <InputNumber
        id="msg-issue-id"
        label="voucher id"
        network={network}
        number={id}
        setNumber={setId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-issue-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputAddress
        id="msg-issue-recipient"
        label="recipient"
        network={network}
        address={recipient}
        setAddress={setRecipient}
      />
      <InputNumber
        id="msg-issue-amount"
        label="amount"
        placeholder="1.25"
        number={amount}
        setNumber={setAmount}
      />
      <InputTimestamp
        id="msg-issue-expiration"
        label="expiration"
        timestamp={expiration}
        setTimestamp={setExpiration}
      />
      <InputIRI
        id="msg-issue-metadata"
        label="metadata"
        iri={metadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgIssue