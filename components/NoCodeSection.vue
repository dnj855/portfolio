<template>
  <div class="flex flex-col w-full pl-20 pr-5 py-5 relative min-h-full max-sm:min-h-dvh">
    <div class="flex space-between min-w-full">
      <div class="w-1/3 tracking-tight text-base flex flex-col gap-5">
        <p>
          J'accompagne les entreprises dans leur transformation numérique en créant des solutions No-Code sur mesure.
        </p>
        <p>
          Spécialisé dans l'automatisation des processus métier, j'utilise des plateformes comme Notion, Make.com et n8n pour développer des workflows efficaces qui libèrent du temps et réduisent les erreurs.
        </p>
        <p>
          Mes solutions No-Code permettent aux équipes de se concentrer sur leur cœur de métier, tout en bénéficiant d'outils puissants sans nécessiter de développement traditionnel.
        </p>
        <p>
          De l'automatisation des tâches répétitives à la création de tableaux de bord personnalisés, j'optimise les flux de travail pour une productivité maximale.
        </p>
      </div>
    </div>

    <!-- Liste des projets avec accordéon -->
    <div class="flex flex-col mt-auto text-right gap-[25px] content-center items-end" id="no-code-projects" ref="projectsList">
      <div v-for="(project, id) in data" :key="id" class="w-full flex flex-col items-end project-item">
        <!-- Titre du projet (cliquable) -->
        <div @click="toggleProject(id)" class="cursor-pointer hover:italic">
          <div class="flex items-center gap-[2px]">
            <h2 class="projects">{{ project.title }}</h2>
          </div>
        </div>
        
        <!-- Détails du projet (accordéon) -->
        <div class="overflow-hidden" :class="{'h-0': openProjectId !== id}">
          <transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 transform -translate-y-4"
            enter-to-class="opacity-100 transform translate-y-0"
            leave-active-class="transition-all duration-500 ease-in"
            leave-from-class="opacity-100 transform translate-y-0"
            leave-to-class="opacity-0 transform -translate-y-4"
          >
            <div v-if="openProjectId === id" class="text-left mt-6 mb-12 w-3/4 project-details">
              <div class="flex justify-between items-center mb-6">
                <div class="flex gap-[12px]">
                  <div 
                    v-for="software in project.softwares"
                    :key="software"
                    class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ software }}
                  </div>
                </div>
                <button @click="closeProject" class="text-gray-500 hover:text-gray-700 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4.5C29.1717 4.5 34.1316 6.55446 37.7886 10.2114C41.4455 13.8684 43.5 18.8283 43.5 24C43.5 29.1717 41.4455 34.1316 37.7886 37.7886C34.1316 41.4455 29.1717 43.5 24 43.5C18.8283 43.5 13.8684 41.4455 10.2114 37.7886C6.55446 34.1316 4.5 29.1717 4.5 24C4.5 18.8283 6.55446 13.8684 10.2114 10.2114C13.8684 6.55446 18.8283 4.5 24 4.5ZM24 48C30.3652 48 36.4697 45.4714 40.9706 40.9706C45.4714 36.4697 48 30.3652 48 24C48 17.6348 45.4714 11.5303 40.9706 7.02944C36.4697 2.52856 30.3652 0 24 0C17.6348 0 11.5303 2.52856 7.02944 7.02944C2.52856 11.5303 0 17.6348 0 24C0 30.3652 2.52856 36.4697 7.02944 40.9706C11.5303 45.4714 17.6348 48 24 48ZM16.4062 16.4062C15.525 17.2875 15.525 18.7125 16.4062 19.5844L20.8125 23.9906L16.4062 28.3969C15.525 29.2781 15.525 30.7031 16.4062 31.575C17.2875 32.4469 18.7125 32.4562 19.5844 31.575L23.9906 27.1687L28.3969 31.575C29.2781 32.4562 30.7031 32.4562 31.575 31.575C32.4469 30.6937 32.4562 29.2687 31.575 28.3969L27.1687 23.9906L31.575 19.5844C32.4562 18.7031 32.4562 17.2781 31.575 16.4062C30.6937 15.5344 29.2687 15.525 28.3969 16.4062L23.9906 20.8125L19.5844 16.4062C18.7031 15.525 17.2781 15.525 16.4062 16.4062Z" fill="black"/>
                  </svg>
                </button>
              </div>
              
              <ContentRenderer :value="project.body" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref } from "vue";

const { data } = await useAsyncData('nocode-projects', () => {
  return queryCollection('nocode')
      .all()
})

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const projectsList = ref(null);
const openProjectId = ref(null);

// Fonction pour ouvrir/fermer l'accordéon d'un projet
const toggleProject = (id) => {
  if (openProjectId.value === id) {
    // Si on clique sur le projet déjà ouvert, on le ferme
    openProjectId.value = null
  } else {
    // Sinon, on ouvre ce projet
    openProjectId.value = id
  }
}

// Fonction pour fermer le projet ouvert
const closeProject = () => {
  openProjectId.value = null
}

onMounted(() => {
  // Cache les projets initialement
  gsap.set(projectsList.value.children, {
    autoAlpha: 0,
    y: 20
  })

  // Anime chaque projet en séquence
  gsap.to(projectsList.value.children, {
    duration: 0.8,
    autoAlpha: 1,
    y: 0,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: projectsList.value, 
      horizontal: true,
      start: "left center",
      toggleActions: "play none none reverse"
    }
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

.project-details :deep(p) {
  margin-bottom: 1rem;
}

.project-details :deep(p:last-child) {
  margin-bottom: 0;
}
</style> 