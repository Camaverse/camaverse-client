import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Watch from '@/pages/Watch'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'
import NotFound from '@/pages/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/watch/:slug', name: 'Watch', component: Watch },
    { path: '/terms', name: 'Terms', component: Terms },
    { path: '/privacy', name: 'Privacy', component: Privacy },
    // catch all
    { path: '*', name: 'Not Found', component: NotFound }
  ]
})
