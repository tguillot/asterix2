<template>
  <div>
    <EsriMap />
    <MenuBar id="menuBar"/>
  </div>
</template>

<script>
import EsriMap from "../components/EsriMap";
import MenuBar from "../components/MenuBar.vue";

export default {
  components: {
    EsriMap,
    MenuBar
},

};
</script>

<style scoped>
#menuBar{
  top: 15px;
  left: 64px;
}
</style>
