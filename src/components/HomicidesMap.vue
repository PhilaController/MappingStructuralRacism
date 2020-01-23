<template>
  <div>
    <!-- Leaflet Map -->
    <div class="map-container" id="homicidesMap">
      <l-map
        :options="mapOptions"
        :zoom="zoom"
        :bounds="bounds"
        ref="homicidesBasemap"
        style="height: 550px; z-index: 1"
      ></l-map>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";

const esri = require("esri-leaflet");

export default {
  components: {
    LMap,
    LGeoJson,
    LTileLayer
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
      let map = this.$refs.homicidesBasemap.mapObject;

      // set zoom home bounds
      this.homeBounds = map.getBounds();

      // add a home button to the control bar
      let button = $(`<a class="leaflet-control-zoom-in" title="Recenter Map" role="button" aria-label="Recenter Map">
        <i class="fa fa-home" aria-hidden="true"></i>
        </a>`);
      button.on("click", this.zoomHome);
      $("#homicidesMap .leaflet-control-zoom").append(button);

      // add data download
      let button2 = $(`<a class="leaflet-control-zoom-in" title="Download 2019 homicides data" role="button" aria-label="Download 2019 homicides data">
        <i class="fa fa-download" aria-hidden="true"></i>
        </a>`);
      button2.on("click", () => {
        window.location =
          "https://phl.maps.arcgis.com/sharing/rest/content/items/ddee27284c9342a6a7aa0baab560b728/data";
      });
      $("#homicidesMap .leaflet-control-zoom").append(button2);

      // convert to svg
      if (window.FontAwesome) window.FontAwesome.dom.i2svg();

      // Add the basemap
      esri
        .tiledMapLayer({
          url:
            "https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer"
        })
        .addTo(map);
      esri
        .tiledMapLayer({
          url:
            "https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer"
        })
        .addTo(map);

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
            return { fill: false, color: "#2c3e50", weight: 4 };
          }
        })
        .addTo(map);

      // Add HOLC boundaries
      map.createPane("redlining");
      this.layers.holcBoundaries = esri
        .featureLayer({
          url:
            "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/1937_HOLC_Map_for_Philadelphia/FeatureServer/0",
          style: this.getDefaultStyle,
          pane: "redlining"
        })
        .addTo(map);

      // Add homicide points
      map.createPane("points");
      const homicidesURL =
        "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/2019_Homicide_Locations/FeatureServer/0";
      esri
        .featureLayer({
          url: homicidesURL,
          minZoom: 10,
          pointToLayer: function(geojson, latlng) {
            return L.circleMarker(latlng, {
              color: "#444444",
              fillColor: "#444444",
              pane: "points",
              radius: 4
            });
          }
        })
        .addTo(map);

      // when done loading, hide the spinner
      this.layers.holcBoundaries.on("loading", event => {
        this.isLoading = true;
      });
      this.layers.holcBoundaries.on("load", event => {
        this.isLoading = false;
      });

      this.layers.holcBoundaries.on("click", event => {
        this.$refs.homicidesBasemap.mapObject.flyToBounds(
          event.layer.getBounds()
        );
      });
    });
  },
  methods: {
    getDefaultStyle(feature) {
      return {
        color: this.colors[feature.properties.holc_grade],
        fillColor: this.colors[feature.properties.holc_grade],
        opacity: 0.8,
        fillOpacity: 0.5,
        weight: 0
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
      this.$refs.homicidesBasemap.mapObject.flyToBounds(this.homeBounds);
    }
  }
};
</script>

<style>
.legend-marker {
  width: 30px;
  height: 30px;
  opacity: 0.5;
  border-style: solid;
  border-width: 5px;
}
#homicidesMap {
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
</style>
