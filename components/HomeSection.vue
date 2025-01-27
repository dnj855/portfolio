<template>
  <main class="md:h-screen sm:h-dvh relative">
    <div class="min-h-full flex flex-col md:flex-row w-full md:items-center">
      <div class="max-sm:min-h-dvh flex flex-col flex-1 md:flex-row md:items-start w-full max-sm:justify-between">
        <!-- Info personnelle -->
        <div class="text-base font-sans p-15 md:ml-5 md:p-4 md:self-start md:left-12 md:top-12">
          <h2 class="font-semibold">CÉDRIC LANG-ROTH</h2>
          <div class="mt-1 space-y-0.5">
            <p>Développeur Full-Stack</p>
            <p>Expert No-Code</p>
            <p>Formateur</p>
          </div>
        </div>

        <nav class="w-full md:w-auto px-4 pb-8 max-sm:pr-8 md:px-6 md:pb-0 ml-auto flex flex-col justify-end md:justify-start flex-1 md:flex-initial">
          <div class="grid grid-cols-1 gap-2 md:gap-4 tracking-wide">
            <button
                v-for="section in sections"
                :key="section.id"
                @click="scrollToSection(section.id)"
                class="heading-menu text-left"
            >
              {{ section.label }}
            </button>
          </div>
        </nav>
      </div>
    </div>
  </main>
</template>

<script setup>
const sections = [
      {id: 'code', label: 'CODE'},
      {id: 'no-code', label: 'NO-CODE'},
      {id: 'formations', label: 'FORMATIONS'},
      {id: 'about', label: 'À PROPOS'},
      {id: 'contact', label: 'CONTACT'}
    ]
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const scrollToSection = (sectionId) => {
  const section = document.querySelector(`[data-section="${sectionId}"]`)
  if (section) {
    const offsetLeft = section.offsetLeft
    console.log(offsetLeft)
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
</script>

<style scoped>
nav button {
  line-height: 1.1;
  cursor: pointer;
}

.heading-menu {
  color: #000;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -6.4px;
  /* Taille de base pour mobile */
  font-size: 48px;
  letter-spacing: -2.4px;
}

@media (min-width: 768px) {
  .heading-menu {
    font-size: 72px;
    letter-spacing: -3.6px;
  }
}

@media (min-width: 1024px) {
  .heading-menu {
    font-size: 96px;
    letter-spacing: -4.8px;
  }
}

/* Grands écrans */
@media (min-width: 1280px) {
  .heading-menu {
    font-size: 128px;
    letter-spacing: -6.4px;
  }
}

.heading-menu:hover {
  font-style: italic;
}

@media (max-width: 767px) {
  .heading-menu {
    text-align: right;
  }
}
</style>