import { client, urlFor } from './sanity-client'

export interface Post {
  _id: string
  slug: string
  title: string
  publishedAt: string
  excerpt: string
  category: 'programacion' | 'otros'
  tags: string[]
  readTime: string
  coverImage?: any
  content?: any
  sources?: { title: string; url: string }[]
}

// Alias para mantener compatibilidad con código existente
export { getAllPosts, getPostBySlug, getPostSlugs } from './sanity-client'

// Helper para formatear fechas
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Helper para obtener URL de imagen
export function getImageUrl(image: any): string | undefined {
  if (!image) return undefined
  return urlFor(image).width(800).url()
}
