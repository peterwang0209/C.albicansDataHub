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
          <DensityHist
            :graph-data="histogramData"
            :attribute-name="selectedStat"
            :id="this.plainData.data.data[0].id"
            :selected-attribute-value="selectedAttributeValue"
          ></DensityHist>
        </div>
        <div class="">
          <DropdownSelect
            :options="options"
            @option-selected="handleOptionSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import TableComponent from "../Table.vue";
import { keyMapping } from "../../utils/mutant_key_mapping";
import DensityHist from "../stats/DensityHist.vue";
import DropdownSelect from "../dropdownSelect.vue";
export default {
  components: {
    TableComponent,
    DensityHist,
    DropdownSelect,
  },
  data() {
    return {
      keyMapping: keyMapping,
      options: [
        { name: "Gene Expression Level", slotName: "GeneExpressionLevel" },
        { name: "RF Prediction Score", slotName: "RfPredictionScore" },
      ],
      selectedStat: "RfPredictionScore",
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
    handleOptionSelect(selectedOption) {
      console.log("Selected option:", selectedOption);
      this.selectedStat = selectedOption.slotName;
    },
  },
  created() {
    // console.log(this.plainData.data.data);
  },
  computed: {
    histogramData() {
      console.log(this.plainData.data.stats[this.selectedStat]);
      console.log(this.plainData.data.data[0]);
      return this.plainData.data.stats[this.selectedStat];
    },
    selectedAttributeValue() {
      const attrMapping = {
        RfPredictionScore: "attr17",
        GeneExpressionLevel: "attr1",
      };
      const attributeName = attrMapping[this.selectedStat];
      return this.plainData.data.data[0][attributeName];
    },
  },
};
</script>