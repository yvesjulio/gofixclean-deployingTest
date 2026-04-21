import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [tailwind(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor libraries into separate chunks
          if (id.includes("node_modules")) {
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }
            if (id.includes("recharts")) {
              return "vendor-charts";
            }
            if (id.includes("react-router")) {
              return "vendor-router";
            }
            return "vendor";
          }
          // Split admin pages into separate chunk
          if (id.includes("pages/admin")) {
            return "admin";
          }
          // Split policy pages into separate chunk
          if (id.includes("policies")) {
            return "policies";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
