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