import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/gallery/' only for production builds (served nested under the hub
// at /gallery/); dev server stays at root so `npm run dev` is unaffected.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/gallery/' : '/',
  server: {
    port: 5177,
  },
}))
