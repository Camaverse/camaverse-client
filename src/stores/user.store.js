// TODO: switch vue resource calls to fecth
import Vue from 'vue'
import router from '../router'

const defaultVals = {
  isLoggedIn: false,
  recent: {
    rooms: []
  },
  roles: ['guest'],
  slug: null,
  username: null
}

export const user = {
  namespaced: true,
  state: {
    ...defaultVals
  },
  mutations: {
    reset: (state) => {
      for (let k in defaultVals) Vue.set(state, k, defaultVals[k])
    },
    set: (state, obj) => {
      for (let k in defaultVals) if (obj[k]) Vue.set(state, k, obj[k])
    }
  },
  actions: {
    initUser: ({ commit, state }) => {
      const _usr = JSON.parse(localStorage.getItem('user'))
      commit('set', _usr)
    },
    addRecent ({ commit, state, dispatch }, room) {
      const found = state.recent.rooms.findIndex(item => item.slug === room.slug)
      if (found !== -1) {
        state.recent.rooms.splice(found, 1)
      }

      state.recent.rooms.unshift(room)
      if (state.recent.rooms.length > 10) {
        state.recent.rooms.pop()
      }
      const userState = JSON.stringify(state)
      localStorage.setItem('user', userState)
    },
    register ({ commit, state, dispatch }, params) {
      const url = process.env.API_PATH + 'users/signup'
      return new Promise((resolve, reject) => {
        this._vm.$http.post(url, params)
          .then(resolve)
          .catch(reject)
      })
    },
    login ({ commit, state, dispatch }, params) {
      const url = process.env.API_PATH + 'users/login'
      return new Promise((resolve, reject) => {
        this._vm.$http.post(url, params)
          .then((user, err) => dispatch('handleUserInit', {err: null, user: user.body.data.user}))
          .then(resolve)
          .catch(reject)
      })
    },
    logout ({ commit, state, rootGetters, dispatch }) {
      return new Promise((resolve, reject) => {
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
            resolve()
            router.push('/')
          } else {
            reject(new Error('Error Logging Out'))
          }
        })
      })
    },
    init ({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        const vue = this._vm
        let payload = vue.$localStorage.get('user') || vue.$localStorage.get('guest')

        vue.$socket.emit('/users/init', JSON.parse(payload), (err, user) => {
          dispatch('handleInit', {err, user: user.data})
            .then(resolve)
            .catch(reject)
        })
      })
    },
    handleInit ({commit, state, dispatch}, {err, user}) {
      return new Promise((resolve, reject) => {
        /*
        let userString = JSON.stringify(user)
        this._vm.$localStorage.remove('user')
        this._vm.$localStorage.set('user', userString)
        commit('userIsLoaded')
        dispatch('setUser')
          .then(resolve)
          .catch(reject)
          */
      })
    },
    setUser ({commit, state}) {
      return new Promise((resolve, reject) => {
        let user
        if (state.userLoaded) user = JSON.parse(this._vm.$localStorage.get('user'))
        else if (state.guestLoaded) user = JSON.parse(this._vm.$localStorage.get('guest'))
        commit('set', user)
        if (user && (user.coins || user.coins === 0)) commit('coins/updateCoins', user.coins, {root: true})
        resolve()
      })
    }
  }
}
