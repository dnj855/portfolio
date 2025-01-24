<template>
  <main class="min-h-screen relative">
    <BlobBackground />

    <div class="min-h-screen flex flex-col md:flex-row w-full md:items-center">

      <div class="flex flex-col flex-1 md:flex-row md:items-start w-full">
        <!-- Info personnelle -->
        <div class="text-md font-sans p-4 md:ml-5 md:pl-12 md:self-start md:sticky md:top-12">
          <h2 class="font-semibold">CÉDRIC LANG-ROTH</h2>
          <div class="mt-1 space-y-0.5">
            <p>Développeur Full-Stack</p>
            <p>Expert No-Code</p>
            <p>Formateur</p>
          </div>
        </div>

        <nav class="w-full md:w-auto px-4 md:px-6 pb-8 md:pb-0 md:ml-auto flex flex-col justify-end md:justify-start flex-1 md:flex-initial">
          <div class="grid grid-cols-1 gap-2 md:gap-4 tracking-wide">
            <NuxtLink to="/code" class="hover:text-gray-700 transition-colors heading-menu">
              CODE
            </NuxtLink>
            <NuxtLink to="/no-code" class="hover:text-gray-700 transition-colors heading-menu">
              NO-CODE
            </NuxtLink>
            <NuxtLink to="/formations" class="hover:text-gray-700 transition-colors heading-menu">
              FORMATIONS
            </NuxtLink>
            <NuxtLink to="/a-propos" class="hover:text-gray-700 transition-colors heading-menu">
              À PROPOS
            </NuxtLink>
            <NuxtLink to="/contact" class="hover:text-gray-700 transition-colors heading-menu">
              CONTACT
            </NuxtLink>
          </div>
        </nav>
      </div>
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
  nav {
    margin-bottom: 2rem;
  }

  .heading-menu {
    text-align: center;
  }
}
</style>