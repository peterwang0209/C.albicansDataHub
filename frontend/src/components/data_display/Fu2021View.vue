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
        <div
          class="flex-none"
          v-if="Object.keys(this.data.stats).length !== 0"
        >
          <div class="grid grid-cols-1 gap-4">
            <!-- Using grid with 2 columns and gap for spacing -->
            <div class="">
              <DensityHist
                :graph-data="histogramData"
                :attribute-name="selectedStat"
                :id="this.data.data[0].id"
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
    </div>
    <div v-else>
      <empty-data />
    </div>
  </div>
</template>




<script>
import TableComponent from "../Table.vue";
import { keyMapping } from "../../utils/mutant_key_mapping";
import DensityHist from "../stats/DensityHist.vue";
import DropdownSelect from "../dropdownSelect.vue";
import EmptyData from "../EmptyData.vue";
export default {
  components: {
    TableComponent,
    DensityHist,
    DropdownSelect,
    EmptyData,
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
    data: {
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
    isDataEmpty() {
      return !this.data.data || this.data.data.length === 0;
    },
  },
  created() {
    console.log(this.data);
  },
  computed: {
    histogramData() {
      console.log(this.data.stats[this.selectedStat]);
      console.log(this.data.data[0]);
      return this.data.stats[this.selectedStat];
    },
    selectedAttributeValue() {
      const attrMapping = {
        RfPredictionScore: "attr17",
        GeneExpressionLevel: "attr1",
      };
      const attributeName = attrMapping[this.selectedStat];
      return this.data.data[0][attributeName];
    },
  },
};
</script>