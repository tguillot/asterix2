<template>
  <div v-if="data">
    <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="elevation-1"
    no-data-text="-"


  >
  <template v-slot:item="{ item }" >
    <tr >
          <td v-for="header in headers" v-bind:key="header.text" class="truncate">
            {{ item[header.value]}}
          </td>
        </tr>
            </template>

  <!-- <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about {{ item["message_type"] }}
      </td>
    </template> -->

</v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// show-expand
//     :single-expand="true"

export default {

  data() {
    return {
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

};
</script>
  
<style scoped>
.truncate {
        max-width: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
</style>
  