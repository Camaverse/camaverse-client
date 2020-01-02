import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/404.vue'
import Search from './views/Search.vue'
import Tag from '@/views/Tag'
import Watch from './views/Watch.vue'

import searchRoutes from './config/searchRoutes'

Vue.use(Router)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/:tag(recent)', name: 'Recent', component: Tag },
  { path: '/tagged/:tag', name: 'Tag', component: Tag },
  { path: '/watch/:slug', name: 'Watch', component: Watch },
  { path: '*', name: 'Not Found', component: NotFound }
]

for (let rt of searchRoutes) {
  let _tmp = {
    component: Search,
    name: rt,
    path: `/${rt.toLowerCase()}`
  }
  routes.push(_tmp)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
