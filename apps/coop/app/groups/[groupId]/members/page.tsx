import { Metadata } from 'next'

import Members from '@components/groups/members/Members'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const MembersPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group members'}</h1>
      <Members />
    </div>
  </div>
)

export default MembersPage