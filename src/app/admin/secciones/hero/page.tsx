import { getSeccion } from "@/lib/actions/secciones.actions";
import HeroSectionEditor from "@/components/admin/HeroSectionEditor";

export default async function HeroEditorPage() {
  const seccion = await getSeccion('hero');

  if (!seccion) {
    return <div style={{ color: 'white', padding: '2rem' }}>No se pudo cargar la sección Hero.</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Nunito", sans-serif', color: 'white' }}>
          Editar Inicio (Hero)
        </h1>
        <p style={{ color: 'rgba(200,195,255,0.6)' }}>Configura los textos principales y botones de tu landing page.</p>
      </div>

      <HeroSectionEditor initialData={seccion.contenido} />
    </div>
  );
}
