import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import selfPronos from '../views/selfPronos.vue'
import importJson from '../views/importJson.vue'
import ranking from "../components/ranking.vue"
import GitHub from "../components/gitHub.vue"
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/selfPronos',
    name:'selfPronos',
    component:selfPronos
  },
  {
    path:'/importJson',
    name:'importJson',
    component:importJson
  },
  {
    path:'/ranking',
    name:'ranking',
    component:ranking
  },
  {
    path:'/GitHub',
    name:'GitHub',
    component:GitHub
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",

})

export default router
