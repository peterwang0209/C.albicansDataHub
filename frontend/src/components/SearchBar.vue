<template>
  <div>
    <div class="flex justify-center">
      <form @submit.prevent="search" class="relative">
        <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
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
        <input
          type="search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
          v-model="searchTerm"
          required
        />
      </form>
    </div>
    <div class="flex justify-center mt-40 flex-col ml-10">
      <h2 class="text-xl font-semibold mb-2">Search History:</h2>
      <div class="flex flex-wrap">
        <div
          class="border rounded p-2 m-1 cursor-pointer shadow-inner"
          v-for="(item, index) in reversedSearchHistory"
          :key="index"
          @click="search(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    reversedSearchHistory() {
      return [...this.searchHistory].reverse();
    },
    searchHistory() {
      return this.$store.state.searchHistory;
    },
  },
  methods: {
    search(searchTerm = this.searchTerm) {
      // If searchTerm is an event, use this.searchTerm instead
      if (searchTerm instanceof Event) {
        searchTerm = this.searchTerm;
      }

      this.$store.commit("addSearch", searchTerm);
      this.$router.push({ name: "DataPage", params: { id: searchTerm } });
    },
  },
};
</script>

<style scoped>
</style>
