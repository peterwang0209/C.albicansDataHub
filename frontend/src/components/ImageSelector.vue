<template>
  <div class="image-selector ml-10 mt-4 border-1 shadow bg-neutral-300 p-3">
    <div
      v-for="(image, index) in images"
      :key="index"
      @click="
        selectImage(
          image.data,
          image.position,
          image.grace,
          image.plate,
          image.dox
        )
      "
    >
      <img :src="'data:image/png;base64,' + image.data" class="small-image" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    images(newVal) {
      console.log("Images prop updated:", newVal[0], newVal[1]);
    }
  },
  methods: {
    selectImage(imageData, position, grace, plate, dox) {
      this.$emit("select", {
        data: imageData,
        position: position,
        grace: grace,
        plate: plate,
        dox: dox,
      });
    }
  },
};
</script>


<style scoped>
.image-selector {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.small-image {
  width: 100px;
  height: 100px;
  margin: 5px;
  cursor: pointer;
}
</style>
