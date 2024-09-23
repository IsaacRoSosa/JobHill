import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '@/styles/SideBar.module.css';
import { usePathname } from 'next/navigation';
import LogOut from '@/components/LogOut';
import { createClient } from '/utils/supabase/client';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        setUserMetadata(user.user_metadata);
      }
    };

    fetchUser();
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebarState', JSON.stringify(newState));
  };

  const menuItems = [
    { name: 'Jobs', icon: '/Images/sidebar/Jobs.png', route: '/jobs' },
    { name: 'My Applications', icon: '/Images/sidebar/Applications.png', route: '/applications' },
    { name: 'Friends', icon: '/Images/sidebar/Friends.png', route: '/friends' },
    { name: 'News', icon: '/Images/sidebar/news.png', route: '/news' },
  ];

  // Función para obtener el nombre de usuario
  const getUsername = () => {
    return (
      userMetadata?.username ||
      userMetadata?.user_name ||
      userMetadata?.preferred_username ||
      userMetadata?.full_name ||
      userMetadata?.name ||
      'User'
    );
  };

  // Función para obtener la imagen de perfil
  const getAvatarUrl = () => {
    return userMetadata?.avatar_url || '/Images/sidebar/pfp_template.png';
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.logoContainer}>
        <Image
          src="/Images/sidebar/Jobmiga_logo.png"
          alt="Jobmiga Logo"
          width={isOpen ? 60 : 80}
          height={isOpen ? 60 : 80}
          onClick={toggleSidebar}
          className={styles.logo}
        />
        {isOpen && <h1>JOBHILL</h1>}
      </div>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`${item.route === pathname ? styles.active : ''} ${
              isOpen ? styles.openMenuItem : styles.closedMenuItem
            }`}
          >
            <a href={item.route}>
              <Image
                src={item.icon}
                alt={`${item.name} Icon`}
                width={isOpen ? 40 : 40}
                height={isOpen ? 40 : 40}
              />
              {isOpen && <span className={styles.menuItemText}>{item.name}</span>}
            </a>
          </li>
        ))}
      </ul>
      <div className={`${styles.profile} ${isOpen ? styles.profileOpen : styles.profileClosed}`}>
        <img
          className={styles.pfp}
          src={getAvatarUrl()}
          alt="Profile Picture"
          width={isOpen ? 40 : 60}
          height={isOpen ? 40 : 60}
        />
        {isOpen && (
          <div className={styles.profileInfo}>
            <p className={styles.username}>{getUsername()}</p>
          </div>
        )}
        <LogOut />
      </div>
    </div>
  );
}
