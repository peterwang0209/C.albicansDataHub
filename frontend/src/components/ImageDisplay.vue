<template>
  <div class="zoom-container">
    <img class="zoom-image" :src="imageData" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  computed: {
    imageData() {
      return 'data:image/png;base64,' + this.src;
    }
  },
};
</script>

<style scoped>
.zoom-container {
  width: 90%; /* or set a fixed size */
  height: 100%; /* or set a fixed size */
  overflow: hidden;
}

.zoom-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
</style>
