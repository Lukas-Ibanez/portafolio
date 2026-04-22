'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import Image from 'next/image';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título y descripción
      gsap.set('.about-title', { opacity: 0, y: 50 });
      gsap.to('.about-title', {
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.set('.about-text', { opacity: 0, y: 30 });
      gsap.to('.about-text', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Animación de las skills
      const skillCards = skillsRef.current?.querySelectorAll('.skill-card');
      if (skillCards) {
        gsap.set(skillCards, { opacity: 0, y: 50 });
        gsap.to(skillCards, {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      category: 'Desarrollo Web',
      items: [
        { name: 'Django', logo: '/logos/django.webp' },
        { name: 'Nuxt', logo: '/logos/nuxt.webp' },
        { name: 'Astro', logo: '/logos/atro.webp' },
        { name: 'WordPress', logo: '/logos/word-press-logo.png' },
        { name: 'WooCommerce', logo: '/logos/WooCommerce.webp' }
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      category: 'Lenguajes',
      items: [
        { name: 'Python', logo: '/logos/Python.webp' },
        { name: 'Java', logo: '/logos/java.webp' },
        { name: 'PHP', logo: '/logos/PHP.webp' },
        { name: 'JavaScript', logo: '/logos/javascript.webp' },
        { name: 'Vue', logo: '/logos/Vue.webp' }
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      category: 'Frontend & Mobile',
      items: [
        { name: 'CSS Nativo', logo: '/logos/CSS3.webp' },
        { name: 'Bootstrap', logo: '/logos/Bootstrap.webp' },
        { name: 'Tailwind CSS', logo: '/logos/Tailwind_CSS.webp' },
        { name: 'Ionic', logo: '/logos/ionic.webp' }
      ],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      category: 'Base de Datos',
      items: [
        { name: 'MySQL', logo: '/logos/mysql.webp' },
        { name: 'PostgreSQL', logo: '/logos/Postgresql.webp' },
        { name: 'Oracle', logo: '/logos/Oracle.webp' }
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      category: 'DevOps & Herramientas',
      items: [
        { name: 'GitHub', logo: '/logos/github-white.webp' },
        { name: 'Bitbucket', logo: '/logos/bitbucket.webp' },
        { name: 'Google Analytics', logo: '/logos/Google-Analytics.webp' },
        { name: 'Linux/Ubuntu', logo: '/logos/linux.webp' }
      ],
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Título centrado */}
          <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Sobre Mí
            </span>
          </h2>

          {/* Contenedor principal: Foto + Descripción */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-16 items-center">
            {/* Foto a la izquierda */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-900">
                  <svg
                    className="w-32 h-32 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Descripción a la derecha con texto alineado a la izquierda */}
            <div className="space-y-4 flex-1">
              <p className="about-text text-lg md:text-xl text-gray-300 text-left">
                Soy <span className="text-blue-400 font-semibold">Lukas Ibáñez</span>,{' '}
                <span className="text-purple-400 font-semibold">Analista Programador Computacional</span> egresado de{' '}
                <span className="text-cyan-400 font-semibold">Duoc UC</span>, con{' '}
                <span className="text-blue-400 font-semibold">2 años de experiencia</span> en desarrollo web profesional.
              </p>
              <p className="about-text text-lg text-gray-400 text-left">
                Me especializo en el <span className="text-blue-400">ciclo completo de un sitio web</span>: desde el levantamiento 
                del servidor en <span className="text-purple-400">Linux</span>, configuración de seguridad y automatización de procesos, 
                hasta el desarrollo <span className="text-cyan-400">front-end y back-end</span>, optimización de rendimiento, SEO y analítica. 
                No entrego código suelto — entrego <span className="text-blue-400">sitios listos para producción</span>.
              </p>
              <p className="about-text text-lg text-gray-400 text-left">
                Actualmente estoy trabajando y <span className="text-purple-400">abierto a nuevos proyectos</span>, ya sea freelance 
                o con contrato. A largo plazo, me interesa profundizar en{' '}
                <span className="text-cyan-400">arquitectura de software</span>.
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="skill-card opacity-0 group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
              >
                {/* Glow effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300`}
                ></div>

                <div className="relative">
                  <h3
                    className={`text-2xl font-bold mb-4 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                  >
                    {skill.category}
                  </h3>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300 mb-3"
                      >
                        <div className="w-6 h-6 mr-3 relative flex-shrink-0 flex justify-center items-center">
                          <Image 
                            src={item.logo} 
                            alt={item.name}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
