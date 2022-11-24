import Vue from 'vue'
import VueRouter from 'vue-router'
import MapView from '../views/MapView.vue'
import DataView from '../views/DataView.vue'
import FileUploadView from '../views/FileUploadView.vue'
import MOPSView from '../views/MOPSView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MapView
  },
  {
    path: '/data10',
    name: 'data10',
    component: DataView
  },
  {
    path: '/data21',
    name: 'data21',
    component: DataView
  },
  {
    path: '/file',
    name: 'file',
    component: FileUploadView
  },
  {
    path: '/mops',
    name: 'mops',
    component: MOPSView
  }
]

const router = new VueRouter({
  routes
})

export default router
