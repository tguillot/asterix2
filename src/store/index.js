import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    speed: 1,
    layerMenu: false,
    showPathsMap: {},
  },
  getters: {
    getSpeed: (state) => {
      return state.speed;
    },
    getLayerMenu: (state) => {
      return state.layerMenu;
    },
    getShowPathsMap: (state) => {
      return state.showPathsMap;
    },
  },
  mutations: {
    SET_SPEED(state, speed) {
      state.speed = speed;
    },
    TOGGLE_LAYER_MENU(state) {
      state.layerMenu = !state.layerMenu;
    },
    OFF_LAYER_MENU(state) {
      state.layerMenu = false;
    },
    SET_SHOW_PATHS_MAP(state, payload) {
      state.showPathsMap[payload.key] = payload.value;
    },
    TOGGLE_SHOW_PATHS_MAP(state, key) {
      state.showPathsMap[key] = !state.showPathsMap[key];
    }
  },
  actions: {
    setSpeed(context, speed) {
      context.commit("SET_SPEED", speed);
    },
    toggleLayerMenu(context) {
      context.commit("TOGGLE_LAYER_MENU");
    },
    offLayerMenu(context) {
      context.commit("OFF_LAYER_MENU");
    },
    setShowPathsMap(context, payload) {
      context.commit("SET_SHOW_PATHS_MAP", payload);
    },
    toggleShowPathMaps(context, key) {
      context.commit("TOGGLE_SHOW_PATHS_MAP", key);
    }

  },
})

