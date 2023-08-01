<template>
  <div class="image-selector">
    <div v-for="(image, index) in images" :key="index" @click="selectImage(image)">
      <img :src="'data:image/png;base64,' + image" class="small-image" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectImage(image) {
      this.$emit('select', image);
    }
  }
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
