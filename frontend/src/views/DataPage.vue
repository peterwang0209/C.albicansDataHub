<template>
  <div class="flex justify-center w-full font-data">
    <!-- panel -->
    <div class="flex-none w-60 relative mr-4 border-r-2">
      <!-- <transition name="slide"> -->
      <div class="p-4">
        <!-- panel content goes here -->
        <PanelEntry
          :text="fu2021Text"
          :clicked="selectedPanel === 'fu2021'"
          @click="handlePanelClick('fu2021')"
        />
        <PanelEntry
          :text="mutantFeatureGeneText"
          :clicked="selectedPanel === 'mutant'"
          @click="handlePanelClick('mutant')"
        />
        <PanelEntry
          :text="graceV1Text"
          :clicked="selectedPanel === 'gracev1'"
          @click="handlePanelClick('gracev1')"
        />
        <PanelEntry
          :text="graceV2Text"
          :clicked="selectedPanel === 'gracev2'"
          @click="handlePanelClick('gracev2')"
        />
      </div>
      <!-- </transition> -->
    </div>

    <!-- gallery -->
    <div class="flex-grow">
      <div v-if="binaryContent && parsedBinaryData.data">
        <GraceData :parsedBinaryData="parsedBinaryData" :key="selectedPanel" />
      </div>

      <div v-else>
        <PlainData :plainData="parsedPlainTextData" />
      </div>
    </div>
  </div>
</template>

<script>
// import FoldingIcon from "../components/FoldingIcon.vue";
import ImageDisplay from "../components/ImageDisplay.vue";
import ImageSelector from "../components/ImageSelector.vue";
import PanelEntry from "../components/PanelEntry.vue";
import TableComponent from "../components/Table.vue";
import GraceData from "../components/data_display/graceData.vue";
import PlainData from "../components/data_display/plainData.vue";

export default {
  components: {
    ImageDisplay,
    ImageSelector,
    TableComponent,
    PanelEntry,
    GraceData,
    PlainData,
  },
  data() {
    return {
      selectedPanel: "fu2021",
      binaryContent: false,
      parsedBinaryData: {},
      parsedPlainTextData: {},
      fu2021Text: "Summary",
      graceV1Text: "GraceV1",
      graceV2Text: "GraceV2",
      mutantFeatureGeneText: "FU2021GeneFeature",
    };
  },
  created() {
    this.fetchResults("fu2021");
  },
  methods: {
    async fetchResults(table) {
      const searchValue = this.$route.params.id;
      const searchKey = this.$route.params.type;
      const url = `${
        import.meta.env.VITE_API_URL
      }/search/${table}?type=${searchKey}&term=${searchValue}`;

      const response = await fetch(url);

      const data = await response.json();

      if (this.binaryContent) {
        this.parsedBinaryData = { table, data };
      } else {
        this.parsedPlainTextData = { table, data };
      }
    },

    handlePanelClick(table) {
      this.selectedPanel = table;
      if (table === "gracev1" || table === "gracev2") {
        this.binaryContent = true;
      } else {
        this.binaryContent = false;
      }
      this.fetchResults(table);
    },
  },
};
</script>

<style>
/* When entering or leaving, animate the transform */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

/* Initial state before "entering" */
.slide-enter-from {
  transform: translateX(-100%);
}

/* Ending state after "entering" */
.slide-enter-to {
  transform: translateX(0);
}

/* Initial state before "leaving" */
.slide-leave-from {
  transform: translateX(0);
}

/* Ending state after "leaving" */
.slide-leave-to {
  transform: translateX(-100%);
}
</style>