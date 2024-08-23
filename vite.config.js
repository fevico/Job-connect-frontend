import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path module using ES module syntax

export default defineConfig({
  root: path.resolve(__dirname, 'public'), // Adjust the path as necessary
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

