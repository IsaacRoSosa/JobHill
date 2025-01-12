"use client"; 

import React, {memo, useState} from 'react';
import Image from 'next/image'; 
import styles from '@/styles/jobCard.module.css';
import ApplyButton from '@/components/JobCardActions/ApplyButton';
import AddApplicationButton from '@/components/JobCardActions/AddApplicationButton';
import HideApplication from '@/components/JobCardActions/HideApplication';


const JobCard = memo(({ job, onApplicationSuccess, onApplicationHide }) => {
  
 
  const modalityIcon = job.modality === "On Site" ? "/Images/jobCard/office.png" : "/Images/jobCard/remote.png";
  const hasPeriod = job.period && job.period.trim() !== "";
  const [isFading, setIsFading] = useState(false);
  const startFadeOut = () => {
    setIsFading(true)
    setTimeout(() => {

      onApplicationHide(job.job_id)
    }, 300)
  }

  const startFadeAdd = () => {
    setIsFading(true)
    setTimeout(() => {
      onApplicationSuccess(job.job_id)
    }, 300)
  }

  return (
    <div 
    className={`
      ${styles.card} 
      ${isFading ? styles.fadeOut : ""}
    `}
  >
      <div className={styles.cardInfo}>
        <div className={styles.header}>
          <img src={job.companyLogo} alt={`${job.companyName} logo`} className={styles.companyImage} />
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{job.title}</h2>
            <p className={styles.companyName}>{job.companyName} - <span className={styles.postedDays}>{job.postedDays}</span></p>
          </div> 

        </div>
 
        <div className={styles.information}>

          {job.not && (
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
          {(job.requires_usa_citizen == 1 || job.not_offer_sponsor == 1) && (
                   <div className={styles.statusCont}>
                   {job.requires_usa_citizen == 1 && (
                     <Image src="/Images/jobCard/usa.png" alt="Usa Citizenship Required" width={25} height={25} className={styles.status}/>
                   )}
                   {job.not_offer_sponsor == 1 && (
                     <Image src="/Images/jobCard/notSponsors.png" alt="Does NOT offer Sponsor" width={25} height={25} className={styles.status} />
                   )}
     
                 </div>
           )}
        </div>

        <div className={styles.actions}>
          <HideApplication job={job} onConfirmHide={startFadeOut}/>
          <ApplyButton applicationLink={job.application_link} />
          <AddApplicationButton job={job} onApplicationSuccess={startFadeAdd} />
        </div>
      </div>
    </div>
  );
});
JobCard.displayName = 'JobCard';
export default JobCard;
