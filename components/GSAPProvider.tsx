'use client';

import { useEffect, useState } from 'react';
import { initGSAP } from '@/lib/gsap-config';
import { gsap } from '@/lib/gsap-config';

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    initGSAP();

    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Apply parallax effect to background gradients
  useEffect(() => {
    const parallaxFast = document.querySelectorAll('.parallax-fast');
    const parallaxMedium = document.querySelectorAll('.parallax-medium');
    const parallaxSlow = document.querySelectorAll('.parallax-slow');

    if (parallaxFast.length > 0) {
      gsap.to(parallaxFast, {
        x: mousePosition.x * 40,
        y: mousePosition.y * 40,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (parallaxMedium.length > 0) {
      gsap.to(parallaxMedium, {
        x: mousePosition.x * 20,
        y: mousePosition.y * 20,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    if (parallaxSlow.length > 0) {
      gsap.to(parallaxSlow, {
        x: mousePosition.x * 10,
        y: mousePosition.y * 10,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, [mousePosition]);

  return <>{children}</>;
}
