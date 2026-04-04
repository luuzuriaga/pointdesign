import Link from 'next/link';
import Image from 'next/image';
import styles from './ProyectoCard.module.css';

interface ProyectoCardProps {
  proyecto: {
    id: string;
    titulo: string;
    slug: string;
    cliente?: string;
    categorias?: string[];
    imagen_url?: string;
  };
}

export default function ProyectoCard({ proyecto }: ProyectoCardProps) {
  return (
    <Link href={`/proyectos/${proyecto.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {proyecto.imagen_url ? (
          <img 
            src={proyecto.imagen_url} 
            alt={proyecto.titulo} 
            className={styles.image} 
          />
        ) : (
          <div className={styles.placeholder}>{proyecto.titulo}</div>
        )}
        <div className={styles.overlay}>
          <div className={styles.arrow}>→</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.categories}>
          {proyecto.categorias?.map((cat) => (
            <span key={cat} className={styles.category}>{cat}</span>
          ))}
        </div>
        <h3 className={styles.title}>{proyecto.titulo}</h3>
        <p className={styles.client}>{proyecto.cliente}</p>
      </div>
    </Link>
  );
}
