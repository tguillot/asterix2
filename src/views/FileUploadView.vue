<template>

<div id="imageBackground">
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
    }
  },

  methods:{
    onFileChanged(e) {
      if (this.chosenFile) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(this.chosenFile);
        this.chosenFileName=this.chosenFile.name;
        reader.onload = () => {
          try {
            decode(reader.result)
          } catch (e) {
           console.log(e)
          }
        };
        this.chosenFile=null;
      }
    }
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
  background: url("../assets/airportBackground.jpg") ;
  min-width: 100vw;
  min-height: 100vh;


  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;  

}

</style>
  