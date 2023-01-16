import * as React from "react"

import Main from "../../layouts/Main"
import GroupMember from "../../components/members/GroupMember"
import GroupMembers from "../../components/members/GroupMembers"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const Members = ({ location }) => {

  const urlParams = new URLSearchParams(location["search"])
  const memberAddress = urlParams.get("address")

  return (
    <Main>
      <div className={styles.page}>
        {memberAddress ? (
          <div>
            <h1>
              {"group member"}
            </h1>
            <div className={styles.section}>
              <GroupMember memberAddress={memberAddress} />
            </div>
          </div>
        ) : (
          <div>
            <h1>
              {"group members"}
            </h1>
            <div className={styles.section}>
              <GroupMembers />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Members
