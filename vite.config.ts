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
          "vendor-react": ["react", "react-dom", "react-router-dom"],

          "vendor-state": [
            "@reduxjs/toolkit",
            "react-redux",
            "redux-persist",
            "@tanstack/react-query",
          ],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "sonner",
          ],
          "vendor-icons": ["lucide-react"],
          "vendor-gsap": ["gsap", "gsap/ScrollTrigger"],
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
