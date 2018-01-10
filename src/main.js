// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VueLocalStorage from 'vue-localstorage'
import {api} from './config'
import {store} from './store'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueSocketio, api.getSocketURL())
Vue.use(VueLocalStorage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    let usr = this.$localStorage.get('user')
    if (usr) {
      usr = JSON.parse(usr)
      this.$store.commit('setUser', usr)
    } else {
      this.$socket.emit('connect-guest', (err, guest) => {
        if (err) {
          console.log(err)
        } else {
          this.$store.commit('setUser', guest)
          this.$localStorage.set('user', JSON.stringify(guest))
        }
      })
    }
  },
  sockets: {
    connect () {}
  }
})
