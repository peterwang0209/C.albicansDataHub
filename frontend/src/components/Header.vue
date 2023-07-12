<template>
  <nav class="flex items-center justify-between flex-wrap p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <router-link to="/" class="font-semibold text-xl tracking-tight">
        CandidaAlbicansDataHub
      </router-link>
    </div>
    <div
      class="w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:justify-end"
    >
      <div class="lg:flex-grow-0">
        <router-link
          to="/alldata"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          All Data
        </router-link>
        <router-link
          to="/database"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Database
        </router-link>
        <router-link
          to="/research"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Research
        </router-link>
        <router-link
          to="/about"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          About
        </router-link>
      </div>
    </div>
  </nav>
</template>
