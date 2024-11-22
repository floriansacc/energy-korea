import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "node:dns";

dns.setDefaultResultOrder("verbatim");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/energy-korea/",

  server: {
    proxy: {
      "/kepcoapi": {
        target: "https://bigdata.kepco.co.kr", // Base domain of your API
        changeOrigin: true, // Handle CORS by setting the origin to match the target
        rewrite: (path) => path.replace(/^\/kepcoapi/, "/openapi/v1"), // Map local `/api` to the correct path
      },
    },
  },
});
