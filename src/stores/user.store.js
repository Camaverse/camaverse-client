import Vue from 'vue'
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
      const url = process.env.API_PATH + 'users/login'
      this._vm.$http.post(url, this.params)
        .then(this.handleLogin)
        .catch(this.rejectLogin)
    },
    */
    logout ({commit, state, rootGetters, dispatch}) {
      const logoutURL = process.env.API_PATH + 'users/logout?username=' + state.username
      this._vm.$http.get(logoutURL).then((res) => {
        if (res.ok) {
          commit('reset')
          if (rootGetters.currentRoom) {
            let _id = rootGetters.currentRoom._id
            let user = state.slug
            const socketData = {_id, user}
            this._vm.$socket.emit('leaveRoom', socketData)
          }
          dispatch('initGuest')
          router.push('/')
        }
      })
    },
    initGuest ({commit, state}) {
      this._vm.$socket.emit('guest/init', (err, guest) => {
        if (err) console.log(err)
        else {
          let userString = JSON.stringify(guest)
          commit('set', guest)
          this._vm.$localStorage.remove('user')
          this._vm.$localStorage.set('user', userString)
        }
      })
    }
  }
}
