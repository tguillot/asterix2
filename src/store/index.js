import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    uploadProgress: 0,
  }
}


export default new Vuex.Store({
  state: getDefaultState(),
  getters: {
    getUploadProgress: (state) => {
      return state.uploadProgress;
    },
  },
  mutations: {
    // SET_DATA(state, newData) {
    //   newData.map(item => {
    //     Object.keys(item).forEach(function (key) { item[key] = JSON.stringify(item[key], null, 2).replace(/[\"{},]/g, "") });
    //     return item;
    //   })
    //   state.data = newData;
    // },
    SET_UPLOAD_PROGRESS(state, uploadProgress) {
      state.uploadProgress = Math.floor(uploadProgress);
      console.log(Math.floor(uploadProgress))
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
    setUploadProgress(context, uploadProgress) {
      context.commit("SET_UPLOAD_PROGRESS", uploadProgress);
    },
    resetSate({ commit }) {
      commit('resetState')
    },
  },
})

