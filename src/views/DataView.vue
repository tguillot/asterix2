<template>
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
      { label: 'Category' ,text: 'Category', align: 'start', value: 'category', filterable: false},
      { label: 'Length' ,text: 'Length',  value: 'length', filterable: false },
      { label: 'SAC' ,text: 'SAC', value: 'SAC',filterable: false  },
      { label: 'SIC' ,text: 'SIC', value: 'SIC' , filterable: false },
      { label: 'Target Report Descriptor' ,text: 'Target Report Descriptor', value: 'b040', parse: this.makePretty, filterable: false },
      { label: 'Track Number' ,text: 'Track Number', value: 'b161' },
      { label: 'Service Identification' ,text: 'Service Identification', value: 'b015' , filterable: false },
      { label: 'Time of Applicability for Position' ,text: 'Time of Applicability for Position', value: 'b071p' , filterable: false},
      { label: 'Position in WGS-84 co-ordinates (°)' ,text: 'Position in WGS-84 co-ordinates (°)', value: 'b130' , parse: this.makePretty,filterable: false},
      { label: 'Position in WGS-84 co-ordinates, high res. (°)' ,text: 'Position in WGS-84 co-ordinates, high res. (°)', value: 'b131',parse: this.makePretty ,filterable: false},
      { label: 'Time of Applicability for Velocity' ,text: 'Time of Applicability for Velocity', value: 'b072p',filterable: false },
      { label: 'Air Speed (NM/s)' ,text: 'Air Speed (NM/s)', value: 'b150',filterable: false  },
      { label: 'True Air Speed (kt)' ,text: 'True Air Speed (kt)', value: 'b151',filterable: false  },
      { label: 'Target Address' ,text: 'Target Address', value: 'b080'  },
      { label: 'Time of Message Reception of Position' ,text: 'Time of Message Reception of Position', value: 'b073p',filterable: false },
      { label: 'Time of Message Reception of Position-High Precision' ,text: 'Time of Message Reception of Position-High Precision', value: 'b074p',filterable: false },
      { label: 'Time of Message Reception of Velocity' ,text: 'Time of Message Reception of Velocity', value: 'b075p',filterable: false },
      { label: 'Time of Message Reception of Velocity-High Precision' ,text: 'Time of Message Reception of Velocity-High Precision', value: 'b076p',filterable: false },
      { label: 'Geometric Height (ft)' ,text: 'Geometric Height (ft)', value: 'b140',filterable: false  },
      { label: 'Quality Indicators' ,text: 'Quality Indicators', value: 'b090',parse: this.makePretty,filterable: false  },
      { label: 'MOPS Version' ,text: 'MOPS Version', value: 'b210',parse: this.makePretty,filterable: false  },
      { label: 'Mode 3/A Code' ,text: 'Mode 3/A Code', value: 'b070' },
      { label: 'Roll Angle (°)' ,text: 'Roll Angle (°)', value: 'b230' ,filterable: false },
      { label: 'Flight Level' ,text: 'Flight Level', value: 'b145' ,filterable: false },
      { label: 'Magnetic Heading (°)' ,text: 'Magnetic Heading (°)', value: 'b152',filterable: false  },
      { label: 'Target Status' ,text: 'Target Status', value: 'b200' , parse: this.makePretty},
      { label: 'Barometric Vertical Rate (ft/min)' ,text: 'Barometric Vertical Rate (ft/min)', value: 'b155' ,filterable: false },
      { label: 'Geometric Vertical Rate (ft/min)' ,text: 'Geometric Vertical Rate (ft/min)', value: 'b157',filterable: false  },
      { label: 'Airborne Ground Vector (speed:NM/s, angle:°)' ,text: 'Airborne Ground Vector (speed:NM/s, angle:°)', value: 'b160', parse: this.makePretty ,filterable: false },
      { label: 'Track Angle Rate (°/s)' ,text: 'Track Angle Rate (°/s)', value: 'b165' },
      { label: 'Time of Report Transmission' ,text: 'Time of Report Transmission', value: 'b077p',filterable: false },
      { label: 'Target Identification' ,text: 'Target Identification', value: 'b170' },
      { label: 'Emitter Category' ,text: 'Emitter Category', value: 'b020',filterable: false  },
      { label: 'Met Information (speed: kt, direction:°, temp:°C)' ,text: 'Met Information (speed: kt, direction:°, temp:°C)', value: 'b220',filterable: false  },
      { label: 'Selected Altitude (ft)' ,text: 'Selected Altitude (ft)', value: 'b146' , parse: this.makePretty,filterable: false },
      { label: 'Final State Selected Altitude (ft)' ,text: 'Final State Selected Altitude (ft)', value: 'b148',filterable: false  },
      { label: 'Trajectory Intent (altitude:ft, lat&lon:°, turn radius:NM)' ,text: 'Trajectory Intent (altitude:ft, lat&lon:°, turn radius:NM)', value: 'b110' ,filterable: false },
      { label: 'Service Management' ,text: 'Service Management', value: 'b016' ,filterable: false },
      { label: 'Aircraft Operational Status' ,text: 'Aircraft Operational Status', value: 'b008',parse: this.makePretty },
      { label: 'Surface Capabilities and Characteristics' ,text: 'Surface Capabilities and Characteristics', value: 'b271',parse: this.makePretty },
      { label: 'Message Amplitude (dBm)' ,text: 'Message Amplitude (dBm)', value: 'b132',filterable: false },
      { label: 'Mode S MB Data' ,text: 'Mode S MB Data', value: 'b250' ,filterable: false },
      { label: 'ACAS Resolution Advisory Report' ,text: 'ACAS Resolution Advisory Report', value: 'b260' },
      { label: 'Receiver ID' ,text: 'Receiver ID', value: 'b400' ,filterable: false },
      { label: 'Data Ages (s)' ,text: 'Data Ages (s)', value: 'b295',parse: this.makePretty ,filterable: false },
    ],


   headers10: [
      { label:'Category', text: 'Category', align: 'start', value: 'category', filterable: false},
      { label:'Length', text: 'Length',  value: 'length', filterable: false },
      { label:'SAC', text: 'SAC', value: 'SAC',filterable: false  },
      { label:'SIC', text: 'SIC', value: 'SIC' , filterable: false },
      { label:'Message Type', text: 'Message Type', value: 'a000',filterable: false },
      { label:'Target Report Descriptor', text: 'Target Report Descriptor', value: 'a020', parse: this.makePretty},
      { label:'Time of Day', text: 'Time of Day', value: 'a140p', filterable: false },
      { label:'Position in WGS-84 Co-ordinates (°)', text: 'Position in WGS-84 Co-ordinates (°)', value: 'a041' ,parse: this.makePretty, filterable: false},
      { label:'Measured Position in Polar Co-ordinates (rho:m, theta:°)', text: 'Measured Position in Polar Co-ordinates (rho:m, theta:°)', value: 'a040' , parse: this.makePretty, filterable: false},
      { label:'Position in Cartesian Co-ordinates (m)', text: 'Position in Cartesian Co-ordinates (m)', value: 'a042' , parse: this.makePretty, filterable: false},
      { label:'Calculated Track Velocity in Polar Co-ordinates (speed:NM/s, angle:°)', text: 'Calculated Track Velocity in Polar Co-ordinates (speed:NM/s, angle:°)', value: 'a200' , parse: this.makePretty, filterable: false},
      { label:'Calculated Track Velocity in Cartesian Co-ordinates m/s', text: 'Calculated Track Velocity in Cartesian Co-ordinates m/s', value: 'a202' , parse: this.makePretty, filterable: false},
      { label:'Track Number', text: 'Track Number', value: 'a161' },
      { label:'Track Status', text: 'Track Status', value: 'a170' , parse: this.makePretty},
      { label:'Mode-3/A Code in Octal Representation', text: 'Mode-3/A Code in Octal Representation', value: 'a060', parse: this.makePretty ,filterable: false},
      { label:'Target Address', text: 'Target Address', value: 'a220' },
      { label:'Target Identification', text: 'Target Identification', value: 'a245',parse: this.makePretty },
      { label:'Mode S MB Data', text: 'Mode S MB Data', value: 'a250' ,parse: this.makePretty,filterable: false},
      { label:'Vehicle Fleet Identification', text: 'Vehicle Fleet Identification', value: 'a300' },
      { label:'Flight Level in Binary Representation', text: 'Flight Level in Binary Representation', value: 'a090' ,parse: this.makePretty,filterable: false},
      { label:'Measured Height (ft)', text: 'Measured Height (ft)', value: 'a091' ,filterable: false},
      { label:'Target Size & Orientation (size:m, orient:° )', text: 'Target Size & Orientation (size:m, orient:° )', value: 'a270',parse: this.makePretty ,filterable: false},
      { label:'System Status', text: 'System Status', value: 'a550' ,parse: this.makePretty,filterable: false},
      { label:'Pre-programmed Message', text: 'Pre-programmed Message', value: 'a310',filterable: false },
      { label:'Standard Deviation of Position (m^2)', text: 'Standard Deviation of Position (m^2)', value: 'a500' ,filterable: false},
      { label:'Presence', text: 'Presence', value: 'a280' ,filterable: false},
      { label:'Amplitude of Primary Plot', text: 'Amplitude of Primary Plot', value: 'a131' ,filterable: false},
      { label:'Calculated Acceleration (m/s^2)', text: 'Calculated Acceleration (m/s^2)', value: 'a210' , parse: this.makePretty, filterable: false},
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
    return JSON.stringify(value, null, 2).replace(/[ \"{},\[ \] ]/g, "") 
  },
  rowClick(value) {
    if(value.target.classList.length!=0){
      value.target.classList.remove('truncate');
    }else if(value.target.classList.length==0){
      value.target.classList.add('truncate');
    }
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
position: absolute;
left: 40vw;
}


</style>
