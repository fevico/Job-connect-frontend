import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'public'), // Directory containing index.html
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Output directory
    emptyOutDir: true, // Ensure that the outDir is emptied before building
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
