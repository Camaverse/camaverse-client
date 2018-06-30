import Vue from 'vue'
import Router from 'vue-router'
import APITest from '@/pages/APITest'
import Home from '@/pages/Home'
import Tag from '@/pages/Tag'
import Watch from '@/pages/Watch'
import NotFound from '@/pages/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/apitest', name: 'APITest', component: APITest },
    { path: '/:tag', name: 'Tag', component: Tag },
    { path: '/watch/:slug', name: 'Watch', component: Watch },
    // catch all
    { path: '*', name: 'Not Found', component: NotFound }
  ]
})
