<template>
  <div id="chart">
    <apexchart :height="height" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: ["height"],
  data() {
    return {
      data: require("@/homicides_by_holc_grade.json")
    };
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "bar",
          toolbar: { show: false }
        },
        dataLabels: { style: { fontSize: "16px" } },
        legend: {
          show: false
        },
        colors: ["#444444", "#25a630", "#295bb7", "#ccac00", "#cf0000"],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%",
            distributed: true
          }
        },
        xaxis: {
          categories: this.data["holc_grade"]
        },
        yaxis: {
          labels: {
            minWidth: 300,
            maxWidth: 300
          }
        },
        tooltip: {
          style: { fontSize: "1rem" }
        },
        grid: {
          padding: {
            top: -30
          }
        },
        responsive: [
          {
            breakpoint: 1000,
            options: {
              yaxis: {
                labels: {
                  show: false
                }
              },
              xaxis: { tickAmount: 3, labels: { trim: false } },
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: "bottom"
                  }
                }
              },
              dataLabels: {
                enabled: true,
                textAnchor: "start",
                style: {
                  colors: ["#121516"]
                },
                formatter: (val, opt) => {
                  if (
                    opt.seriesIndex == 0 ||
                    val === this.totals[opt.dataPointIndex]
                  )
                    return opt.w.globals.labels[opt.dataPointIndex];
                }
              }
            }
          }
        ]
      };
    },
    series() {
      return [
        { name: "Number of Homicides", data: this.data["total_homicides"] }
      ];
    }
  }
};
</script>

<style>
.apexcharts-yaxis-label,
.apexcharts-xaxis-label {
  font-size: 1rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.apexcharts-xaxis-title {
  font-size: 1.1rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-weight: 500;
}
</style>