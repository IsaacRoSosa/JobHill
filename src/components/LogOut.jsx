import React from 'react';
import styles from '@/styles/SideBar.module.css'; // Ajusta la ruta según tu estructura de proyecto
import Image from 'next/image';

function LogOut() {
  const logout = () => {
    // Lógica de cierre de sesión
  };

  return (
    <button onClick={logout} className={styles.logout}>
      <Image src="/Images/sidebar/logout.png" alt="Logout" width={30} height={30} />
    </button>
  );
}

export default LogOut;