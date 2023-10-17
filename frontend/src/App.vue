<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Header />
    <router-view class="flex-grow" />
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
// import store from './vuex/store';
</script>
