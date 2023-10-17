<template>
  <div class="flex flex-col items-center w-3/5 mx-auto mt-10 bg-white">
    <div
      v-for="(research, index) in researchData"
      :key="index"
      class="flex flex-col p-2 rounded-xl space-y-4 m-6 shadow-lg"
    >
      <div class="p-2 rounded-xl">
        <h2 class="text-xl font-semibold">{{ research.title }}</h2>
        <h3 class="text-base font-medium">
          Authors:
          <span v-for="(author, i) in research.authors" :key="i">
            {{ author }}<span v-if="i < research.authors.length - 1">, </span>
          </span>
        </h3>
        <h4 class="text-base font-light">{{ research.date }}</h4>
        <p>{{ research.abstract }}</p>
        <div class="flex justify-end items-end mt-auto">
          <a :href="research.link" class="text-blue-500 hover:underline" target="_blank">
            Link
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import researchData from '../research.json';

export default {
  data() {
    return {
      researchData: researchData
    };
  }
};
</script>
