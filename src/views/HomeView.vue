<template>
  <div>
      <div id="map-wrapper">
        <EsriMap id="map" />
      </div>
    <v-toolbar  dark dense floating class="component-wrapper" id="toolbar">
      <v-file-input
       dark
        accept=".ast"
        label="File Input"
        v-model="chosenFile"
        @change="sendFile"
      ></v-file-input>        
    </v-toolbar>

  </div>
</template>

<script>
import EsriMap from "../components/EsriMap";
import {decode} from "../decoder/decoder.js"

export default {
  components: {
    EsriMap,
  },

  data() {
    return {
      chosenFile: null,
    }
  },
  methods: {
    sendFile(){
      console.log(this.chosenFile)
      if (this.chosenFile) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(this.chosenFile);
        reader.onload = () => {
          try {
            decode(reader.result)
          } catch (e) {
           console.log(e)
          }
        };
      }
    },
  },

};
</script>

<style scoped>
#map-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
}
#map {
  width: 100vw;
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
