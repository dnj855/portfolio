<template>
  <div class="flex flex-col w-full pl-20 pr-5 py-5 relative">
    <!-- En-tête avec description -->
    <div class="flex space-between min-w-full">
      <div class="w-1/3 tracking-tight text-base flex flex-col gap-5">
        <p>
          J'accompagne les professionnels et les équipes dans leur montée en compétence technique à travers des formations personnalisées.
        </p>
        <p>
          Mes interventions couvrent aussi bien le développement traditionnel (JavaScript, Ruby on Rails, PHP) que les solutions No-Code (Webflow, Notion, Airtable).
        </p>
        <p>
          Chaque formation est conçue sur mesure pour répondre aux besoins spécifiques de votre entreprise, avec un équilibre parfait entre théorie et pratique.
        </p>
        <p>
          Mon approche pédagogique favorise l'apprentissage par la pratique, pour une assimilation durable des compétences.
        </p>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="flex flex-col mt-16 gap-20" id="formations-content" ref="formationsContent">
      
      <!-- Catégories de formations -->
      <div class="grid grid-cols-3 gap-10 mb-20">
        <!-- Développement -->
        <div class="formation-category bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
          <h2 class="text-3xl font-semibold mb-6 text-center">Développement</h2>
          <div class="flex flex-col gap-5 flex-1">
            <div v-for="formation in devFormations" :key="formation.title" class="formation-item p-4 border-b border-gray-100">
              <div class="flex flex-col mb-2">
                <span class="text-sm text-gray-500 font-sans">{{ formation.level }}</span>
                <h3 class="text-xl font-medium">{{ formation.title }}</h3>
              </div>
              <p class="text-sm">{{ formation.description }}</p>
            </div>
            <!-- Élément d'espacement pour équilibrer les cards -->
            <div class="flex-grow"></div>
          </div>
        </div>

        <!-- No-Code -->
        <div class="formation-category bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
          <h2 class="text-3xl font-semibold mb-6 text-center">No-Code</h2>
          <div class="flex flex-col gap-5 flex-1">
            <div v-for="formation in noCodeFormations" :key="formation.title" class="formation-item p-4 border-b border-gray-100">
              <div class="flex flex-col mb-2">
                <span class="text-sm text-gray-500 font-sans">{{ formation.level }}</span>
                <h3 class="text-xl font-medium">{{ formation.title }}</h3>
              </div>
              <p class="text-sm">{{ formation.description }}</p>
            </div>
            <!-- Élément d'espacement pour équilibrer les cards -->
            <div class="flex-grow"></div>
          </div>
        </div>

        <!-- Journalisme -->
        <div class="formation-category bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
          <h2 class="text-3xl font-semibold mb-6 text-center">Journalisme</h2>
          <div class="flex flex-col gap-5 flex-1">
            <div v-for="formation in journalismeFormations" :key="formation.title" class="formation-item p-4 border-b border-gray-100">
              <div class="flex flex-col mb-2">
                <span class="text-sm text-gray-500 font-sans">{{ formation.level }}</span>
                <h3 class="text-xl font-medium">{{ formation.title }}</h3>
              </div>
              <p class="text-sm">{{ formation.description }}</p>
            </div>
            <!-- Élément d'espacement pour équilibrer les cards -->
            <div class="flex-grow"></div>
          </div>
        </div>
      </div>

      <!-- Section "À venir" -->
      <div v-if="project && project.length > 0" class="mt-10 p-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <h2 class="projects text-center mb-8">À venir</h2>
        <div class="flex items-center gap-12">
          <div class="w-1/3">
            <img :src="project[0].image" :alt="project[0].title" class="rounded-lg shadow-lg" />
          </div>
          <div class="w-2/3">
            <h3 class="text-3xl font-medium mb-4">{{ project[0].title }}</h3>
            <p class="mb-4">{{ project[0].description }}</p>
            <ContentRenderer v-if="project[0]" :value="project[0]" class="mb-6" />
            <div class="flex gap-3">
              <span 
                v-for="tag in project[0].tags" 
                :key="tag" 
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section clients -->
      <div v-if="clients && clients.length" class="mt-10">
        <h2 class="text-2xl font-medium mb-6 text-center">Ils me font confiance pour leurs formations</h2>
        <div class="grid grid-cols-4 gap-8 items-center justify-items-center">
          <div v-for="client in clients" :key="client._id" class="client-logo">
            <img :src="client.logo" :alt="client.name" class="max-h-16 grayscale hover:grayscale-0 transition duration-300" />
          </div>
        </div>
      </div>

      <!-- Call-to-action -->
      <div class="mt-10 text-center">
        <a href="https://eden-labs.fr" target="_blank" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
          Découvrir toutes nos formations
        </a>
        <p class="mt-3 text-sm text-gray-500">Visitez eden-labs.fr pour le catalogue complet et les détails.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { computed, onMounted, ref } from "vue";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const formationsContent = ref(null)

// Récupération des formations avec Nuxt Content
const { data: formations } = await useAsyncData('formations', () => 
  queryCollection('formations').all()
)

// Filtrer les formations par catégorie
const devFormations = computed(() => 
  formations.value?.filter(f => f.category === 'developpement') || []
)

const noCodeFormations = computed(() => 
  formations.value?.filter(f => f.category === 'no-code') || []
)

const journalismeFormations = computed(() => 
  formations.value?.filter(f => f.category === 'journalisme') || []
)

// Récupérer le projet "Eden Labs Learn"
const { data: project } = await useAsyncData('eden-labs-project', () => 
  queryCollection('projects').all()
)

// Récupérer la liste des clients
const { data: clients } = await useAsyncData('clients', () => 
  queryCollection('clients').all()
)


onMounted(() => {
  // Animation synchronisée des éléments au chargement
  const categories = document.querySelectorAll('.formation-category');
  
  // Créer un timeline GSAP
  const tl = gsap.timeline();
  
  // Animer toutes les catégories ensemble
  tl.from(categories, {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: "power2.out",
    clearProps: "all" // Important : nettoie les propriétés après animation
  });
  
  // Animation de la section "À venir"
  gsap.from('.mt-10', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    delay: 0.6,
    ease: "power2.out",
  })
})
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

.menu button {
  cursor: pointer;
}

.menu .active {
  font-size: 128px;
  font-weight: 600;
  line-height: 70.853%;
  letter-spacing: -6.4px;
}

.projects {
  font-family: Poppins;
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -3.2px;
}

.grid {
  display: grid;
  grid-auto-rows: 1fr; /* Force toutes les rangées à avoir la même hauteur */
}

.formation-category {
  transition: transform 0.3s ease;
  transform-origin: center bottom; /* Point d'origine cohérent */
  will-change: transform; /* Optimisation pour les navigateurs */
  height: 100%;
  min-height: 400px;
}

.formation-category:hover {
  transform: translateY(-5px);
}

/* Force les cartes à avoir la même hauteur */
.formation-category {
  transition: transform 0.3s ease;
  backface-visibility: hidden; /* Empêche le flicker sur certains navigateurs */
}

.formation-item h3 {
  font-family: Poppins;
  letter-spacing: -0.8px;
}

/* Animation pour les logos clients */
.client-logo {
  transition: transform 0.3s ease;
}

.client-logo:hover {
  transform: scale(1.1);
}
</style>