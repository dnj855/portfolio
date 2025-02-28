<!-- pages/index.vue -->
<template>
    <LogoComponent v-model:currentSection="currentSection" />
    <GlobalMenu :currentSection="currentSection" />
  <div class="sections-wrapper">
    <!-- Section Home - Votre design original -->
    <section class="section" data-section="home" ref="homeSection">
      <HomeSection />
    </section>

    <!-- Section Code -->
    <section class="section" data-section="code">
      <div class="section-content">
        <CodeSection />
      </div>
    </section>

    <!-- Section No-Code -->
    <section class="section" data-section="no-code">
      <div class="section-content">
        <NoCodeSection />
      </div>
    </section>
    
    <!-- Autres sections -->
    <section class="section" data-section="formations">
      <div class="section-content">
        <FormationsSection />
      </div>
    </section>
    <section class="section" data-section="about">
      <div class="section-content">
        <AboutSection />
      </div>
    </section>
    <section class="section" data-section="contact">
      <div class="section-content">
        <ContactSection />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Styles pour le scroll horizontal */
.section {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  overflow: hidden; /* Empêche le débordement vertical */
}

/* Style pour les conteneurs des sections à défilement interne */
.section-content {
  height: 100%;
  width: 100%;
  overflow-y: auto; /* Permet le défilement interne */
  overflow-x: hidden; /* Empêche le défilement horizontal à l'intérieur */
  scrollbar-width: thin; /* Barre de défilement fine (Firefox) */
}

/* Personnalisation de la barre de défilement pour Chrome/Safari */
.section-content::-webkit-scrollbar {
  width: 6px;
}

.section-content::-webkit-scrollbar-track {
  background: transparent;
}

.section-content::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 6px;
}

.sections-wrapper {
  display: flex;
  height: 100%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Animation pour l'entrée et la sortie des sections */
.section {
  opacity: 1;
  transition: opacity 0.6s ease;
}

/* Animation spécifique pour la page d'accueil */
.section[data-section="home"] {
  transition-delay: 0.1s;
}
</style>

<script setup>
import { useNuxtApp } from '#app'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const nuxtApp = useNuxtApp()

const currentSection = ref('home')
const validSections = ['home', 'code', 'no-code', 'formations', 'about', 'contact']
const initialLoadDone = ref(false)
const scrollUpdateAllowed = ref(true)

// Fonction pour mettre à jour l'URL sans interruption de défilement
const updateUrlWithoutScrolling = (sectionName) => {
  if (sectionName === currentSection.value) return
  
  // Mettre à jour la section courante
  currentSection.value = sectionName
  
  // Mettre à jour l'URL avec le hash mais sans recharger la page ni interrompre le défilement
  if (sectionName === 'home') {
    router.replace({ path: '/' }, { replace: true })
  } else {
    router.replace({ path: '/', hash: `#${sectionName}` }, { replace: true })
  }
}

// Fonction pour faire défiler vers une section
const navigateToSection = (sectionName) => {
  // Définir la section actuelle
  currentSection.value = sectionName
  
  // Utiliser le plugin global de défilement avec force=true pour permettre les transitions
  if (nuxtApp.$scrollToSection) {
    nuxtApp.$scrollToSection(sectionName, { force: true })
  }
}

// Naviguer vers la section depuis l'URL au chargement initial
onMounted(() => {
  // Ajouter l'écouteur de défilement uniquement pour la détection des sections
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Indiquer que le chargement initial est terminé après un délai
  setTimeout(() => {
    initialLoadDone.value = true
  }, 500)
})

// Intercepter les changements de route avec hash après le chargement initial
onBeforeRouteUpdate((to) => {
  if (initialLoadDone.value && to.hash) {
    const hashSection = to.hash.substring(1)
    if (validSections.includes(hashSection)) {
      // Utiliser le plugin global pour le défilement
      if (nuxtApp.$scrollToSection) {
        nuxtApp.$scrollToSection(hashSection, { force: true })
      }
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Gérer le défilement avec une fréquence limitée pour éviter trop d'opérations
let scrollDebounceTimer = null
function handleScroll() {
  // Ne pas mettre à jour pendant le chargement initial
  if (!initialLoadDone.value || !scrollUpdateAllowed.value) return
  
  // Éviter les mises à jour trop fréquentes
  clearTimeout(scrollDebounceTimer)
  scrollDebounceTimer = setTimeout(() => {
    updateCurrentSection()
  }, 100)  // 100ms de délai
}

// Fonction pour détecter la section visible et mettre à jour l'URL
const updateCurrentSection = () => {
  // Ne pas mettre à jour pendant les transitions de scrolling
  if (nuxtApp.$isScrollingInProgress && nuxtApp.$isScrollingInProgress()) {
    return
  }
  
  if (nuxtApp.$getVisibleSection) {
    // Utiliser la fonction du plugin pour déterminer la section visible
    const newSection = nuxtApp.$getVisibleSection()
    
    if (newSection && newSection !== currentSection.value) {
      updateUrlWithoutScrolling(newSection)
    }
  } else {
    // Fallback au comportement original si la fonction du plugin n'est pas disponible
    const sections = document.querySelectorAll('.section')
    const scrollPosition = window.scrollX
    const windowWidth = window.innerWidth
    
    sections.forEach((section) => {
      const sectionLeft = section.offsetLeft
      const sectionWidth = section.offsetWidth

      if (
          scrollPosition >= sectionLeft - windowWidth / 2 &&
          scrollPosition < sectionLeft + sectionWidth - windowWidth / 2
      ) {
        const newSection = section.dataset.section
        
        // Mettre à jour la section courante et l'URL uniquement si la section a changé
        if (currentSection.value !== newSection) {
          updateUrlWithoutScrolling(newSection)
        }
      }
    })
  }
}
</script>