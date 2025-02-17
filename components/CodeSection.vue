<template>
  <div class="flex flex-col w-full pl-20 pr-5 py-5 relative min-h-full max-sm:min-h-dvh">
    <div class="flex space-between min-w-full">
      <div class="w-1/3 tracking-tight text-base flex flex-col gap-5">
        <p>
          Je développe des applications web qui donnent du sens à la technologie. Spécialisé dans la création de solutions B2B complexes, notamment pour les agences de communication, je transforme les défis RH en expériences fluides et intuitives.
        </p>
        <p>
          De HappyTasks, une PWA qui accompagne les familles d'enfants neuro-atypiques, aux plateformes métier sur mesure, chaque ligne de code est pensée avec une approche humaine et pragmatique.
        </p>
        <p>
          Ruby, PHP ou JavaScript : la technologie s'adapte à votre vision, pas l'inverse.
        </p>
      </div>
      <div class="ml-auto flex flex-col gap-0 menu">
        <button
            v-for="section in sections"
            :key="section.id"
            @click="scrollToSection(section.id)"
            class="text-right"
        >
          <h1 v-if="section.active" class="active"> {{ section.label.toUpperCase() }} </h1>
          <span v-else class="hover:italic">{{ section.label }}</span>
        </button>
      </div>
    </div>

    <!-- Liste des projets -->
    <div class="flex flex-col mt-auto text-right gap-[25px] content-center items-end" id="projects" ref="projectsList">
      <div v-for="(project, id) in data" :key="id" @click="showProjectDetails(project)" class="cursor-pointer hover:italic">
        <div class="flex items-center gap-[2px]">
          <div class="flex flex-col items-end">
              <span v-for="(tech, techIndex) in (project.techs ? Object.values(project.techs).slice(0,2) : [])" :key="techIndex" class="text-sm text-gray-500 font-sans">
                {{ tech }}
              </span>
          </div>
          <h2 class="projects">{{ project.title }}</h2>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <ProjectDetailsModal
        v-if="selectedProject"
        :project="selectedProject"
        @close="selectedProject = null"
    />
  </Teleport>
</template>

<script setup>
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref } from "vue";


const sections = [
  { id: 'code', label: 'Code', active: true },
  { id: 'no-code', label: 'No-Code' },
  { id: 'formations', label: 'Formations' },
  { id: 'about', label: 'À propos' },
  { id: 'contact', label: 'Contact' }
]

const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('code')
      .where('visible','=', "true")
      .all()
})

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const scrollToSection = (sectionId) => {
  const section = document.querySelector(`[data-section="${sectionId}"]`)
  if (section) {
    const offsetLeft = section.offsetLeft
    const maxScroll = document.querySelector('.sections-wrapper').scrollWidth - window.innerWidth

    gsap.to(window, {
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTo: {
        x: offsetLeft,
        autoKill: false
      }
    })
  }
}

const projectsList = ref(null)

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
      trigger: projectsList.value, // Se synchronise avec l'animation de scroll horizontal
      horizontal: true, // Active le mode horizontal
      start: "left center",
      toggleActions: "play none none reverse"
    }
  })
})

const selectedProject = ref(null)

const showProjectDetails = (project) => {
  selectedProject.value = project
}
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
  line-height: 70.853%; /* 90.691px */
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
</style>