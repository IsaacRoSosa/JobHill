import React, { useState } from 'react';
import { logout } from '@/app/logout/actions';
import styles from '@/styles/SideBar.module.css';
import Image from 'next/image';

function LogOut() {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = async () => {
    await handleLogout();
    handleCloseModal();
  };

  return (
    <>
      <button onClick={handleOpenModal} className={styles.logout}>
        <Image src="/Images/sidebar/logout.png" alt="Logout" width={30} height={30} />
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className={styles.modalActions}>
              <button onClick={handleConfirmLogout} className={styles.confirmButton}>
                Yes
              </button>
              <button onClick={handleCloseModal} className={styles.cancelButton}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogOut;
