import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null,
  },
  getters: {
    getData: (state) => {
      return state.data;
    },
  },
  mutations: {
    SET_DATA(state, data) {
      data.map(item => {
        Object.keys(item).forEach(function (key) { item[key] = JSON.stringify(item[key]); });
        return item;
      })
      state.data = data;
    },
  },
  actions: {
    setData(context, data) {
      console.log("SAVED DATA IN STORE")
      context.commit("SET_DATA", data);
    },
  },
})

