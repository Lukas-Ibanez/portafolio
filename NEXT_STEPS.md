# 🚀 Pasos para Activar Sanity en tu Blog

## ✅ Lo que ya está listo:

1. ✅ Dependencias instaladas
2. ✅ Estructura de Sanity Studio configurada
3. ✅ Esquemas de datos creados (Post, BlockContent)
4. ✅ Cliente de Sanity configurado
5. ✅ Componentes actualizados para soportar Sanity
6. ✅ Script de migración creado

## 📋 Lo que necesitas hacer:

### 1️⃣ Crear tu proyecto en Sanity (5 minutos)

1. Ve a https://www.sanity.io/
2. Click en "Get Started" y regístrate con GitHub
3. Crea un nuevo proyecto:
   - **Nombre**: Portfolio Blog
   - **Dataset**: production

4. Copia tus credenciales:
   - Ve a Settings → API
   - Copia el **Project ID**
   - Crea un nuevo **Token** con permisos de "Editor"

### 2️⃣ Configurar variables de entorno

Crea el archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu-token-aqui
```

**⚠️ Reemplaza los valores con tus credenciales reales**

### 3️⃣ Probar Sanity Studio

Ejecuta en la terminal:

```bash
npm run sanity
```

Esto abrirá Sanity Studio en http://localhost:3333

- Inicia sesión con tu cuenta de Sanity
- Verás la interfaz para crear posts
- Prueba crear un post de ejemplo

### 4️⃣ Migrar tus posts existentes (opcional)

Si quieres migrar tus posts actuales de MDX a Sanity:

```bash
npm run migrate
```

Esto subirá automáticamente todos tus posts a Sanity.

### 5️⃣ Activar el nuevo sistema

Cuando estés listo para usar Sanity, ejecuta estos comandos:

```bash
# Backup de archivos originales (por si acaso)
mv app/blog/page.tsx app/blog/page-mdx.backup.tsx
mv app/blog/[slug]/page.tsx app/blog/[slug]/page-mdx.backup.tsx

# Activar versión Sanity
mv app/blog/page-sanity.tsx app/blog/page.tsx
mv app/blog/[slug]/page-sanity.tsx app/blog/[slug]/page.tsx
```

### 6️⃣ Probar el blog

```bash
npm run dev
```

Ve a http://localhost:3000/blog y verifica que todo funciona.

---

## 📱 Usar desde el celular

1. Descarga la app **Sanity Studio**:
   - iOS: https://apps.apple.com/app/sanity-studio/id1587708813
   - Android: https://play.google.com/store/apps/details?id=io.sanity.studio

2. Inicia sesión y selecciona tu proyecto

3. ¡Listo! Ahora puedes escribir posts desde cualquier lugar

---

## 📚 Documentación completa

Lee el archivo `SANITY_GUIDE.md` para una guía completa con capturas y más detalles.

---

## 🆘 Si tienes problemas

1. Verifica que las variables de entorno estén bien configuradas
2. Asegúrate de tener el token con permisos de "Editor"
3. Reinicia el servidor después de crear .env.local

---

## 🎯 Próximos pasos

Una vez que tengas Sanity funcionando:

1. Personaliza los esquemas en `sanity/schemas/` si quieres agregar más campos
2. Explora el editor visual en Sanity Studio
3. Prueba la app móvil
4. ¡Empieza a escribir desde cualquier lugar!
