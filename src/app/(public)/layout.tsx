import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRevealManager from "@/components/layout/ScrollRevealManager";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollRevealManager />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
