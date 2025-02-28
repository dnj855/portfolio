<template>
  <nav class="ml-auto flex flex-col gap-0 menu fixed top-0 right-0 p-6 z-50"
       :class="{ 'menu-hidden': isScrollingDown && currentSection !== 'home' }"
       :style="{
         opacity: currentSection === 'home' ? '0' : '1',
         pointerEvents: currentSection === 'home' ? 'none' : 'auto',
         transition: 'opacity 0.5s ease-in-out, transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)'
       }">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="navigateToSection(section.id)"
        :class="[
          'text-right hover:italic',
          { 'active': section.id === currentSection }
        ]"
      >
        {{ section.label }}
      </button>
  </nav>
</template>

<script setup>
import { useNuxtApp, useRouter } from '#app';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const router = useRouter();
const nuxtApp = useNuxtApp();

const props = defineProps({
  currentSection: {
    type: String,
    required: true
  }
});

// Variables pour gérer le défilement
const isScrollingDown = ref(false);
let lastScrollTop = 0;
let scrollTimer = null;

// Mémoriser l'état de défilement de chaque section
const sectionScrollStates = ref({});

// Réagir au changement de section
watch(() => props.currentSection, (newSection, oldSection) => {
  // Éviter d'exécuter lors du montage initial
  if (oldSection === undefined) return;
  
  // Vérifier si une animation de défilement est en cours
  const isScrollAnimating = nuxtApp.$isScrollingInProgress && nuxtApp.$isScrollingInProgress();
  
  // Si une animation est en cours, le menu doit être visible pendant la transition
  if (isScrollAnimating) {
    isScrollingDown.value = false;
    return;
  }
  
  // Lors d'un changement de section, utiliser l'état mémorisé ou vérifier la position actuelle
  if (sectionScrollStates.value[newSection] !== undefined) {
    // Si nous avons déjà mémorisé l'état pour cette section, l'utiliser
    isScrollingDown.value = sectionScrollStates.value[newSection];
  } else {
    // Sinon, vérifier la position de scroll de la nouvelle section
    const newSectionElement = document.querySelector(`[data-section="${newSection}"] .section-content`);
    
    if (newSectionElement) {
      // Si nous sommes près du haut de la section, afficher le menu
      const isScrolled = newSectionElement.scrollTop > 50;
      isScrollingDown.value = isScrolled;
      
      // Mémoriser cet état
      sectionScrollStates.value[newSection] = isScrolled;
    }
  }
}, { immediate: true });

// Ajouter un écouteur d'événement pour détecter le défilement
onMounted(() => {
  // Initialiser l'état de défilement de toutes les sections
  initializeSectionScrollStates();
  
  // Écouteurs pour le défilement vertical dans chaque section
  const sections = document.querySelectorAll('.section-content');
  sections.forEach(section => {
    section.addEventListener('scroll', handleScroll);
  });
  
  // Écouteur pour le défilement horizontal (changement de section)
  window.addEventListener('scroll', handleHorizontalScroll, { passive: true });
});

// Initialiser l'état de défilement de chaque section
const initializeSectionScrollStates = () => {
  // Attendre un peu avant d'initialiser les états pour s'assurer que la page est bien chargée
  setTimeout(() => {
    const allSections = document.querySelectorAll('.section');
    
    allSections.forEach(section => {
      if (section.dataset.section) {
        const sectionId = section.dataset.section;
        const sectionContent = section.querySelector('.section-content');
        
        if (sectionContent) {
          // Vérifier si la section est déjà scrollée
          const isScrolled = sectionContent.scrollTop > 50;
          sectionScrollStates.value[sectionId] = isScrolled;
          
          // Si la section active est déjà scrollée, cacher le menu
          if (sectionId === props.currentSection && isScrolled) {
            isScrollingDown.value = true;
          }
        }
      }
    });
  }, 500); // Attendre 500ms
};

// Nettoyer les écouteurs d'événements
onBeforeUnmount(() => {
  // Supprimer les écouteurs de défilement vertical
  const sections = document.querySelectorAll('.section-content');
  sections.forEach(section => {
    section.removeEventListener('scroll', handleScroll);
  });
  
  // Supprimer l'écouteur de défilement horizontal
  window.removeEventListener('scroll', handleHorizontalScroll);
  
  // Nettoyer le timer si nécessaire
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }
});

