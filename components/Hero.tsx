'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-config';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setear estado inicial de todos los elementos
      gsap.set('.name-letter', { opacity: 0 });
      gsap.set('.subtitle-word', { opacity: 0, y: 50, rotationY: 90 });
      gsap.set('.description-text', { opacity: 0, y: 30 });
      gsap.set('.info-card', { opacity: 0, scale: 0.5, rotationY: -180 });
      gsap.set('.cta-button', { opacity: 0, scale: 0 });
      gsap.set('.stat-item', { opacity: 0, scale: 0 });
      gsap.set('.orbital-element', { opacity: 0, scale: 0 });
      gsap.set('.tech-icon', { opacity: 0, scale: 0 });

      // Pequeño delay para asegurar que el DOM esté listo
      gsap.delayedCall(0.1, () => {
        // Animación ÚNICA para cada letra del nombre (estilo GSAP.com)
        const letters = gsap.utils.toArray('.name-letter');
        
        letters.forEach((letter: any, index: number) => {
          // Cada letra tendrá propiedades iniciales y animaciones completamente diferentes
          // Versión optimizada para evitar superposiciones
          const animations = [
            // Letra 1: Rotación 3D suave
            { 
              from: { rotationX: -90, y: -50, scale: 0, opacity: 0 },
              to: { rotationX: 0, y: 0, scale: 1, opacity: 1, ease: 'back.out(1.5)', duration: 1 }
            },
            // Letra 2: Escala con blur
            { 
              from: { scale: 2, opacity: 0, filter: 'blur(10px)' },
              to: { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.9 }
            },
            // Letra 3: Rotación Y
            { 
              from: { rotationY: 90, opacity: 0, scale: 0.5 },
              to: { rotationY: 0, opacity: 1, scale: 1, ease: 'power3.out', duration: 1 }
            },
            // Letra 4: Desde abajo
            { 
              from: { y: 50, scale: 0.5, opacity: 0 },
              to: { y: 0, scale: 1, opacity: 1, ease: 'back.out(1.7)', duration: 1.1 }
            },
            // Letra 5: Rotación Z
            { 
              from: { rotationZ: 180, scale: 0, opacity: 0 },
              to: { rotationZ: 0, scale: 1, opacity: 1, ease: 'elastic.out(1, 0.5)', duration: 1.2 }
            },
            // Letra 6: Escala simple
            { 
              from: { scale: 0, opacity: 0 },
              to: { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.9 }
            },
            // Letra 7: Rotación X inversa
            { 
              from: { rotationX: 90, y: 30, opacity: 0, scale: 0.7 },
              to: { rotationX: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 1 }
            },
            // Letra 8: Zoom suave
            { 
              from: { scale: 0.3, opacity: 0 },
              to: { scale: 1, opacity: 1, ease: 'elastic.out(1, 0.6)', duration: 1.1 }
            },
            // Letra 9: Desde arriba
            { 
              from: { y: -50, opacity: 0, scale: 0.6 },
              to: { y: 0, opacity: 1, scale: 1, ease: 'bounce.out', duration: 1.2 }
            },
            // Letra 10: Rotación Y inversa
            { 
              from: { rotationY: -90, opacity: 0, scale: 0.5 },
              to: { rotationY: 0, opacity: 1, scale: 1, ease: 'power3.out', duration: 1 }
            },
            // Letra 11: Blur fade in
            { 
              from: { scale: 0.5, opacity: 0, filter: 'blur(8px)' },
              to: { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.9 }
            },
            // Letra 12: Rotación completa
            { 
              from: { rotationZ: -180, scale: 0, opacity: 0 },
              to: { rotationZ: 0, scale: 1, opacity: 1, ease: 'back.out(1.5)', duration: 1.1 }
            },
          ];

          // Seleccionar animación basada en el índice (se repite el patrón si hay más letras)
          const anim = animations[index % animations.length];
          
          // Aplicar estado inicial
          gsap.set(letter, anim.from);
          
          // Animar con delay escalonado
          gsap.to(letter, {
            ...anim.to,
            delay: index * 0.06,
          });
        });

        // Las letras se quedan estáticas después de la animación inicial para mayor profesionalismo

        // Subtítulo - cada palabra con animación única
        gsap.to('.subtitle-word', {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          delay: 1.2,
        });

        // Texto descriptivo
        gsap.to('.description-text', {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.8,
          ease: 'power3.out',
        });

        // Tarjetas con efectos 3D
        gsap.to('.info-card', {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          delay: 2,
        });

        // Animación continua de flotación más pronunciada
        gsap.to('.info-card', {
          y: (index) => (index % 2 === 0 ? -15 : 15),
          rotationZ: (index) => (index % 2 === 0 ? 2 : -2),
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.3,
          delay: 3.5,
        });

        // Stats numbers
        gsap.to('.stat-item', {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(2)',
          delay: 1.5,
        });

        // Tech stack icons
        gsap.to('.tech-icon', {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'elastic.out(1, 0.5)',
          delay: 2.2,
        });

        // Botones CTA
        gsap.to('.cta-button', {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          delay: 2.8,
        });

        // Elementos decorativos orbitales
        gsap.to('.orbital-element', {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.5,
        });

        // Animación orbital continua (muy lenta y sutil)
        gsap.to('.orbital-element', {
          rotation: 360,
          duration: 60,
          repeat: -1,
          ease: 'none',
          delay: 1.5,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Efecto parallax con el mouse
  useEffect(() => {
    gsap.to('.parallax-fast', {
      x: mousePosition.x * 40,
      y: mousePosition.y * 40,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to('.parallax-medium', {
      x: mousePosition.x * 20,
      y: mousePosition.y * 20,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to('.parallax-slow', {
      x: mousePosition.x * 10,
      y: mousePosition.y * 10,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, [mousePosition]);

  const name = 'LUKAS IBÁÑEZ';
  const subtitle = ['DESARROLLADOR', 'FULL-STACK', '&', 'CREADOR', 'DIGITAL'];
  const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'GSAP', 'Tailwind', 'PostgreSQL', 'MongoDB'];

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Nombre con animación individual por letra */}
          <div className="text-center mb-12">
            <div className="inline-block">
              {name.split('').map((char, index) => (
                <span
                  key={index}
                  className="name-letter inline-block text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent transform-gpu cursor-pointer hover:scale-150 transition-transform duration-300"
                  style={{
                    textShadow: '0 0 60px rgba(139, 92, 246, 0.8)',
                    display: char === ' ' ? 'inline' : 'inline-block',
                    marginRight: char === ' ' ? '0.5em' : '0',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>

          {/* Subtítulo dinámico */}
          <div className="text-center mb-16">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {subtitle.map((word, index) => (
                <span
                  key={index}
                  className="subtitle-word text-3xl md:text-5xl font-bold text-white relative group transform-gpu"
                >
                  <span className="relative z-10">{word}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"></span>
                </span>
              ))}
            </div>
            <p className="description-text text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Transformando ideas en <span className="text-blue-400 font-semibold">experiencias digitales</span> excepcionales con <span className="text-purple-400 font-semibold">2+ años</span> de pasión por el código
            </p>
          </div>

          {/* Stats rápidas */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="stat-item text-center">
              <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-gray-400 text-sm md:text-base">Proyectos Completados</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">2+</div>
              <div className="text-gray-400 text-sm md:text-base">Años de Experiencia</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-gray-400 text-sm md:text-base">Compromiso</div>
            </div>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="tech-icon px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-full text-gray-300 font-medium hover:border-blue-500 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Tarjetas de información */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
            <div className="info-card group relative bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent backdrop-blur-md border border-blue-500/30 rounded-3xl p-8 hover:border-blue-500 transition-all duration-500 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-3">Performance</h3>
                <p className="text-gray-400 leading-relaxed">Optimización extrema y velocidad en cada línea de código</p>
              </div>
            </div>

            <div className="info-card group relative bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 hover:border-purple-500 transition-all duration-500 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🎨</div>
                <h3 className="text-2xl font-bold text-white mb-3">Diseño Único</h3>
                <p className="text-gray-400 leading-relaxed">Interfaces que combinan estética y funcionalidad perfectamente</p>
              </div>
            </div>

            <div className="info-card group relative bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-500 transition-all duration-500 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🚀</div>
                <h3 className="text-2xl font-bold text-white mb-3">Innovación</h3>
                <p className="text-gray-400 leading-relaxed">Tecnologías de vanguardia en cada proyecto</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons mejorados */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/proyectos"
              className="cta-button group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full font-bold text-white text-xl overflow-hidden transform-gpu hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explorar Proyectos
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
            </Link>

            <Link
              href="/contacto"
              className="cta-button group relative px-12 py-6 border-2 border-white/30 backdrop-blur-sm rounded-full font-bold text-white text-xl hover:border-white hover:bg-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 transform-gpu hover:scale-110"
            >
              <span className="flex items-center gap-3">
                Iniciar Conversación
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
