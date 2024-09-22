import React, { useState } from 'react';
import styles from '@/styles/appTable.module.css';
import DeleteButton from '@/components/DeleteButton';
import UpdateApplicationButton from '@/components/UpdateApplicationButton';

const AppTable = ({ applications, onApplicationDelete, onApplicationUpdate}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 7;

  const totalPages = Math.ceil(applications.length / applicationsPerPage);
  const startIdx = (currentPage - 1) * applicationsPerPage;
  const endIdx = startIdx + applicationsPerPage;
  const currentApplications = applications.slice(startIdx, endIdx);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    } 
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'offer':
        return styles.offerStatus;
      case 'declined':
        return styles.declinedStatus;
      case 'applied':
        return styles.appliedStatus;
      case 'oa':
        return styles.oaStatus;
      case 'rejected':
        return styles.rejectedStatus;
      case 'technical':
        return styles.technicalStatus
      case 'behavioural':
        return styles.behaviouralStatus
      case 'accepted':
        return styles.offerStatus;
      default:
        return '';
    }
  };

  const getReferralClass = (referral) => {
    switch (referral.toLowerCase()) {
      case 'referred':
        return styles.referredReferral;
      case 'cold apply':
        return styles.coldApplyReferral;
      default:
        return '';
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
              <th className={styles.location}>Location</th>
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
                <td className={styles.companyName}>{app.companyName}</td>
                <td className={styles.role}>
                  <a href={app.applicationLink} target="_blank" rel="noreferrer">
                    {app.role}
                  </a>
                </td>
                <td className={styles.location}>{app.location}</td> 
                <td className={styles.appliedDate}>{app.appliedDate}</td>
                <td className={styles.lastUpdated}>{app.lastUpdated}</td>
                <td className={styles.updateBy}>{app.updatedBy}</td>
                <td><span className={`${styles.statusLabel} ${getStatusClass(app.status)}`}>{app.status}</span></td>
                <td><span className={`${styles.referralLabel} ${getReferralClass(app.referralType)}`}>{app.referralType}</span></td>
                <td className={styles.buttons}>
                <DeleteButton 
                    applicationId={app.id} 
                    companyName={app.companyName} 
                    role={app.role}
                    onDeleteSuccess={onApplicationDelete} 
                  />
                <UpdateApplicationButton 
                          application={app} 
                          onUpdateSuccess={onApplicationUpdate} 
                />
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
