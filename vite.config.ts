import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Published at https://3lord3.github.io/codehack.github.io/, so all assets
// must be prefixed with the repository name.
export default defineConfig({
  base: '/codehack.github.io/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
