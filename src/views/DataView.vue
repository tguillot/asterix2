<template>
    <div v-if="dataFile">
    <v-data-table
    :headers="headers"
    :items="dataFile"
    class="elevation-1"
    no-data-text="-"
    id="table"   
    fixed-header
    fixed-footer

    height="85vh"
    :footer-props="{
      itemsPerPageOptions: [25,50,100],
      showFirstLastPage: true,
      height: '60px'
    }"
    
  >
  <template v-slot:item="{ item }" >
    <tr @click="rowClick" >
      <td v-for="header in headers" v-bind:key="header.text" class="truncate">
        {{ item[header.value] ? 
        (header.parse ? header["parse"](item[header.value]):
         item[header.value])
        : "-"}}
      </td>
    </tr>
   </template>

   <template v-slot:footer class="footerClass">
   </template>
</v-data-table>
  </div>
  <div v-else class="alertDiv">
    <v-alert 
      dense
      prominent
      type="warning"
    >
     <h3>No file imported, please upload data!</h3> 
    </v-alert>
  </div>
  
</template>

<script>
import  { getRecords10, makeRecordsPretty}  from "../decoder/decoder.js"

export default {

  data() {
    return {
    dataFile: null,
     headers: [
      { text: 'Category', align: 'start', value: 'category'},
      { text: 'Length',  value: 'length' },
        { text: 'SAC', value: 'SAC' },
        { text: 'SIC', value: 'SIC' },
        { text: 'Message Type', value: 'a000' },
        { text: 'Target Report Descriptor', value: 'a020', parse: this.makePretty},
        { text: 'Time of Day', value: 'a020p' },
        { text: 'Position in WGS-84 Co-ordinates', value: 'a041' },
        { text: 'Measured Position in Polar Co-ordinates', value: 'a040' },
        { text: 'Position in Cartesian Co-ordinates', value: 'a042' , parse: this.makePretty},
        { text: 'Calculated Track Velocity in Polar Co-ordinates', value: 'a200' , parse: this.makePretty},
        { text: 'Calculated Track Velocity in Cartesian Co-ordinates', value: 'a202' , parse: this.makePretty},
        { text: 'Track Number', value: 'a161' },
        { text: 'Track Status', value: 'a170' , parse: this.makePretty},
        { text: 'Mode-3/A Code in Octal Representation', value: 'a060', parse: this.makePretty },
        { text: 'Target Address', value: 'a220' },
        { text: 'Target Identification', value: 'a245',parse: this.makePretty },
        { text: 'Mode S MB Data', value: 'a250' },
        { text: 'Vehicle Fleet Identification', value: 'a300' },
        { text: 'Flight Level in Binary Representation', value: 'a090' ,parse: this.makePretty},
        { text: 'Measured Height', value: 'a091' },
        { text: 'Target Size & Orientation', value: 'a270' },
        { text: 'System Status', value: 'a550' ,parse: this.makePretty},
        { text: 'Pre-programmed Message', value: 'a310' },
        { text: 'Standard Deviation of Position', value: 'a500' },
        { text: 'Presence', value: 'a280' },
        { text: 'Amplitude of Primary Plot', value: 'a131' },
        { text: 'Calculated Acceleration', value: 'a210' , parse: this.makePretty},

      ],
    }
  },

  mounted(){
    console.log("table filled");
    this.dataFile=getRecords10()
    // this.dataFile=null;

  },
  methods:{
    makePretty(value){
      // return value
      return JSON.stringify(value, null, 2).replace(/[\"{},]/g, "") 
    },
    rowClick(value) {
    
      if(value.target.classList.length!=0){
        value.target.classList.remove('truncate');
      }else if(value.target.classList.length==0){
        value.target.classList.add('truncate');
      }
      
    },
    clearData(){
      this.dataFile=null;
      console.log("table cleared");
    }
  }

};
</script>
  
<style scoped>
.truncate {
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .row{
        display: table-row;
}

td:hover{
  background-color: #013c58;  
}
td{
  max-width: 200px;
  overflow-x :hidden;
  overflow-y :auto;
  height: auto;
  overflow-wrap: break-word;
  text-align: center;
  white-space: pre-wrap;
}
#table{
  height: 100vh;
  min-height: 100vh;
}
#footerClass{
  min-height: 70px;
}
.alertDiv{
  margin: auto;
  width: 450px;
  padding: 10px;
  margin-top: 5vh;
}

</style>
  