// ProjectDetailsModal.vue
<script setup>
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

defineProps({
  project: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["close"])

const getIconName = (name) => {
  const icons = {
    github: 'mdi:github',
    website: 'mdi:web',
  }
  return icons[name] || 'mdi:link'
}

const scrollOffset = ref(window.scrollX - window.innerWidth)
const updatePosition = () => {
  scrollOffset.value = window.scrollX - window.innerWidth
}
const isVisible = ref(false)

onMounted(() => {
  nextTick(() => {
    isVisible.value = true
  })
})

// Mémoriser la position de scroll initiale
let initialScrollPosition = 0

// Gestion du scroll
const preventScroll = () => {
  window.scrollTo(initialScrollPosition, 0)
}

// Gestion de la fermeture avec animation
const handleClose = () => {
  isVisible.value = false
  // Attendre la fin de l'animation avant d'émettre l'événement de fermeture
  setTimeout(() => {
    emit('close')
  }, 500) // Durée correspondant à la transition
}

// Fermeture en cliquant sur l'arrière-plan
const handleBackdropClick = (event) => {
  // S'assurer que le clic est bien sur le backdrop et pas sur le contenu de la modale
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

onMounted(() => {
  window.addEventListener('scroll', updatePosition)
  initialScrollPosition = window.scrollX
  window.addEventListener('scroll', preventScroll)

  // Désactiver les interactions avec les éléments sous-jacents
  const sectionsWrapper = document.querySelector('.sections-wrapper')
  if (sectionsWrapper) {
    sectionsWrapper.style.pointerEvents = 'none'
  }
  
  // Note: nous gardons le menu visible mais il sera sous la modale grâce au z-index élevé
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition)
  window.removeEventListener('scroll', preventScroll)

  // Réactiver les interactions
  const sectionsWrapper = document.querySelector('.sections-wrapper')
  if (sectionsWrapper) {
    sectionsWrapper.style.pointerEvents = 'auto'
  }
  
  // Note: pas besoin de code supplémentaire pour le menu car il est resté visible
})
</script>

<template>
  <div
      class="fixed h-screen w-screen top-0 z-[9999] transition-opacity duration-500 overflow-y-auto cursor-pointer"
      :style="{ left: `${scrollOffset}px`, opacity: isVisible ? '1' : '0' }"
      @click="handleBackdropClick"
  >
    <div
        class="absolute min-w-2/3 p-8 transition-all duration-500 transform w-[80%] max-w-[1400px] left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/60 rounded-xl shadow-2xl border border-white/20 cursor-default"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="flex flex-col items-start gap-[27px]">
        <div class="flex flex-col items-start self-stretch gap-[27px]">
          <div class="flex justify-between items-center w-full">
            <h2 class="text-[64px] font-semibold leading-1">{{ project.title }}</h2>
            <div
                @click="handleClose"
                class="text-gray-500 hover:text-gray-700 cursor-pointer shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <g clip-path="url(#clip0_35_44)">
                  <path d="M24 4.5C29.1717 4.5 34.1316 6.55446 37.7886 10.2114C41.4455 13.8684 43.5 18.8283 43.5 24C43.5 29.1717 41.4455 34.1316 37.7886 37.7886C34.1316 41.4455 29.1717 43.5 24 43.5C18.8283 43.5 13.8684 41.4455 10.2114 37.7886C6.55446 34.1316 4.5 29.1717 4.5 24C4.5 18.8283 6.55446 13.8684 10.2114 10.2114C13.8684 6.55446 18.8283 4.5 24 4.5ZM24 48C30.3652 48 36.4697 45.4714 40.9706 40.9706C45.4714 36.4697 48 30.3652 48 24C48 17.6348 45.4714 11.5303 40.9706 7.02944C36.4697 2.52856 30.3652 0 24 0C17.6348 0 11.5303 2.52856 7.02944 7.02944C2.52856 11.5303 0 17.6348 0 24C0 30.3652 2.52856 36.4697 7.02944 40.9706C11.5303 45.4714 17.6348 48 24 48ZM16.4062 16.4062C15.525 17.2875 15.525 18.7125 16.4062 19.5844L20.8125 23.9906L16.4062 28.3969C15.525 29.2781 15.525 30.7031 16.4062 31.575C17.2875 32.4469 18.7125 32.4562 19.5844 31.575L23.9906 27.1687L28.3969 31.575C29.2781 32.4562 30.7031 32.4562 31.575 31.575C32.4469 30.6937 32.4562 29.2687 31.575 28.3969L27.1687 23.9906L31.575 19.5844C32.4562 18.7031 32.4562 17.2781 31.575 16.4062C30.6937 15.5344 29.2687 15.525 28.3969 16.4062L23.9906 20.8125L19.5844 16.4062C18.7031 15.525 17.2781 15.525 16.4062 16.4062Z" fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0_35_44">
                    <rect width="48" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div class="flex items-start gap-8 self-stretch flex-wrap md:flex-nowrap">
            <Swiper
              :modules="[Autoplay, Pagination, Navigation]"
              :slides-per-view="1"
              :space-between="10"
              class="project-gallery md:w-2/3"
              :autoplay="{ delay: 3000 }"
              :pagination="{ clickable: true }"
              navigation
            >
              <SwiperSlide v-for="(img, index) in project.gallery" :key="index">
                <img
                  :src="img"
                  :class="['project-gallery-image rounded-lg', `image-${index}`]"
                  alt="Capture d'écran du projet"
                />
              </SwiperSlide>
            </Swiper>
            <div class="flex flex-col gap-4 md:w-1/3">
              <div class="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-medium mb-2">Technologies</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.techs"
                    :key="tech"
                    class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              <div v-if="project.links" class="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-medium mb-2">Liens</h3>
                <div class="flex flex-wrap gap-4">
                  <a 
                    v-for="(url, name) in project.links" 
                    :key="name" 
                    :href="url" 
                    target="_blank" 
                    class="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Icon :name="getIconName(name)" class="w-5 h-5" />
                    <span>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md w-full">
          <ContentRenderer :value="project.body" class="prose max-w-none"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-gallery {
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.75rem;
  overflow: hidden;
}

.project-gallery-image {
  width: 100%;
  object-position: top;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

:deep(p) {
  margin-bottom: 1.5rem;
}

:deep(p:last-child) {
  margin-bottom: 0;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #1a365d;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

:deep(.swiper-button-next)::after,
:deep(.swiper-button-prev)::after {
  font-size: 20px;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #1a365d;
}
</style>