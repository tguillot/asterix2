<template>
    <div v-if="data">
    <v-data-table
    :headers="headers"
    :items="data"
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
        {{ item[header.value] ? item[header.value]: "-"}}
      </td>
    </tr>
   </template>

   <template v-slot:footer class="footerClass">
   </template>
</v-data-table>
</div>

</template>

<script>
import { mapGetters } from "vuex";

export default {

  data() {
    return {
      selectedRow: null,
      headers: [
      { text: 'Category', align: 'start', value: 'category' },
      { text: 'Length',  value: 'length' },
        { text: 'Data Source Identifier', value: 'data_source_identifier' },
        { text: 'Message Type', value: 'message_type' },
        { text: 'Target Report Descriptor', value: 'target_report_descriptor' },
        { text: 'Time of Day', value: 'time_of_day' },
        { text: 'Position in WGS-84 Co-ordinates', value: 'position_in_WGS-84_co-ordinates' },
        { text: 'Measured Position in Polar Co-ordinates', value: 'measured_position_in_polar_co-ordinates' },
        { text: 'Position in Cartesian Co-ordinates', value: 'position_in_cartesian_co-ordinates' },
        { text: 'Calculated Track Velocity in Polar Co-ordinates', value: 'calculated_track_velocity_in_polar_co-ordinates' },
        { text: 'Calculated Track Velocity in Cartesian Co-ordinates', value: 'calculated_track_velocity_in_cartesian_co-ordinates' },
        { text: 'Track Number', value: 'track_number' },
        { text: 'Track Status', value: 'track_status' },
        { text: 'Mode-3/A Code in Octal Representation', value: 'mode-3A_code_in_octal_representation' },
        { text: 'Target Address', value: 'target_address' },
        { text: 'Target Identification', value: 'target_identification' },
        { text: 'Mode S MB Data', value: 'mode_S_MB_data' },
        { text: 'Vehicle Fleet Identification', value: 'vehicle_fleet_identification' },
        { text: 'Flight Level in Binary Representation', value: 'flight_level_in_binary_representation' },
        { text: 'Measured Height', value: 'measured_height' },
        { text: 'Target Size & Orientation', value: 'target_size_&_orientation' },
        { text: 'System Status', value: 'system_status' },
        { text: 'Pre-programmed Message', value: 'pre-programmed_message' },
        { text: 'Standard Deviation of Position', value: 'standard_deviation_of_position' },
        { text: 'Presence', value: 'pressence' },
        { text: 'Amplitude of Primary Plot', value: 'amplitude_of_primary_plot' },
        { text: 'Calculated Acceleration', value: 'calculated_acceleration' },

      ],
    }
  },
  computed: {
    ...mapGetters({
      data: "getData",
    }),
  },
  methods:{
    rowClick(value) {
      console.log("click", value)
      if(this.selectedRow){
        this.selectedRow.target.classList.add('truncate')
      }
      const tr = value.target;
      tr.classList.remove('truncate');
      this.selectedRow=value;
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
  overflow-x: auto;
  overflow-y :auto;
  height: auto;
  overflow-wrap: break-word;
  text-align: center;
}
#table{
  height: 100vh;
  min-height: 100vh;
}
#footerClass{
  min-height: 70px;
}


</style>
  