<template>
  <div>
    <div class="flex justify-center">
      <form @submit.prevent="search" class="relative flex items-center">
        <select
          class="border border-gray-300 bg-white text-gray-600 mr-2 w-40 h-10 pl-5 pr-10 rounded-lg focus:outline-none font-splash"
          v-model="searchType"
        >
          <option value="Feature_name">Feature Name</option>
          <option value="ORF_ID">ORF ID</option>
          <option value="Common">Common</option>
        </select>
        <svg
          class="absolute left-44 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
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
          class="block w-full p-4 pl-10 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 font-splash"
          placeholder="Search..."
          v-model="searchTerm"
          required
        />
      </form>
    </div>
    <!-- <div class="flex justify-center mt-40 flex-col ml-10">
      <h2 class="text-xl font-semibold mb-2">Search History:</h2>
      <div class="flex flex-wrap">
        <div
          class="border rounded p-2 m-1 cursor-pointer shadow-inner"
          v-for="(item, index) in reversedSearchHistory"
          :key="index"
          @click="search(item)"
        >
          {{ item.type }} : {{ item.term }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      searchType: "Feature_name",
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
    search(searchItem = { term: this.searchTerm, type: this.searchType }) {
      if (searchItem instanceof Event) {
        searchItem = { term: this.searchTerm, type: this.searchType };
      }

      // Trim the search term
      searchItem.term = searchItem.term.trim();
      // Encode periods in the search term
      searchItem.term = searchItem.term.replace(/\./g, "%2E");
      // TODO: fix the cookie search history
      // this.$store.commit("searchHistory/addSearch", searchItem);
      this.$router.push({
        name: "DataPage",
        params: { id: searchItem.term, type: searchItem.type },
      });
    },
  },
};
</script>

<style scoped>
</style>
