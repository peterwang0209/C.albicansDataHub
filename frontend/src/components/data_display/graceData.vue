<template>
  <div>
    <div v-if="!isDataEmpty()">
      <div class="flex">
        <div class="flex-none">
          <table-component
            :table-data="tableDataForCurrentTable"
            :prefix="parsedBinaryData.table"
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
      if (this.parsedBinaryData.table === "gracev1") {
        return this.parsedBinaryData.data.gracev1data;
      } else if (this.parsedBinaryData.table === "gracev2") {
        return this.parsedBinaryData.data.gracev2data;
      }
      return []; // default value or you can return null or any other default value
    },
  },
  methods: {
    isDataEmpty() {
      if (!this.parsedBinaryData || !this.parsedBinaryData.data) {
        return true; // If parsedBinaryData or its data property is not present
      }

      const tableType = this.parsedBinaryData.table;
      if (tableType === "gracev1") {
        return (
          this.isEmpty(this.parsedBinaryData.data.gracev1data) &&
          this.isEmpty(this.parsedBinaryData.data.graceV1ImageSelections)
        );
      } else if (tableType === "gracev2") {
        return (
          this.isEmpty(this.parsedBinaryData.data.gracev2data) &&
          this.isEmpty(this.parsedBinaryData.data.graceV2ImageSelections)
        );
      }

      return true; // Default case if tableType is neither gracev1 nor gracev2
    },
    isEmpty(array) {
      return !array || array.length === 0;
    },
    handleImageSelect(image) {
      this.selectedImage = image;
    },
    updateImages() {
      if (this.parsedBinaryData.table === "gracev1") {
        this.image = this.parsedBinaryData.data.graceV1ImageSelections;
        // console.log(this.image);
        // console.log(this.parsedBinaryData.data);
        if (this.image && this.image.length > 0) {
          const doxImage = {
            position: this.image[0].GRACE_Position,
            grace: "GraceV1",
            plate: this.image[0].GRACE_Plate,
            data: this.image[0].imageData[0].DOX,
            dox: "Dox",
          };
          const noDoxImage = {
            position: this.image[0].GRACE_Position,
            grace: "GraceV1",
            plate: this.image[0].GRACE_Plate,
            data: this.image[0].imageData[0].No_Dox,
            dox: "No_Dox",
          };
          // console.log(doxImage, noDoxImage);
          this.allImages = [doxImage, noDoxImage];
          console.log("allImages1 updated:", this.allImages);
        }
      } else if (this.parsedBinaryData.table === "gracev2") {
        this.image = this.parsedBinaryData.data.graceV2ImageSelections;
        // console.log(this.image);
        // console.log(this.parsedBinaryData.data);
        if (this.image && this.image.length > 0) {
          const doxImage = {
            position: this.image[0].GRACEv2_Position,
            grace: "GraceV2",
            plate: this.image[0].GRACEv2_Plate,
            data: this.image[0].imageData[0].DOX,
            dox: "Dox",
          };
          const noDoxImage = {
            position: this.image[0].GRACEv2_Position,
            grace: "GraceV2",
            plate: this.image[0].GRACEv2_Plate,
            data: this.image[0].imageData[0].No_Dox,
            dox: "No_Dox",
          };
          // console.log(doxImage, noDoxImage);
          this.allImages = [doxImage, noDoxImage];
          console.log("allImages2 updated:", this.allImages);
        }
      }

      this.selectedImage = this.allImages[0];
    },
  },
  props: {
    parsedBinaryData: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    parsedBinaryData: {
      deep: true,
      handler(newVal) {
        this.updateImages();
      },
    },
  },
};
</script>