<template>
  <div>
    <div v-if="!isDataEmpty()">
      <p>
        A defect hit in this table corresponds to a dLFC '&lt;' -2.0 and FDR
        '&lt;' 0.3
      </p>
      <div class="flex">
        <div class="flex-none">
          <table-component
            :table-data="data.data"
            :prefix="data.table"
            :map-key="mapKey"
          ></table-component>
        </div>
        <div
          class="flex-none"
          v-if="Object.keys(this.data.stats).length !== 0"
        >
          <div class="grid grid-cols-1 gap-4">
            <!-- Using grid with 2 columns and gap for spacing -->
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'differential_LFC'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].differential_LFC"
              ></NewDensityHist>
            </div>
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'Additional_differential_LFC'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].Additional_differential_LFC"
              ></NewDensityHist>
            </div>
          </div>
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
import NewDensityHist from "../stats/NewDensityHist.vue";


export default {
  components: {
    TableComponent,
    EmptyData,
    NewDensityHist
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
      return !this.data || !this.data.data || this.data.data.length === 0;
    },
  },
    beforeMount() {
    console.log(this.data);
  },
};
</script>