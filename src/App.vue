<template>
  <v-app>

    <v-overlay :value="uploadProgress!=0" >
      <v-progress-linear :value="uploadProgress" color="amber"
      height="25" class="loadingBar">
      <strong>{{ Math.ceil(uploadProgress) }}%</strong>

      </v-progress-linear>
  </v-overlay>
    


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
      

    <!-- <div> -->
      <v-btn
      color="primary"
        :loading="isSelecting"
        @click="onButtonClick"
      >
        <v-icon left>
          mdi-cloud-upload
        </v-icon>
        {{ buttonText }}
      </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept=".ast"
        @change="onFileChanged"
      >
    <!-- </div>     -->
   
      </v-toolbar-items>
    </v-toolbar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { decode } from './decoder/decoder';
import store from './store'


export default {
  name: 'App',

   data(){
    return {
      defaultButtonText: 'Upload Data',
      chosenFile: null,
      chosenFileName:"",
      isSelecting: false, 
      title: 'ASTERIX',
      items: [
        { title: 'Cat 10', path: "/data" },
        { title: 'Cat 21', path: "/data21"},
      ],
    }
  },
  computed: {
    buttonText() {
      return this.chosenFileName ? this.chosenFileName : this.defaultButtonText
    },
    ...mapGetters({
      uploadProgress: "getUploadProgress",
    }),
  },
  methods:{
    
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.chosenFile = e.target.files[0]
      if (this.chosenFile) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(this.chosenFile);
        this.chosenFileName=this.chosenFile.name;
        reader.onload = () => {
          try {
            store.dispatch("setUploadProgress", 1);
            decode(reader.result)
          } catch (e) {
           console.log(e)
          }
        };
        this.chosenFile=null;
      }
      // do something
    }
  }
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
.loadingBar{
  width: 300px;
  background-color: rgb(40,40,40);
}
</style>