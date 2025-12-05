import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// Configuración global de GSAP
export const initGSAP = () => {
  if (typeof window === 'undefined') return;

  // Configuración de ScrollTrigger
  ScrollTrigger.config({
    limitCallbacks: true,
  });

  // Respeto a prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    gsap.globalTimeline.timeScale(0);
    ScrollTrigger.defaults({ markers: false });
  }
};

// Animaciones reutilizables
export const fadeIn = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const staggerFadeIn = (elements: string | Element[], options = {}) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    ...options,
  });
};

export const slideIn = (element: string | Element, direction: 'left' | 'right' | 'top' | 'bottom', options = {}) => {
  const directionMap = {
    left: { x: -100 },
    right: { x: 100 },
    top: { y: -100 },
    bottom: { y: 100 },
  };

  return gsap.from(element, {
    ...directionMap[direction],
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const scaleIn = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    ...options,
  });
};

// Animación de texto tipo máquina de escribir
export const typewriterEffect = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    duration: 0.05,
    stagger: 0.05,
    ease: 'none',
    ...options,
  });
};
