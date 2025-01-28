<template>
  <div :class="[
      'logo absolute fixed -translate-x-1/3 translate-y-[400%] z-100 transition transition-all duration-300',
{ 'opacity-0': currentSection === 'home'}]">
    <h2 class="text-base font-sans font-semibold sticky rotate-270 top-10 cursor-pointer" @click="scrollToHome()">CÉDRIC LANG-ROTH</h2>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin';

defineProps({
  currentSection: {
    type: String,
    required: true,
  }
})

gsap.registerPlugin(ScrollToPlugin);

const scrollToHome = () => {


    gsap.to(window, {
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTo: {
        x: 0,
        autoKill: false
      }
    })

}
</script>