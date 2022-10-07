<template>
  <div>
   <div id="esriMap" class="esriMap"></div>
   <div id="timeSlider" class="timeSlider"></div>

  </div>
</template>

<script>
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { loadLayers } from "../esri/EsriMap.js"
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import { mapGetters } from "vuex";
import store from '../store'


export default {
  name: 'web-map',
  mounted() {
    const map = new ArcGISMap({
      basemap: 'hybrid'
    });
    this.view = new MapView({
      container: "esriMap",
      map: map,
      center: [2.09511400, 41.29561800],
      zoom: 15
    });

    this.timeSlider = new TimeSlider({
      container: "timeSlider",
      mode: "instant",
      timeVisible: true,
      stops: {
        interval: {
          value: 1,
          unit: "seconds"
        }
      },
    });
    loadLayers(map, this.view, this.timeSlider);
  },
  computed: mapGetters({
    speed: "getSpeed"
  }),
  watch: {
    speed (newSpeed, old) {
      this.timeSlider.playRate = 1000/newSpeed;
   }
  },

  beforeDestroy() {
    if (this.view) {
      this.view.destroy();
    }
    if(this.timeSlider){
      this.timeSlider.destroy();
    }
  },
  
};
</script>

<style lang="scss" scoped>
.esriMap {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.timeSlider {
  position: fixed;
  left: 7%;
  right: 5%;
  bottom: 20px;
  max-width: 1360px;
}

</style>