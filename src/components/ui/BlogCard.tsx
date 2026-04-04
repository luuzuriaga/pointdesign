import Link from 'next/link';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: {
    id: string;
    titulo: string;
    slug: string;
    resumen?: string;
    imagen_url?: string;
    created_at: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const dateStr = new Date(post.created_at).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {post.imagen_url ? (
          <img 
            src={post.imagen_url} 
            alt={post.titulo} 
            className={styles.image} 
          />
        ) : (
          <div className={styles.placeholder}>Point Blog</div>
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.date}>{dateStr}</span>
        <h3 className={styles.title}>{post.titulo}</h3>
        <p className={styles.resumen}>{post.resumen}</p>
        <span className={styles.readMore}>Leer más →</span>
      </div>
    </Link>
  );
}
