'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import Link from 'next/link';

/* ── Data: Featured projects (shown as case studies) ── */
const featuredProjects = [
  {
    title: 'Fundación Luksic',
    subtitle: 'Corporate Foundation',
    url: 'https://www.fundacionluksic.cl/',
    image: '/images/fundacionluksic.webp',
    accent: 'primary' as const,
    challenge: 'Consolidar la presencia digital de una de las fundaciones más importantes de Chile, con foco en accesibilidad y storytelling visual.',
    solution: 'Desarrollo de sitio corporativo con arquitectura modular en WordPress, animaciones GSAP, optimización de rendimiento y diseño responsive premium.',
    techStack: [
      { icon: 'code', label: 'WordPress', color: 'text-[#72dcff]' },
      { icon: 'terminal', label: 'PHP', color: 'text-[#ac8aff]' },
      { icon: 'javascript', label: 'JavaScript', color: 'text-[#ec63ff]' },
    ],
  },
  {
    title: 'Cyclone Motos',
    subtitle: 'E-commerce Experience',
    url: 'https://cyclonemotos.cl/',
    image: '/images/cyclone-motos.webp',
    accent: 'secondary' as const,
    challenge: 'Crear un e-commerce de alto rendimiento con catálogo de productos complejo, filtros avanzados e integración de pagos fluida.',
    solution: 'Implementación de tienda online con WooCommerce headless, sistema de filtrado dinámico, galería interactiva y checkout optimizado para conversión.',
    techStack: [
      { icon: 'shopping_cart', label: 'WooCommerce', color: 'text-[#72dcff]' },
      { icon: 'code', label: 'WordPress', color: 'text-[#ac8aff]' },
      { icon: 'javascript', label: 'JavaScript', color: 'text-[#ec63ff]' },
    ],
  },
  {
    title: 'Agrosuper Proveedores',
    subtitle: 'Corporate Portal',
    url: 'https://www.agrosuper.cl/proveedores/',
    image: '/images/agrosuper-proveedores.webp',
    accent: 'tertiary' as const,
    challenge: 'Digitalizar la comunicación de la cadena de suministros para miles de proveedores con foco en seguridad y transparencia.',
    solution: 'Portal empresarial con sistema de autenticación, validación automatizada de documentos, integración REST API con ERP corporativo y panel administrativo.',
    techStack: [
      { icon: 'verified_user', label: 'Security', color: 'text-[#72dcff]' },
      { icon: 'terminal', label: 'PHP', color: 'text-[#ac8aff]' },
      { icon: 'api', label: 'REST API', color: 'text-[#ec63ff]' },
    ],
  },
];

const accentColors = {
  primary: { bg: 'bg-[#72dcff]', text: 'text-[#72dcff]', border: 'border-[#72dcff]', hoverBorder: 'hover:border-[#72dcff]/50' },
  secondary: { bg: 'bg-[#ac8aff]', text: 'text-[#ac8aff]', border: 'border-[#ac8aff]', hoverBorder: 'hover:border-[#ac8aff]/50' },
  tertiary: { bg: 'bg-[#ec63ff]', text: 'text-[#ec63ff]', border: 'border-[#ec63ff]', hoverBorder: 'hover:border-[#ec63ff]/50' },
};

