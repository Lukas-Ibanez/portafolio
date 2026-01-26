import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs } from '@/lib/sanity-client'
import { getImageUrl } from '@/lib/blog-utils-sanity'
import Link from 'next/link'
import Image from 'next/image'
import PortableTextRenderer from '@/components/PortableTextRenderer'

export async function generateStaticParams() {
  const posts = await getPostSlugs()
  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }

  return {
    title: `${post.title} | Lukas Ibáñez`,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const coverImageUrl = post.coverImage ? getImageUrl(post.coverImage) : undefined

  return (
    <div className="min-h-screen pt-32 pb-20">
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
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Cover image */}
          {coverImageUrl && (
            <div className="mt-6">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-4">
                <Image
                  src={coverImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>
          )}

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
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-li:text-white">
          {post.content && <PortableTextRenderer content={post.content} />}
        </div>

        {/* Fuentes/Referencias */}
        {post.sources && post.sources.length > 0 && (
          <div className="mt-12 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Fuentes y Referencias
            </h3>
            <ul className="space-y-3">
              {post.sources.map((source, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-400 font-semibold mt-1">{index + 1}.</span>
                  <div>
                    <p className="text-white font-medium">{source.title}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300 break-all"
                    >
                      {source.url}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

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
  )
}
