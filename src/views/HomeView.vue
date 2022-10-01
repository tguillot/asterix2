<template>
  <div>
      <div id="map-wrapper">
        <EsriMap id="map" />
      </div>
  
  </div>
</template>

<script>
import EsriMap from "../components/EsriMap";

export default {
  components: {
    EsriMap,
  },

  data() {
    return {
    }
  },

  methods:
  {
    clearData(){
      console.log("home cleared");
    }
  }

};
</script>

<style scoped>
#map-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
}
#map {
  width: 00vw;
  height: 100vh;
}
.component-wrapper {
  position: absolute;
}

.esri-search {
  width: 100%;
}
#searchDiv {
  max-width: 200px;
}
#toolbar {
  top: 5px;
  left: 64px;
  width:200px
}

</style>
