"use client";

import React, {memo} from 'react';
import Image from 'next/image';
import styles from '@/styles/jobCard.module.css';
import ApplyButton from '@/components/JobCardActions/ApplyButton';
import AddApplicationButton from '@/components/JobCardActions/AddApplicationButton';

const JobCard = memo(({ job, onApplicationSuccess }) => {

  const modalityIcon = job.modality === "On Site" ? "/Images/jobCard/office.png" : "/Images/jobCard/remote.png";
  const hasPeriod = job.period && job.period.trim() !== "";

  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.header}>
          <img src={job.companyLogo} alt={`${job.companyName} logo`} className={styles.companyImage} />
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{job.title}</h2>
            <p className={styles.companyName}>{job.companyName} - <span className={styles.postedDays}>{job.postedDays}</span></p>
          </div> 
        </div>
 
        <div className={styles.information}>
          {job.location && (
            <p className={styles.info}><Image src="/Images/jobCard/location.png" alt="Location" width={18} height={18} /> {job.location}</p>
          )}
          {job.type && (
            <p className={styles.info}><Image src="/Images/jobCard/clock.png" alt="Type" width={18} height={18} /> {job.type}</p>
          )}
          {job.modality && (
            <p className={styles.info}><Image src={modalityIcon} alt="Modality" width={18} height={18} /> {job.modality}</p>
          )}
          {job.categories && (
            <p className={styles.info}><Image src="/Images/jobCard/category.png" alt="Category" width={18} height={18} /> {job.categories}</p>
          )}
        </div>

        <div className={styles.actions}>
          <ApplyButton applicationLink={job.application_link} />
          <AddApplicationButton job={job} onApplicationSuccess={onApplicationSuccess} />
        </div>
      </div>
    </div>
  );
});
JobCard.displayName = 'JobCard';
export default JobCard;
