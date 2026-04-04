import styles from './Nosotros.module.css';
import Button from '../ui/Button';

export default function Nosotros({ data }: { data?: any }) {
  const content = data || {
    title: "Creatividad con propósito",
    description: "Somos un equipo apasionado por el diseño digital. Creemos que cada pixel cuenta y que una buena estrategia visual puede transformar negocios.",
    stats: [
      { label: "Proyectos entregados", value: "+50" },
      { label: "Años de experiencia", value: "3+" },
      { label: "Clientes satisfechos", value: "98%" },
      { label: "Pasión por el diseño", value: "∞" }
    ]
  };

  return (
    <section className={`${styles.section} reveal`} id="nosotros">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div className={styles.sectionTag}>Sobre nosotros</div>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.description}>
            {content.description}
          </p>
          
          <div className={styles.stats}>
            {content.stats?.map((stat: any, index: number) => (
              <div key={index} className={styles.statItem}>
                <h4>{stat.value}</h4>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '3rem' }}>
            <Button variant="primary">Conoce al equipo</Button>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Point Design Team" 
            className={styles.image} 
          />
          <div className={styles.imageDecor} />
        </div>
      </div>
    </section>
  );
}


