<template>
  <form>
    <div class="relative flex items-center max-w-md mx-auto p-3">
      <div class="absolute flex items-center pl-3">
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <form @submit.prevent="search">
        <input
          type="search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
          v-model="searchTerm"
          required
        />
      </form>
    </div>
  </form>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      results: [],
    };
  },
  methods: {
    async search() {
      const response = await fetch(
        `http://localhost:8803/search?term=${this.searchTerm}`
      );
      const data = await response.json();
      // Save the result to your data
      this.results = data.results;
      // Navigate to the DataPage route
      this.$router.push({
        name: "DataPage",
        params: { results: this.results },
      });
    },
  },
};
</script>