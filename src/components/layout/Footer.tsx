import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.instagram}>
        <a href="https://www.instagram.com/point.design.peru/" target="_blank" rel="noopener noreferrer" className={styles.igLink}>
          📸 @point.design.peru
        </a>
      </div>
      <p className={styles.copyright}>
        &copy; {currentYear} Point Design. Todos los derechos reservados.
      </p>
    </footer>

  );
}
