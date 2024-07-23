import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://apifoodexpress.vercel.app'
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
