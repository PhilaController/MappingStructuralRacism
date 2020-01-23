<template>
  <div class="control-panel flex-centered" ref="layerToggle">
    <!-- Toggles -->
    <div class="toggle-wrapper flex-centered">
      <template v-for="(layer, i) in layers">
        <div class="pretty p-default p-round layer-input" v-if="showLayer(layer.name)" :key="i">
          <input type="checkbox" v-model="layer.active" @change="toggleLayer(i, layer.active)" />
          <div class="state">
            <label
              :class="{ 'font-weight-bold': boldLabels}"
              :style="{ color: '#2c3e50' }"
            >{{ layer.name }}</label>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import "pretty-checkbox/dist/pretty-checkbox.min.css";

export default {
  props: ["exclude", "boldLabels", "actives"],
  data() {
    return {
      layers: {
        homicides: { active: false, color: LOCAL, name: "2019 Homicides" },
        redlining: { active: false, color: FAM, name: "HOLC Boundaries" }
      }
    };
  },
  mounted() {
    for (let i = 0; i < this.actives.length; i++) {
      this.layers[this.actives[i]].active = true;
    }
    // this.setRadioChecked();
  },
  methods: {
    showLayer(layer) {
      let exclude = this.exclude || [];
      return exclude.indexOf(layer) == -1;
    },
    toggleLayer(layer, value) {
      this.$emit("change", layer, value);
    }
  }
};
</script>

<style scoped>
.control-panel-label {
  margin-bottom: 0;
  margin-right: 1rem;
  font-weight: bold;
}

.flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .control-panel,
  .toggle-wrapper {
    flex-wrap: wrap;
  }
  .layer-input {
    margin-bottom: 0.5rem;
  }
  .control-panel-label {
    margin-bottom: 0.5rem;
    margin-right: 0rem;
  }
}
</style>


