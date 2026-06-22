import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  mode: "production",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // ── vendor main ─────────────────
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],

          // ── كل حاجة تانية chunk  ───────────────
          "vendor-query": ["@tanstack/react-query"],
          "vendor-redux": ["@reduxjs/toolkit", "react-redux", "redux-persist"],
          "vendor-form": ["react-hook-form", "zod"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "sonner",
            "lucide-react",
          ],
          "vendor-gsap": ["gsap"],
          "vendor-axios": ["axios"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    basicSsl(),
    tailwindcss(),
    // react({
    //   babel: {
    //     plugins: [["babel-plugin-react-compiler"]],
    //     presets: [
    //       [
    //         "@babel/preset-env",
    //         {
    //           modules: false,
    //         },
    //       ],
    //     ],
    //   },
    // }),
  ],
});
