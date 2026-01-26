'use client';

import Link from 'next/link';
import CoverImage from '@/components/CoverImage';
import { getImageUrl } from '@/lib/blog-utils-sanity';

interface BlogCardProps {
  post: any; // Puede ser Post de MDX o de Sanity
}

export default function BlogCard({ post }: BlogCardProps) {
  // Soporte para ambos sistemas (MDX y Sanity)
  const date = post.publishedAt || post.date;
  const imageUrl = post.coverImage 
    ? (typeof post.coverImage === 'string' ? post.coverImage : getImageUrl(post.coverImage))
    : (post.image || undefined);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card group block bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 hover:scale-105"
    >
      {/* Imagen placeholder */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden bg-gray-700">
        <div className="absolute inset-0">
          <CoverImage
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Badge de categoría */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
            post.category === 'programacion'
              ? 'bg-blue-500 text-white'
              : 'bg-purple-500 text-white'
          }`}
        >
          {post.category === 'programacion' ? 'Programación' : 'Otros'}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded border border-gray-600 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
