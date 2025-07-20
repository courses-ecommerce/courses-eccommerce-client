import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
  },
  base: mode === "deploy" ? "/courses-eccommerce-client/" : "/",
  build: {
    outDir: "build",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/[name][hash].js",
        entryFileNames: "assets/[name][hash].js",
        assetFileNames: "assets/[name][hash][extname]",
      },
    },
  },
}));
