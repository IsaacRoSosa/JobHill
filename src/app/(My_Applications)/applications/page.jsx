import React from 'react'
import styles from '@/styles/applicationPage.module.css'
import AppFetcher from '@/components/AppFetcher'

function page() {
  return (
    <div className={styles.page}>
      <div className={styles.header}> 
        <h1 className={styles.pageTitle}>My Applications</h1>
      </div>
      <div className={styles.appContainer}>
        <div className={styles.contentCenter}>
        <AppFetcher />

        </div>

        
      </div>

     

    </div>
  )
}

export default page 