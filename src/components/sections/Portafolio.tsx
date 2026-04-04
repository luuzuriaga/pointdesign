import styles from './Portafolio.module.css';
import Button from '../ui/Button';
import Link from 'next/link';
import { getProyectos } from '@/lib/actions/proyectos.actions';
import ProyectoCard from '../ui/ProyectoCard';

export default async function Portafolio() {
  const proyectos = await getProyectos();
  
  // Mostrar solo los primeros 6 proyectos en la landing
  const featuredProyectos = proyectos.slice(0, 6);

  return (
    <section className={`${styles.section} reveal`} id="portafolio">
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.sectionTag}>Nuestro trabajo</div>
            <h2 className={styles.title}>Proyectos que nos enorgullecen</h2>
          </div>
          <Link href="/proyectos">
            <Button variant="outline">Ver Todos</Button>
          </Link>
        </div>

        <div className={styles.grid}>
          {featuredProyectos.length > 0 ? (
            featuredProyectos.map((proyecto) => (
              <ProyectoCard key={proyecto.id} proyecto={proyecto} />
            ))
          ) : (
            <p style={{ color: 'var(--color-text-muted)', gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
              Estamos preparando nuevos proyectos increíbles. ¡Vuelve pronto!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
