import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed on Vercel at the domain root, so assets resolve from `/`.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
