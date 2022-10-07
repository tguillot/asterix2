import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    speed: 1,
    layerMenu: false,
  },
  getters: {
    getSpeed: (state) => {
      return state.speed;
    },
    getLayerMenu: (state) => {
      return state.layerMenu;
    },
  },
  mutations: {
    SET_SPEED(state, speed) {
      state.speed = speed;
    },
    TOGGLE_LAYER_MENU(state) {
      state.layerMenu = !state.layerMenu;
    },
  },
  actions: {
    setSpeed(context, speed) {
      context.commit("SET_SPEED", speed);
    },
    toggleLayerMenu(context) {
      context.commit("TOGGLE_LAYER_MENU");
    },
  },
})

