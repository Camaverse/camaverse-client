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
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueSocketio, api.getSocketURL())
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
    this.init()
  },
  methods: {
    handleConnectGuest (err, guest) {
      if (err) console.log(err)
      else this.setUser(guest)
    },
    init () {
      let usr = this.$localStorage.get('user')
      if (usr) this.setUser(JSON.parse(usr))
      else this.$socket.emit('connect-guest', this.handleConnectGuest)
    },
    setUser (user) {
      let userString = JSON.stringify(user)
      this.$store.commit('setUser', user)
      this.$localStorage.set('user', userString)
    }
  }
})
