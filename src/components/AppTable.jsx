import React, { useState } from 'react';
import styles from '@/styles/appTable.module.css';

const AppTable = ({ applications }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 7; // Change to 8 applications per view

  // Calculate total pages
  const totalPages = Math.ceil(applications.length / applicationsPerPage);

  // Calculate the applications for the current page
  const startIdx = (currentPage - 1) * applicationsPerPage;
  const endIdx = startIdx + applicationsPerPage;
  const currentApplications = applications.slice(startIdx, endIdx);

  // Update the page number
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    } 
  };

  return (
    <div className={styles.tableWrapper}>
    <div className={styles.tableContainer}>
      <table className={styles.applicationTable}>
        <thead>
          <tr>
            <th>Company</th>
            <th className={styles.role}>Role</th>
            <th className={styles.location}>Location</th> {/* Add the new column here */}
            <th className={styles.dates}>Applied</th>
            <th className={styles.dates}>Last Updated</th>
            <th className={styles.dates}>Due Date</th>
            <th>Status</th>
            <th>Referral</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((app, index) => (
            <tr key={index}>
              <td>{app.companyName}</td>
              <td className={styles.role}>
                <a href={app.applicationLink} target="_blank" rel="noreferrer">
                  {app.role}
                </a>
              </td>
              <td className={styles.location}>{app.location}</td> 
              <td className={styles.appliedDate}>{app.appliedDate}</td>
              <td className={styles.lastUpdated}>{app.lastUpdated}</td>
              <td className={styles.updateBy}>{app.updatedBy}</td>
              <td><span className={styles.statusLabel}>{app.status}</span></td>
              <td><span className={styles.referralLabel}>{app.referralType}</span></td>
              <td>
                <button className={styles.timelineButton}>Timeline</button>
                <button className={styles.editButton}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <footer className={styles.tableFooter}>
      <div className={styles.paginationInfo}>
        Showing from {startIdx + 1} to {endIdx > applications.length ? applications.length : endIdx} of {applications.length} applications
      </div>
      <div className={styles.paginationControls}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </footer>
  </div>
  
  );
};

export default AppTable;
