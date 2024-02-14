<template>
  <div>
    <div v-if="!isDataEmpty()">
      <div class="flex">
        <div class="flex-none">
          <table-component
            :table-data="tableDataForCurrentTable"
            :prefix="data.table"
          ></table-component>
        </div>
        <div
          class="flex-auto"
          v-if="tableDataForCurrentTable && tableDataForCurrentTable.length > 0"
        >
          <div class="flex flex-col w-full mx-auto h-3/4 items-start">
            <image-display :src="selectedImage" />
            <image-selector :images="allImages" @select="handleImageSelect" />
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
import ImageDisplay from "../ImageDisplay.vue";
import ImageSelector from "../ImageSelector.vue";
import EmptyData from "../EmptyData.vue";
export default {
  components: {
    ImageDisplay,
    ImageSelector,
    TableComponent,
    EmptyData,
  },
  data() {
    return {
      selectedImage: { data: "", position: "", grace: "", plate: "", dox: "" },
      allImages: [],
      image: [],
    };
  },
  mounted() {
    this.updateImages();
  },

computed: {
  tableDataForCurrentTable() {
    console.log(this.data);
    if (this.data.gracev1data && this.data.gracev1data.length > 0) {
      return this.data.gracev1data;
    } else if (this.data.gracev2data && this.data.gracev2data.length > 0) {
      return this.data.gracev2data;
    }
    return []; // Default value if neither gracev1data nor gracev2data are present
  },
},

  methods: {
    isDataEmpty() {
      console.log(this.data);
      if (!this.data) {
        return true; // If data is not present
      }

      // Check for gracev1data and gracev1 image selections
      const isGraceV1Empty =
        this.isEmpty(this.data.gracev1data) &&
        this.isEmpty(this.data.graceV1ImageSelections);

      // Check for gracev2data and gracev2 image selections
      const isGraceV2Empty =
        this.isEmpty(this.data.gracev2data) &&
        this.isEmpty(this.data.graceV2ImageSelections);

      // Data is considered empty if both gracev1 and gracev2 data are empty
      return isGraceV1Empty && isGraceV2Empty;
    },

    isEmpty(array) {
      return !array || array.length === 0;
    },

    handleImageSelect(image) {
      this.selectedImage = image;
    },
    updateImages() {
      console.log(this.data);
      const createImageObjects = (imageData, graceVersion) => {
        const doxImage = {
          position: imageData[0].GRACE_Position,
          grace: graceVersion,
          plate: imageData[0][`${graceVersion}_Plate`],
          data: imageData[0].imageData[0].DOX,
          dox: "Dox",
        };
        const noDoxImage = {
          position: imageData[0].GRACE_Position,
          grace: graceVersion,
          plate: imageData[0][`${graceVersion}_Plate`],
          data: imageData[0].imageData[0].No_Dox,
          dox: "No_Dox",
        };

        return [doxImage, noDoxImage];
      };

      // Determine if gracev1data or gracev2data is present and non-empty
      if (this.data.gracev1data && this.data.gracev1data.length > 0) {
        this.image = this.data.graceV1ImageSelections;
        if (this.image && this.image.length > 0) {
          this.allImages = createImageObjects(this.image, "gracev1");
          console.log("allImages for gracev1 updated:", this.allImages);
        }
      } else if (this.data.gracev2data && this.data.gracev2data.length > 0) {
        this.image = this.data.graceV2ImageSelections;
        if (this.image && this.image.length > 0) {
          this.allImages = createImageObjects(this.image, "gracev2");
          console.log("allImages for gracev2 updated:", this.allImages);
        }
      }

      // Set the first image as selected by default or set to an empty object if none is available
      this.selectedImage = this.allImages[0] || {};
    },
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        this.updateImages();
      },
    },
  },
};
</script>