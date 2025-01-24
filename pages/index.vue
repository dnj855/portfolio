<template>
  <main class="min-h-screen relative">
    <!-- Le blob en arrière-plan -->
    <BlobBackground />

    <div class="flex justify-between items-start w-full">

    <!-- Info personnelle en bas à gauche -->
      <div class="text-md font-sans ml-5 pt-12 pl-12">
        <h2 class="font-semibold">CÉDRIC LANG-ROTH</h2>
        <div class="mt-1 space-y-0.5">
          <p>Développeur Full-Stack</p>
          <p>Expert No-Code</p>
          <p>Formateur</p>
        </div>
      </div>
    <!-- Navigation principale -->
    <nav class="px-6 pt-12 ml-auto">
      <div class="grid grid-cols-1 gap-4 tracking-wide">
        <NuxtLink to="/code" class="hover:text-gray-700 transition-colors heading-menu ">
          CODE
        </NuxtLink>
        <NuxtLink to="/no-code" class="hover:text-gray-700 transition-colors heading-menu ">
          NO-CODE
        </NuxtLink>
        <NuxtLink to="/formations" class="hover:text-gray-700 transition-colors heading-menu ">
          FORMATIONS
        </NuxtLink>
        <NuxtLink to="/a-propos" class="hover:text-gray-700 transition-colors heading-menu ">
          À PROPOS
        </NuxtLink>
        <NuxtLink to="/contact" class="hover:text-gray-700 transition-colors heading-menu ">
          CONTACT
        </NuxtLink>
      </div>
    </nav>

    </div>
  </main>
</template>

<style scoped>
main {
  font-family: 'Inter', sans-serif;
}

nav a {
  line-height: 1.1;
}


.heading-menu {
  color: #000;
  font-family: Poppins;
  font-size: 128px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -6.4px;
}

.heading-menu:hover {
  font-style: italic;
}
</style>