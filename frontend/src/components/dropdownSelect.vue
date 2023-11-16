<template>
  <div>
    <label
      id="listbox-label"
      class="block text-sm font-medium leading-6 text-gray-900"
      >Re-Render By Name</label
    >
    <div class="relative mt-2">
      <button
        type="button"
        @click="toggleDropdown"
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        aria-haspopup="listbox"
        :aria-expanded="isOpen.toString()"
        aria-labelledby="listbox-label"
      >
        <span class="flex items-center">
          <span class="ml-3 block truncate">{{ selectedOptionName }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <!-- Icon -->
        </span>
      </button>

      <ul
        v-if="isOpen"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
          :id="'listbox-option-' + index"
          role="option"
          @click="selectOption(option)"
        >
          <div class="flex items-center">
            <!-- Customization Slot -->
            <slot :name="option.slotName" :option="option"></slot>
            <span class="font-normal ml-3 block truncate">{{ option.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  computed: {
    selectedOptionName() {
      return this.selectedOption ? this.selectedOption.name : "Select an option";
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
      this.$emit("option-selected", option);
    },
  },
};
</script>

<style scoped>
/* Add any styles you want here */
</style>
