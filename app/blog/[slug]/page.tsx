import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog-utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import 'highlight.js/styles/github-dark.css';

export async function generateStaticParams() {
  const programacionPosts = getAllPosts('programacion');
  const otrosPosts = getAllPosts('otros');
  const allPosts = [...programacionPosts, ...otrosPosts];

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: `${post.title} | Lukas Ibáñez`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Categoría */}
          <div className="mb-4">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
                post.category === 'programacion'
                  ? 'bg-blue-500 text-white'
                  : 'bg-purple-500 text-white'
              }`}
            >
              {post.category === 'programacion' ? 'Programación' : 'Otros'}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Contenido */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>

        {/* Share buttons */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Compartir este artículo</h3>
          <div className="flex gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://lukasibañez.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://lukasibañez.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300"
          >
            Ver más artículos
          </Link>
        </div>
      </article>
    </div>
  );
}
