# 🚀 Instrucciones Rápidas - Portafolio Lukas Ibáñez

## 📋 Primeros Pasos

### 1. Instalación
```bash
npm install
```

### 2. Ejecutar en Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 3. Build para Producción
```bash
npm run build
npm run start
```

## ✏️ Personalización Rápida

### Cambiar Información Personal

**Nombre y título:**
- `components/Hero.tsx` - Línea 63-77
- `components/Footer.tsx` - Línea 72
- `app/layout.tsx` - Metadata

**Links sociales:**
- `components/Footer.tsx` - Array `socialLinks` (línea 10)
- `app/contacto/page.tsx` - Sección de información (línea 86+)

### Agregar Proyectos

Edita `lib/projects-data.ts`:
```typescript
{
  id: '5',
  title: 'Tu Proyecto',
  description: 'Descripción corta',
  longDescription: 'Descripción completa',
  technologies: ['Next.js', 'TypeScript'],
  image: '/images/proyecto.jpg',
  demoUrl: 'https://...',
  githubUrl: 'https://github.com/...',
  featured: true,
}
```

### Agregar Posts al Blog

1. Crea archivo MDX en `content/posts/programacion/` o `content/posts/otros/`
2. Usa este formato:

```mdx
---
title: "Título del Post"
date: "2024-12-05"
excerpt: "Resumen breve"
tags: ["React", "TypeScript"]
---

# Contenido aquí

Tu contenido en Markdown...
```

### Cambiar Colores

Edita `app/globals.css`:
```css
:root {
  --primary: #3b82f6;    /* Azul */
  --secondary: #8b5cf6;  /* Púrpura */
  --accent: #06b6d4;     /* Cyan */
}
```

## 📁 Archivos Importantes

- `app/layout.tsx` - Layout principal y metadata
- `app/page.tsx` - Página de inicio
- `components/Header.tsx` - Navegación
- `lib/projects-data.ts` - Datos de proyectos
- `lib/blog-utils.ts` - Utilidades del blog

## 🎨 Recursos

### Imágenes
Agrega imágenes en:
- `public/images/` - Imágenes generales
- `public/logos/` - Tu logo personal

### Fuentes
Actualmente usa Geist Sans y Geist Mono (Google Fonts).
Para cambiar, edita `app/layout.tsx`.

## 🚀 Deployment

### Vercel (Recomendado)
1. Push a GitHub
2. Conecta en vercel.com
3. Deploy automático

### Variables de Entorno (Futuro)
Si agregas EmailJS o servicios externos, crea `.env.local`:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_key
```

## 🐛 Solución de Problemas

**Errores de compilación:**
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

**Port 3000 ocupado:**
```bash
npm run dev -- -p 3001
```

## 📞 Soporte

¿Problemas? Revisa:
1. README.md principal
2. Documentación de Next.js: https://nextjs.org/docs
3. Issues en GitHub

---

¡Éxito con tu portafolio! 🎉
