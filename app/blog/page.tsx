import { getAllPosts } from '@/lib/blog-utils';
import BlogPageClient from '@/components/BlogPageClient';

export default function BlogPage() {
  const programacionPosts = getAllPosts('programacion');
  const otrosPosts = getAllPosts('otros');

  return <BlogPageClient programacionPosts={programacionPosts} otrosPosts={otrosPosts} />;
}
