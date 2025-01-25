<template>
  <main class="md:min-h-screen min-h-dvh relative overflow-hidden">

    <BlobBackground />

    <div class="min-h-screen flex flex-col md:flex-row w-full md:items-center">

      <div class="md:min-h-screen min-h-dvh flex flex-col flex-1 md:flex-row md:items-start w-full justify-between overflow-hidden">
        <!-- Info personnelle -->
        <div class="text-md font-sans p-12 md:p-4 md:ml-5 md:left-12 md:self-start md:sticky md:top-12">
          <h2 class="font-semibold">CÉDRIC LANG-ROTH</h2>
          <div class="mt-1 space-y-0.5">
            <p>Développeur Full-Stack</p>
            <p>Expert No-Code</p>
            <p>Formateur</p>
          </div>
        </div>

        <nav class="w-full md:w-auto pb-10 md:px-6 md:pb-0 md:ml-auto flex flex-col justify-end md:justify-start md:flex-initial overflow-hidden">
          <div class="grid grid-cols-1 gap-2 md:gap-4 tracking-wide">
            <NuxtLink to="/code" class="heading-menu">
              CODE
            </NuxtLink>
            <NuxtLink to="/no-code" class="heading-menu">
              NO-CODE
            </NuxtLink>
            <NuxtLink to="/formations" class="heading-menu">
              FORMATIONS
            </NuxtLink>
            <NuxtLink to="/a-propos" class="heading-menu">
              À PROPOS
            </NuxtLink>
            <NuxtLink to="/contact" class="heading-menu">
              CONTACT
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </main>
</template>

<style scoped>

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
  .heading-menu {
    text-align: center;
  }
}
</style>