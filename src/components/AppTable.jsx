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
    <div className={styles.tableContainer}>
      <table className={styles.applicationTable}>
        <thead>
          <tr>
            <th>Company</th>
            <th className={styles.role}>Role</th>
            <th>Applied</th>
            <th>Last Updated</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Referral</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((app, index) => (
            <tr key={index}>
              <td>{app.company}</td>
              <td className={styles.role}>{app.role}</td>
              <td>{app.applied}</td>
              <td>{app.lastUpdated}</td>
              <td>{app.dueDate}</td>
              <td><span className={styles.statusLabel}>{app.status}</span></td>
              <td><span className={styles.referralLabel}>{app.referral}</span></td>
              <td>
                <button className={styles.timelineButton}>Timeline</button>
                <button className={styles.editButton}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
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