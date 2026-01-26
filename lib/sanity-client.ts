import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Queries para obtener posts
export async function getAllPosts(category?: 'programacion' | 'otros') {
  const filter = category ? `&& category == "${category}"` : ''
  
  const query = `*[_type == "post" ${filter}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    readTime,
    "publishedAt": publishedAt,
    coverImage,
    sources
  }`

  return client.fetch(query)
}

export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    readTime,
    "publishedAt": publishedAt,
    coverImage,
    content,
    sources
  }`

  return client.fetch(query, { slug })
}

export async function getPostSlugs() {
  const query = `*[_type == "post"] {
    "slug": slug.current
  }`

  return client.fetch(query)
}
