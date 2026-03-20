'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-badge, .hero-title, .hero-subtitle, .hero-desc, .hero-cta, .hero-metric, .tech-float', {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform' })
        .to('.hero-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform' }, '-=0.3')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform' }, '-=0.5')
        .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform' }, '-=0.4')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', clearProps: 'transform' }, '-=0.3')
        .to('.hero-metric', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: 'transform' }, '-=0.3')
        .to('.tech-float', { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' }, '-=0.5');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 kinetic-grid opacity-20 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#72dcff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ec63ff]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center lg:items-start lg:grid lg:grid-cols-12 lg:gap-12 min-h-screen">
        {/* Left Column: Branding & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171f36] border border-[#41475b]/15 mb-6 self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#72dcff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#72dcff]" />
            </span>
            <span className="text-xs font-label uppercase tracking-widest text-[#72dcff]">
              Disponible para nuevos desafíos
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black font-headline tracking-tighter leading-[0.9] mb-6 text-[#dfe4fe]">
            LUKAS IBÁÑEZ
            <br />
            <span className="hero-subtitle text-transparent bg-clip-text bg-linear-to-r from-[#72dcff] via-[#ac8aff] to-[#ec63ff]">
              FULL-STACK DEVELOPER
            </span>
          </h1>

          {/* Description */}
          <p className="hero-desc text-lg md:text-xl text-[#a5aac2] max-w-2xl mb-10 leading-relaxed">
            Transformando ideas en experiencias digitales excepcionales con +2 años de pasión por el código. Arquitecto de interfaces dinámicas y sistemas robustos.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-6 mb-16">
            <Link
              href="/proyectos"
              className="hero-cta px-8 py-4 rounded-xl bg-linear-to-r from-[#72dcff] to-[#ac8aff] text-[#004253] font-bold text-lg hover:scale-105 transition-all duration-300 nebula-glow group flex items-center gap-2"
            >
              Explorar Proyectos
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/contacto"
              className="hero-cta px-8 py-4 rounded-xl glass-panel border border-[#41475b]/15 text-[#72dcff] font-bold text-lg hover:bg-[#171f36] transition-all duration-300 flex items-center gap-2"
            >
              Iniciar Conversación
              <span className="material-symbols-outlined">chat_bubble</span>
            </Link>
          </div>

          {/* Metrics Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div className="hero-metric glass-panel p-6 rounded-2xl border border-[#41475b]/10 hover:border-[#72dcff]/30 transition-colors group">
              <div className="text-3xl font-black text-[#72dcff] mb-1 font-headline">50+</div>
              <div className="text-sm font-label uppercase tracking-wider text-[#a5aac2]">Proyectos Completados</div>
            </div>
            <div className="hero-metric glass-panel p-6 rounded-2xl border border-[#41475b]/10 hover:border-[#ac8aff]/30 transition-colors">
              <div className="text-3xl font-black text-[#ac8aff] mb-1 font-headline">2+ Años</div>
              <div className="text-sm font-label uppercase tracking-wider text-[#a5aac2]">Experiencia</div>
            </div>
            <div className="hero-metric glass-panel p-6 rounded-2xl border border-[#41475b]/10 hover:border-[#ec63ff]/30 transition-colors">
              <div className="text-3xl font-black text-[#ec63ff] mb-1 font-headline">100%</div>
              <div className="text-sm font-label uppercase tracking-wider text-[#a5aac2]">Compromiso</div>
            </div>
          </div>
        </div>

        {/* Right Column: Technology Cloud */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0 hidden md:flex items-center justify-center">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:relative md:block md:w-full md:aspect-square md:max-w-[500px]">
            {/* Central Orb */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#72dcff]/20 rounded-full blur-[60px]" />

            {/* React */}
            <div className="tech-float glass-panel p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl border border-[#41475b]/20 flex flex-col items-center gap-1 md:gap-2 shadow-xl hover:-translate-y-2 transition-transform duration-500 md:absolute md:top-[10%] md:left-[20%]">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" viewBox="0 0 256 228" fill="none"><circle cx="128" cy="114" r="20" fill="#61DAFB"/><ellipse cx="128" cy="114" rx="100" ry="38" stroke="#61DAFB" strokeWidth="8" fill="none"/><ellipse cx="128" cy="114" rx="100" ry="38" stroke="#61DAFB" strokeWidth="8" fill="none" transform="rotate(60 128 114)"/><ellipse cx="128" cy="114" rx="100" ry="38" stroke="#61DAFB" strokeWidth="8" fill="none" transform="rotate(120 128 114)"/></svg>
              <span className="text-xs font-bold font-headline">React</span>
            </div>

            {/* Next.js */}
            <div className="tech-float glass-panel p-3 sm:p-4 md:p-4 rounded-xl md:rounded-2xl border border-[#41475b]/20 flex flex-col items-center gap-1 md:gap-2 shadow-xl hover:-translate-y-2 transition-transform duration-700 md:absolute md:top-[5%] md:right-[15%]">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" viewBox="0 0 180 180" fill="none"><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="#fff"/></mask><g mask="url(#a)"><circle cx="90" cy="90" r="90" fill="#000" stroke="#fff" strokeWidth="6"/><path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461a90.304 90.304 0 009.509-7.325Z" fill="url(#b)"/><path d="M115 54h12v72h-12z" fill="url(#c)"/></g><defs><linearGradient id="b" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><linearGradient id="c" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs></svg>
              <span className="text-xs font-bold font-headline">Next.js</span>
            </div>

            {/* TypeScript */}
            <div className="tech-float glass-panel p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl border border-[#41475b]/20 flex flex-col items-center gap-1 md:gap-2 shadow-xl hover:-translate-y-2 transition-transform duration-500 md:absolute md:top-[40%] md:right-[0%]">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" viewBox="0 0 256 256" fill="none"><rect width="256" height="256" rx="20" fill="#3178C6"/><path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.259 4.492-2.906 8.048-6.797 10.669-11.672 2.621-4.875 3.931-10.958 3.931-18.249 0-5.237-.96-9.864-2.879-13.882-1.919-4.018-4.549-7.58-7.891-10.685-3.342-3.106-7.254-5.9-11.737-8.384-4.483-2.484-9.288-4.81-14.416-6.979-3.746-1.593-7.159-3.128-10.238-4.606-3.079-1.478-5.71-2.984-7.891-4.519-2.181-1.535-3.873-3.186-5.075-4.952-1.203-1.767-1.804-3.794-1.804-6.081 0-2.114.544-3.996 1.631-5.647 1.088-1.651 2.592-3.07 4.513-4.259 1.919-1.189 4.195-2.087 6.826-2.695 2.632-.607 5.479-.911 8.543-.911 2.227 0 4.57.173 7.028.519 2.459.346 4.917.895 7.375 1.647 2.458.752 4.83 1.709 7.115 2.868 2.285 1.16 4.368 2.542 6.249 4.146v-25.834c-4.087-1.651-8.543-2.868-13.369-3.651-4.826-.783-10.266-1.175-16.319-1.175-6.565 0-12.784.691-18.659 2.072-5.875 1.382-11.043 3.565-15.504 6.552-4.461 2.986-7.978 6.854-10.554 11.602-2.574 4.749-3.862 10.488-3.862 17.218 0 8.672 2.574 16.022 7.721 22.052 5.148 6.029 12.784 11.02 22.909 14.971 3.919 1.535 7.606 3.07 11.06 4.606 3.456 1.535 6.449 3.157 8.977 4.865 2.527 1.709 4.513 3.592 5.96 5.647 1.445 2.056 2.168 4.403 2.168 7.043 0 1.941-.486 3.737-1.458 5.388-.973 1.651-2.401 3.07-4.283 4.259-1.883 1.189-4.195 2.114-6.942 2.782-2.746.667-5.854 1.001-9.326 1.001-6.101 0-12.057-1.132-17.867-3.392-5.81-2.261-11.043-5.617-15.7-10.07zM96.594 121.396H129V100H36v21.396h32.272V234h28.322V121.396z" fill="#fff"/></svg>
              <span className="text-xs font-bold font-headline">TypeScript</span>
            </div>

            {/* Node.js */}
            <div className="tech-float glass-panel p-3 sm:p-4 md:p-4 rounded-xl md:rounded-2xl border border-[#41475b]/20 flex flex-col items-center gap-1 md:gap-2 shadow-xl hover:-translate-y-2 transition-transform duration-500 md:absolute md:bottom-[20%] md:right-[10%]">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" viewBox="0 0 256 289" fill="none"><path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.082c0-1.325-.53-2.385-1.59-2.915L129.325 19.167c-1.06-.53-2.385-.53-3.18 0L20.405 80.167c-1.06.53-1.59 1.856-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.696c15.636 7.95 25.442-1.325 25.442-10.6V93.152c0-1.59 1.325-3.18 3.18-3.18h13.515c1.59 0 3.18 1.325 3.18 3.18v121.11c0 20.936-11.395 33.126-31.27 33.126-6.095 0-10.865 0-24.38-6.625l-27.828-15.9C4.24 221.403 0 214.248 0 206.563V84.392c0-7.685 4.24-14.84 11.13-18.816L116.87 4.36c6.625-3.71 15.37-3.71 21.996 0l105.74 61.217C251.496 69.552 256 76.707 256 84.392v122.17c0 7.686-4.504 14.841-11.395 18.816l-105.74 61.217c-3.18 1.325-6.89 1.856-10.865 1.856zm31.535-83.743c-44.787 0-54.122-20.671-54.122-37.897 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.915 1.06 2.915 2.65 2.12 14.046 8.215 20.936 36.307 20.936 22.261 0 31.8-5.035 31.8-16.961 0-6.89-2.65-11.925-37.367-15.37-28.887-2.915-46.907-9.275-46.907-32.33 0-21.466 18.02-34.186 48.232-34.186 33.921 0 50.617 11.66 52.737 37.102 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.325 0-2.65-1.06-2.915-2.385-3.18-14.576-11.395-19.346-33.126-19.346-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.307 14.311 32.596 4.24 47.967 10.335 47.967 33.126-.265 23.321-19.346 36.572-53.002 36.572z" fill="#339933"/></svg>
              <span className="text-xs font-bold font-headline">Node.js</span>
            </div>

            {/* GSAP */}
            <div className="tech-float glass-panel p-3 sm:p-4 md:p-4 rounded-xl md:rounded-2xl border border-[#41475b]/20 flex flex-col items-center gap-1 md:gap-2 shadow-xl hover:-translate-y-2 transition-transform duration-500 md:absolute md:bottom-[5%] md:left-[40%]">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="16" fill="#0ae448"/><text x="50" y="68" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="42" fontWeight="900" fill="#000">GS</text></svg>
              <span className="text-xs font-bold font-headline">GSAP</span>
            </div>

            {/* Tailwind */}
            <div className="tech-float glass-panel p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl border border-[#41475b]/20 flex flex-col items-center gap-1 md:gap-2 shadow-xl hover:-translate-y-2 transition-transform duration-500 md:absolute md:bottom-[25%] md:left-[0%]">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" viewBox="0 0 256 154" fill="none"><path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="#06B6D4"/></svg>
              <span className="text-xs font-bold font-headline">Tailwind</span>
            </div>

            {/* PostgreSQL - Featured Center */}
            <div className="tech-float glass-panel p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 border-[#72dcff]/20 flex flex-col items-center gap-1 md:gap-2 shadow-2xl z-10 md:scale-110 hover:scale-110 md:hover:scale-125 transition-transform md:absolute md:top-[35%] md:left-[40%]">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" viewBox="0 0 256 264" fill="none"><path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.818 211.96.013 192.124 0h-.063c-10.627.017-19.985 3.2-22.182 4.327-5.56-2.218-14.837-5.53-25.344-6.778-13.022-1.545-23.86.551-32.27 6.24-4.573-1.803-14.631-5.291-26.3-5.784-12.207-.515-22.467 2.573-30.485 9.178-8.354 6.882-14.205 17.49-17.39 31.55-7.382 32.564 2.042 76.807 23.27 109.678-3.478 6.792-5.593 14.556-5.348 22.392.543 17.397 10.357 30.384 28.042 37.318 11.043 4.332 23.28 5.803 32.537 5.803 2.768 0 5.337-.138 7.646-.36 7.842-.756 14.653-2.792 20.33-5.826 4.407 2.282 9.478 3.629 15.18 3.629h.357c17.46-.198 31.362-8.748 38.468-23.657 4.074-8.55 5.083-17.636 5.416-23.74 3.637-6.453 7.58-18.637 7.636-18.874.023-.087 3.236-12.3 2.724-14.704zM75.458 203.093c-6.627-2.6-10.747-6.745-11.227-11.313a23.116 23.116 0 01-.037-2.917c7.37 5.767 17.803 9.683 31.54 11.682-6.258 2.1-13.08 3.322-20.276 2.548zm38.96-5.424c-1.088.393-2.445.827-3.973 1.256-4.944 1.396-11.632 2.228-18.855 1.934-12.872-.52-22.43-4.928-27.652-12.757-3.023-4.525-4.396-10.241-3.867-16.098.318-3.523 1.358-6.872 3.057-9.855.753 1.024 1.55 2.05 2.418 3.07 10.394 12.207 25.138 20.674 39.627 22.685.456.063.906.123 1.353.18 1.27 1.614 3.594 3.973 5.898 5.975.54.47 1.18 1.022 1.89 1.623a37.415 37.415 0 01-.896 1.987z" fill="#336791"/><path d="M196.486 108.53c-.156-.245-.318-.497-.488-.753-2.426-3.66-5.393-6.938-8.47-9.6.088.016.186.005.274.019 5.476.85 9.9-2.932 10.553-5.9.843-3.836-2.39-7.255-4.913-9.009-1.729-1.202-8.753-5.14-17.408-2.596 2.098-8.757 2.472-17.838 1.21-25.429-2.048-12.324-7.782-21.543-16.585-26.644-2.32-1.344-5.474-2.808-9.36-3.079l-.332-.008c-1.442-.047-2.86.132-4.217.445 1.353-7.432-.037-12.443-4.26-15.327-3.683-2.513-8.99-2.674-14.92-1.033a41.93 41.93 0 00-4.476 1.558l-.152.063a25.079 25.079 0 00-.426-.437c-6.105-6.064-14.476-8.834-24.209-8.006-7.378.628-13.352 3.054-17.267 5.028-2.088-1.041-5.9-2.613-10.573-3.597-8.362-1.76-15.517-1.208-21.27 1.643-9.097 4.508-14.753 14.108-17.258 29.189C46.183 67.137 55.5 109.467 74.936 139.84c-2.22 5.397-3.12 11.22-2.623 17.112.723 8.548 5.003 14.903 13.3 19.66-4.236-.38-8.194-1.236-11.737-2.609-11.053-4.28-17.575-12.04-18.87-22.462-.485-3.91.134-8.457 1.79-13.14.31-.873-1.228-3.757-2.377-3.204-1.78.858-4.464 5.293-5.374 8.543-1.58 5.64-2.027 11.11-1.158 16.283 1.768 10.524 7.985 18.394 17.98 22.763 8.386 3.666 17.898 5.062 27.006 4.519a45.566 45.566 0 0011.148-2.139c2.207-.687 4.254-1.467 6.115-2.312 3.888 1.32 8.174 2.149 12.876 2.276 10.644.288 19.192-2.64 25.544-8.13.36 1.262.887 2.438 1.637 3.464 3.478 4.764 9.543 6.264 15.577 6.099 11.22-.307 17.493-7.338 18.748-21.02l.04-.587c.176-3.25.188-11.127.189-14.924 0-1.136-.21-3.752-.253-4.899l.174-.33c2.288 1.735 4.785 3.196 7.452 4.3l1.37.518c9.027 3.147 18.14 2.564 23.58-.142 4.607-2.292 6.837-6.005 5.897-9.843-1.07-4.368-5.525-5.13-8.592-4.85-3.258.299-5.897-.018-8.32-.82z" fill="#fff"/></svg>
              <span className="text-xs md:text-sm font-black font-headline tracking-widest">POSTGRES</span>
            </div>

            {/* MongoDB */}
            <div className="tech-float glass-panel p-3 sm:p-4 md:p-4 rounded-xl md:rounded-2xl border border-[#41475b]/20 flex flex-col items-center gap-1 md:gap-2 shadow-xl hover:-translate-y-2 transition-transform duration-500 md:absolute md:top-[65%] md:left-[20%]">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" viewBox="0 0 256 549" fill="none"><path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 00-1.492 0c-4.048 5.759-23.863 33.487-46.873 60.788-197.507 251.896 31.75 421.386 31.75 421.386l2.89 2.137a71.313 71.313 0 001.86 39.426l.488-.139s179.158-130.91 11.25-462.81z" fill="#00ED64"/><path d="M128.075 489.592s-4.95-3.2-6.4-5.76l-1.32-113.673s4.621-3.2 7.872-2.56c3.252.641 6.4 2.56 6.4 2.56l-1.28 114.449c0 .646-2.026 3.338-5.272 4.984z" fill="#00381A" fillOpacity=".5"/><path d="M135.507 370.56l-1.28 114.448s-2.367 3.602-6.152 4.984c0 0 4.429-2.093 4.429-7.322l1.324-113.088c-.001-.001-1.155.657 1.679.978z" fill="#fff" fillOpacity=".2"/></svg>
              <span className="text-xs font-bold font-headline">MongoDB</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
