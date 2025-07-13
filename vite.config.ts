import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  base: mode === "deploy" ? "/courses-eccommerce-client/" : "/",
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
}));
