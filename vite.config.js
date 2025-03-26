import { defineConfig } from 'vite';

export default defineConfig({
  base: '/FnafJS/',  // Ensure this matches your GitHub repo name
  resolve: {
    alias: {
      three: 'three'  // Explicitly define Three.js
    }
  }
});
