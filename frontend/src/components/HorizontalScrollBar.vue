<template>
  <div id="app" class="overflow-hidden bg-yellow-200">
    <div class="whitespace-nowrap relative">
      <div
        ref="scrollContent"
        class="scroll-content flex items-center text-black"
      >
        <span class="text-lg font-bold">{{ update.version }}</span>
        <!-- Correctly placing v-for and :key on the <template> tag -->
        <template v-for="(item, index) in update.content" :key="index">
          <span class="content-item">&bull; {{ item }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import jsonData from "../assets/devlog.json";

export default {
  data() {
    return {
      update: jsonData[0],
      //   animationSpeed: 50, // Speed in pixels per second
    };
  },
};
</script>

<style>
.scroll-container {
  width: 100%; /* Adjust as needed */
  overflow: hidden; /* Hide the overflow */
  white-space: nowrap;
  position: relative;
}

.scroll-content {
  display: inline-block;
  animation: scroll-left 30s linear infinite; /* Adjust time as needed */
}

@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.item {
  display: inline-block; /* Makes items line up horizontally */
  margin-right: 20px; /* Spacing between items */
  /* Additional styling as needed */
}
</style>
