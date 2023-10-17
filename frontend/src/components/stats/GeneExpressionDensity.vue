<template>
  <div class="ml-20">
    <svg :width="width" :height="height" ref="densitySvg"></svg>
  </div>
</template>

<script>
export default {
  props: {
    graphData: {
      type: Object,
      default: () => ({}),
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
    this.createDensityPlot();
  },
  methods: {
    kernelDensityEstimator(kernel, X) {
      return function (V) {
        return X.map(function (x) {
          return [
            x,
            d3.mean(V, function (v) {
              return kernel(x - v);
            }),
          ];
        });
      };
    },
    kernelEpanechnikov(k) {
      return function (v) {
        return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
      };
    },
    createDensityPlot() {
      const data = this.graphData.geneExpressionLevel.map((d) => d.attr1);

      const svg = d3.select(this.$refs.densitySvg);

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(data)])
        .range([this.margin.left, this.width - this.margin.right]);

      const y = d3
        .scaleLinear()
        .range([this.height - this.margin.bottom, this.margin.top]);

      const kde = this.kernelDensityEstimator(
        this.kernelEpanechnikov(7),
        x.ticks(100)
      );
      const density = kde(data);

      y.domain([0, d3.max(density, (d) => d[1])]);

      svg
        .append("path")
        .attr("class", "mypath")
        .datum(density)
        .attr("fill", "#69b3a2")
        .attr("opacity", ".8")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr(
          "d",
          d3
            .line()
            .curve(d3.curveBasis)
            .x((d) => x(d[0]))
            .y((d) => y(d[1]))
        );

      svg
        .append("g")
        .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(x));

      svg
        .append("g")
        .attr("transform", `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(y));
    },
  },
};
</script>

<style scoped>
/* Add any styles you want here */
</style>
