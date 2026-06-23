import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Built output is served at https://<domain>/option2/ (static, committed to /option2).
// base must match that subpath so emitted asset URLs resolve correctly.
// https://vite.dev/config/
export default defineConfig({
  base: '/option2/',
  plugins: [react()],
})
