<template>

<div id="imageBackground">
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




export default {

  data() {
    return {
      chosenFile: null,
      chosenFileName:"",
      imageUrl: null,
    }
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
            this.offset=1;
            this.$forceUpdate();
            decode(reader.result)
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
  background: url("/static/img/airportBackground.jpg");
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
  