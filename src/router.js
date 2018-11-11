import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Join from './views/Join.vue'
import Login from './views/Login.vue'
import Search from './views/Search.vue'
import Watch from './views/Watch.vue'
import NotFound from './views/404.vue'

import searchRoutes from './config/searchRoutes'

Vue.use(Router)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/join', name: 'Join', component: Join },
    { path: '/login', name: 'Login', component: Login },
    { path: '/watch/:slug', name: 'Watch', component: Watch },
    { path: '*', name: 'Not Found', component: NotFound }
]

for (let rt of searchRoutes) {
  let _tmp = {
    component: Search,
    name: rt,
    path: `/${rt.toLowerCase()}`
  }
  routes.push(_tmp);
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
