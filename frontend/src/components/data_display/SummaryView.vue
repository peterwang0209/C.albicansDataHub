<template>
  <div>
    <div v-if="!isDataEmpty()">
      <div class="flex">
        <div class="flex-none">
          <table-component
            :table-data="data.data"
            :prefix="data.table"
            :map-key="mapKey"
          ></table-component>
        </div>
      </div>
    </div>
    <div v-else>
      <empty-data />
    </div>
  </div>
</template>

<script>
import TableComponent from "../Table.vue";
import { keyMapping } from "../../utils/mutant_key_mapping";
import EmptyData from "../EmptyData.vue";

export default {
  components: {
    TableComponent,
    EmptyData,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      keyMapping: keyMapping,
    };
  },
  methods: {
    mapKey(key) {
      return this.keyMapping[key] || key;
    },
    isDataEmpty() {
      // Check if data.data is either not present or is an empty array
      return (
        !this.data ||
        !this.data.data ||
        this.data.data.length === 0
      );
    },
  },
};
</script>
