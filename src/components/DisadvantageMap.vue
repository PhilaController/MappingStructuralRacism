<template>
  <div>
    <Legend class="mb-2" />

    <div class="control-panel-wrapper flex-column flex-centered" id="disadvantageControlPanel">
      <div class="control-panel flex-centered" ref="layerToggle">
        <!-- Toggles -->
        <div class="toggle-wrapper sflex-centered">
          <label class="control-panel-label font-weight-bold mr-3">Overlay</label>
          <template v-for="(layer, i) in toggleLayers">
            <div class="pretty p-default p-round layer-input" v-if="showLayer(layer.name)" :key="i">
              <input type="checkbox" v-model="layer.active" @change="toggleLayer(i, layer.active)" />
              <div class="state">
                <label :style="{ color: '#2c3e50' }">{{ layer.name }}</label>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <!-- Leaflet Map -->
      <div class="map-container" id="disadvantageMap">
        <l-map
          :options="mapOptions"
          :zoom="zoom"
          :bounds="bounds"
          ref="disadvantageBasemap"
          style="height: 550px; z-index: 1"
        ></l-map>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import * as esri from "esri-leaflet";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import Legend from "./DisadvantageLegend.vue";
import "pretty-checkbox/dist/pretty-checkbox.min.css";

export default {
  components: {
    LMap,
    LGeoJson,
    LTileLayer,
    Legend
  },
  data() {
    return {
      mapOptions: { maxZoom: 17, minZoom: 11, updateInterval: 500 },
      zoom: 11,
      bounds: [
        [39.86747186, -75.28030675],
        [40.13793484, -74.95574856]
      ],
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      layers: {},
      toggleLayers: {
        homicides: { active: false, name: "2019 Homicides" },
        redlining: { active: false, name: "HOLC Boundaries" }
      },
      isLoading: true,
      homeBounds: null,
      grades: ["A", "B", "C", "D", "Commercial"],
      labels: {
        A: 'A: "Best"',
        B: 'B: "Still Desirable"',
        C: 'C: "Definitely Declining"',
        D: 'D: "Hazardous"',
        Commercial: "Commercial/Industrial"
      },
      colors: {
        A: "#25a630",
        B: "#295bb7",
        C: "#ccac00",
        D: "#cf0000",
        Commercial: "#444444"
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      let map = this.$refs.disadvantageBasemap.mapObject;

      // set zoom home bounds
      this.homeBounds = map.getBounds();

      // add a home button to the control bar
      let button = $(`<a class="leaflet-control-zoom-in" title="Recenter Map" role="button" aria-label="Recenter Map">
        <i class="fa fa-home" aria-hidden="true"></i>
        </a>`);
      button.on("click", this.zoomHome);
      $("#disadvantageMap .leaflet-control-zoom").append(button);

      // convert to svg
      if (window.FontAwesome) window.FontAwesome.dom.i2svg();

      // add the basemap
      esri.basemapLayer("DarkGray").addTo(map);
      esri.basemapLayer("DarkGrayLabels", { minZoom: 13 }).addTo(map);

      // Update attribution
      map.attributionControl.addAttribution(
        "Robert K. Nelson, LaDale Winling, Richard Marciano, Nathan Connolly, et al., “<a href='https://dsl.richmond.edu/panorama/redlining/#city=philadelphia-pa' target='blank_'>Mapping Inequality</a>”"
      );

      // add city limits
      this.layers.city_limits = esri
        .featureLayer({
          url:
            "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/City_Limits/FeatureServer/0",
          style: () => {
            return { fill: false, color: "#cfcfcf", weight: 4 };
          }
        })
        .addTo(map);

      map.createPane("choropleth");
      this.layers.disadvantage = esri
        .featureLayer({
          pane: "choropleth",
          url:
            "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Disadvantage_Index/FeatureServer/0",
          style: feature => {
            return {
              fillColor: feature.properties.color,
              weight: 0,
              opacity: 1,
              fillOpacity: 0.5
            };
          }
        })
        .addTo(map);

      map.createPane("redlining");

      // add network layers
      this.layers.holcBoundaries = esri.featureLayer({
        url:
          "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/1937_HOLC_Map_for_Philadelphia/FeatureServer/0",
        style: this.getDefaultStyle,
        pane: "redlining",
        where: "holc_grade != 'Commercial'"
      });

      map.createPane("points");
      const homicidesURL =
        "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/2019_Homicide_Locations/FeatureServer/0";

      this.layers.homicides = esri.featureLayer({
        url: homicidesURL,
        minZoom: 10,
        pointToLayer: function(geojson, latlng) {
          return L.circleMarker(latlng, {
            color: "#cf0000",
            fillColor: "#cf0000",
            pane: "points",
            radius: 3.5
          });
        }
      });
    });
  },
  methods: {
    showLayer(layer) {
      let exclude = [];
      return exclude.indexOf(layer) == -1;
    },
    toggleLayer(layer, value) {
      let map = this.$refs.disadvantageBasemap.mapObject;
      let data =
        layer === "homicides"
          ? this.layers.homicides
          : this.layers.holcBoundaries;
      if (!value) {
        map.removeLayer(data);
      } else {
        map.addLayer(data);
      }
    },
    getDefaultStyle(feature) {
      return {
        color: this.colors[feature.properties.holc_grade],
        fillColor: this.colors[feature.properties.holc_grade],
        opacity: 1,
        fillOpacity: 0,
        weight: 3
      };
    },
    getHighlightedStyle(feature) {
      let style = this.getDefaultStyle(feature);
      style.fillOpacity = 0;
      style.opacity = 1;
      style.weight = 3;
      return style;
    },

    hexToRgb(hex, opacity) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      result = result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
            result[3],
            16
          )}`
        : "0, 0, 0";

      return `rgba(${result}, ${opacity})`;
    },

    zoomHome() {
      this.$refs.disadvantageBasemap.mapObject.flyToBounds(this.homeBounds);
    }
  }
};
</script>

<style>
.control-panel-label {
  margin-bottom: 0px;
}
.control-panel-wrapper {
  font-size: 1.1rem;
  background-color: #fafaf8;
  border: 3px solid #d4dadc;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.legend-marker {
  width: 30px;
  height: 30px;
  opacity: 0.5;
  border-style: solid;
  border-width: 5px;
}
#disadvantageMap {
  border: 3px solid #d4dadc;
}
.legend-title {
  font-size: 1.5rem;
  font-weight: medium;
}
.legend {
  font-size: 1.1rem;
  flex: 1;
  margin-left: 5rem;
}
.map-container {
  flex: 2;
}
@media only screen and (max-width: 1000px) {
  .toggle-wrapper {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .layer-input {
    margin-bottom: 10px;
  }
  .control-panel-label {
    margin-bottom: 10px;
  }
}
</style>
