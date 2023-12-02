<template>
  <nav class="flex items-center justify-between p-6 border-b-2">
    <div class="flex items-center flex-shrink-0 mr-6">
      <router-link to="/" class="font-splash font-semibold text-xl ml-3">
        CandidaPhenome
      </router-link>
    </div>
    <div class="flex items-center">
      <router-link
        to="/"
        class="mr-4 no-underline hover:underline underline-offset-8 font-splash"
      >
        Home
      </router-link>
      <router-link
        to="/alldata"
        class="mr-4 no-underline hover:underline underline-offset-8 font-splash"
      >
        All Data
      </router-link>
      <router-link
        to="/research"
        class="mr-4 no-underline hover:underline underline-offset-8 font-splash"
      >
        Research
      </router-link>
      <router-link
        to="/about"
        class="mr-4 no-underline hover:underline underline-offset-8 font-splash"
      >
        About
      </router-link>
      <router-link
        to="/overview"
        class="mr-4 no-underline hover:underline underline-offset-8 font-splash"
      >
        Overview
      </router-link>
      <router-link
        to="/feedback"
        class="mr-4 no-underline hover:underline underline-offset-8 font-splash"
      >
        FeedBack
      </router-link>
      <router-link
        to="/devlog"
        class="mr-4 no-underline hover:underline underline-offset-8 font-splash"
      >
        DevLog
      </router-link>

      <!-- <a
        href="https://github.com/peterwang0209/C.albicansDataHub"
        class="mr-4 no-underline hover:underline underline-offset-8"
      >
        Github
      </a> -->
    </div>
  </nav>
</template>
