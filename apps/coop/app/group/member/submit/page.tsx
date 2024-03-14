import { Metadata } from 'next'

import SubmitApplication from '@components/groups/members/SubmitApplication'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const MembersNewPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'submit application'}</h1>
      <SubmitApplication />
    </div>
  </div>
)

export default MembersNewPage