// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  plugins: [{ src: "~/plugins/three.client.js", mode: "client" }],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ["three"],
  },
  vite: {
    server: {
      allowedHosts: true
    },
    plugins: [
      tailwindcss(),
    ],
  },
});
