import Link from 'next/link';
import { getProyectos } from '@/lib/actions/proyectos.actions';
import Button from '@/components/ui/Button';
import ProyectoManager from '@/components/admin/ProyectoManager';

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Nunito", sans-serif', color: 'white', marginBottom: '0.5rem' }}>Gestión de Proyectos</h1>
          <p style={{ color: 'rgba(200, 195, 255, 0.6)' }}>Administra tu portafolio y los trabajos destacados.</p>
        </div>
        <Link href="/admin/proyectos/nuevo">
          <Button variant="primary">
            + Nuevo Proyecto
          </Button>
        </Link>
      </div>

      <ProyectoManager initialProyectos={proyectos || []} />
    </div>
  );
}
