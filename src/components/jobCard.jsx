
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/jobCard.module.css';
import ApplyButton from '@/components/JobCardActions/ApplyButton';
import AddApplicationButton from '@/components/JobCardActions/AddApplicationButton';

const JobCard = ({ job }) => {


    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <img src={job.companyLogo} alt={`${job.companyName} logo`} width={70} height={70} className={styles.companyImage} />
                <div className={styles.titleContainer}>
                    <h2 className={styles.title}>{job.title}</h2>
                    <p className={styles.companyName}>{job.companyName} - <span className={styles.postedDays}>{job.postedDays}</span></p>
                </div>
            </div>

            <div className={styles.halfs}>
                <div className={styles.details}>
                    <p className={styles.info}><Image src="/Images/jobCard/location.png" alt="Location" width={18} height={18} /> {job.location}</p>
                    <p className={styles.info}><Image src="/Images/jobCard/clock.png" alt="Type" width={18} height={18} /> {job.type}</p>
                    <p className={styles.info}><Image src="/Images/jobCard/remote.png" alt="Modality" width={18} height={18} /> {job.modality}</p>
                </div>

                <div className={styles.additionalInfo}>
                    <p className={styles.info}><Image src="/Images/jobCard/calendar.png" alt="Period" width={18} height={18} /> {job.period}</p>
                    <p className={styles.info}><Image src="/Images/jobCard/category.png" alt="Category" width={18} height={18} /> {job.categories}</p>

                    <div className={styles.actions}>
                        <ApplyButton applicationLink={job.application_link} />
                        <AddApplicationButton job={job} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
