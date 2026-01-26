import { getAllPosts } from '@/lib/sanity-client'
import BlogPageClient from '@/components/BlogPageClient'

export default async function BlogPage() {
  const programacionPosts = await getAllPosts('programacion')
  const otrosPosts = await getAllPosts('otros')

  return <BlogPageClient programacionPosts={programacionPosts} otrosPosts={otrosPosts} />
}
