<template>
  <div class="flex justify-center w-full font-data text-xl">
    <div class="flex flex-col w-4/5 mt-4 mb-6">
      <div class="flex flex-col w-full mx-auto h-3/4 items-start">
        <image-display :src="selectedImage" class="w-96 h-40 mx-auto" />
        <image-selector :images="allImages" @select="handleImageSelect" />
      </div>
    </div>

    <div
      v-for="(result, index) in results"
      :key="'data-' + index"
      class="mx-auto w-4/5 flex flex-col items-center mt-4 mb-6"
    >
      <div class="flex flex-row w-full mx-auto">
        <div class="flex flex-col ml-11 items-start">
          <div v-for="(value, key) in result" :key="key" class="flex mb-1">
            <p class="font-bold text-xl mr-4">{{ keyMapping[key] || key }}</p>
            <p v-if="value">{{ value }}</p>
            <p v-else>{{ "N / A" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import ImageDisplay from "../components/ImageDisplay.vue";
import ImageSelector from "../components/ImageSelector.vue";
export default {
  components: {
    ImageDisplay,
    ImageSelector,
  },
  data() {
    return {
      selectedImage: "",
      allImages: [],
      result: [],
      imageV1: [],
      imageV2: [],
      keyMapping: {
        Feature_name: "Feature Name",
        attr1: "Gene expression level",
        attr2: "Gene expression variance",
        attr3: "Co-expression degree",
        attr4: "CAI",
        attr5: "Sequence variation",
        attr6: "Synthetic sick/lethal paralogs in S. cerevisiae",
        attr7: "Ortholog essentiality in S. cerevisiae",
        attr8: "Length",
        attr9: "Hits",
        attr10: "Reads",
        attr11: "Freedom index",
        attr12: "Neighborhood index",
        attr13: "Upstream hits 100",
        attr14: "GRACE (1: E; -1 NE)",
        attr15: "GRACEv2 (1: E; -1 NE)",
        attr16: "RF prediction(1:E, -1 NE)",
        attr17: "RF prediction score",
        ORF_ID: "ORF_ID",
        Common: "Common",
        Description: "Description",
      },
    };
  },
  created() {
    this.fetchResults();
  },
  methods: {
    async fetchResults() {
      console.log("reached datapage");
      const response = await fetch(
        `http://localhost:8804/search?term=${this.$route.params.id}`
      );
      const data = await response.json();
      this.results = data.results;
      this.imageV1 = data.graceV1ImageSelections;
      this.imageV2 = data.graceV2ImageSelections;
      console.log(data.graceV1ImageSelections);
      console.log(data.graceV2ImageSelections);
      this.allImages = [
        ...this.imageV1.map((result) => result.imageData[0].No_Dox),
        ...this.imageV1.map((result) => result.imageData[0].DOX),
        ...this.imageV2.map((result) => result.imageData[0].No_Dox),
        ...this.imageV2.map((result) => result.imageData[0].DOX),
      ];
      this.selectedImage = this.allImages[0];
    },
    handleImageSelect(image) {
      this.selectedImage = image;
    },
  },
};
</script>
