# 🚀 Portafolio Profesional - Lukas Ibáñez

Portafolio web moderno y profesional desarrollado con Next.js 14+, TypeScript, Tailwind CSS y GSAP. Diseñado para mostrar proyectos, compartir conocimientos a través de un blog y facilitar el contacto con potenciales clientes o empleadores.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=flat-square&logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3+-88CE02?style=flat-square&logo=greensock)

## ✨ Características

### 🎨 Diseño y UX
- **Diseño moderno y profesional** con gradientes y efectos glassmorphism
- **Animaciones fluidas con GSAP** en toda la aplicación
- **Responsive design** optimizado para móvil, tablet y desktop
- **Dark theme** por defecto con paleta de colores profesional
- **Smooth scrolling** y transiciones suaves entre secciones

### 📄 Páginas Implementadas

#### 🏠 Home
- Hero section con animación de typing effect
- Sección "Sobre Mí" con skills organizadas por categorías
- Cards de navegación a Proyectos y Blog con animaciones hover
- Todas las secciones con scroll-triggered animations

#### 💼 Proyectos
- Grid responsivo de proyectos
- Cards con hover effects elaborados
- Badges de tecnologías utilizadas
- Links a demo en vivo y repositorio GitHub
- Sistema de proyectos destacados
- Animaciones stagger al cargar

#### 📝 Blog
- Sistema de tabs para categorías (Programación / Otros)
- Integración con MDX para contenido rico
- Syntax highlighting para código
- Sistema de tags
- Tiempo de lectura estimado
- Páginas individuales de posts con diseño optimizado para lectura
- Botones de compartir en redes sociales

#### 📧 Contacto
- Formulario con validación usando Zod y React Hook Form
- Animaciones en validación (shake en errores)
- Estados de loading y éxito
- Información de contacto alternativa (Email, LinkedIn, GitHub)
- Indicador de disponibilidad

### 🛠️ Características Técnicas

- **Next.js 14+ App Router** - Server Components, streaming, y Suspense
- **TypeScript** - Type safety en toda la aplicación
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animaciones profesionales y performantes
  - ScrollTrigger para animaciones al hacer scroll
  - Timeline para secuencias complejas
  - Respeto a `prefers-reduced-motion`
- **MDX** - Contenido rico para blog posts con soporte para:
  - Syntax highlighting (Highlight.js)
  - GitHub Flavored Markdown
  - Componentes React embebidos
- **React Hook Form + Zod** - Validación de formularios robusta
- **SEO optimizado** - Metadata, Open Graph tags
- **Performance** - Optimización de imágenes, lazy loading

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ instalado
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Lukas-Ibanez/portafolio.git
cd portafolio
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
├── app/                      # App Router de Next.js
│   ├── blog/                 # Páginas del blog
│   │   ├── [slug]/          # Página individual de post
│   │   └── page.tsx         # Lista de posts
│   ├── contacto/            # Página de contacto
│   ├── proyectos/           # Página de proyectos
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Home page
│   └── globals.css          # Estilos globales
├── components/              # Componentes React
│   ├── AboutSection.tsx     # Sección "Sobre Mí"
│   ├── BlogCard.tsx         # Card de post de blog
│   ├── ContactForm.tsx      # Formulario de contacto
│   ├── Footer.tsx           # Footer global
│   ├── Header.tsx           # Header/navegación
│   ├── Hero.tsx             # Hero section
│   ├── NavigationCards.tsx  # Cards de navegación
│   └── ProjectCard.tsx      # Card de proyecto
├── content/                 # Contenido del blog
│   └── posts/
│       ├── programacion/    # Posts de programación
│       └── otros/           # Posts de otros temas
├── lib/                     # Utilidades y configuraciones
│   ├── blog-utils.ts        # Utilidades para blog
│   ├── gsap-config.ts       # Configuración de GSAP
│   └── projects-data.ts     # Datos de proyectos
├── public/                  # Archivos estáticos
│   ├── images/              # Imágenes
│   └── logos/               # Logos
├── next.config.ts           # Configuración de Next.js
├── tailwind.config.ts       # Configuración de Tailwind
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias
```

## 🎨 Personalización

### Colores y Tema

Los colores principales están definidos en `app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #3b82f6;      /* Azul */
  --secondary: #8b5cf6;    /* Púrpura */
  --accent: #06b6d4;       /* Cyan */
}
```

### Agregar Proyectos

Edita `lib/projects-data.ts` y agrega nuevos proyectos al array:

```typescript
{
  id: '5',
  title: 'Nuevo Proyecto',
  description: 'Descripción corta',
  longDescription: 'Descripción detallada',
  technologies: ['React', 'Node.js'],
  image: '/images/proyecto.jpg',
  demoUrl: 'https://demo.com',
  githubUrl: 'https://github.com/usuario/repo',
  featured: true,
}
```

### Agregar Posts al Blog

1. Crear un archivo MDX en `content/posts/programacion/` o `content/posts/otros/`
2. Agregar frontmatter:

```mdx
---
title: "Título del Post"
date: "2024-12-05"
excerpt: "Resumen del post"
tags: ["Tag1", "Tag2"]
---

# Contenido del post aquí

Escribe en Markdown con soporte completo para código:

\`\`\`typescript
const ejemplo = "código con syntax highlighting";
\`\`\`
```

### Información Personal

Actualiza en los siguientes archivos:
- `app/layout.tsx` - Metadata y SEO
- `components/Header.tsx` - Logo
- `components/Footer.tsx` - Links sociales
- `components/Hero.tsx` - Presentación
- `app/contacto/page.tsx` - Información de contacto

## 🔧 Scripts Disponibles

```bash
npm run dev          # Modo desarrollo
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
```

## 📦 Dependencias Principales

- **next** - Framework React
- **react** & **react-dom** - Biblioteca UI
- **typescript** - Lenguaje
- **tailwindcss** - Framework CSS
- **gsap** - Animaciones
- **@next/mdx** - Soporte MDX
- **react-hook-form** - Manejo de formularios
- **zod** - Validación de esquemas
- **gray-matter** - Parser de frontmatter
- **rehype-highlight** - Syntax highlighting
- **remark-gfm** - GitHub Flavored Markdown

## 🚀 Deployment

### Vercel (Recomendado)

1. Push del código a GitHub
2. Importar proyecto en [Vercel](https://vercel.com)
3. Deploy automático

### Otras Plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- AWS Amplify
- Docker

## 📝 TODO / Mejoras Futuras

- [ ] Integrar EmailJS para formulario de contacto funcional
- [ ] Agregar modo claro/oscuro con toggle
- [ ] Implementar sistema de comentarios en blog
- [ ] Agregar búsqueda en blog
- [ ] Crear filtros por tecnología en proyectos
- [ ] Integrar Google Analytics
- [ ] Agregar sitemap XML
- [ ] Implementar RSS feed para blog
- [ ] Crear página 404 personalizada
- [ ] Agregar tests (Jest, React Testing Library)

## 👨‍💻 Autor

**Lukas Ibáñez**
- Programador Computacional
- Desarrollador Full-Stack especializado en Front-End
- 2 años de experiencia

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!

🐛 ¿Encontraste un bug? [Abre un issue](https://github.com/Lukas-Ibanez/portafolio/issues)

💡 ¿Tienes una sugerencia? ¡Las pull requests son bienvenidas!
