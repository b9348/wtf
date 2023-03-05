import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use "@/assets/styles/element.sass" as *;`,
      },
    },
  },
  plugins: [vue()],
});
