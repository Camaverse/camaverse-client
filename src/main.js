// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VueLocalStorage from 'vue-localstorage'
import {store} from './stores'
import VueSocketio from 'vue-socket.io'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Notification from 'vue-notification'

Vue.config.productionTip = false

Vue.use(Notification)
Vue.use(VueResource)
Vue.use(VueSocketio, process.env.SOCKET_PATH)
Vue.use(VueLocalStorage)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    this.$store.dispatch('user/initClient')
       .then(this.$store.commit('app/hideSplash'))
  }
})
