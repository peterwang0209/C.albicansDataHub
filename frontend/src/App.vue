<template>
  <div id="app" class="flex flex-col min-h-screen justify-between">
    <Header />
    <router-view class="flex-grow" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Home from "./views/HomeView.vue";
import Footer from "./components/Footer.vue";
</script>
