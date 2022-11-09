<template>
  
</template>

<script>

import {calculateMOPSUpdateRate} from "../esri/MOPS"

export default {
  compute: {
   
  },
  data() {
    return {
      search: '',
    
    }
  },

  mounted() {
    calculateMOPSUpdateRate()
  },

  methods:{
  
  }
    

};
</script>
  
<style scoped>


</style>
  