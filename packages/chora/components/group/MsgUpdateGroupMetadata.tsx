import * as React from 'react'
import { useEffect, useState } from 'react'
import * as Long from 'long'

import { MsgUpdateGroupMetadata as Msg } from 'cosmos/api/cosmos/group/v1/tx'

import InputAddress from '../InputAddress'
import InputIRI from '../InputIRI'
import InputNumber from '../InputNumber'

const MsgUpdateGroupMetadata = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      groupId: Long.fromString(groupId || '0'),
      metadata: metadata,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, groupId, metadata, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-group-admin-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-group-admin-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputIRI
        id="msg-update-group-admin-metadata"
        label="new metadata"
        network={network}
        address={metadata}
        setAddress={setMetadata}
      />
    </>
  )
}

export default MsgUpdateGroupMetadata
