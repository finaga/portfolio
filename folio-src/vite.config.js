import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the built site works both standalone and nested under
// the hub (e.g. /folio/) without a rebuild.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5176,
    strictPort: true,
  },
})
