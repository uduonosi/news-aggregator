import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  plugins: [react()],
});
