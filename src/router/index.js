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
  }
]

const router = new VueRouter({
  routes
})

export default router
