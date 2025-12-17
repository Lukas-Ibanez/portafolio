import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const publicDir = path.join(process.cwd(), 'public');

function resolvePublicImage(filePath?: string) {
  if (!filePath || typeof filePath !== 'string') return undefined;
  // Normalize '/images/foo.webp' to path under public
  const rel = filePath.replace(/^\//, '');
  const full = path.join(publicDir, rel);
  return fs.existsSync(full) ? filePath : undefined;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: 'programacion' | 'otros';
  tags: string[];
  readTime: string;
  image?: string;
  coverImage?: string;
  content: string;
  sources?: { title: string; url: string }[];
}

export function getPostSlugs(category?: 'programacion' | 'otros'): string[] {
  if (category) {
    const categoryPath = path.join(postsDirectory, category);
    if (!fs.existsSync(categoryPath)) return [];
    return fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx'));
  }

  const allSlugs: string[] = [];
  const categories = ['programacion', 'otros'];
  
  categories.forEach(cat => {
    const categoryPath = path.join(postsDirectory, cat);
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath);
      allSlugs.push(...files.filter(file => file.endsWith('.mdx')));
    }
  });

  return allSlugs;
}

export function getPostBySlug(slug: string, category?: 'programacion' | 'otros'): Post | null {
  // Si se proporciona la categoría, buscar ahí directamente
  if (category) {
    const fullPath = path.join(postsDirectory, category, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: category,
      tags: data.tags || [],
      readTime: data.readTime || calculateReadTime(content),
      image: resolvePublicImage(data.image) || undefined,
      coverImage: resolvePublicImage(data.coverImage) || undefined,
      content,
      sources: data.sources || [],
    };
  }

  // Si no, buscar en ambas categorías
  const categories: ('programacion' | 'otros')[] = ['programacion', 'otros'];
  
  for (const cat of categories) {
    const fullPath = path.join(postsDirectory, cat, `${slug}.mdx`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        category: cat,
        tags: data.tags || [],
        readTime: data.readTime || calculateReadTime(content),
        image: resolvePublicImage(data.image) || undefined,
        coverImage: resolvePublicImage(data.coverImage) || undefined,
        content,
        sources: data.sources || [],
      };
    }
  }

  return null;
}

export function getAllPosts(category?: 'programacion' | 'otros'): Post[] {
  const slugs = getPostSlugs(category);
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx$/, ''), category))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min de lectura`;
}
