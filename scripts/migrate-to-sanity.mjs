/**
 * Script para migrar posts de MDX a Sanity
 * 
 * Uso:
 * 1. Asegúrate de tener las variables de entorno configuradas en .env.local
 * 2. Ejecuta: npm run migrate
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from 'next-sanity'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno manualmente
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim()
        process.env[key] = value
      }
    })
  }
}

loadEnv()

// Configurar cliente de Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Convertir Markdown a Portable Text
function markdownToPortableText(markdown) {
  const blocks = []
  const lines = markdown.split('\n')
  
  let currentBlock = null
  let codeBlock = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Bloques de código
    if (line.startsWith('```')) {
      if (codeBlock) {
        // Cerrar bloque de código
        blocks.push({
          _type: 'code',
          language: codeBlock.language,
          code: codeBlock.code.join('\n'),
        })
        codeBlock = null
      } else {
        // Abrir bloque de código
        if (currentBlock) {
          blocks.push(currentBlock)
          currentBlock = null
        }
        const language = line.substring(3).trim() || 'text'
        codeBlock = { language, code: [] }
      }
      continue
    }
    
    if (codeBlock) {
      codeBlock.code.push(line)
      continue
    }
    
    // Títulos
    if (line.startsWith('# ')) {
      if (currentBlock) blocks.push(currentBlock)
      currentBlock = {
        _type: 'block',
        _key: `block-${i}`,
        style: 'h1',
        markDefs: [],
        children: [{ _type: 'span', _key: `span-${i}`, text: line.substring(2).trim(), marks: [] }],
      }
    } else if (line.startsWith('## ')) {
      if (currentBlock) blocks.push(currentBlock)
      currentBlock = {
        _type: 'block',
        _key: `block-${i}`,
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: `span-${i}`, text: line.substring(3).trim(), marks: [] }],
      }
    } else if (line.startsWith('### ')) {
      if (currentBlock) blocks.push(currentBlock)
      currentBlock = {
        _type: 'block',
        _key: `block-${i}`,
        style: 'h3',
        markDefs: [],
        children: [{ _type: 'span', _key: `span-${i}`, text: line.substring(4).trim(), marks: [] }],
      }
    } else if (line.trim() === '') {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      // Lista de items
      if (currentBlock && currentBlock.listItem !== 'bullet') {
        blocks.push(currentBlock)
        currentBlock = null
      }
      if (!currentBlock) {
        currentBlock = {
          _type: 'block',
          _key: `block-${i}`,
          style: 'normal',
          listItem: 'bullet',
          markDefs: [],
          children: [{ _type: 'span', _key: `span-${i}`, text: line.substring(2).trim(), marks: [] }],
        }
      }
      blocks.push(currentBlock)
      currentBlock = null
    } else {
      const text = line.trim()
      if (text) {
        if (!currentBlock) {
          currentBlock = {
            _type: 'block',
            _key: `block-${i}`,
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: `span-${i}`, text, marks: [] }],
          }
        } else if (currentBlock.children && currentBlock.children[0]) {
          currentBlock.children[0].text += ' ' + text
        }
      }
    }
  }
  
  if (currentBlock) blocks.push(currentBlock)
  if (codeBlock) {
    blocks.push({
      _type: 'code',
      language: codeBlock.language,
      code: codeBlock.code.join('\n'),
    })
  }
  
  return blocks
}

async function migratePost(filePath, category) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const slug = path.basename(filePath, '.mdx')

  console.log(`\n📝 Migrando: ${slug}...`)

  const post = {
    _type: 'post',
    title: data.title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    excerpt: data.excerpt,
    category: category,
    tags: data.tags || [],
    readTime: data.readTime || '5 min',
    publishedAt: new Date(data.date || Date.now()).toISOString(),
    content: markdownToPortableText(content),
    sources: data.sources || [],
  }

  try {
    const result = await client.create(post)
    console.log(`✅ Migrado exitosamente: ${slug}`)
    return result
  } catch (error) {
    console.error(`❌ Error migrando ${slug}:`, error.message)
    return null
  }
}

async function migrateAll() {
  console.log('🚀 Iniciando migración de posts a Sanity...\n')
  console.log(`📦 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`)

  const categories = ['programacion', 'otros']
  let totalMigrated = 0
  let totalFailed = 0
  
  for (const category of categories) {
    const categoryPath = path.join(postsDirectory, category)
    
    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Directorio no encontrado: ${category}`)
      continue
    }

    console.log(`\n📁 Procesando categoría: ${category}`)
    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx'))
    console.log(`   Encontrados ${files.length} posts`)
    
    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const result = await migratePost(filePath, category)
      if (result) {
        totalMigrated++
      } else {
        totalFailed++
      }
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✨ Migración completada!`)
  console.log(`✅ Posts migrados: ${totalMigrated}`)
  if (totalFailed > 0) {
    console.log(`❌ Posts fallidos: ${totalFailed}`)
  }
  console.log('='.repeat(50))
}

// Ejecutar migración
migrateAll().catch(console.error)
