import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataView from '../views/DataView.vue'
import FileUploadView from '../views/FileUploadView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/data',
    name: 'data',
    component: DataView
  },
  {
    path: '/file',
    name: 'file',
    component: FileUploadView
  }
]

const router = new VueRouter({
  routes
})

export default router
