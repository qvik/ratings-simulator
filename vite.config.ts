/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ratings-simulator/',
  test: {
    globals: true,
  },
  plugins: [react()],
});
