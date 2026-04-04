import { getSeccion } from "@/lib/actions/secciones.actions";
import NosotrosSectionEditor from "@/components/admin/NosotrosSectionEditor";

export default async function NosotrosEditorPage() {
  const seccion = await getSeccion('nosotros');

  if (!seccion) {
    return <div style={{ color: 'white', padding: '2rem' }}>No se pudo cargar la sección Nosotros.</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Nunito", sans-serif', color: 'white' }}>
          Editar Nosotros
        </h1>
        <p style={{ color: 'rgba(200,195,255,0.6)' }}>Gestiona la historia y las estadísticas de tu agencia.</p>
      </div>

      <NosotrosSectionEditor initialData={seccion.contenido} />
    </div>
  );
}
