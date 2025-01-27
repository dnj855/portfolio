<!-- pages/index.vue -->
<template>
    <LogoComponent />
  <div class="sections-wrapper">
    <!-- Section Home - Votre design original -->
    <section class="section" data-section="home">
      <HomeSection />
    </section>

    <!-- Section Code -->
    <section class="section" data-section="code">
      <CodeSection />
    </section>

    <!-- Autres sections -->
<!--    <section class="section" data-section="no-code">
      <NoCodeSection />
    </section>
    <section class="section" data-section="formations">
      <FormationsSection />
    </section>
    <section class="section" data-section="about">
      <AboutSection />
    </section>
    <section class="section" data-section="contact">
      <ContactSection />
    </section>-->
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