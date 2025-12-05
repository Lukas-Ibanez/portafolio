'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título y descripción
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Animación de las skills
      const skillCards = skillsRef.current?.querySelectorAll('.skill-card');
      if (skillCards) {
        gsap.from(skillCards, {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
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
      category: 'Front-End',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      category: 'Back-End',
      items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      category: 'Herramientas',
      items: ['Git', 'Docker', 'Vercel', 'VS Code', 'Figma'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Sobre Mí
            </span>
          </h2>

          {/* Descripción */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="about-text text-lg md:text-xl text-gray-300 text-center">
              Soy un <span className="text-blue-400 font-semibold">Programador Computacional</span> y{' '}
              <span className="text-purple-400 font-semibold">Desarrollador Full-Stack</span> con{' '}
              <span className="text-cyan-400 font-semibold">2 años de experiencia</span> creando
              aplicaciones web modernas y escalables.
            </p>
            <p className="about-text text-lg text-gray-400 text-center">
              Mi especialización está en el <span className="text-blue-400">desarrollo Front-End</span>,
              donde disfruto transformando diseños en experiencias interactivas, fluidas y
              accesibles. Tengo experiencia trabajando con las últimas tecnologías del ecosistema
              JavaScript y me apasiona crear interfaces que deleiten a los usuarios.
            </p>
          </div>

          {/* Skills Grid */}
          <div ref={skillsRef} className="grid md:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="skill-card group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
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
                        key={item}
                        className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Foto placeholder */}
          <div className="mt-16 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-900">
                <svg
                  className="w-24 h-24 text-gray-600"
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
        </div>
      </div>
    </section>
  );
}
