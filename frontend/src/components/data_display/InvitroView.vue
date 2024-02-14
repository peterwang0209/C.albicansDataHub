<template>
  <div>
    <div v-if="!isDataEmpty()">
      <p>
        A defect hit under each condition in this table corresponds to an effect
        size '&lt;' -2.0 and FDR '&lt;' 0.05
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
                :attributeName="'FBS_effect_size'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].FBS_effect_size"
              ></NewDensityHist>
            </div>
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'NoIron_effect_size'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].NoIron_effect_size"
              ></NewDensityHist>
            </div>
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'Temp37_effect_size'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].Temp37_effect_size"
              ></NewDensityHist>
            </div>
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'YPD_effect_size'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].YPD_effect_size"
              ></NewDensityHist>
            </div>
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'NaCl_effect_size'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].NaCl_effect_size"
              ></NewDensityHist>
            </div>
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'SDS_effect_size'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].SDS_effect_size"
              ></NewDensityHist>
            </div>
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'Sorbitol_effect_size'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].Sorbitol_effect_size"
              ></NewDensityHist>
            </div>
            <div class="">
              <NewDensityHist
                :graphData="this.data.stats.statsData"
                :attributeName="'YNB_effect_size'"
                :id="this.data.data[0].ORF_ID"
                :selectedAttributeValue="this.data.data[0].YNB_effect_size"
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