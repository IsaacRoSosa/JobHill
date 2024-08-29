import React from 'react';
import styles from '@/styles/jobFetcher.module.css';
import JobCard from '@/components/JobCard';
import { createClient } from '/utils/supabase/server';
import dayjs from 'dayjs';

export default async function JobFetcher() {
  const supabase = createClient();
  
  let { data: job_offers, error } = await supabase
    .from('job_offers')
    .select(`
      id,
      job_title,
      location,
      modality,
      period,
      categories,
      created_at,
      application_link,
      companies (name, logo_url)
    `)
    .eq('status', 'Open')
    .order('created_at', { ascending: false })
    .limit(21);

  if (error) {
    console.error('Error fetching job offers:', error);
    return <div>Error fetching job offers</div>;
  }

  // Calcular el tiempo transcurrido desde la fecha de creación
  const jobs = job_offers.map(job => {
    const createdAt = dayjs(job.created_at);
    const now = dayjs();
    const daysAgo = now.diff(createdAt, 'day');
    let postedDays;

    if (daysAgo < 7) {
      postedDays = `${daysAgo} days ago`;
    } else if (daysAgo < 30) {
      const weeksAgo = Math.floor(daysAgo / 7);
      postedDays = `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
    } else {
      const monthsAgo = now.diff(createdAt, 'month');
      postedDays = `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    }

    const displayLocation = job.location.length > 4 ? 'Multiple Locations' : job.location.filter(loc => loc.length > 2).join(', ');


    return {
      companyLogo: job.companies.logo_url,
      companyName: job.companies.name,
      title: job.job_title,
      postedDays,
      location: job.location.length > 4 ? `${job.location.length} locations` : job.location.join(', '), 
      type: 'Full-Time',  // Ajusta esto si es un campo dinámico
      modality: job.modality,
      period: job.period,
      categories: job.categories.join(', '),  
      application_link: job.application_link,
    };
  });

  return (
    <div>
      <div className={styles.filterHeader}>
        {/* Your filter fields remain the same */}
        <div className={styles.filterGroup}>
          <label htmlFor="company">Company</label>
          <input type="text" id="company" placeholder="All" />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="role">Role</label>
          <input type="text" id="role" placeholder="All" />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="modality">Modality</label>
          <input type="text" id="modality" placeholder="All" />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="categories">Categories</label>
          <input type="text" id="categories" placeholder="All" />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="period">Period</label>
          <input type="text" id="period" placeholder="All" />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="orderBy">Order by</label>
          <input type="text" id="orderBy" placeholder="All" />
        </div>
        <button className={styles.resetButton}>Reset</button>
        <button className={styles.searchButton}>Search</button>
      </div>

      <div className={styles.jobGrid}>
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}
