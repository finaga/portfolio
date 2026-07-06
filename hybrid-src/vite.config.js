import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/portfolio/' only for production builds (served nested under the hub
// at /portfolio/); dev server stays at root so `npm run dev` is unaffected.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/portfolio/' : '/',
  server: {
    port: 5178,
  },
}))
