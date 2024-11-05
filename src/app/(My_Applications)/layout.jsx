
"use client"
import SideBar from '@/components/SideBar';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  // Rutas donde se debe mostrar el SideBar
  const showSideBar = ['/jobs', '/applications'/*, '/friends', '/news'*/].includes(pathname);

  const divStyles = {
    display : 'flex',
  }

  return (
    <div style={divStyles}>
        <div>
            {showSideBar && <SideBar />}

        </div>

      {children}
    </div>
  );
}