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
        <PanelEntry
          :text="inVitroText"
          :clicked="selectedPanel === 'invitro'"
          @click="handlePanelClick('invitro')"
        />
        <PanelEntry
          :text="inVivoSIText"
          :clicked="selectedPanel === 'invivosi'"
          @click="handlePanelClick('invivosi')"
        />
        <PanelEntry
          :text="inVivoSIKinaseText"
          :clicked="selectedPanel === 'invivosikinase'"
          @click="handlePanelClick('invivosikinase')"
        />
        <PanelEntry
          :text="invivoGIDay5Text"
          :clicked="selectedPanel === 'invivogiday5'"
          @click="handlePanelClick('invivogiday5')"
        />
        <PanelEntry
          :text="invivoGIDay10Text"
          :clicked="selectedPanel === 'invivogiday10'"
          @click="handlePanelClick('invivogiday10')"
        />
      </div>
      <!-- </transition> -->
    </div>

    <!-- gallery -->
    <div class="flex-grow">
      <component
        :is="currentComponent"
        :data="currentData"
        :key="selectedPanel"
      />
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
import Fu2021DataView from "../components/data_display/Fu2021View.vue";
import SummaryView from "../components/data_display/SummaryView.vue";
import InvitroViewVue from "../components/data_display/InvitroView.vue";
import InvivoGiDay10ViewVue from "../components/data_display/InvivoGiDay10View.vue";
import InvivoGiDay5ViewVue from "../components/data_display/InvivoGiDay5View.vue";
import InvivosiKinaseViewVue from "../components/data_display/InvivosiKinaseView.vue";
import InvivosiViewVue from "../components/data_display/InvivosiView.vue";

export default {
  components: {
    ImageDisplay,
    ImageSelector,
    TableComponent,
    PanelEntry,
    GraceData,
    PlainData,
    Fu2021DataView,
    SummaryView,
    InvitroViewVue,
    InvivoGiDay10ViewVue,
    InvivoGiDay5ViewVue,
    InvivosiKinaseViewVue,
    InvivosiViewVue,
  },
  data() {
    return {
      selectedPanel: "fu2021",
      currentData: {},
      binaryContent: false,
      parsedBinaryData: {},
      parsedPlainTextData: {},
      fu2021Text: "Summary",
      graceV1Text: "GraceV1",
      graceV2Text: "GraceV2",
      mutantFeatureGeneText: "FU2021GeneFeature",
      inVitroText: "in vitro",
      inVivoSIText: "in vivo SI",
      inVivoSIKinaseText: "in vivo SI Kinase",
      invivoGIDay5Text: "in vivo GI Day 5",
      invivoGIDay10Text: "in vivo GI Day 10",
      panelComponentMap: {
        gracev1: "GraceData",
        gracev2: "GraceData",
        fu2021: "SummaryView",
        mutant: "Fu2021DataView",
        invitro: "InvitroViewVue",
        invivosi: "InvivosiViewVue",
        invivosikinase: "InvivosiKinaseViewVue",
        invivogiday5: "InvivoGiDay5ViewVue",
        invivogiday10: "InvivoGiDay10ViewVue",
      },
    };
  },
  created() {
    this.fetchResults("fu2021");
  },
  computed: {
    currentComponent() {
      // Get the current component based on the selected panel
      return this.panelComponentMap[this.selectedPanel];
    },
  },
  methods: {
    async fetchResults(table) {
      const searchValue = this.$route.params.id;
      const url = `${
        import.meta.env.VITE_API_URL
      }/search/${table}?term=${searchValue}`;
      console.log(url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        this.currentData = data;
        console.log(this.currentData);
      } catch (error) {
        console.error("Fetch error:", error.message);
        // Handle the error appropriately in your application
      }
    },

    handlePanelClick(table) {
      //
      this.selectedPanel = table;
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