/* ── Data: Other projects (card grid) ── */
const otherProjects = [
  {
    title: 'Plataforma de Gestión Educativa (SEDUC)',
    url: 'https://seduc.cl/',
    image: '/images/seduc.webp',
    challenge: 'Optimizar el seguimiento de 5000+ estudiantes',
    challengeDesc: 'La institución enfrentaba ineficiencias y falta de datos centralizados, afectando el rendimiento estudiantil.',
    solution: 'Desarrolló una plataforma integral con dashboards en tiempo real, reduciendo el tiempo de reporte en un 60% y mejorando la retención estudiantil en un 15%.',
    techStack: [
      { icon: 'terminal', label: 'PHP', color: 'text-[#ac8aff]' },
      { icon: 'code', label: 'WordPress', color: 'text-[#72dcff]' },
      { icon: 'css', label: 'CSS', color: 'text-[#ec63ff]' },
    ],
  },
  {
    title: 'Portal Interactivo (Herramientas Participativas)',
    url: 'https://herramientasparticipativas.fundacionluksic.cl/',
    image: '/images/herramientas-participativas.webp',
    challenge: 'Crear una experiencia interactiva y educativa',
    challengeDesc: 'Necesitaban un portal que combinara contenido educativo con herramientas participativas de forma dinámica.',
    solution: 'Implementación de portal con animaciones GSAP, navegación interactiva y sistema de contenido modular que incrementó el engagement en un 40%.',
    techStack: [
      { icon: 'code', label: 'WordPress', color: 'text-[#72dcff]' },
      { icon: 'terminal', label: 'PHP', color: 'text-[#ac8aff]' },
      { icon: 'animation', label: 'GSAP', color: 'text-[#ec63ff]' },
    ],
  },
  {
    title: 'Sitio Corporativo Internacional (Agrosuper Japón)',
    url: 'https://agrosuper.jp/',
    image: null,
    challenge: 'Expandir la presencia digital al mercado japonés',
    challengeDesc: 'Se requería un sitio multidioma con adaptación cultural y cumplimiento de estándares japoneses de UX.',
    solution: 'Desarrollo de sitio bilingüe con internacionalización completa, optimización para el mercado asiático y diseño culturalmente adaptado.',
    techStack: [
      { icon: 'code', label: 'WordPress', color: 'text-[#72dcff]' },
      { icon: 'terminal', label: 'PHP', color: 'text-[#ac8aff]' },
      { icon: 'translate', label: 'i18n', color: 'text-[#ec63ff]' },
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _sitiosMantención = [
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

export default function ProyectosPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-badge', { opacity: 0, y: 20 });
      gsap.set('.hero-title', { opacity: 0, y: 40 });
      gsap.set('.hero-desc', { opacity: 0, y: 30 });

      gsap.to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.to('.hero-title', { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' });
      gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' });

      const articles = document.querySelectorAll('.project-article');
      articles.forEach((article) => {
        gsap.set(article, { opacity: 0, y: 60 });
        gsap.to(article, {
          scrollTrigger: { trigger: article, start: 'top 80%' },
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform',
        });
      });

      const cards = document.querySelectorAll('.project-card');
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 50 });
        gsap.to(cards, {
          scrollTrigger: { trigger: cards[0], start: 'top 85%' },
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: 'transform',
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-20">
      <main className="px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ═══ Header ═══ */}
        <header className="mb-16 sm:mb-20">
          <div className="hero-badge inline-block px-3 py-1 rounded-full bg-[#1c253e] text-[#ec63ff] text-xs font-bold tracking-widest uppercase mb-4">
            Case Studies
          </div>
          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-black font-headline tracking-tighter text-[#dfe4fe] mb-6 leading-none">
            Proyectos que Generan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#72dcff] via-[#ac8aff] to-[#ec63ff]">
              Impacto
            </span>
          </h1>
          <p className="hero-desc text-[#a5aac2] max-w-2xl text-base sm:text-lg md:text-xl">
            Exploración de soluciones técnicas complejas a través de la arquitectura de software moderna y diseño de sistemas escalables.
          </p>
        </header>

        {/* ═══ Projects Grid ═══ */}
        <div className="grid grid-cols-1 gap-16 sm:gap-20">

          {featuredProjects.map((project, idx) => {
            const colors = accentColors[project.accent];
            const isReversed = idx % 2 !== 0;

            return (
              <article key={project.title} className="project-article group relative grid md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Image */}
                <div className={`overflow-hidden rounded-xl bg-[#0c1326] p-2 ${isReversed ? 'md:col-span-7 md:order-2' : 'md:col-span-7'}`}>
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070d1f] via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${isReversed ? 'md:col-span-5 md:order-1' : 'md:col-span-5'} space-y-5 sm:space-y-6`}>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-black font-headline text-[#dfe4fe] mb-2 tracking-tight">
                      {project.title}
                    </h2>
                    <p className={`${colors.text} font-bold tracking-widest text-xs uppercase`}>
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Challenge / Solution cards */}
                  <div className={`space-y-3 sm:space-y-4 ${isReversed ? 'grid sm:grid-cols-1 sm:space-y-0 sm:gap-4' : ''}`}>
                    <div className={`p-4 rounded-xl bg-[#0c1326] ${isReversed ? 'border-r-4' : 'border-l-4'} ${colors.border}`}>
                      <h3 className="text-xs font-bold text-[#a5aac2] uppercase tracking-widest mb-1">Desafío</h3>
                      <p className="text-[#dfe4fe] text-sm leading-relaxed">{project.challenge}</p>
                    </div>
                    <div className={`p-4 rounded-xl bg-[#171f36] ${isReversed ? 'border-r-4' : 'border-l-4'} ${idx === 0 ? 'border-[#ec63ff]' : idx === 1 ? 'border-[#72dcff]' : 'border-[#ac8aff]'}`}>
                      <h3 className="text-xs font-bold text-[#a5aac2] uppercase tracking-widest mb-1">Solución</h3>
                      <p className="text-[#dfe4fe] text-sm leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Tech Stack icons */}
                  <div className={`flex flex-wrap gap-4 py-2 ${isReversed ? 'sm:justify-start' : ''}`}>
                    {project.techStack.map((tech) => (
                      <div key={tech.label} className="flex flex-col items-center">
                        <div className="p-3 rounded-xl bg-[#1c253e] mb-1 group-hover:shadow-[0_0_15px_rgba(236,99,255,0.2)] transition-all">
                          <span className={`material-symbols-outlined ${tech.color}`}>{tech.icon}</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#6f758b] uppercase">{tech.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className={`flex flex-wrap gap-3 sm:gap-4 ${isReversed ? 'sm:justify-start' : ''}`}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${colors.bg} text-[#070d1f] font-bold px-5 sm:px-6 py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 text-sm sm:text-base`}
                    >
                      Ver Proyecto
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

        </div>

        {/* ═══ Other Projects Grid ═══ */}
        <div className="mt-20 sm:mt-28">
          <div className="mb-10 sm:mb-14">
            <span className="text-[#72dcff] text-sm font-bold tracking-[0.2em] uppercase block mb-3">Más Proyectos</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-headline tracking-tighter text-[#dfe4fe]">
              Otros{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#72dcff] to-[#ac8aff]">Desarrollos</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {otherProjects.map((project) => (
              <div key={project.title} className="project-card group relative rounded-2xl border border-[#41475b]/20 bg-gradient-to-b from-[#11192e] to-[#0c1326] overflow-hidden hover:border-[#72dcff]/30 transition-all duration-500">
                {/* Glow */}
                <div className="absolute -inset-px bg-gradient-to-b from-[#72dcff]/5 via-[#ac8aff]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />

                <div className="relative">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1c253e] via-[#11192e] to-[#0c1326] flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-[#41475b]">language</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11192e] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <h3 className="text-lg sm:text-xl font-black font-headline text-[#dfe4fe] group-hover:text-[#72dcff] transition-colors leading-tight">
                      {project.title}
                    </h3>

                    {/* Challenge */}
                    <div>
                      <p className="text-sm font-bold text-[#72dcff] mb-1">
                        <span className="text-[#ac8aff]">Challenge:</span> {project.challenge}
                      </p>
                      <p className="text-[#a5aac2] text-xs leading-relaxed">{project.challengeDesc}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <p className="text-sm font-bold text-[#ac8aff] mb-1">Solution &amp; Result</p>
                      <p className="text-[#a5aac2] text-xs leading-relaxed">{project.solution}</p>
                    </div>

                    {/* Tech Icons */}
                    <div className="flex gap-3 pt-2">
                      {project.techStack.map((tech) => (
                        <div key={tech.label} className="flex flex-col items-center">
                          <div className="p-2.5 rounded-xl bg-[#1c253e] mb-1 group-hover:shadow-[0_0_12px_rgba(114,220,255,0.15)] transition-all">
                            <span className={`material-symbols-outlined text-lg ${tech.color}`}>{tech.icon}</span>
                          </div>
                          <span className="text-[9px] font-bold text-[#6f758b] uppercase">{tech.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#72dcff] to-[#ac8aff] text-[#004253] text-sm font-bold hover:scale-105 transition-transform"
                    >
                      Ver Demo en Vivo
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ CTA Section ═══ */}
        <div className="max-w-3xl mx-auto mt-20 sm:mt-28">
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#41475b]/30 bg-[#0c1326] p-8 sm:p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -inset-px bg-gradient-to-r from-[#72dcff]/10 via-[#ac8aff]/10 to-[#ec63ff]/10 rounded-3xl blur-sm" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-black font-headline text-[#dfe4fe] mb-3">
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="text-[#a5aac2] mb-8 max-w-lg mx-auto">
                Estoy buscando nuevas oportunidades como desarrollador web. Si te gusta lo que ves, conversemos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#72dcff] to-[#ac8aff] rounded-xl font-bold text-[#004253] hover:scale-105 transition-transform nebula-glow"
                >
                  Contáctame
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
