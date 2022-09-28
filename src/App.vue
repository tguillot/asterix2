<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

   data(){
    return {
      title: 'ASTERIX',
      menuItems: [
          { title: 'Home', path: '/', icon: 'mdi-home' },
          { title: 'View Data', path: '/data', icon: 'mdi-table-eye' },
     ]
    }
  },
};
</script>
