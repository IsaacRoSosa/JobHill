import React, { useState } from 'react';
import { createClient } from '/utils/supabase/client';
import styles from '@/styles/deleteButton.module.css';

function DeleteButton({ applicationId, companyName, role, onDeleteSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const supabase = createClient();

  const handleDelete = async () => {
    const { error } = await supabase.from('applications').delete().eq('id', applicationId);

    if (error) {
      setAlertMessage('Error deleting application. Please try again.');
    } else {
      setAlertMessage('Application deleted successfully!');
      setIsModalOpen(false);
      onDeleteSuccess(); 
    }
    setTimeout(() => {
        setAlertMessage(null);
      }, 2700); 

  };

  return (
    <>
      <button className={styles.deleteButton} onClick={() => setIsModalOpen(true)}>
        Delete
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete {companyName} - {role} Application?</h3>
            <div className={styles.actions}>
              <button className={styles.confirmButton} onClick={handleDelete}>
                Yes
              </button>
              <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
    </>
  );
}

export default DeleteButton;
