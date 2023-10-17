<template>
  <div>
    <div class="flex flex-wrap justify-center w-3/4 mx-auto">
      <!-- Using the Widget component and passing props multiple times for demonstration -->
      <Widget description="Unique Feature Name" value="6657" />
      <Widget description="Large Image" value="70" />
      <Widget description="Small Fragment Image" value="6720" />
      <!-- Add more widgets as necessary -->
    </div>
    <div class="grid grid-cols-2 gap-4 w-3/5 mx-auto">
      <Boxplot />
      <MirrorDensity />
      <Violin />
      <HeatMap />
      <BrushZoom />
      <!-- Empty slot for the 6th position -->
      <div></div>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget.vue";
import MirrorDensity from "../components/stats/MirrorDensity.vue";
import Boxplot from "../components/stats/Boxplot.vue";
import Violin from "../components/stats/Violin.vue";
import HeatMap from "../components/stats/HeatMap.vue";
import BrushZoom from "../components/stats/BrushZoom.vue";
export default {
  components: {
    Widget,
    MirrorDensity,
    Boxplot,
    Violin,
    HeatMap,
    BrushZoom,
  },
  methods: {},
};
</script>
