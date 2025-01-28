// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  plugins: [{ src: "~/plugins/three.client.js", mode: "client" }],
  modules: ['@nuxt/content', "@nuxt/icon"],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ["three", "gsap"],
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