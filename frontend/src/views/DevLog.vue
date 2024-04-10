<template>
  <div>
    <div class="bg-gray-100 p-8 text-center">
      <h1 class="text-3xl font-bold mb-4">Development Log</h1>
      <p class="text-lg">
        <strong>V1.0:</strong> The number before the period indicates the data version. The number after the period represents functionality updates.<br />
        <strong>Example:</strong><br />
        V1.1 - Data unchanged, but one update to functionality.<br />
        V2.0 - Database update with new data, functionality update reset to 0.
      </p>
    </div>
    <div class="p-8">
      <div v-for="(log, index) in devLogs" :key="index" class="mb-6">
        <h2 class="text-xl font-semibold mb-2">- Version {{ log.version }} -</h2>
        <ul class="list-disc pl-5">
          <li v-for="(item, idx) in log.content" :key="idx">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import devLogData from '../assets/devlog.json';

export default {
  data() {
    return {
      devLogs: devLogData, 
    };
  },
};
</script>
