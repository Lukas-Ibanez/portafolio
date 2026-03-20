'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '@/lib/gsap-config';
import Link from 'next/link';

const sliderProjects = [
  { title: 'SEDUC', url: 'https://seduc.cl/', tech: ['WordPress', 'PHP', 'CSS'], image: '/images/seduc.webp' },
  { title: 'Cyclone Motos', url: 'https://cyclonemotos.cl/', tech: ['WordPress', 'WooCommerce', 'JS'], image: '/images/cyclone-motos.webp' },
  { title: 'Herramientas Participativas', url: 'https://herramientasparticipativas.fundacionluksic.cl/', tech: ['WordPress', 'PHP', 'GSAP'], image: '/images/herramientas-participativas.webp' },
  { title: 'Fundación Luksic', url: 'https://www.fundacionluksic.cl/', tech: ['WordPress', 'PHP', 'JS'], image: '/images/fundacionluksic.webp' },
  { title: 'Agrosuper Proveedores', url: 'https://www.agrosuper.cl/proveedores/', tech: ['WordPress', 'PHP', 'REST API'], image: '/images/agrosuper-proveedores.webp' },
];

export default function NavigationCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderProjects.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoplay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoplay();
  };

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderProjects.length);
    startAutoplay();
  };

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderProjects.length) % sliderProjects.length);
    startAutoplay();
  };

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? goNext() : goPrev();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = sectionRef.current?.querySelectorAll('.nav-card');

      if (sections) {
        gsap.set(sections, { opacity: 0, y: 80 });
        gsap.to(sections, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          clearProps: 'transform',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 space-y-20 md:space-y-40">

        {/* ===== Projects Section ===== */}
        <div className="nav-card flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left: Project Slider */}
          <div className="w-full lg:w-[60%] relative group">
            <div className="relative z-10 glass-panel p-4 rounded-xl nebula-glow">
              <div
                className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/8] overflow-hidden rounded-lg bg-black relative touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Slides */}
                {sliderProjects.map((project, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'scale(1)' : 'scale(1.05)',
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                ))}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d1f]/90 via-[#070d1f]/20 to-transparent z-10" />

                {/* Navigation arrows */}
                <button
                  onClick={goPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-[#41475b]/30 flex items-center justify-center text-[#dfe4fe] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-black/60 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-base sm:text-lg">chevron_left</span>
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-[#41475b]/30 flex items-center justify-center text-[#dfe4fe] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-black/60 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-base sm:text-lg">chevron_right</span>
                </button>

                {/* Overlay Card with project info */}
                <div className="absolute bottom-3 left-3 right-3 p-3 sm:bottom-6 sm:left-6 sm:right-6 sm:p-6 glass-panel rounded-lg sm:rounded-xl z-20">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#72dcff] font-bold mb-1 sm:mb-2 block">
                        Proyecto {currentSlide + 1} de {sliderProjects.length}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-headline font-extrabold text-[#dfe4fe] transition-all duration-300">
                        {sliderProjects[currentSlide].title}
                      </h3>
                    </div>
                    <div className="flex gap-1.5 sm:gap-2 flex-wrap sm:justify-end">
                      {sliderProjects[currentSlide].tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#1c253e] rounded-full text-[10px] sm:text-xs text-[#a5aac2]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dots */}
                <div className="absolute bottom-[70px] sm:bottom-[90px] left-1/2 -translate-x-1/2 z-20 hidden sm:flex gap-2">
                  {sliderProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? 'w-8 bg-[#72dcff]'
                          : 'w-3 bg-[#41475b]/50 hover:bg-[#41475b]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Back-layer depth */}
            <div className="absolute top-8 left-8 w-full h-full bg-[#ac8aff]/5 rounded-xl -z-10 blur-sm" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#ec63ff]/10 rounded-full blur-3xl" />
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-[40%] space-y-8">
            <div className="space-y-4">
              <span className="text-[#ec63ff] text-sm font-bold tracking-[0.2em] uppercase">
                Showcase
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black tracking-tighter leading-none text-[#dfe4fe]">
                Mis{' '}
                <span className="bg-gradient-to-r from-[#72dcff] to-[#ac8aff] bg-clip-text text-transparent">
                  Proyectos
                </span>
              </h2>
              <p className="text-[#a5aac2] text-lg leading-relaxed max-w-md">
                Explorando la frontera del desarrollo frontend mediante la creación de interfaces dinámicas que responden al movimiento humano y datos en tiempo real.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <Link
                href="/proyectos"
                className="w-fit px-8 py-4 rounded-xl bg-gradient-to-r from-[#72dcff] to-[#ac8aff] text-[#004253] font-bold text-lg hover:scale-105 transition-transform nebula-glow flex items-center gap-3"
              >
                Ver todos los proyectos
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <div className="flex items-center gap-4 py-4 border-t border-[#41475b]/15">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-[#171f36] flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-[#72dcff]">terminal</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-[#171f36] flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-[#ac8aff]">layers</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-[#171f36] flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-[#ec63ff]">animation</span>
                  </div>
                </div>
                <span className="text-sm text-[#6f758b]">+15 Experiencias Digitales</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Blog Section ===== */}
        <div className="nav-card bg-[#0c1326] rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 lg:p-20 relative overflow-hidden">
          {/* Abstract background */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#ac8aff]/5 to-transparent" />

          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Content */}
            <div className="w-full lg:w-[40%] space-y-8">
              <div className="space-y-4">
                <span className="text-[#72dcff] text-sm font-bold tracking-[0.2em] uppercase">
                  Insights
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black tracking-tighter leading-tight text-[#dfe4fe]">
                  Blog &amp;{' '}
                  <span className="bg-gradient-to-r from-[#72dcff] to-[#ac8aff] bg-clip-text text-transparent">
                    Pensamiento Técnico
                  </span>
                </h2>
                <p className="text-[#a5aac2] text-lg leading-relaxed">
                  Compartiendo conocimientos sobre arquitectura de sistemas, optimización de performance y el futuro de la web interactiva.
                </p>
              </div>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <span className="text-xs text-[#6f758b] uppercase tracking-widest">
                    Post Destacado
                  </span>
                  <h4 className="text-xl font-headline font-bold text-[#dfe4fe] group-hover:text-[#72dcff] transition-colors">
                    La era de los layouts asimétricos y el Micro-frontend
                  </h4>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex px-8 py-4 rounded-xl border border-[#72dcff]/30 bg-[#72dcff]/5 text-[#72dcff] font-bold text-lg hover:bg-[#72dcff]/10 transition-all items-center gap-3"
                >
                  Leer artículos
                  <span className="material-symbols-outlined">menu_book</span>
                </Link>
              </div>
            </div>

            {/* Right: Blog Visuals */}
            <div className="w-full lg:w-[60%] grid grid-cols-2 gap-4 sm:gap-6">
              {/* Column 1 */}
              <div className="space-y-4 sm:space-y-6">
                <div className="glass-panel p-2 rounded-2xl aspect-square overflow-hidden group">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#11192e] via-[#1c253e] to-[#0c1326] relative overflow-hidden group-hover:scale-110 transition-transform duration-1000">
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, #72dcff 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }} />
                    <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-[#72dcff]/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-[#ac8aff]/10 rounded-full blur-2xl" />
                  </div>
                </div>
                <div className="bg-[#1c253e] p-4 sm:p-6 rounded-2xl border border-[#41475b]/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#ec63ff]/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#ec63ff] text-xs sm:text-sm">code</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm text-[#a5aac2] truncate">¿Cómo centrar un div?</span>
                      <p className="text-[8px] sm:text-[10px] text-[#6f758b] italic truncate" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Cerca de 336,000 resultados (0.25 s)
                      </p>
                    </div>
                  </div>
                  <div className="font-mono text-[9px] sm:text-[11px] leading-relaxed space-y-0.5">
                    <p><span className="text-[#ec63ff]">div</span> <span className="text-[#41475b]">{'{'}</span></p>
                    <p className="pl-4"><span className="text-[#72dcff]">display</span><span className="text-[#41475b]">:</span> <span className="text-[#ac8aff]">flex</span><span className="text-[#41475b]">;</span></p>
                    <p className="pl-4"><span className="text-[#72dcff]">justify-content</span><span className="text-[#41475b]">:</span> <span className="text-[#ac8aff]">center</span><span className="text-[#41475b]">;</span></p>
                    <p className="pl-4"><span className="text-[#72dcff]">align-items</span><span className="text-[#41475b]">:</span> <span className="text-[#ac8aff]">center</span><span className="text-[#41475b]">;</span></p>
                    <p><span className="text-[#41475b]">{'}'}</span></p>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="pt-6 sm:pt-12 space-y-4 sm:space-y-6">
                <div className="bg-[#1c253e] p-4 sm:p-6 rounded-2xl border border-[#41475b]/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#72dcff]/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#72dcff] text-xs sm:text-sm">speed</span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#a5aac2]">Performance</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-headline font-black text-[#dfe4fe]">99.9</div>
                  <span className="text-[10px] sm:text-xs text-[#6f758b] uppercase">Core Web Vitals</span>
                </div>
                <div className="glass-panel p-2 rounded-2xl aspect-square overflow-hidden group">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#1c253e] via-[#11192e] to-[#0c1326] relative overflow-hidden group-hover:scale-110 transition-transform duration-1000">
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, #ac8aff 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }} />
                    <div className="absolute top-1/4 right-1/3 w-28 h-28 bg-[#ac8aff]/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-[#ec63ff]/10 rounded-full blur-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
