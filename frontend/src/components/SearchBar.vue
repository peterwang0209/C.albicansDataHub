<template>
  <div>
    <div class="flex justify-center">
      <form @submit.prevent="search" class="relative w-2/5">
        <input
          type="search"
          class="block w-full p-4 pl-10 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 font-splash"
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
          class="border rounded p-2 m-1 cursor-pointer shadow-inner uppercase"
          v-for="(item, index) in reversedSearchHistory"
          :key="index"
          @click="search(item)"
        >
          {{ decodeURIComponent(item.term) }}
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
      // searchType: "Feature_name",
    };
  },
  computed: {
    reversedSearchHistory() {
      return [...this.searchHistory].reverse();
    },
    searchHistory() {
      return this.$store.state.searchHistory.searchHistory;
    },
  },
  methods: {
    search(searchItem = { term: this.searchTerm }) {
      if (searchItem instanceof Event) {
        searchItem = { term: this.searchTerm };
      }

      // Trim the search term
      searchItem.term = searchItem.term.trim();
      // Encode periods in the search term
      searchItem.term = searchItem.term.replace(/\./g, "%2E");
      // Lower case the searchItem
      searchItem.term = searchItem.term.toLowerCase();

      // TODO: Fix the searchHistory with single dummy search, no searchType
      this.$store.commit("searchHistory/addSearch", searchItem);
      this.$router.push({
        name: "DataPage",
        params: { id: searchItem.term },
      });
    },
  },
};
</script>

<style scoped>
</style>
