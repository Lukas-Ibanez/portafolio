export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Plataforma de comercio electrónico completa con carrito de compras y pasarela de pagos',
    longDescription: 'Desarrollé una plataforma de e-commerce moderna y escalable utilizando Next.js y TypeScript. La aplicación incluye gestión de productos, carrito de compras con persistencia, integración con Stripe para pagos, panel de administración, y sistema de autenticación. El diseño es completamente responsive y optimizado para SEO.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Prisma'],
    image: '/images/project-ecommerce.jpg',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/Lukas-Ibanez/ecommerce',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real',
    longDescription: 'Aplicación web para gestión de proyectos y tareas estilo Kanban board. Incluye colaboración en tiempo real usando WebSockets, drag & drop de tareas, asignación de miembros, fechas límite, notificaciones, y panel de estadísticas. Backend desarrollado con Node.js y Express.',
    technologies: ['React', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'Redux'],
    image: '/images/project-tasks.jpg',
    demoUrl: 'https://tasks-demo.example.com',
    githubUrl: 'https://github.com/Lukas-Ibanez/task-manager',
    featured: true,
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Dashboard interactivo del clima con gráficos y predicciones',
    longDescription: 'Dashboard del clima que consume APIs de servicios meteorológicos para mostrar datos actuales y predicciones. Incluye gráficos interactivos, búsqueda por ubicación, favoritos, y modo oscuro. Implementado con React y bibliotecas de visualización de datos.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
    image: '/images/project-weather.jpg',
    demoUrl: 'https://weather.example.com',
    githubUrl: 'https://github.com/Lukas-Ibanez/weather-dashboard',
    featured: false,
  },
  {
    id: '4',
    title: 'Portfolio CMS',
    description: 'Sistema de gestión de contenido para portafolios creativos',
    longDescription: 'CMS headless diseñado específicamente para portafolios de creativos y desarrolladores. Permite gestionar proyectos, blog posts, testimonios y configuración del sitio. Incluye editor WYSIWYG, upload de imágenes con optimización automática, y API REST para consumo desde cualquier frontend.',
    technologies: ['Next.js', 'Sanity.io', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    image: '/images/project-cms.jpg',
    githubUrl: 'https://github.com/Lukas-Ibanez/portfolio-cms',
    featured: true,
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
