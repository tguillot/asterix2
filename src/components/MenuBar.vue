<template>
  <v-toolbar dense floating max-width="80vw" >
    <v-menu
    offset-y
    open-on-hover
    transition="slide-y-transition"
    close-delay="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon v-if="!selectedSpeed"> mdi-play-speed </v-icon>
        <div v-else>x{{selectedSpeed}}</div>
      </v-btn>
    </template>
    <div v-for="(item, index) in itemsPlaySpeed" v-bind:key="index" class="my-1">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click.stop="selectSpeed(item.value)"
            color="default"
            fab
            small
            class="ml-1"
            v-bind="attrs"
            v-on="on"
          >
              {{ item.text }}
          </v-btn>
        </template>
        <span>{{ item.name }}</span>
      </v-tooltip>
    </div>
  </v-menu>
  <v-btn icon @click.stop="layerHandler">
    <v-icon> mdi-layers-outline </v-icon>
  </v-btn>
   
  </v-toolbar>
</template>

<script>
            // :disabled="appState == 'FLIGHT_PLAN_CREATION'"

import { mapActions } from "vuex";

export default {
  data() {
    return {
      selectedSpeed: null,
      itemsPlaySpeed: [
             {
              name: "Playback Speed x0.5",
              text: "x0.5",
              value:0.5,
            },
            {
              name: "Playback Speed x1",
              text: "x1",
              value:1,
            },
            {
              name: "Playback Speed x5",
              text: "x5",
              value:5,
            },
            {
              name: "Playback Speed x10",
              text: "x10",
              value: 10,
            },
            {
              name: "Playback Speed x50",
              text: "x50",
              value: 50,
            },
        ]
    };
  },
 
  methods: {
    selectSpeed(x) {
      this.selectedSpeed=x;
      this.setSpeed(x);

    },
    ...mapActions({
        setSpeed: "setSpeed",
        toggleLayerMenu: "toggleLayerMenu",

    }),
    layerHandler(){
      this.toggleLayerMenu();
    }
  },
};
</script>
<style scoped>

</style>
