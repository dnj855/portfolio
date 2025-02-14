// ProjectDetailsModal.vue
<script setup>
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
    // Ajoutez d'autres correspondances selon vos besoins
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

onMounted(() => {
  window.addEventListener('scroll', updatePosition)
  initialScrollPosition = window.scrollX
  window.addEventListener('scroll', preventScroll)

  const sectionsWrapper = document.querySelector('.sections-wrapper')
  if (sectionsWrapper) {
    sectionsWrapper.style.pointerEvents = 'none'
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition)
  window.removeEventListener('scroll', preventScroll)

  const sectionsWrapper = document.querySelector('.sections-wrapper')
  if (sectionsWrapper) {
    sectionsWrapper.style.pointerEvents = 'auto'
  }
})
</script>

<template>
  <div
      class="fixed h-screen w-screen backdrop-blur-sm bg-white/30 top-0 z-50 transition-opacity duration-500"
      :style="{ left: `${scrollOffset}px`, opacity: isVisible ? '1' : '0' }"
  >
    <div
        class="absolute min-w-2/3 min-h-full pl-20 py-5 transition-all duration-500 transform w-[75%]"
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
          <div class="flex items-center gap-[21px] self-stretch">
            <div class="project-gallery max-w-[80%]">
              <img
                  v-for="(img, index) in project.gallery"
                  :key="index"
                  :src="img"
                  :class="['project-gallery-image', `image-${index}`]"
                  alt="Capture d'écran du projet"
              />
            </div>
            <div class="flex flex-col gap-[12px] items-center">
              <div v-for="tech in project.techs"
                   :key="tech"
                   class="text-gray-500 self-stretch"
              >
                {{ tech }}
              </div>
            </div>
          </div>
        </div>
       <div class="flex justify-between items-end gap-10">
          <div>
            <ContentRenderer :value="project.body"/>
          </div>
         <div class="flex flex-start gap-[10px]">
           <div v-for="(url, name) in project.links" :key="name">
             <a :href="url" target="_blank" class="hover:scale-5 transition"><Icon :name="getIconName(name)" class="min-w-10 min-h-10" /></a>
           </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* Deux colonnes égales */
  gap: 9px; /* Espacement entre les images */
  align-items: start;
  justify-content: center;
}

.project-gallery-image {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  object-position: top;
  object-fit: cover;
  max-height: 350px;
  aspect-ratio: 16 / 9;
}

:deep(p) {
  margin-bottom: 1.5rem; /* ou utilisez gap-6 si vous préférez les unités Tailwind */
}

/* Si vous voulez enlever la marge du dernier paragraphe */
:deep(p:last-child) {
  margin-bottom: 0;
}
</style>