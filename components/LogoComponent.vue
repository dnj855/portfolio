<template>
  <div :class="[
      'logo absolute fixed -translate-x-1/3 translate-y-[400%] z-100',
      { 'opacity-0 pointer-events-none': currentSection === 'home', 'opacity-100': currentSection !== 'home' }
    ]"
    style="transition: opacity 0.5s ease-in-out;">
    <h2 class="text-base font-sans font-semibold sticky rotate-270 top-10 cursor-pointer" @click="navigateToHome()">CÉDRIC LANG-ROTH</h2>
  </div>
</template>

<script setup>
import { useNuxtApp, useRouter } from '#app'
import { nextTick } from 'vue'

const router = useRouter()
const nuxtApp = useNuxtApp()

const props = defineProps({
  currentSection: {
    type: String,
    required: true,
  }
})

// Accès à la fonction emit pour signaler le changement de section
const emit = defineEmits(['update:currentSection'])

// Naviguer vers la page d'accueil avec une séquence fiable
const navigateToHome = () => {
  // Mettre à jour l'URL
  router.push({ path: '/' })
  
  // Forcer la mise à jour du currentSection pour assurer que le logo disparaît correctement
  emit('update:currentSection', 'home')
  
  // S'assurer que le DOM est à jour avant de commencer l'animation
  nextTick(() => {
    // Utiliser le plugin global pour le défilement avec une animation plus rapide pour le retour home
    if (nuxtApp.$scrollToSection) {
      nuxtApp.$scrollToSection('home', { 
        force: true,
        duration: 1.2,
        // Vérifier que le défilement a bien fonctionné
        onComplete: () => {
          // Vérifier après un court délai que nous sommes bien sur la home
          setTimeout(() => {
            const currentVisible = nuxtApp.$getVisibleSection ? 
              nuxtApp.$getVisibleSection() : 'home'
            
            // Si nous ne sommes pas sur la home, réessayer
            if (currentVisible !== 'home') {
              nuxtApp.$scrollToSection('home', { force: true, duration: 0.8 })
            }
          }, 100)
        }
      })
    }
  })
}
</script>