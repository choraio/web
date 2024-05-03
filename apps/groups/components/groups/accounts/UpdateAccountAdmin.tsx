'use client'

import { Permissions, ResultTx } from 'chora/components'
import { InputAddress } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { MsgUpdateGroupPolicyAdmin } from 'cosmos/api/cosmos/group/v1/tx'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

import { usePermissionsAdmin } from '@hooks/usePermissionsAdmin'

import styles from './UpdateAccountAdmin.module.css'
import { GroupContext } from '@contexts/GroupContext'

const UpdateAccountAdmin = () => {
  const { address } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [isAdmin, isPolicy, isAuthz, permError] = usePermissionsAdmin(
    wallet,
    '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
  )

  // error fetching initial parameters
  const initError = policiesError || permError

  // form inputs
  const [newAdmin, setNewAdmin] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    // set message
    const msg = {
      $type: 'cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
      admin: wallet.bech32Address,
      groupPolicyAddress: `${address}`,
      newAdmin: newAdmin,
    } as unknown as MsgUpdateGroupPolicyAdmin

    // convert message to any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
      value: MsgUpdateGroupPolicyAdmin.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        if (err.message === "Cannot read properties of null (reading 'key')") {
          setError('keplr account does not exist on the selected network')
        } else {
          setError(err.message)
        }
      })
  }

  return (
    <div className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'admin account',
            hasPermission: isAdmin,
          },
          {
            label: 'policy + member',
            hasPermission: isPolicy,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="account-admin"
          label="account admin"
          network={network}
          address={newAdmin}
          initAddress={policies?.find((p: any) => p.address === address)?.admin}
          setAddress={setNewAdmin}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <div className={styles.boxText}>
        <ResultTx
          error={error || initError}
          rest={chainInfo?.rest}
          success={success}
        />
      </div>
    </div>
  )
}

export default UpdateAccountAdmin
