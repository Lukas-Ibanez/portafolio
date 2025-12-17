import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GSAPProvider from "@/components/GSAPProvider";
import GlobalBackground from "@/components/GlobalBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lukas Ibáñez | Desarrollador Full-Stack",
  description: "Portafolio profesional de Lukas Ibáñez - Programador Computacional y Desarrollador Full-Stack especializado en Front-End con 2 años de experiencia.",
  keywords: ["Lukas Ibáñez", "desarrollador", "full-stack", "front-end", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Lukas Ibáñez" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Lukas Ibáñez | Desarrollador Full-Stack",
    description: "Portafolio profesional de Lukas Ibáñez - Desarrollador Full-Stack especializado en Front-End",
    siteName: "Lukas Ibáñez Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black relative min-h-screen overflow-x-hidden`}
      >
        {/* Fondo global con canvas, grid, gradientes y orbitales */}
        <GlobalBackground />

        <div className="relative z-10">
          <GSAPProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </GSAPProvider>
        </div>
      </body>
    </html>
  );
}
