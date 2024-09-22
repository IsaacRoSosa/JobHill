import React from 'react';
import { logout } from '@/app/logout/actions'; 
import styles from '@/styles/SideBar.module.css';
import Image from 'next/image';

function LogOut() {

  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} className={styles.logout}>
      <Image src="/Images/sidebar/logout.png" alt="Logout" width={30} height={30} />
    </button>
  );
}

export default LogOut;
