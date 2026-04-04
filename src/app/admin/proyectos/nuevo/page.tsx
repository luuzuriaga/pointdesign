import ProyectoEditor from "@/components/admin/ProyectoEditor";
import Link from "next/link";

export default function NuevoProyectoPage() {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <Link 
          href="/admin/proyectos" 
          style={{ 
            color: 'var(--color-secondary)', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '1rem'
          }}
        >
          ← Volver a proyectos
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Nunito", sans-serif', color: 'white' }}>
          Crear Nuevo Proyecto
        </h1>
      </div>

      <ProyectoEditor />
    </div>
  );
}
