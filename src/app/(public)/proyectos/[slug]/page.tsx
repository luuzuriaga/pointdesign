import { getProyectoBySlug } from "@/lib/actions/proyectos.actions";
import { notFound } from "next/navigation";
import styles from "./ProyectoDetalle.module.css";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ReactMarkdown from "react-markdown";

interface ProyectoDetallePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProyectoDetallePage({ params }: ProyectoDetallePageProps) {
  const { slug } = await params;
  const proyecto = await getProyectoBySlug(slug);

  if (!proyecto) {
    notFound();
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          {proyecto.imagen_url && (
            <img 
              src={proyecto.imagen_url} 
              alt={proyecto.titulo} 
              className={styles.heroImage} 
            />
          )}
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className="container">
          <div className={styles.heroContent}>
            <Link href="/proyectos" className={styles.backLink}>
              ← Volver al portafolio
            </Link>
            <div className={styles.categories}>
              {proyecto.categories?.map((cat: string) => (
                <span key={cat} className={styles.category}>{cat}</span>
              ))}
            </div>
            <h1 className={styles.title}>{proyecto.titulo}</h1>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Cliente</span>
                <span className={styles.metaValue}>{proyecto.cliente}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Año</span>
                <span className={styles.metaValue}>{proyecto.anio}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.descriptionCol}>
              <h2 className={styles.sectionTitle}>El Reto</h2>
              <p className={styles.description}>{proyecto.descripcion}</p>
              
              {proyecto.descripcion_larga && (
                <>
                  <h2 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>La Solución</h2>
                  <div className={styles.longDescription}>
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
                      {proyecto.descripcion_larga}
                    </ReactMarkdown>
                  </div>

                </>
              )}
            </div>


            <aside className={styles.aside}>
              <div className={styles.stickyCard}>
                <h3>¿Te gusta este proyecto?</h3>
                <p>Hablemos sobre cómo podemos llevar tu marca al siguiente nivel.</p>
                <Link href="/#contacto">
                  <Button variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Empezar un proyecto →
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {proyecto.galeria_urls && proyecto.galeria_urls.length > 0 && (
        <section className={styles.gallerySection}>
          <div className="container">
            <h2 className={styles.sectionTitle} style={{ marginBottom: '3rem', textAlign: 'center' }}>Galería Visual</h2>
            <div className={styles.galleryGrid}>
              {proyecto.galeria_urls.map((url: string, index: number) => (
                <div key={index} className={styles.galleryItem}>
                  <img src={url} alt={`${proyecto.titulo} - ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
