<template>
  <nav class="flex items-center justify-between p-6 shadow-md">
    <div class="flex items-center flex-shrink-0 mr-6">
      <router-link to="/" class="font-semibold text-xl tracking-tight">
        C.AlbicansDataHub
      </router-link>
    </div>
    <div class="flex items-center">
      <router-link
        to="/"
        class="mt-4 inline-block mr-4 pr-4 border-r"
      >
        Home
      </router-link>
      <router-link
        to="/alldata"
        class="mt-4 inline-block mr-4 pr-4 border-r"
      >
        All Data
      </router-link>
      <router-link
        to="/research"
        class="mt-4 inline-block mr-4 pr-4 border-r"
      >
        Research
      </router-link>
      <router-link
        to="/about"
        class="mt-4 inline-block mr-4 pr-4 border-r"
      >
        About
      </router-link>
      <a
        href="https://github.com/peterwang0209/C.albicansDataHub"
        class="mt-4 inline-block mr-4"
      >
        Github
      </a>
    </div>
  </nav>
</template>
