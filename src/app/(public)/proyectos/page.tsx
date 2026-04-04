import ProyectoCard from "@/components/ui/ProyectoCard";
import { getProyectos } from "@/lib/actions/proyectos.actions";
import styles from "./Proyectos.module.css";

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.sectionTag}>Nuestro trabajo</div>
          <h1 className={styles.title}>
            Proyectos que conectan <br /> 
            <span className={styles.gradientText}>marcas con personas</span>
          </h1>
          <p className={styles.subtitle}>
            Una selección de nuestros trabajos más recientes en diseño web, 
            identidad visual y estrategia digital.
          </p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
            {proyectos && proyectos.length > 0 ? (
              proyectos.map((proyecto) => (
                <ProyectoCard key={proyecto.id} proyecto={proyecto} />
              ))
            ) : (
              <p className={styles.empty}>Próximamente más proyectos.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
