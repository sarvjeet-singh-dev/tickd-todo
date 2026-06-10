import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  base:`/tickd-todo/`,

  plugins: [
    tailwindcss(),
  ],
  server:{
    host : true,
  }
})