<template>
  <div 
    class="font-serif text-xl cursor-pointer" 
    :class="{ 'border-b-2 font-bold': clicked }" 
    @click="handlePanelClick"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    clicked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePanelClick(event) {
      this.$emit('click');
      event.stopPropagation();
    }
  }
}
</script>
