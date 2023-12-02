<template>
  <div class="my-4">
    <div class="flex flex-col">
      <div v-if="tableData">
        <div class="overflow-x-auto">
          <table class="table-fixed bg-white divide-y divide-gray-300 rounded-lg striped-table border-collapse border">
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(value, key) in tableData[0]" :key="prefix + key">
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <p>{{ mapKey ? mapKey(key) : key }}</p>
                  </div>
                </td>
                <td class="px-3 py-4">
                  <p class="break-all">{{ value || "N/A" }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Object,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    mapKey: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style scoped>
.striped-table {
  width: 600px; /* Adjust as needed */
  height: 300px; /* Adjust as needed */
  overflow-y: auto; /* Adds vertical scrolling if content exceeds the height */
}

.striped-table tr:nth-child(odd) {
  background-color: #f5f5f5; /* Light grey color */
}

.striped-table td {
  width: 50%; /* If you have two columns and you want them to be of equal width */
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
</style>
