import { getPostBySlug } from "@/lib/actions/blog.actions";
import { notFound } from "next/navigation";
import styles from "./BlogDetalle.module.css";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface BlogDetallePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetallePage({ params }: BlogDetallePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateStr = new Date(post.created_at).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        {/* Header */}
        <header className={styles.header}>
          <div className="container">
            <Link href="/blog" className={styles.backLink}>
              ← Volver al blog
            </Link>
            <div className={styles.meta}>
              <span className={styles.date}>{dateStr}</span>
            </div>
            <h1 className={styles.title}>{post.titulo}</h1>
            <p className={styles.resumen}>{post.resumen}</p>
          </div>
        </header>

        {/* Hero Image */}
        {post.imagen_url && (
          <div className={styles.heroImageContainer}>
            <div className="container">
              <img 
                src={post.imagen_url} 
                alt={post.titulo} 
                className={styles.heroImage} 
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className={styles.contentContainer}>
          <div className="container">
            <div className={styles.content}>
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => {
                    const isLeft = props.alt?.toLowerCase().includes('left');
                    const isSmall = props.alt?.toLowerCase().includes('small');
                    let className = styles.markdownImage;
                    if (isLeft) className += ` ${styles.imageLeft}`;
                    if (isSmall) className += ` ${styles.imageSmall}`;
                    
                    return (
                      <img 
                        {...props} 
                        className={className} 
                      />
                    );
                  }
                }}
              >
                {post.contenido}
              </ReactMarkdown>
            </div>

            
            <footer className={styles.articleFooter}>
              <div className={styles.cta}>
                <h3>¿Quieres transformar tu negocio?</h3>
                <p>En Point Design ayudamos a marcas como la tuya a destacar digitalmente.</p>
                <Link href="/#contacto" className={styles.ctaButton}>
                  Hablemos de tu proyecto
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}
