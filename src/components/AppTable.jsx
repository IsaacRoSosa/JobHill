import React from 'react';
import styles from '@/styles/appTable.module.css';

const AppTable = ({ applications }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.applicationTable}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Applied</th>
            <th>Last Updated</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Referral</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{app.company}</td>
              <td>{app.role}</td>
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
    </div>
  );
};

export default AppTable;
