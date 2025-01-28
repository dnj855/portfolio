<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(["close"])

const scrollOffset = ref(window.scrollX - window.innerWidth)
const updatePosition = () => {
  scrollOffset.value = window.scrollX - window.innerWidth
}

// Mémoriser la position de scroll initiale
let initialScrollPosition = 0

// Gestion du scroll
const preventScroll = () => {
  window.scrollTo(initialScrollPosition, 0)
}

onMounted(() => {
  window.addEventListener('scroll', updatePosition)

  // Mémoriser la position initiale et bloquer le scroll
  initialScrollPosition = window.scrollX
  window.addEventListener('scroll', preventScroll)

  // Optionnel : bloquer aussi le scroll avec la molette
  const sectionsWrapper = document.querySelector('.sections-wrapper')
  if (sectionsWrapper) {
    sectionsWrapper.style.pointerEvents = 'none'
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition)
  window.removeEventListener('scroll', preventScroll)

  // Réactiver les interactions
  const sectionsWrapper = document.querySelector('.sections-wrapper')
  if (sectionsWrapper) {
    sectionsWrapper.style.pointerEvents = 'auto'
  }
})
</script>

<template>
  <div
      class="fixed h-screen w-screen backdrop-blur-sm top-0 z-50"
      :style="{ left: `${scrollOffset}px` }"
  >
    <div class="absolute min-w-2/3 min-h-full">
      <div class="bg-white">BLA</div>
    </div>



    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
      <div class="bg-white p-8 rounded-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-4xl font-semibold">{{ project.title }}</h2>
          <div
              @click="$emit('close')"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <Icon name="mdi:close-circle-outline" />
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex gap-2">
            <span
                v-for="tech in project.meta.mainTech"
                :key="tech"
                class="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {{ tech }}
            </span>
          </div>

          <div v-if="project.description" class="text-lg">
            {{ project.description }}
          </div>

          <!-- Autres détails du projet -->
        </div>
      </div>
    </div>
  </div>
</template>