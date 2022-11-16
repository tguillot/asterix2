<template>
  <div>
    <v-card-title>
      MOPS of Update Rate
      <v-spacer></v-spacer>
      <v-dialog
      v-model="dialog1"
      persistent
      max-width="400"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        color="secondary"
          v-bind="attrs"
          v-on="on"
        >
        <v-icon >
          mdi-help-circle-outline
        </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Update Rate help
        </v-card-title>
        <v-card-text>{{textUR}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            text
            @click="dialog1 = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card-title>
      <v-data-table
    :headers="headers1"
    :items="getItemsUpdateRate"

    class="elevation-1"
    id="mopsTableUR" 

    fixed-header
    hide-default-footer
  >

  <template v-slot:top>
     

  <v-dialog v-model="dialogView" max-width="500px">
      <v-card>
        <v-card-title class="text-h5" >Area: {{selectedArea}}</v-card-title>
        <v-img
        height="250"
        :src=areaImages[selectedArea]
      ></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeView">Close</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </template>

  <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="viewItem(item)"
      >
        mdi-eye-outline
      </v-icon>
    </template>

</v-data-table>
<v-spacer class="pt-5"></v-spacer>
<v-card-title>
      MOPS of Probability of Identification
      <v-spacer></v-spacer>
      <v-dialog
      v-model="dialog2"
      persistent
      max-width="400"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        color="secondary"
          v-bind="attrs"
          v-on="on"
        >
        <v-icon >
          mdi-help-circle-outline
        </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Probability of identification help
        </v-card-title>
        <v-card-text>{{textPI}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            text
            @click="dialog2 = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card-title>
<v-data-table
    :headers="headers2"
    :items="getItemsProbabilityId"

    class="elevation-1"
    id="mopsTablePI" 

    fixed-header
    hide-default-footer
  >

</v-data-table>
</div>
</template>

<script>

import {getMopsProbabilitId, getMopsUpdateRate} from "../esri/MOPS"

export default {
  computed: {
    getItemsUpdateRate() {
     return getMopsUpdateRate();
    },
    getItemsProbabilityId() {
     return getMopsProbabilitId();
    },
  },
  methods:{
    closeView () {
        this.dialogView = false
      },
    viewItem (item) {
        this.selectedArea = item.area;
        console.log(item.area)
        this.dialogView = true
      },
  },
  data() {
    return {
      areaImages:{ //TODO IMAGES
        Airborne: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        Apron: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        Runways: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        Taxi: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        Stand: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },

      //TODO TEXT
      textPI: "help",
      textUR: "help",

      dialog1: false,
      dialog2: false,
      selectedArea: "",
      dialogView: false,
      headers1: [
        { text: 'Area', align: 'start', value: 'area' },
        { text: 'Updates Obtained',  value: 'updates'},
        { text: 'Updates Expected', value: 'expected'  },
        { text: 'Probability (%)', value: 'percentage'  },
        { text: 'View', value: 'actions', sortable: false },
        // { text: 'View', value: 'SAC'  },
      ],
      headers2: [
        { text: 'Total Correct', align: 'start', value: 'correct' },
        { text: 'Total Incorrrect',  value: 'incorrect'},
        { text: 'Unknowns Incorrrect', value: 'incorrectOnlyUnknowns'  },
        { text: 'Probability (%)', value: 'percentage'  },
        { text: 'Probability of Unknown (%)', value: 'percentageOnlyUnkowns'  },
      ]
    }
  },
   

};
</script>
  
<style scoped>
#mopsTableUR{
  height: 300px;
  min-height:  300px;
}

#mopsTablePI{
  height: 100px;
  min-height:  100px;
}

</style>
  