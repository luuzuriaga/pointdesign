import styles from './Servicios.module.css';

const SERVICIOS = [
  {
    id: 'web',
    title: 'Diseño Web',
    description: 'Páginas web modernas, rápidas y optimizadas que generan resultados reales para tu negocio.',
    icon: '🌐'
  },
  {
    id: 'brand',
    title: 'Identidad de Marca',
    description: 'Logos, paletas, tipografía y sistemas visuales que hacen que tu marca sea memorable e inconfundible.',
    icon: '✦'
  },
  {
    id: 'social',
    title: 'Redes Sociales',
    description: 'Contenido visual estratégico y gestión de redes para construir comunidades activas alrededor de tu marca.',
    icon: '📱'
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    description: 'Optimización para buscadores y estrategia digital que atrae tráfico orgánico de calidad.',
    icon: '📈'
  }
];

export default function Servicios() {
  return (
    <section className={`${styles.section} reveal`} id="servicios">
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.sectionTag}>Lo que hacemos</div>
            <h2 className={styles.title}>Servicios que<br/>impulsan tu marca</h2>
          </div>
          <p className={styles.subtitle}>
            Cada proyecto es único. Trabajamos contigo para crear soluciones digitales a medida.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICIOS.map((servicio, index) => {
            return (
              <div className={styles.serviceCard} key={index}>
                <div className={`${styles.serviceIcon} ${styles[`ic_${servicio.id}`]}`}>
                  {servicio.icon}
                </div>
                <h3>{servicio.title}</h3>
                <p>{servicio.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
