# 🎉 Guía Completa: Sanity CMS para tu Blog

## 📱 ¿Qué es Sanity y por qué lo usamos?

Sanity es un CMS headless que te permite:
- ✅ Escribir y publicar posts desde **cualquier dispositivo** (PC, móvil, tablet)
- ✅ Usar una **app móvil oficial** para publicar desde el metro, café, etc.
- ✅ Editor visual con vista previa en tiempo real
- ✅ Gratis para proyectos personales
- ✅ API automática para consultar tus posts

---

## 🚀 Configuración Inicial (Solo una vez)

### Paso 1: Crear cuenta en Sanity

1. Ve a https://www.sanity.io/
2. Click en **"Get Started"**
3. Regístrate con tu cuenta de GitHub (recomendado)
4. Crea un nuevo proyecto:
   - Nombre: **Portfolio Blog**
   - Dataset: **production**

### Paso 2: Obtener credenciales

Una vez creado el proyecto:

1. En el dashboard de Sanity, copia tu **Project ID** (lo verás en la URL o en la configuración)
2. Ve a **Settings → API** 
3. Click en **"Add New Token"**
   - Name: `Portfolio Token`
   - Permissions: **Editor**
4. Copia el token (solo se muestra una vez)

### Paso 3: Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id-aqui
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu-token-aqui
```

---

## 📦 Instalación (Ya está casi lista)

Las dependencias se están instalando. Una vez completadas, ejecuta:

```bash
npm install @portabletext/react --legacy-peer-deps
```

---

## 🎨 Iniciar Sanity Studio

Sanity Studio es tu panel de administración web. Para iniciarlo:

```bash
npx sanity dev
```

Esto abrirá el studio en http://localhost:3333

**Primera vez:**
- Te pedirá iniciar sesión con tu cuenta de Sanity
- Verás la interfaz para crear posts

---

## ✍️ Cómo Crear un Post

### Desde el PC (Sanity Studio):

1. Ejecuta `npx sanity dev`
2. Ve a http://localhost:3333
3. Click en **"Post"** → **"Create new Post"**
4. Completa los campos:
   - **Título**: El título del post
   - **Slug**: Click en "Generate" para crear automáticamente
   - **Extracto**: Resumen corto
   - **Categoría**: Programación u Otros
   - **Tags**: Agrega etiquetas separadas por coma
   - **Fecha de publicación**: Selecciona la fecha
   - **Tiempo de lectura**: Ej: "5 min"
   - **Imagen de portada**: Sube una imagen (opcional)
   - **Contenido**: Escribe el contenido con el editor visual
5. Click en **"Publish"**

### Desde el Celular (App Móvil):

1. Descarga la app **Sanity Studio** desde:
   - iOS: https://apps.apple.com/app/sanity-studio/id1587708813
   - Android: https://play.google.com/store/apps/details?id=io.sanity.studio

2. Abre la app e inicia sesión

3. Selecciona tu proyecto **"Portfolio Blog"**

4. ¡Listo! Ahora puedes crear y editar posts desde cualquier lugar

---

## 🔄 Migrar Posts Existentes

Para migrar tus posts actuales de MDX a Sanity:

1. Asegúrate de tener las variables de entorno configuradas
2. Ejecuta:

```bash
node scripts/migrate-to-sanity.mjs
```

Esto creará todos tus posts actuales en Sanity automáticamente.

---

## 🔀 Activar el Nuevo Sistema

Una vez que hayas probado que todo funciona:

1. **Reemplaza** `app/blog/page.tsx` con el contenido de `app/blog/page-sanity.tsx`
2. **Reemplaza** `app/blog/[slug]/page.tsx` con el contenido de `app/blog/[slug]/page-sanity.tsx`

O simplemente ejecuta:

```bash
# Backup de archivos originales
mv app/blog/page.tsx app/blog/page-mdx.tsx.backup
mv app/blog/[slug]/page.tsx app/blog/[slug]/page-mdx.tsx.backup

# Activar versión Sanity
mv app/blog/page-sanity.tsx app/blog/page.tsx
mv app/blog/[slug]/page-sanity.tsx app/blog/[slug]/page.tsx
```

---

## 📱 Flujo de Trabajo Típico

### Desde el Metro/Café (Móvil):
1. Abre la app de Sanity
2. Crea un nuevo post
3. Escribe el contenido
4. Sube fotos desde tu galería
5. Publica

### Desde Casa (PC):
1. `npx sanity dev`
2. Edita en http://localhost:3333
3. Vista previa en tiempo real
4. Publica

**El sitio web se actualiza automáticamente** cada vez que publicas un post.

---

## 🎯 Ventajas de Sanity

- 📱 **App móvil nativa**: Escribe desde cualquier lugar
- 🎨 **Editor visual**: WYSIWYG con vista previa
- 🖼️ **CDN de imágenes**: Optimización automática
- 🔄 **Tiempo real**: Los cambios se ven al instante
- 🔐 **Seguro**: Control de acceso y versionado
- 💰 **Gratis**: Plan gratuito generoso

---

## 🆘 Solución de Problemas

### Error: "Project ID no encontrado"
- Verifica que `.env.local` existe y tiene el Project ID correcto
- Reinicia el servidor de desarrollo

### Error: "Token inválido"
- Crea un nuevo token en Sanity con permisos de Editor
- Actualiza `SANITY_API_TOKEN` en `.env.local`

### No veo mis posts
- Ejecuta el script de migración
- Verifica que estés usando el dataset correcto (production)

---

## 📚 Recursos

- Documentación de Sanity: https://www.sanity.io/docs
- Sanity Studio App: https://www.sanity.io/studio-app
- Soporte: https://www.sanity.io/help

---

## 🎉 ¡Listo!

Ahora puedes gestionar tu blog desde cualquier lugar. ¡Disfruta escribiendo! ✨
