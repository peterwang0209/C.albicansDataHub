<template>
  <div class="ml-20">
    <svg :width="width" :height="height" ref="histogramSvg"></svg>
  </div>
</template>

<script>
export default {
  props: {
    graphData: {
      type: Object,
      default: () => ({}),
    },
    id: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      width: 500,
      height: 400,
      margin: { top: 100, right: 20, bottom: 30, left: 100 },
    };
  },
  mounted() {
    this.createHistogram();
  },
  methods: {
    createHistogram() {
      // Sort data by attr1 value
      const sortedData = this.graphData.geneExpressionLevel.sort(
        (a, b) => a.attr1 - b.attr1
      );
      // Create SVG element
      const svg = d3.select(this.$refs.histogramSvg);

      // Set up scales
      const x = d3
        .scaleBand()
        .domain(sortedData.map((d) => d.id))
        .range([this.margin.left, this.width - this.margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(sortedData, (d) => d.attr1)])
        .nice()
        .range([this.height - this.margin.bottom, this.margin.top]);

      svg
        .selectAll("rect")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.id))
        .attr("y", (d) => (d.id === this.id ? this.margin.top : y(d.attr1)))
        .attr("height", (d) =>
          d.id === this.id
            ? this.height - this.margin.bottom - this.margin.top
            : y(0) - y(d.attr1)
        )
        .attr("width", (d) =>
          d.id === this.id ? x.bandwidth() * 10 : x.bandwidth()
        ) // Adjust the width here
        .attr("fill", (d) => (d.id === this.id ? "red" : "steelblue")); // Highlight specific id

      // Add x-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(x).tickValues([this.id]).tickSizeOuter(0));

      // Add y-axis
      svg
        .append("g")
        .attr("transform", `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(y));

      // Add title
      svg
        .append("text")
        .attr("x", this.width / 2)
        .attr("y", this.margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Histogram of Gene Expression Levels");
    },
  },
};
</script>

<style scoped>
/* Add any styles you want here */
</style>
