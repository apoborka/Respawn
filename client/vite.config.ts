import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/", // Ensure this is correct for relative paths
  build: {
    outDir: "dist", // Output directory
    emptyOutDir: true, // Clear the output directory before building
    rollupOptions: {
      input: "./index.html", // Ensure the entry point is correct
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Ensure this matches your folder structure
    },
  },
});