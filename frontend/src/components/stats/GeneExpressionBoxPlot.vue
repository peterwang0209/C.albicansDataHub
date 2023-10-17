<template>
  <div class="ml-20">
    <svg :width="width" :height="height" ref="boxPlotSvg"></svg>
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
    this.createBoxPlot();
  },
  methods: {
    createBoxPlot() {
      const svg = d3.select(this.$refs.boxPlotSvg);

      // Extract attr1 values and filter out null values
      const values = this.graphData.geneExpressionLevel
        .map((d) => d.attr1)
        .filter((d) => d !== null)
        .sort((a, b) => a - b);

      const q1 = d3.quantile(values, 0.25);
      const median = d3.quantile(values, 0.5);
      const q3 = d3.quantile(values, 0.75);
      const min = values[0];
      const max = values[values.length - 1];

      const x = d3
        .scaleBand()
        .range([this.margin.left, this.width - this.margin.right])
        .domain(["Gene Expression"])
        .padding(0.5);

      const y = d3
        .scaleLinear()
        .domain([min, max])
        .range([this.height - this.margin.bottom, this.margin.top]);

      // Draw main box
      svg
        .append("rect")
        .attr("x", x("Gene Expression"))
        .attr("y", y(q3))
        .attr("width", x.bandwidth())
        .attr("height", y(q1) - y(q3))
        .attr("fill", "#69b3a2");

      // Draw median line
      svg
        .append("line")
        .attr("x1", x("Gene Expression"))
        .attr("x2", x("Gene Expression") + x.bandwidth())
        .attr("y1", y(median))
        .attr("y2", y(median))
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      // Draw whiskers
      svg
        .append("line")
        .attr("x1", x("Gene Expression") + x.bandwidth() / 2)
        .attr("x2", x("Gene Expression") + x.bandwidth() / 2)
        .attr("y1", y(min))
        .attr("y2", y(max))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      // Highlight the current id's position
      const currentIdValue = this.graphData.geneExpressionLevel.find(
        (d) => d.id === this.id
      ).attr1;
      svg
        .append("circle")
        .attr("cx", x("Gene Expression") + x.bandwidth() / 2)
        .attr("cy", y(currentIdValue))
        .attr("r", 5)
        .attr("fill", "red");

      // Axes
      svg
        .append("g")
        .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(x));

      svg
        .append("g")
        .attr("transform", `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(y));

    svg
        .append("text")
        .attr("x", this.width / 2)
        .attr("y", this.margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Box-Plot of Gene Expression Levels");
    },
  },
};
</script>

<style scoped>
/* Add any styles you want here */
</style>
