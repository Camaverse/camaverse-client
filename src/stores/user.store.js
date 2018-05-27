import Vue from 'vue'
import {config} from '../config'
import router from '../router'

const defaultVals = {
  isLoggedIn: false,
  disableOfflineWarning: false,
  roles: ['guest'],
  slug: null,
  username: null
}

export const user = {
  namespaced: true,
  state: {
    isLoggedIn: defaultVals.isLoggedIn,
    disableOfflineWarning: defaultVals.disableOfflineWarning,
    roles: defaultVals.roles,
    slug: defaultVals.slug,
    username: defaultVals.username
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    disableOfflineWarning: state => state.disableOfflineWarning,
    roles: state => state.roles,
    slug: state => state.slug,
    username: state => state.username
  },
  mutations: {
    reset: (state) => {
      for (let k in defaultVals) Vue.set(state, k, defaultVals[k])
    },
    set: (state, obj) => {
      for (let k in defaultVals) if (obj[k]) Vue.set(state, k, obj[k])
    },
    disableOfflineWarning: state => Vue.set(state, 'disableOfflineWarning', true),
    enableOfflineWarning: state => Vue.set(state, 'disableOfflineWarning', false)
  },
  actions: {
    // todo: make login more global
    /*
    login: function ({commit, state}, params) {
      const url = config.getURL() + '/users/login'
      this._vm.$http.post(url, this.params)
        .then(this.handleLogin)
        .catch(this.rejectLogin)
    },
    */
    logout ({commit, state, rootGetters}) {
      const logoutURL = config.getURL() + '/users/logout?username=' + state.username
      this._vm.$http.get(logoutURL).then((res) => {
        if (res.data.success) {
          commit('reset')
          this._vm.$localStorage.remove('user')
          if (rootGetters.currentRoom) {
            let room = rootGetters.currentRoom._id
            let user = state.slug
            const socketData = {room, user}
            this._vm.$socket.emit('leaveRoom', socketData)
          }
          router.push('/')
        }
      })
    }
  }
}
