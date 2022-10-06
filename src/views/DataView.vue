<template>
    <div v-if="true">
    <v-data-table
    :headers="getHeaders"
    :items="getRecords"
    class="elevation-1"
    id="table"   
    fixed-header
    fixed-footer
    :search="search"

    height="80vh"
    :footer-props="{
      itemsPerPageOptions: [25,50,100],
      showFirstLastPage: true,
      height: '60px'
    }"
  >
  <template v-slot:top>
        <v-text-field
          :value="search"
          @keydown.enter="event => search = event.target.value"

          append-icon="mdi-magnify"
          label="Search"
          single-line
        ></v-text-field>
      </template>


  <template v-slot:item="{ item }" >
    <tr @click="rowClick" >
      <td v-for="header in getHeaders" v-bind:key="header.text" class="truncate">
        {{ getValue(item, header)}}
      </td>
    </tr>
   </template>

   <template v-slot:no-data>
    <div class="alertDiv">
    <v-alert 
      dense
      prominent
      type="warning"
    >
     <h3>No file imported, please upload data!</h3> 
    </v-alert>
  </div>
</template>

   <template v-slot:footer class="footerClass">
   </template>
</v-data-table>
  </div>

  
</template>

<script>
import  { getRecords10, getRecords21}  from "../decoder/decoder.js"

