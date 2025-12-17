'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbitalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Wave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      color: string;
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = Math.random() * 200 + 100;
        this.speed = Math.random() * 2 + 1;
        const colors = ['59, 130, 246', '139, 92, 246', '6, 182, 212', '168, 85, 247'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 0.6;
      }

      update() {
        this.radius += this.speed;
        this.alpha = (1 - this.radius / this.maxRadius) * 0.6;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      isFinished() {
        return this.radius >= this.maxRadius;
      }
    }

    const waves: Wave[] = [];
    let animationId: number;

    const createWave = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      waves.push(new Wave(x, y));
    };

    const waveInterval = setInterval(createWave, 500);

    function animate() {
      if (!ctx) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].update();
        waves[i].draw();
        if (waves[i].isFinished()) {
          waves.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(waveInterval);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animaciones aleatorias para elementos orbitales
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Círculos grandes
      gsap.to('.orbital-circle-1', {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        rotation: 'random(0, 360)',
        duration: 'random(15, 25)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.orbital-circle-2', {
        x: 'random(-80, 80)',
        y: 'random(-80, 80)',
        rotation: 'random(0, 360)',
        duration: 'random(12, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.orbital-circle-3', {
        x: 'random(-120, 120)',
        y: 'random(-120, 120)',
        rotation: 'random(0, 360)',
        duration: 'random(18, 28)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.orbital-circle-4', {
        x: 'random(-90, 90)',
        y: 'random(-90, 90)',
        rotation: 'random(0, 360)',
        duration: 'random(14, 22)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Cuadrados pequeños
      gsap.to('.orbital-square-1', {
        x: 'random(-60, 60)',
        y: 'random(-60, 60)',
        rotation: 'random(-180, 180)',
        duration: 'random(10, 18)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.orbital-square-2', {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        rotation: 'random(-180, 180)',
        duration: 'random(12, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, orbitalsRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Canvas con efecto de ondas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      />

      {/* Overlay oscuro adicional para asegurar el fondo negro */}
      <div className="fixed inset-0 z-0 bg-black pointer-events-none" />

      {/* Grid de fondo */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px',
          opacity: 0.1,
        }}
      />
      
      {/* Gradientes - sin parallax, siempre presentes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-cyan-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Elementos orbitales decorativos con blur y movimientos aleatorios */}
      <div ref={orbitalsRef} className="fixed inset-0 z-0 pointer-events-none">
        <div className="orbital-circle-1 absolute top-20 left-20 w-32 h-32 border-2 border-blue-500/20 rounded-full blur-sm"></div>
        <div className="orbital-circle-2 absolute top-40 right-32 w-24 h-24 border-2 border-purple-500/20 rounded-full blur-sm"></div>
        <div className="orbital-circle-3 absolute bottom-32 left-40 w-40 h-40 border-2 border-cyan-500/20 rounded-full blur-sm"></div>
        <div className="orbital-circle-4 absolute bottom-20 right-20 w-28 h-28 border-2 border-pink-500/20 rounded-full blur-sm"></div>
        
        {/* Elementos geométricos adicionales */}
        <div className="orbital-square-1 absolute top-1/4 left-1/4 w-16 h-16 border-2 border-blue-400/15 rotate-45 blur-sm"></div>
        <div className="orbital-square-2 absolute top-3/4 right-1/4 w-20 h-20 border-2 border-purple-400/15 rotate-12 blur-sm"></div>
      </div>
    </>
  );
}
