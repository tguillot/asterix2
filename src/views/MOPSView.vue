<template>
  
</template>

<script>

import {calculateMOPS} from "../esri/MOPS"

export default {
  compute: {
   
  },
  data() {
    return {
      search: '',
    
    }
  },

  mounted() {
    calculateMOPS()
  },

  methods:{
  
  }
    

};
</script>
  
<style scoped>


</style>
  