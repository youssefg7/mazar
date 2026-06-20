import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/mazar/",
  plugins: [react()],
  build: {
    outDir: "dist"
  }
});
