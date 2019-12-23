import Vue from 'vue'
import VueRouter from 'vue-router'
import { basename } from '@/config/home'
import routes from './config'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  base: basename
})

export default router
