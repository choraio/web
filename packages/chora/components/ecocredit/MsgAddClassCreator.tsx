import * as React from 'react'
import { useEffect, useState } from 'react'

import { MsgAddClassCreator as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'

import InputAddress from '../InputAddress'

const MsgAddClassCreator = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [authority, setAuthority] = useState<string>('')
  const [creator, setCreator] = useState<string>('')

  useEffect(() => {
    const msg = {
      authority: wallet ? wallet.bech32Address : authority,
      creator: creator,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgAddClassCreator',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [authority, creator, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-add-class-creator-authority"
          label="authority"
          long={true}
          network={network}
          address={authority}
          setAddress={setAuthority}
        />
      )}
      <InputAddress
        id="msg-add-class-creator-creator"
        label="creator"
        long={true}
        network={network}
        address={creator}
        setAddress={setCreator}
      />
    </>
  )
}

export default MsgAddClassCreator
