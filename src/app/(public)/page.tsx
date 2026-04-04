import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import Portafolio from "@/components/sections/Portafolio";
import Nosotros from "@/components/sections/Nosotros";
import Contacto from "@/components/sections/Contacto";
import BlogSection from "@/components/sections/Blog";
import { getSeccion } from "@/lib/actions/secciones.actions";

export default async function Home() {
  const heroData = await getSeccion('hero');
  const nosotrosData = await getSeccion('nosotros');

  return (
    <>
      <Hero data={heroData?.contenido} />
      <Servicios />
      <Portafolio />
      <Nosotros data={nosotrosData?.contenido} />
      <BlogSection />
      <Contacto />
    </>
  );
}

