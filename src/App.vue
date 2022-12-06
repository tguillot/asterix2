<template>
  <v-app>

    <v-toolbar id="toolbar" color="primary" >
      <v-toolbar-title>
        {{ title }}
        <v-card-subtitle class="pa-0 font-italic font-weight-thin" >Tania Guillot and David Saiz</v-card-subtitle>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
        color="primary"
          to="/">
          <v-icon left dark> mdi-map-marker-multiple </v-icon>
          Map
        </v-btn>
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
        
          v-bind="attrs"
          v-on="on"
        >
        <v-icon left dark> mdi-table </v-icon>
          View Data
        </v-btn>
      </template>

      <v-list color="secondary" >
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.path"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      color="primary"
        to="/mops"
      >
        <v-icon left>
          mdi-chart-box
        </v-icon>
        MOPS
      </v-btn>
      
      <v-btn
      color="primary"
        to="/file"
      >
        <v-icon left>
          mdi-cloud-upload
        </v-icon>
        Upload File
      </v-btn>
      
     
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
      color="primary"
      v-bind="attrs"
            v-on="on"
      >
        <v-icon left>
          mdi-help-circle
        </v-icon>
        Help
      </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card color="secondary">
            <v-card-text>
            <p class="pt-3 mb-0 text-h6 text--primary">
              MAP
            </p>
            <p>Shows the MLAT, SMR, and ADSB airplanes. You can change layer visibility and enable path history. 
              By clicking on a plane, you can see its information and export its path to kml.</p>
              <p class="pt-3 mb-0 text-h6 text--primary">
              VIEW DATA
            </p>
            <p>Tables containing the data from the uploaded file.
               Can search by fields, expand rows, and download the table to csv. The searchable categories are: track number, target address, mode 3A code and target identification.</p>
               <p class="pt-3 mb-0 text-h6 text--primary">
              MOPS
            </p>
            <p>Update rate and probability of identification values computed</p>
            <p class="pt-3 mb-0 text-h6 text--primary">
              UPLOAD FILE
            </p>
            <p>To upload the file containing the data.</p>
          </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
  
      </v-toolbar-items>
    </v-toolbar>

    <v-main>
      <router-view ref="currentView"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'App',


   data(){
    return {
      title: 'ASTERIX',
      items: [
        { title: 'Cat 10', path: "/data10"},
        { title: 'Cat 21', path: "/data21"},
      ],
    }
  },
 
};
</script>

<style>
#toolbar{
  max-height: 64px;
  min-height: 64px;
}
html{
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(230,230,230);
}

::-webkit-scrollbar-corner{
  background: #3e3e3e;
}

@media (-webkit-device-pixel-ratio: 1.25) {
:root {
zoom: 0.95;
}}

</style>