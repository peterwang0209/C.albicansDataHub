<template>
  <div class="flex">
    <div class="flex-none">
      <table-component
        :table-data="plainData.data.data"
        :prefix="plainData.table"
        :map-key="mapKey"
      ></table-component>
    </div>
    <div
      class="flex-none"
      v-if="Object.keys(this.plainData.data.stats).length !== 0"
    >
      <div class="grid grid-cols-1 gap-4">
        <!-- Using grid with 2 columns and gap for spacing -->
        <div class="">
          <gene-expression-hist
            :graph-data="this.plainData.data.stats"
            :id="this.plainData.data.data[0].id"
          ></gene-expression-hist>
        </div>
        <div class="">
          <gene-expression-box-plot
            :graph-data="this.plainData.data.stats"
            :id="this.plainData.data.data[0].id"
          ></gene-expression-box-plot>
        </div>
        <div>
          <gene-expression-density
            :graph-data="this.plainData.data.stats"
            :id="this.plainData.data.data[0].id"
          ></gene-expression-density>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import TableComponent from "../Table.vue";
import { keyMapping } from "../../utils/mutant_key_mapping";
import GeneExpressionHist from "../stats/GeneExpressionHist.vue";
import GeneExpressionBoxPlot from "../stats/GeneExpressionBoxPlot.vue";
import GeneExpressionDensity from "../stats/GeneExpressionDensity.vue";
export default {
  components: {
    TableComponent,
    GeneExpressionHist,
    GeneExpressionBoxPlot,
    GeneExpressionDensity,
  },
  data() {
    return {
      keyMapping: keyMapping,
    };
  },
  props: {
    plainData: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    mapKey(key) {
      return keyMapping[key] || key;
    },
  },
  created() {
    // console.log(this.plainData.data.data);
  },
};
</script>