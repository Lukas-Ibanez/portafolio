'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-config';

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/proyectos', label: 'Proyectos' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ];

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Animación de entrada del header
    gsap.from(header, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // Cambio de estilo al hacer scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(header, {
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
        });
      } else {
        gsap.to(header, {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.3,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isMenuOpen) {
      gsap.to(menu, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(menu, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <nav className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="relative">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                LI
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm lg:text-base font-medium transition-colors duration-300 group ${
                    pathname === link.href
                      ? 'text-blue-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="md:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gray-900 backdrop-blur-lg transform translate-x-full z-50 border-l border-gray-800"
      >
        <div className="flex flex-col h-full">
          {/* Header del menú con botón de cerrar */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Menú
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Links del menú */}
          <div className="flex flex-col gap-2 p-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-medium transition-colors duration-300 py-3 px-4 rounded-lg ${
                  pathname === link.href
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Overlay de fondo cuando el menú está abierto */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}
