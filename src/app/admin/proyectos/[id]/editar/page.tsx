import ProyectoEditor from "@/components/admin/ProyectoEditor";
import Link from "next/link";
import { getProyectoById } from "@/lib/actions/proyectos.actions";
import { notFound } from "next/navigation";

interface EditarProyectoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarProyectoPage({ params }: EditarProyectoPageProps) {
  const { id } = await params;
  const proyecto = await getProyectoById(id);

  if (!proyecto) {
    notFound();
  }

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
          Editar Proyecto
        </h1>
        <p style={{ color: 'rgba(200,195,255,0.6)' }}>ID: {proyecto.id}</p>
      </div>

      <ProyectoEditor proyecto={proyecto} />
    </div>
  );
}
