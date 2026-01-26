import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemas } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Blog',

  projectId: '9286uqeo',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemas,
  },
})
