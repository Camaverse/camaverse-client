import Vue from 'vue'
import router from '../router'

const defaultVals = {
  isLoggedIn: false,
  disableOfflineWarning: false,
  roles: ['guest'],
  slug: null,
  username: null,
  guestLoaded: false,
  userLoaded: false
}

export const user = {
  namespaced: true,
  state: {
    isLoggedIn: defaultVals.isLoggedIn,
    disableOfflineWarning: defaultVals.disableOfflineWarning,
    roles: defaultVals.roles,
    slug: defaultVals.slug,
    username: defaultVals.username,
    guestLoaded: defaultVals.guestLoaded,
    userLoaded: defaultVals.userLoaded
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
    enableOfflineWarning: state => Vue.set(state, 'disableOfflineWarning', false),
    guestIsLoaded: state => Vue.set(state, 'guestLoaded', true),
    userIsLoaded: state => Vue.set(state, 'userLoaded', true)
  },
  actions: {
    register ({commit, state, dispatch}, params) {
      const url = process.env.API_PATH + 'users/signup'
      return new Promise((resolve, reject) => {
        this._vm.$http.post(url, params)
        .then(resolve)
        .catch(reject)
      })
    },
    login ({commit, state, dispatch}, params) {
      const url = process.env.API_PATH + 'users/login'
      return new Promise((resolve, reject) => {
        this._vm.$http.post(url, params)
        .then((user) => dispatch('handleUserInit', {err: null, user: user.body.data.user}))
        .then(resolve)
        .catch(reject)
      })
    },
    logout ({commit, state, rootGetters, dispatch}) {
      const logoutURL = process.env.API_PATH + 'users/logout/' + state.username
      this._vm.$http.get(logoutURL).then((res) => {
        if (res.ok) {
          if (rootGetters.currentRoom) {
            let _id = rootGetters.currentRoom._id
            let user = state.slug
            const socketData = {_id, user}
            this._vm.$socket.emit('leaveRoom', socketData)
          }
          commit('reset')
          this._vm.$localStorage.remove('user')
          dispatch('initClient')
          router.push('/')
        }
      })
    },
    initClient ({commit, state, dispatch}) {
      const vue = this._vm
      const guest = vue.$localStorage.get('guest')
      const user = vue.$localStorage.get('user')

      if (!guest && !user) {
        vue.$socket.emit('/guests/init', (err, guest) => dispatch('handleGuestInit', {err, guest}))
      } else if (user) {
        vue.$socket.emit('/users/init', JSON.parse(user), (err, user) => dispatch('handleUserInit', {err, user}))
      } else if (guest) {
        dispatch('handleGuestInit', {err: null, guest: JSON.parse(guest)})
      }
    },
    handleGuestInit ({commit, state, dispatch}, {err, guest}) {
      if (err) console.log(err)
      else {
        let userString = JSON.stringify(guest)
        this._vm.$localStorage.remove('guest')
        this._vm.$localStorage.set('guest', userString)
        commit('guestIsLoaded')
        dispatch('setUser')
      }
    },
    handleUserInit ({commit, state, dispatch}, {err, user}) {
      if (err) console.log(err)
      else {
        let userString = JSON.stringify(user)
        this._vm.$localStorage.remove('user')
        this._vm.$localStorage.set('user', userString)
        commit('userIsLoaded')
        dispatch('setUser')
      }
    },
    setUser ({commit, state}) {
      let user
      if (state.userLoaded) user = JSON.parse(this._vm.$localStorage.get('user'))
      else if (state.guestLoaded) user = JSON.parse(this._vm.$localStorage.get('guest'))
      commit('set', user)
      if (user && (user.coins || user.coins === 0)) commit('coins/updateCoins', user.coins, {root: true})
    }
  }
}
