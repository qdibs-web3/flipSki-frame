// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react( ),
    nodePolyfills({
      exclude: [],
      protocolImports: true,
    }),
  ],
  esbuild: {
    loader: "jsx",
    include: [/src\/.*\.jsx$/, /src\/.*\.js$/],
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
    include: ['@thirdweb-dev/react', '@thirdweb-dev/chains'],
  },
  build: {
    sourcemap: true, // Enable source maps for debugging
    rollupOptions: {
      // Ensure external dependencies are properly handled
      external: [],
      output: {
        manualChunks: {
          'thirdweb': ['@thirdweb-dev/react', '@thirdweb-dev/chains'],
          'viem': ['viem'],
        }
      }
    }
  }
});
