<template>
  <div>
    <ul>
      <li v-for="item in items.joinedData" :key="item.id">
        {{ item.id }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
      items: [],
    };
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:8804`);
      this.items = res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
