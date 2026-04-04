"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Blog', href: '/admin/blog', icon: '✍️' },
  { label: 'Proyectos', href: '/admin/proyectos', icon: '📁' },
  { label: 'Hero (Inicio)', href: '/admin/secciones/hero', icon: '✨' },
  { label: 'Nosotros', href: '/admin/secciones/nosotros', icon: '🏢' },
];


export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <h2 className={styles.logo}>Point Admin</h2>
        <Link href="/" className={styles.viewSiteBtn}>
          <span>🌐</span> Ver sitio web
        </Link>
      </div>
      
      <nav className={styles.nav}>

        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}

