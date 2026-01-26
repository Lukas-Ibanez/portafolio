'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import Link from 'next/link';

export default function NavigationCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.nav-card');
      
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 80 });
        gsap.to(cards, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Grid de fondo animado */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Gradientes luminosos de fondo */}
      <div className="absolute inset-0">
        <div className="parallax-slow absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="parallax-medium absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px]"></div>
        <div className="parallax-fast absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-cyan-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card de Proyectos */}
          <Link
            href="/proyectos"
            className="nav-card group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-gray-800 hover:border-blue-500 transition-all duration-500"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

            <div className="relative p-8 md:p-12 h-full min-h-[400px] flex flex-col justify-between">
              {/* Icono */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  Mis Proyectos
                </h3>
                <p className="text-gray-400 text-lg mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  Explora los sitios y aplicaciones que he desarrollado. Desde e-commerce hasta
                  dashboards interactivos.
                </p>
              </div>

              {/* CTA */}
              <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors duration-300">
                <span className="mr-2">Ver todos los proyectos</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            </div>
          </Link>

          {/* Card de Blog */}
          <Link
            href="/blog"
            className="nav-card group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-gray-800 hover:border-purple-500 transition-all duration-500"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

            <div className="relative p-8 md:p-12 h-full min-h-[400px] flex flex-col justify-between">
              {/* Icono */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                  Blog
                </h3>
                <p className="text-gray-400 text-lg mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  Pensamientos sobre programación, desarrollo web y tecnología. Aprende y
                  comparte conocimiento.
                </p>
              </div>

              {/* CTA */}
              <div className="flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors duration-300">
                <span className="mr-2">Leer artículos</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 group-hover:bg-purple-500/20 transition-colors duration-500"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
