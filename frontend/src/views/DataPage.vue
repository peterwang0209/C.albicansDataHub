<template>
  <div>
    <h1>Results</h1>
    <div v-for="(result, index) in results" :key="index">
      ID: {{ result.id }} Feature Name: {{ result.Feature_name }}
      <!-- Add more properties here as needed -->
    </div>
  </div>
</template>



<script>
export default {
  props: ["results"],
};
</script>
