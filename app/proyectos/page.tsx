'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';

interface ProjectLink {
  url: string;
  title: string;
}

export default function ProyectosPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  const sitiosDesde0: ProjectLink[] = [
    { url: 'https://seduc.cl/', title: 'SEDUC' },
    { url: 'https://cyclonemotos.cl/', title: 'Cyclone Motos' },
    { url: 'https://herramientasparticipativas.fundacionluksic.cl/', title: 'Herramientas Participativas - Fundación Luksic' },
    { url: 'https://intranet.defensorianinez.cl/', title: 'Intranet Defensoría de la Niñez' },
    { url: 'https://www.agrosuper.cl/proveedores/', title: 'Agrosuper Proveedores' },
    { url: 'https://agrosuper.jp/', title: 'Agrosuper Japón' },
  ];

  const sitiosMantención: ProjectLink[] = [
    { url: 'https://www.agrosuper.cl/', title: 'Agrosuper' },
    { url: 'https://www.agrosuper.com/inversionistas/', title: 'Agrosuper Inversionistas' },
    { url: 'https://www.fundacionluksic.cl/', title: 'Fundación Luksic' },
    { url: 'https://www.suzukimotos.cl/', title: 'Suzuki Motos' },
    { url: 'https://zonsen.cl/', title: 'Zonsen' },
    { url: 'https://kymcomotos.cl/', title: 'Kymco Motos' },
    { url: 'https://www.suzukimarine.cl/', title: 'Suzuki Marine' },
    { url: 'https://cnc.cl/', title: 'CNC' },
    { url: 'https://facturacion.cl/', title: 'Facturación' },
    { url: 'https://carritodeflores.cl/', title: 'Carrito de Flores' },
    { url: 'https://colegioloscipreses.cl/', title: 'Colegio Los Cipreses' },
    { url: 'https://es.aquachile.com/', title: 'AquaChile (ES)' },
    { url: 'https://en.aquachile.com/', title: 'AquaChile (EN)' },
    { url: 'https://promobility.cl/', title: 'Promobility' },
    { url: 'https://huelen.cl/', title: 'Huelen' },
    { url: 'https://colegiocordillera.cl/', title: 'Colegio Cordillera' },
    { url: 'https://colegiolosandes.cl/', title: 'Colegio Los Andes' },
    { url: 'https://admision.colegiohuinganal.cl/', title: 'Admisión Colegio Huinganal' },
    { url: 'https://tabancura.cl/', title: 'Tabancura' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      });

      // Animación de la descripción
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      gsap.to(descriptionRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Animación de la primera sección
      const section1Cards = section1Ref.current?.querySelectorAll('.project-link');
      if (section1Cards) {
        gsap.set(section1Cards, { opacity: 0, y: 50 });
        gsap.to(section1Cards, {
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      // Animación de la segunda sección
      const section2Cards = section2Ref.current?.querySelectorAll('.project-link');
      if (section2Cards) {
        gsap.set(section2Cards, { opacity: 0, y: 50 });
        gsap.to(section2Cards, {
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Mis Proyectos
            </span>
          </h1>
          <p
            ref={descriptionRef}
            className="text-xl text-gray-400 opacity-0"
          >
            Una colección de sitios web que he desarrollado y mantengo activamente.
          </p>
        </div>

        {/* Sección: Sitios Desarrollados desde Cero */}
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Sitios que he desarrollado desde cero
            </span>
          </h2>
          <div ref={section1Ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sitiosDesde0.map((proyecto) => (
              <a
                key={proyecto.url}
                href={proyecto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {proyecto.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors truncate">
                    {proyecto.url.replace('https://', '').replace('http://', '')}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Sección: Sitios en Mantención */}
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sitios en Mantención
            </span>
          </h2>
          <div ref={section2Ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sitiosMantención.map((proyecto) => (
              <a
                key={proyecto.url}
                href={proyecto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {proyecto.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors truncate">
                    {proyecto.url.replace('https://', '').replace('http://', '')}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-6">
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Contáctame
          </a>
        </div>
      </div>
    </div>
  );
}
