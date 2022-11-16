<template>

<div id="imageBackground" v-bind:style="{ 'background-image': 'url(' + imageUrl + ')' }">
  <v-progress-circular 
      indeterminate
      color="amber"
      class="loadingCircle"
      id="loader"
      :size="70"
      :width="7"
></v-progress-circular>


<v-container id="container" rounded>
  <v-file-input
  
  color="primary"
    accept=".ast"
    label="File input"
    v-model="chosenFile"
    @change="onFileChanged"
  ></v-file-input>

</v-container>


</div>
</template>

<script>
import { decode } from '../decoder/decoder';
import { isProductionelectron } from '../utils/electron';
import {  mapActions } from "vuex";
import { clearLayers } from '../esri/EsriMap';
import { calculateMOPS } from '../esri/MOPS';




export default {

  data() {
    return {
      chosenFile: null,
      chosenFileName:"",
      imageUrl: "",
    }
  },
  mounted() {
    //this.imageUrl=(isProductionelectron() ? "app://img/" : "../../public/") +"airportBackground.jpg";
    this.imageUrl="airportBackground.jpg"
  },


  methods:{
    changeLoader(){
      const loader = document.getElementById('loader');
      loader.style.visibility = 'visible';
    },
    decodeFile(){
      if (this.chosenFile) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(this.chosenFile);
        this.chosenFileName=this.chosenFile.name;
        reader.onload = () => {
          try {
            clearLayers();

            this.offset=1;
            this.$forceUpdate();

            decode(reader.result); //decode data
            calculateMOPS(); //calculate mops of data
            
            this.setMapCompute(true); //register new file upload

            this.overlayOn=false;
          } catch (e) {
           console.log(e)
          }
        };
      }
      loader.style.visibility = 'hidden';
    },
    onFileChanged(e) {
      this.changeLoader();

      setTimeout(() => {  this.decodeFile(); }, 200);
    },
    ...mapActions({
      setMapCompute: "setMapCompute",
    }),
  }
};
</script>
  
<style scoped>
#container{
  background-color: #005b96;
  position: relative;
  top: 30vh;
}
#imageBackground{
  min-width: 100vw;
  min-height: 100vh;


  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;  

}
.loadingCircle{
  position: absolute;
  top: 20vh;
  left: 50vw;
  visibility: hidden;
}
</style>
