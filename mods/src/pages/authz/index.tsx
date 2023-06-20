import * as React from "react"
import { useState } from "react"

import { authzModule } from "chora/modules"

import Main from "../../layouts/Main"
import MoreInfo from "../../components/MoreInfo"
import Seo from "../../components/SeoWrapper"

import MsgExec from "../../components/authz/MsgExec"
import MsgGrant from "../../components/authz/MsgGrant"
import MsgRevoke from "../../components/authz/MsgRevoke"
import QueryGranteeGrants from "../../components/authz/QueryGranteeGrants"
import QueryGranterGrants from "../../components/authz/QueryGranterGrants"
import QueryGrants from "../../components/authz/QueryGrants"

import * as styles from "./index.module.css"

const AuthzPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <Main>
      <div className={styles.page}>
        <div>
          <h1>
            {"authz module"}
          </h1>
          <button className={styles.infoButton} onClick={handleShowInfo}>
            {showInfo ? "less info" : "more info"}
          </button>
          <div className={styles.box}>
            {showInfo && <MoreInfo module={authzModule} />}
            <ul>
              <li>
                <a href="#msg-exec">
                  {'MsgExec'}
                </a>
              </li>
              <li>
                <a href="#msg-grant">
                  {'MsgGrant'}
                </a>
              </li>
              <li>
                <a href="#msg-revoke">
                  {'MsgRevoke'}
                </a>
              </li>
              <li>
                <a href="#query-grantee-grants">
                  {'QueryGranteeGrants'}
                </a>
              </li>
              <li>
                <a href="#query-granter-grants">
                  {'QueryGranterGrants'}
                </a>
              </li>
              <li>
                <a href="#query-grants">
                  {'QueryGrants'}
                </a>
              </li>
            </ul>
          </div>
          <MsgExec />
          <MsgGrant />
          <MsgRevoke />
          <QueryGranteeGrants />
          <QueryGranterGrants />
          <QueryGrants />
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default AuthzPage
