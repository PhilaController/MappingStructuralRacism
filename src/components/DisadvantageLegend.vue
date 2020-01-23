<template>
  <div class="d-flex justify-content-center" id="defect-rating-legend">
    <div class="d-flex flex-column justify-content-center">
      <div class="legend-title d-flex justify-content-center w-100">Level of Disadvantage</div>
      <svg :width="width" :height="height">
        <g id="defect-index-canvas" />
      </svg>
      <div class="d-flex justify-content-between">
        <div class="legend-label">Least Disadvantaged</div>
        <div class="legend-label">Most Disadvantaged</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      margin: { right: 40, bottom: 0, left: 40 },
      barHeight: 20,
      height: 25,
      width: null
    };
  },
  computed: {
    colorScale() {
      return d3.scaleSequential(d3.interpolateBlues).domain([0, 1]);
    },
    axisScale() {
      return d3
        .scaleLinear()
        .domain(this.colorScale.domain())
        .range([this.margin.left, this.width - this.margin.right]);
    }
  },
  mounted() {
    let svg = d3.select("#defect-index-canvas");
    const defs = svg.append("defs");

    // set the width
    this.width = Math.min(
      $("#defect-rating-legend")
        .parent()
        .width(),
      1000
    );

    const linearGradient = defs
      .append("linearGradient")
      .attr("id", "linear-gradient");

    linearGradient
      .selectAll("stop")
      .data(
        this.colorScale.ticks().map((t, i, n) => ({
          offset: `${(100 * i) / n.length}%`,
          color: this.colorScale(t)
        }))
      )
      .enter()
      .append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);

    svg
      .append("g")
      .attr(
        "transform",
        `translate(0,${this.height - this.margin.bottom - this.barHeight})`
      )
      .append("rect")
      .attr("transform", `translate(${this.margin.left}, 0)`)
      .attr("width", this.width - this.margin.right - this.margin.left)
      .attr("height", this.barHeight)
      .style("fill", "url(#linear-gradient)");

    // svg.append("g").call(this.axisBottom);
  },
  methods: {
    axisBottom(g) {
      return g
        .attr("class", `x-axis`)
        .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
        .call(
          d3
            .axisBottom(this.axisScale)
            .ticks(0)
            .tickSize(0)
            .tickFormat(d3.format(".0%"))
        );
    }
  }
};
</script>

<style>
.x-axis line,
.x-axis path {
  stroke: #fff;
}

.tick text {
  font-size: 1rem;
}

.legend-label {
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
}

.legend-title {
  font-size: 1.5rem;
  font-weight: bold;
}

@media only screen and (max-width: 1000px) {
  .legend-label {
    max-width: 150px;
  }
}
</style>

