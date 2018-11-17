import Vue from 'vue'
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
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResource)
// Vue.use(VueSocketio, process.env.SOCKET_PATH)
Vue.use(VueLocalStorage)
Vue.component('v-icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
