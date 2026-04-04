import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link href="/" className={styles.logoWrapper}>
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" className={styles.logoIcon}>
            <circle cx="15" cy="20" r="14" fill="var(--color-secondary)" opacity="0.7"/>
            <circle cx="25" cy="20" r="14" fill="var(--color-primary)" opacity="0.8"/>
          </svg>
          <div className={styles.brandText}>
            Point Design <span>Agencia Digital</span>
          </div>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="#servicios" className={styles.navLink}>Servicios</Link>
          <Link href="#portafolio" className={styles.navLink}>Portafolio</Link>
          <Link href="#nosotros" className={styles.navLink}>Nosotros</Link>
          <Link href="#contacto" className={styles.navLink}>Contacto</Link>
        </div>

        <Link href="#contacto" className={styles.navCta}>
          Hablemos
        </Link>
      </div>
    </nav>
  );
}
