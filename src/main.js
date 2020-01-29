import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
// import VueSocketio from 'vue-socket.io'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './stores'
import './registerServiceWorker'
// import { faFacebookSquare } from '@fortawesome/fontawesome-free-brands';
import VueCarousel from 'vue-carousel'

Vue.use(VueCarousel)
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResource)
// Vue.use(VueSocketio, process.env.SOCKET_PATH)
Vue.use(VueLocalStorage)
Vue.component('v-icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    this.hideSplash()
    this.initUser()
      .then(() => {
        sessionStorage.removeItem('errorAttempts')
        this.setErrorAttempts(0)
      })
      .catch(err => {
        const errorAttempts = Number(sessionStorage.getItem('errorAttempts')) + 1
        sessionStorage.setItem('errorAttempts', JSON.stringify(errorAttempts))
        this.setErrorAttempts(errorAttempts)
        this.showSplash(err)
      })
  },
  methods: {
    ...mapMutations('app', { hideSplash: 'HIDE_SPLASH', showSplash: 'SHOW_SPLASH', setErrorAttempts: 'ERROR_ATTEMPTS' }),
    ...mapActions('user', { initUser: 'init' })
  }
}).$mount('#app')
