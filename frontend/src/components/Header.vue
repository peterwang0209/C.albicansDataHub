<template>
  <nav class="flex items-center justify-between flex-wrap p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <router-link to="/" class="font-semibold text-xl tracking-tight">
        C.AlbicansDataHub
      </router-link>
    </div>
    <div
      class="w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:justify-end"
    >
      <div class="lg:flex-grow-0">
        <router-link
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 pr-4 border-r"
        >
          Home
        </router-link>
        <router-link
          to="/alldata"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 pr-4 border-r"
        >
          All Data
        </router-link>
        <router-link
          to="/research"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 pr-4 border-r"
        >
          Research
        </router-link>
        <router-link
          to="/about"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 pr-4 border-r"
        >
          About
        </router-link>
        <a
          href="https://github.com/peterwang0209/C.albicansDataHub"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Github</a
        >
      </div>
    </div>
  </nav>
</template>
