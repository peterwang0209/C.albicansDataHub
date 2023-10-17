<template>
  <div>
    <div class="flex justify-end mb-4">
      <button
        @click="firstPage"
        :disabled="currentPage === 1"
        class="pagination-button bg-white border px-2 py-1 mr-1 rounded shadow"
      >
        First
      </button>
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="pagination-button bg-white border px-2 py-1 mr-1 rounded shadow"
      >
        Previous
      </button>
      <span class="align-middle my-auto">Page {{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === maxPage"
        class="pagination-button bg-white border px-2 py-1 mr-1 rounded shadow"
      >
        Next
      </button>
      <button
        @click="lastPage"
        :disabled="currentPage === maxPage"
        class="pagination-button bg-white border px-2 py-1 rounded shadow"
      >
        Last
      </button>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="(value, key, index) in keyMapping"
            :key="index"
            @click="sortTable(key)"
            class="cursor-pointer"
          >
            {{ value }}
            <span v-if="sortColumn === key">
              <span v-if="sortDirection === 'asc'">▲</span>
              <span v-if="sortDirection === 'desc'">▼</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in paginatedData"
          :key="item.id"
          :class="{
            'bg-gray-100': (index + (currentPage - 1) * perPage) % 2 === 1,
          }"
        >
          <td v-for="key in Object.keys(keyMapping)" :key="key">
            <template v-if="key === 'Feature_name'">
              <a href="#" @click.prevent="searchItem(key, item[key])">{{
                item[key]
              }}</a>
            </template>
            <template v-else>
              {{ item[key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      items: [],
      sortColumn: "",
      sortDirection: "",
      currentPage: 1,
      perPage: 25,
      keyMapping: {
        Feature_name: "Feature Name",
        attr1: "Gene expression level",
        attr2: "Gene expression variance",
        attr3: "Co-expression degree",
        attr4: "CAI",
        attr5: "Sequence variation",
        // attr6: "Synthetic sick/lethal paralogs in S. cerevisiae",
        // attr7: "Ortholog essentiality in S. cerevisiae",
        attr8: "Length",
        attr9: "Hits",
        attr10: "Reads",
        attr11: "Freedom index",
        attr12: "Neighborhood index",
        // attr13: "Upstream hits 100",
        // attr14: "GRACE (1: E; -1 NE)",
        // attr15: "GRACEv2 (1: E; -1 NE)",
        // attr16: "RF prediction(1:E, -1 NE)",
        // attr17: "RF prediction score",
        ORF_ID: "ORF_ID",
        Common: "Common",
        // Description: "Description",
      },
    };
  },
  computed: {
    sortedData() {
      const sortDirection = this.sortDirection === "asc" ? 1 : -1;
      return [...this.items.joinedData].sort((a, b) => {
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * sortDirection;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * sortDirection;
        return 0;
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.sortedData.slice(start, start + this.perPage);
    },
    maxPage() {
      return Math.ceil(this.items.joinedData.length / this.perPage);
    },
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:8804`);
      this.items = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    firstPage() {
      this.currentPage = 1;
    },
    lastPage() {
      this.currentPage = this.maxPage;
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = column;
        this.sortDirection = "asc";
      }
    },
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    searchItem(searchkey, searchvalue) {
      // Assuming that searchItem method is supposed to redirect to another route
      // Update this method according to your actual requirements
      this.$router.push({
        name: "DataPage", // The name of the route where you want to redirect
        params: { id: searchvalue, type: searchkey },
      });
    },
  },
};
</script>


<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.pagination-button {
  margin: 0 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.pagination-button:hover:not(:disabled) {
  background-color: #e8ecef;
}
</style>