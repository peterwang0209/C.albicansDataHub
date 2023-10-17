<template>
  <div>
    <label class="ml-10 font-serif font-bold">{{this.src.grace}}, {{this.src.plate}}, {{this.src.position}}, {{this.src.dox}}</label>
    <div class="relative w-9/10 mx-auto mt-2 ml-10">
      <img
        :src="imageData"
        class="max-w-full max-h-full object-contain block"
      />
      <div
        class="grid grid-cols-12 grid-rows-8 absolute top-0 left-0 w-full h-full border border-black"
      >
        <div
          v-for="cell in 96"
          :key="'cell-' + cell"
          class=""
          :class="{ 'border-4 border-red-600': isSelected(cell) }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: Object,
      default: () => ({
        data: "",
        position: "",
        grace: "",
        plate: "",
        dox: "",
      }),
    },
  },
  computed: {
    imageData() {
      return "data:image/png;base64," + this.src.data;
    },
  },
  methods: {
    isSelected(cell) {
      if (!this.src.position) return false;
      const rowIndex = this.src.position.charCodeAt(0) - 65; // Convert A-H to 0-7
      const colIndex = parseInt(this.src.position.substring(1)); // Convert 1-12 to 0-11
      const linearIndex = rowIndex * 12 + colIndex;
      return linearIndex === cell;
    },
  },
};
</script>
