'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/projects-data';

export default function ProyectosPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const projects = getProjects();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Animación de la descripción
      gsap.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Animación stagger de los proyectos
      const projectCards = gridRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        gsap.from(projectCards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.4,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20">
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
            Una colección de sitios web y aplicaciones que he desarrollado. Cada proyecto
            representa un desafío único y una oportunidad de aprendizaje.
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
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
