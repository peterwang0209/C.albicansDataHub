<template>
  <div class="ml-20">
    <svg :width="width" :height="height" ref="histogramSvg"></svg>
    <div class="border-2 w-20 shadow-lg rounded-lg text-center">
      <button
        @click="toggleLogScale"
        class="w-full rounded-lg bg-transparent py-2 hover:bg-gray-100"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>


<script>
import * as d3 from "d3";

export default {
  props: {
    graphData: {
      type: Array,
      default: () => [],
    },
    attributeName: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: () => "",
    },
    selectedAttributeValue: {
      type: Number,
      default: 0.0,
    },
  },
  data() {
    return {
      width: 600,
      height: 500,
      margin: { top: 30, right: 20, bottom: 80, left: 80 },
      attributeMapping: {
        RfPredictionScore: "attr17",
        GeneExpressionLevel: "attr1",
      },
      useLogScale: false,
    };
  },
  mounted() {
    this.createHistogram();
  },
  computed: {
    buttonLabel() {
      return this.useLogScale ? "Original" : "Log2";
    },
  },

  watch: {
    graphData: {
      deep: true,
      handler(newData) {
        this.createHistogram();
      },
    },
  },
  methods: {
    toggleLogScale() {
      this.useLogScale = !this.useLogScale;
      this.createHistogram();
    },
    createHistogram() {
      // Clear previous SVG content
      const svg = d3.select(this.$refs.histogramSvg);
      svg.selectAll("*").remove();

      // Append the title
      svg
        .append("text")
        .attr("x", this.width / 2)
        .attr("y", this.margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Frequency Histogram");

      // Append the x-axis label
      svg
        .append("text")
        .attr(
          "transform",
          `translate(${this.width / 2}, ${this.height + this.margin.top - 70})`
        )
        .style("text-anchor", "middle")
        .text("Frequency Range");

      // Append the y-axis label
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - this.margin.left + 80)
        .attr("x", 0 - this.height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("frequency");

      const g = svg
        .append("g")
        .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
      console.log("graphData below");
      console.log(this.graphData);

      // Determine the max and min values dynamically
      const dataAttribute =
        this.attributeMapping[this.attributeName] || this.attributeName;

      let values = this.graphData.map((d) => d[dataAttribute]);
      console.log(this.attributeName);

      let transformedSelectedValue = this.selectedAttributeValue;
      console.log(transformedSelectedValue);

      if (this.useLogScale) {
        values = values
          .filter((value) => value !== 0 && value !== 1)
          .map((value) => Math.log2(value)); // Adding 1 to avoid log(0)
        transformedSelectedValue = Math.log2(
          Math.max(this.selectedAttributeValue, 1e-6)
        );
      }
      console.log(values);
      console.log(transformedSelectedValue);
      const maxVal = d3.max(values);
      console.log(maxVal);

      const minVal = d3.min(values);
      console.log(minVal);

      const binThresholds = d3.range(minVal, maxVal, (maxVal - minVal) / 30);

      const histogram = d3
        .bin()
        .value((d) => d[dataAttribute])
        .domain([minVal, maxVal])
        .thresholds(binThresholds);

      const bins = histogram(this.graphData);

      // Set up x-scale
      const x = d3
        .scaleBand()
        .range([0, this.width - this.margin.left - this.margin.right])
        .padding(0)
        .domain(bins.map((d) => d.x0));

      const y = d3
        .scaleLinear()
        .range([this.height - this.margin.top - this.margin.bottom, 0])
        .domain([0, d3.max(bins, (d) => d.length)]);

      g.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.x0))
        .attr("y", (d) => y(d.length))
        .attr("width", x.bandwidth())
        .attr(
          "height",
          (d) =>
            this.height - this.margin.top - this.margin.bottom - y(d.length)
        )
        .attr("fill", (d) => "steelblue")
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      g.selectAll("text.bar")
        .data(bins)
        .enter()
        .append("text")
        .attr("class", "bar")
        .attr("text-anchor", "middle") // Center the text
        .attr("x", (d) => x(d.x0) + x.bandwidth() / 2) // Position in the middle of the bar
        .attr("y", (d) => y(d.length) - 5) // Position above the bar by 5px
        .text((d) => d.length) // Set the text to the length (height) of the bar
        .style("fill", "#333"); // Text color

      const tickFormat = d3.format(".2f");
      const xAxis = d3
        .axisBottom(x)
        .tickValues(x.domain().filter((d, i) => i % 3 === 0))
        .tickFormat((d) => tickFormat(d));

      svg
        .append("g")
        .attr(
          "transform",
          `translate(${this.margin.left},${this.height - this.margin.bottom})`
        )
        .call(xAxis)
        .selectAll(".tick text")
        .attr("transform", `translate(${-x.bandwidth() / 2}, 0)`);

      const yAxis = d3.axisLeft(y);
      svg
        .append("g")
        .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
        .call(yAxis);

      let binForSelectedValue = bins.find(
        (bin) =>
          transformedSelectedValue >= bin.x0 &&
          transformedSelectedValue < bin.x1
      );
      if (binForSelectedValue) {
        let linePosition = x(binForSelectedValue.x0) + x.bandwidth() / 2;

        g.append("line")
          .attr("x1", linePosition)
          .attr("x2", linePosition)
          .attr("y1", 0)
          .attr("y2", this.height - this.margin.top - this.margin.bottom)
          .attr("stroke", "red")
          .attr("stroke-width", 2);
      } else {
        console.log("No corresponding bin found for the selected value");
      }
    },
  },
};
</script>
