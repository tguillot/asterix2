<template>
  <v-app>

    <v-toolbar id="toolbar" color="primary" >
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
        color="primary"
          to="/">
          <v-icon left dark> mdi-home </v-icon>
          Home
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
        to="/file"
      >
        <v-icon left>
          mdi-cloud-upload
        </v-icon>
        Upload New File
      </v-btn>
      
  
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
        { title: 'Cat 10', path: "/data" },
        { title: 'Cat 21', path: "/data21"},
      ],
    }
  },
  watch:{
    $route(to,from){
      this.$refs.currentView.clearData();
    }
  },


  computed: {
    ...mapGetters({
      uploadProgress: "getUploadProgress",
    }),
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

</style>