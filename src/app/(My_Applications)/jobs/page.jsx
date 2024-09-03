import React from 'react'
import styles from '@/styles/jobPage.module.css'
import JobFetcher from '@/components/JobFetcher'

function page() {
  return (
    <div className={styles.page}>
      <div className={styles.header}> 
        <h1 className={styles.pageTitle}>Job Applications</h1>
      </div>
      <div className={styles.jobContainer}>
        <JobFetcher />
      </div>

    

    </div>
  )
}

export default page 