// Gérer le défilement vertical
const handleScroll = (event) => {
  // Identifier la section qui est en train d'être défilée
  // Le .section-content est le conteneur qui défile, et son parent est la section
  const sectionContent = event.target;
  const section = sectionContent.closest('.section');
  if (!section || !section.dataset.section) return;
  
  const sectionId = section.dataset.section;
  const scrollTop = sectionContent.scrollTop;
  const scrollDelta = scrollTop - lastScrollTop;
  
  // Ne réagit que si le défilement est significatif (plus de 5px)
  if (Math.abs(scrollDelta) > 5) {
    // Détermine la direction du défilement
    if (scrollDelta > 0) {
      // Défilement vers le bas - vérifier si on n'est pas déjà presque en haut
      if (scrollTop > 100) {
        isScrollingDown.value = true;
        
        // Mémoriser que cette section a été défilée
        sectionScrollStates.value[sectionId] = true;
      }
    } else {
      // Défilement vers le haut
      isScrollingDown.value = false;
    }
    
    // Annuler tout timer existant
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    
    // Réinitialiser après un délai si on ne défile pas
    scrollTimer = setTimeout(() => {
      // Si la section est presque en haut, toujours afficher le menu
      if (scrollTop < 50) {
        isScrollingDown.value = false;
        
        // Mémoriser que cette section n'est plus considérée comme défilée
        sectionScrollStates.value[sectionId] = false;
      }
    }, 800); // Délai de 0.8 seconde
  }
  
  // Mémoriser la position de défilement actuelle
  lastScrollTop = scrollTop;
};

// Gérer le défilement horizontal (changement de section)
const handleHorizontalScroll = () => {
  // Vérifier si on est en train de défiler horizontalement (et non verticalement)
  if (nuxtApp.$isScrollingInProgress && nuxtApp.$isScrollingInProgress()) {
    // Pendant un défilement horizontal animé, toujours afficher le menu
    isScrollingDown.value = false;
    return;
  }
  
  // Si ce n'est pas un défilement animé, vérifier la position de la section active
  const currentSectionElement = document.querySelector(`[data-section="${props.currentSection}"] .section-content`);
  if (currentSectionElement) {
    const isScrolled = currentSectionElement.scrollTop > 50;
    
    // Mettre à jour l'état
    isScrollingDown.value = isScrolled;
    
    // Mémoriser l'état pour cette section
    sectionScrollStates.value[props.currentSection] = isScrolled;
  }
};

// Définition des sections disponibles
const allSections = [
  { id: 'code', label: 'Code' },
  { id: 'no-code', label: 'No-Code' },
  { id: 'formations', label: 'Formations' },
  { id: 'about', label: 'À Propos' },
  { id: 'contact', label: 'Contact' }
];

// Réorganiser les sections pour que la section active soit en premier
const sections = computed(() => {
  const activeSection = allSections.find(section => section.id === props.currentSection);
  const otherSections = allSections.filter(section => section.id !== props.currentSection);
  
  return activeSection ? [activeSection, ...otherSections] : allSections;
});

// Fonction pour naviguer vers une section
const navigateToSection = (sectionId) => {
  // Mettre à jour l'URL avec un hash sauf pour la page d'accueil
  if (sectionId === 'home') {
    router.push({ path: '/' });
  } else {
    router.push({ path: '/', hash: `#${sectionId}` });
  }
  
  // Utiliser le plugin global pour le défilement
  if (nuxtApp.$scrollToSection) {
    nuxtApp.$scrollToSection(sectionId, { force: true });
  }
};
</script>

<style scoped>
.menu {
  font-family: "Poppins", sans-serif;
  text-align: right;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.2px;
}

.menu-hidden {
  transform: translateY(-120%);
}

.menu button {
  cursor: pointer;
}

.menu .active {
  font-size: 128px;
  font-weight: 600;
  line-height: 70.853%;
  letter-spacing: -6.4px;
  text-transform: uppercase;
  &:hover {
    font-style: normal;
  }
}
</style> 