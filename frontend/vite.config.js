import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
      include: "**/*.svg?react",
    }),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"), // add this line
    },
  },
});
