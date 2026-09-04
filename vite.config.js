import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署在子路径 /nasti-bot-webside/ 下，
  // base 用相对路径，这样资源引用不会因为子路径而 404
  base: "./",
});