export default {
  computed: {
    getRecords() {
      if(this.dataCategory=="data10"){
        return getRecords10();
      }else{
        return getRecords21();
      }
    },
    getHeaders() {
      if(this.dataCategory=="data10"){
        return this.headers10;
      }else{
        return this.headers21;
      }
    },
    dataCategory(){
      return this._routerRoot._route.name;
    }
  },
  data() {
    return {
      search: '',
      headers21: [
      { text: 'Category', align: 'start', value: 'category', filterable: false},
      { text: 'Length',  value: 'length', filterable: false },
      { text: 'SAC', value: 'SAC',filterable: false  },
        { text: 'SIC', value: 'SIC' , filterable: false },
        { text: 'Target Report Descriptor', value: 'b040', parse: this.makePretty, filterable: false },
        { text: 'Track Number', value: 'b161' },
        { text: 'Service Identification', value: 'b015' , filterable: false },
        { text: 'Time of Applicability for Position', value: 'b071p' , filterable: false},
        { text: 'Position in WGS-84 co-ordinates (°)', value: 'b130' , parse: this.makePretty,filterable: false},
        { text: 'Position in WGS-84 co-ordinates, high res. (°)', value: 'b131',parse: this.makePretty ,filterable: false},
        { text: 'Time of Applicability for Velocity', value: 'b072p',filterable: false },
        { text: 'Air Speed (NM/s)', value: 'b150',filterable: false  },
        { text: 'True Air Speed (kt)', value: 'b151',filterable: false  },
        { text: 'Target Address', value: 'b080'  },
        { text: 'Time of Message Reception of Position', value: 'b073p',filterable: false },
        { text: 'Time of Message Reception of Position-High Precision', value: 'b074p',filterable: false },
        { text: 'Time of Message Reception of Velocity', value: 'b075p',filterable: false },
        { text: 'Time of Message Reception of Velocity-High Precision', value: 'b076p',filterable: false },
        { text: 'Geometric Height (ft)', value: 'b140',filterable: false  },
        { text: 'Quality Indicators', value: 'b090',filterable: false  },
        { text: 'MOPS Version', value: 'b210',parse: this.makePretty,filterable: false  },
        { text: 'Mode 3/A Code', value: 'b070' },
        { text: 'Roll Angle (°)', value: 'b230' ,filterable: false },
        { text: 'Flight Level', value: 'b145' ,filterable: false },
        { text: 'Magnetic Heading (°)', value: 'b152',filterable: false  },
        { text: 'Target Status', value: 'b200' , parse: this.makePretty},
        { text: 'Barometric Vertical Rate (ft/min)', value: 'b155' ,filterable: false },
        { text: 'Geometric Vertical Rate (ft/min)', value: 'b157',filterable: false  },
        { text: 'Airborne Ground Vector (speed:NM/s, angle:°)', value: 'b160', parse: this.makePretty ,filterable: false },
        { text: 'Track Angle Rate (°/s)', value: 'b165' },
        { text: 'Time of Report Transmission', value: 'b077p',filterable: false },
        { text: 'Target Identification', value: 'b170' },
        { text: 'Emitter Category', value: 'b020',filterable: false  },
        { text: 'Met Information (speed: kt, direction:°, temp:°C)', value: 'b220',filterable: false  },
        { text: 'Selected Altitude (ft)', value: 'b146' , parse: this.makePretty,filterable: false },
        { text: 'Final State Selected Altitude (ft)', value: 'b148',filterable: false  },
        { text: 'Trajectory Intent (altitude:ft, lat&lon:°, turn radius:NM)', value: 'b110' ,filterable: false },
        { text: 'Service Management', value: 'b016' ,filterable: false },
        { text: 'Aircraft Operational Status', value: 'b008',parse: this.makePretty },
        { text: 'Surface Capabilities and Characteristics', value: 'b271',parse: this.makePretty },
        { text: 'Message Amplitude (dBm)', value: 'b132',filterable: false },
        { text: 'Mode S MB Data', value: 'b250' ,filterable: false },
        { text: 'ACAS Resolution Advisory Report', value: 'b260' },
        { text: 'Receiver ID', value: 'b400' ,filterable: false },
        { text: 'Data Ages (s)', value: 'b295',parse: this.makePretty ,filterable: false },
    ],

     headers10: [
        { text: 'Category', align: 'start', value: 'category', filterable: false},
        { text: 'Length',  value: 'length', filterable: false },
        { text: 'SAC', value: 'SAC',filterable: false  },
        { text: 'SIC', value: 'SIC' , filterable: false },
        { text: 'Message Type', value: 'a000',filterable: false },
        { text: 'Target Report Descriptor', value: 'a020', parse: this.makePretty},
        { text: 'Time of Day', value: 'a140p', filterable: false },
        { text: 'Position in WGS-84 Co-ordinates (°)', value: 'a041' , filterable: false},
        { text: 'Measured Position in Polar Co-ordinates (rho:m, theta:°)', value: 'a040' , parse: this.makePretty, filterable: false},
        { text: 'Position in Cartesian Co-ordinates (m)', value: 'a042' , parse: this.makePretty, filterable: false},
        { text: 'Calculated Track Velocity in Polar Co-ordinates (speed:NM/s, angle:°)', value: 'a200' , parse: this.makePretty, filterable: false},
        { text: 'Calculated Track Velocity in Cartesian Co-ordinates m/s', value: 'a202' , parse: this.makePretty, filterable: false},
        { text: 'Track Number', value: 'a161' },
        { text: 'Track Status', value: 'a170' , parse: this.makePretty},
        { text: 'Mode-3/A Code in Octal Representation', value: 'a060', parse: this.makePretty ,filterable: false},
        { text: 'Target Address', value: 'a220' },
        { text: 'Target Identification', value: 'a245',parse: this.makePretty },
        { text: 'Mode S MB Data', value: 'a250' ,filterable: false},
        { text: 'Vehicle Fleet Identification', value: 'a300' },
        { text: 'Flight Level in Binary Representation', value: 'a090' ,parse: this.makePretty,filterable: false},
        { text: 'Measured Height (ft)', value: 'a091' ,filterable: false},
        { text: 'Target Size & Orientation (size:m, orient:° )', value: 'a270',parse: this.makePretty ,filterable: false},
        { text: 'System Status', value: 'a550' ,parse: this.makePretty,filterable: false},
        { text: 'Pre-programmed Message', value: 'a310',filterable: false },
        { text: 'Standard Deviation of Position (m^2)', value: 'a500' ,filterable: false},
        { text: 'Presence', value: 'a280' ,filterable: false},
        { text: 'Amplitude of Primary Plot', value: 'a131' ,filterable: false},
        { text: 'Calculated Acceleration (m/s^2)', value: 'a210' , parse: this.makePretty, filterable: false},

      ],
    }
  },

  methods:{
    getValue(item, header){
      return (item[header.value]!=null) ? 
        (header.parse ? header["parse"](item[header.value]):
         item[header.value])
        : "-";
    },
    makePretty(value){
      return JSON.stringify(value, null, 2).replace(/[\"{},]/g, "") 
    },
    rowClick(value) {
      if(value.target.classList.length!=0){
        value.target.classList.remove('truncate');
      }else if(value.target.classList.length==0){
        value.target.classList.add('truncate');
      }
      
    },
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
  position: absolute;
  left: 40vw;
}


</style>
  