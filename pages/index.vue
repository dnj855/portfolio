<!-- pages/index.vue -->
<template>
    <LogoComponent :currentSection="currentSection" />
  <div class="sections-wrapper">
    <!-- Section Home - Votre design original -->
    <section class="section" data-section="home" ref="homeSection">
      <HomeSection />
    </section>

    <!-- Section Code -->
    <section class="section" data-section="code">
      <CodeSection />
    </section>

    <!-- Section No-Code -->
    <section class="section" data-section="no-code">
      <NoCodeSection />
    </section>
    
    <!-- Autres sections -->
    <section class="section" data-section="formations">
      <FormationsSection />
    </section>
    <section class="section" data-section="about">
      <AboutSection />
    </section>
    <section class="section" data-section="contact">
      <ContactSection />
    </section>
  </div>
</template>

<style scoped>

/* Styles pour le scroll horizontal */
.section {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
}

.sections-wrapper {
  display: flex;
  height: 100%;
  will-change: transform;
}
</style>

<script setup>
const currentSection = ref('home')

// Fonction pour détecter la section visible
const updateCurrentSection = () => {
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
      currentSection.value = section.dataset.section
    }
  })
}

// Écouter le scroll horizontal
onMounted(() => {
  window.addEventListener('scroll', updateCurrentSection, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateCurrentSection)
})
</script>