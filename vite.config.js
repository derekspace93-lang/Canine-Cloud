import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Use relative base so assets load correctly regardless of repo name / hosting path
  base: process.env.NODE_ENV === "production" ? "/Canine-Cloud/" : "/",
});
