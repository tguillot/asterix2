<template>
  <div class="container">
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import { initializeMap } from "../esri/EsriMap";
export default {
  name: "web-map",

  mounted() {
    initializeMap();
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
};
</script>

<style scoped>
#viewDiv {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
