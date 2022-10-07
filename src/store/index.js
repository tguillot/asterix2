import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    speed: 1,
  },
  getters: {
    getSpeed: (state) => {
      return state.speed;
    },
  },
  mutations: {
    SET_SPEED(state, speed) {
      state.speed = speed;
    },
  },
  actions: {
    setSpeed(context, speed) {
      context.commit("SET_SPEED", speed);
    },
  },
})

