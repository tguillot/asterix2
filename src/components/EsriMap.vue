<template>
  <div></div>
</template>

<script>
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { loadLayers } from "../esri/EsriMap.js"
export default {
  name: 'web-map',
  mounted() {
    console.log("mounted")
    const map = new ArcGISMap({
      basemap: 'hybrid'
    });
    this.view = new MapView({
      container: this.$el,
      map: map,
      center: [2.09511400, 41.29561800],
      zoom: 15
    });

    loadLayers(map, this.view);
  },
  beforeDestroy() {
    console.log("destroyed")
    if (this.view) {
      this.view.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>