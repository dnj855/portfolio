// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  plugins: [
    { src: "~/plugins/three.client.js", mode: "client" },
    { src: "~/plugins/scroll-handler.client.js", mode: "client" }
  ],
  modules: ['@nuxt/content', "@nuxt/icon", "@nuxt/image"],
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
  router: {
    options: {
      scrollBehaviorType: "auto", // Définir le comportement du scroll comme automatique
    }
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in'
    },
  }
});