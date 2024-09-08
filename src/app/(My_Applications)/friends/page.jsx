import React from 'react'
import styles from '@/styles/friendsPage.module.css'
import OnDevelopment from '@/components/OnDevelopmet'

function page() {
  return (
    <div className={styles.page}>
    <div className={styles.header}> 
      <h1 className={styles.pageTitle}>Friends</h1>
    </div>
    <div className={styles.appContainer}>
      <div className={styles.contentCenter}>
        <OnDevelopment/>
      </div>
    </div>
  </div>
  )
}

export default page