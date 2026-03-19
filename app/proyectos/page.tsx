'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import Link from 'next/link';

interface ProjectLink {
  url: string;
  title: string;
  description?: string;
  tech?: string[];
}

export default function ProyectosPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const sitiosDesde0: ProjectLink[] = [
    { url: 'https://seduc.cl/', title: 'SEDUC', description: 'Plataforma educativa con gestión de contenidos y recursos pedagógicos', tech: ['WordPress', 'PHP', 'CSS'] },
    { url: 'https://cyclonemotos.cl/', title: 'Cyclone Motos', description: 'E-commerce y catálogo de productos para marca de motocicletas', tech: ['WordPress', 'WooCommerce', 'JS'] },
    { url: 'https://herramientasparticipativas.fundacionluksic.cl/', title: 'Herramientas Participativas', description: 'Portal interactivo de herramientas para la Fundación Luksic', tech: ['WordPress', 'PHP', 'GSAP'] },
    { url: 'https://intranet.defensorianinez.cl/', title: 'Intranet Defensoría de la Niñez', description: 'Sistema intranet institucional con gestión documental y comunicaciones internas', tech: ['WordPress', 'PHP', 'MySQL'] },
    { url: 'https://www.agrosuper.cl/proveedores/', title: 'Agrosuper Proveedores', description: 'Portal de proveedores para empresa líder del sector alimentario', tech: ['WordPress', 'PHP', 'REST API'] },
    { url: 'https://agrosuper.jp/', title: 'Agrosuper Japón', description: 'Sitio corporativo internacional para mercado japonés con i18n', tech: ['WordPress', 'PHP', 'i18n'] },
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
      // Hero animations
      gsap.set('.hero-badge', { opacity: 0, y: 20 });
      gsap.set('.hero-title', { opacity: 0, y: 40 });
      gsap.set('.hero-desc', { opacity: 0, y: 30 });
      gsap.set('.hero-stat', { opacity: 0, y: 30, scale: 0.9 });

      gsap.to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.to('.hero-title', { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' });
      gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' });
      gsap.to('.hero-stat', { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: 'power3.out' });

      // Section titles
      document.querySelectorAll('.section-title').forEach((title) => {
        gsap.set(title, { opacity: 0, x: -30 });
        gsap.to(title, {
          scrollTrigger: { trigger: title, start: 'top 85%' },
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        });
      });

      // Featured cards
      const featuredCards = document.querySelectorAll('.featured-card');
      gsap.set(featuredCards, { opacity: 0, y: 40 });
      gsap.to(featuredCards, {
        scrollTrigger: { trigger: featuredCards[0], start: 'top 85%' },
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      });

      // Maintenance cards
      const mainCards = document.querySelectorAll('.maint-card');
      gsap.set(mainCards, { opacity: 0, y: 30 });
      gsap.to(mainCards, {
        scrollTrigger: { trigger: mainCards[0], start: 'top 85%' },
        opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">

        {/* ═══ Hero Section ═══ */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Portfolio Profesional
          </div>

          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Proyectos que </span>
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">generan impacto</span>
          </h1>

          <p className="hero-desc text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Desarrollo web profesional para empresas líderes en Chile. Desde plataformas corporativas hasta e-commerce, cada proyecto está construido con foco en rendimiento, accesibilidad y experiencia de usuario.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="hero-stat text-center px-6">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{sitiosDesde0.length}</div>
              <div className="text-gray-500 text-sm mt-1">Desarrollados desde cero</div>
            </div>
            <div className="hero-stat text-center px-6 border-x border-gray-800">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{sitiosMantención.length}</div>
              <div className="text-gray-500 text-sm mt-1">En mantención activa</div>
            </div>
            <div className="hero-stat text-center px-6">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">{sitiosDesde0.length + sitiosMantención.length}+</div>
              <div className="text-gray-500 text-sm mt-1">Proyectos totales</div>
            </div>
          </div>
        </div>

        {/* ═══ Desarrollados desde Cero ═══ */}
        <div className="max-w-7xl mx-auto mb-24">
          <div className="section-title flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Desarrollados desde cero</h2>
              <p className="text-gray-500 text-sm mt-1">Sitios que diseñé e implementé completamente</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sitiosDesde0.map((proyecto) => (
              <a
                key={proyecto.url}
                href={proyecto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-card group relative rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                {/* Glow on hover */}
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-15 blur-sm transition duration-300"></div>

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {proyecto.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {proyecto.description}
                  </p>

                  {/* Tech tags */}
                  {proyecto.tech && (
                    <div className="flex flex-wrap gap-2">
                      {proyecto.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* URL */}
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors truncate font-mono">
                      {proyecto.url.replace('https://', '').replace(/\/$/, '')}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ═══ Sitios en Mantención ═══ */}
        <div className="max-w-7xl mx-auto mb-24">
          <div className="section-title flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Mantención activa</h2>
              <p className="text-gray-500 text-sm mt-1">Sitios que mantengo, actualizo y optimizo continuamente</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sitiosMantención.map((proyecto) => (
              <a
                key={proyecto.url}
                href={proyecto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="maint-card group flex items-center gap-3 px-4 py-4 rounded-xl border border-gray-800 bg-gray-900/30 hover:border-purple-500/50 hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
                    {proyecto.title}
                  </h3>
                  <p className="text-xs text-gray-600 truncate font-mono">
                    {proyecto.url.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
                  </p>
                </div>
                <svg className="w-4 h-4 text-gray-700 group-hover:text-purple-400 ml-auto flex-shrink-0 group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ═══ CTA Section ═══ */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-10 md:p-14 text-center">
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-sm"></div>
            <div className="relative">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Estoy buscando nuevas oportunidades como desarrollador web. Si te gusta lo que ves, conversemos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full font-bold text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Contáctame
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="https://github.com/Lukas-Ibanez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 rounded-full font-bold text-white hover:border-gray-500 hover:bg-white/5 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Ver GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
