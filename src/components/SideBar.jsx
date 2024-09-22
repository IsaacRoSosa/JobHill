
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@/styles/SideBar.module.css";
import { usePathname } from "next/navigation";
import LogOut from "@/components/LogOut";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false); 
  const pathname = usePathname();


  useEffect(() => {
    const savedState = localStorage.getItem("sidebarState");
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("sidebarState", JSON.stringify(newState));
  };

  const menuItems = [
    { name: "Jobs", icon: "/Images/sidebar/Jobs.png", route: "/jobs" },
    { name: "My Applications", icon: "/Images/sidebar/Applications.png", route: "/applications" },
    { name: "Friends", icon: "/Images/sidebar/Friends.png", route: "/friends" },
    { name: "News", icon: "/Images/sidebar/news.png", route: "/news" },
  ];

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
 <div className={styles.logoContainer}>
        <Image
          src="/Images/sidebar/Jobmiga_logo.png"
          alt="Jobmiga Logo"
          width={isOpen ? 100 : 80}
          height={isOpen ? 100 : 80}
          onClick={toggleSidebar} 
          className={styles.logo} 
        />
        {isOpen && <h1>JOBHILL</h1>}
      </div>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li key={item.name} className={`${item.route === pathname ? styles.active : ""} ${isOpen ? styles.openMenuItem : styles.closedMenuItem}`}>
            <a href={item.route}>
              <Image src={item.icon} alt={`${item.name} Icon`} width={isOpen ? 50 : 40} height={isOpen ? 50 : 40} />
              {isOpen && <span className={styles.menuItemText}>{item.name}</span>}
            </a>
          </li>
        ))}
      </ul>
      <div className={`${styles.profile} ${isOpen ? styles.profileOpen : styles.profileClosed}`}>
        <Image className={styles.pfp} src="/Images/sidebar/pfp_template.png" alt="Profile Picture" width={isOpen ? 50 : 40} height={isOpen ? 50 : 40} />
        {isOpen && (
          <div className={styles.profileInfo}>
            <p className={styles.username}>Santiago Sauma</p>

          </div>
       
        )}
        <LogOut />
      </div>
    </div>
  );
}
