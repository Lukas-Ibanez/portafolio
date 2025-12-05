'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-config';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/blog-utils';

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<'programacion' | 'otros'>('programacion');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const programacionPosts = getAllPosts('programacion');
  const otrosPosts = getAllPosts('otros');
  const currentPosts = activeTab === 'programacion' ? programacionPosts : otrosPosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from(tabsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const blogCards = gridRef.current?.querySelectorAll('.blog-card');
    if (blogCards) {
      gsap.from(blogCards, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p ref={descriptionRef} className="text-xl text-gray-400 opacity-0">
            Pensamientos sobre programación, desarrollo web y más.
          </p>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="flex justify-center mb-12 opacity-0">
          <div className="inline-flex bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('programacion')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'programacion'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Programación
            </button>
            <button
              onClick={() => setActiveTab('otros')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'otros'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Otros
            </button>
          </div>
        </div>

        {/* Grid de Posts */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => <BlogCard key={post.slug} post={post} />)
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 text-lg">
                No hay posts en esta categoría todavía.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
