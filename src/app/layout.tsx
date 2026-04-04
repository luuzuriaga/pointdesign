import type { Metadata } from "next";
import { DM_Sans, Nunito } from "next/font/google";
import "../styles/globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-body" });
const nunito = Nunito({ subsets: ["latin"], weight: ["300", "400", "600", "700", "800", "900"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Point Design - Agencia Digital",
  description: "Construimos experiencias digitales memorables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
