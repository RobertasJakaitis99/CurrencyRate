// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // Jei jūsų API neturi "/api" prefikso, galite naudoti rewrite:
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
