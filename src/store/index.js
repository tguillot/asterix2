import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null,
    dataPrettified: null,
    uploadProgress: 0,
  },
  getters: {
    getData: (state) => {
      return state.data;
    },
    getDataPrettified: (state) => {
      return state.dataPrettified;
    },
    getUploadProgress: (state) => {
      return state.uploadProgress;
    },
  },
  mutations: {
    SET_DATA(state, data) {
      data.map(item => {
        Object.keys(item).forEach(function (key) { item[key] = JSON.stringify(item[key], null, 2).replace(/[\"{},]/g, "") });
        return item;
      })

      state.data = data;
    },
    SET_UPLOAD_PROGRESS(state, uploadProgress) {
      state.uploadProgress = Math.floor(uploadProgress);
      console.log(Math.floor(uploadProgress))
    },
  },
  actions: {
    setData(context, data) {
      console.log("SAVED DATA IN STORE")
      context.commit("SET_DATA", data);
    },
    setUploadProgress(context, uploadProgress) {
      context.commit("SET_UPLOAD_PROGRESS", uploadProgress);
    },
  },
})

