// TODO: switch vue resource calls to fecth
import Vue from 'vue'
import UserService from '../services/user.service'
const userService = new UserService()

const defaultVals = {
  isLoggedIn: false,
  recent: {
    rooms: []
  },
  roles: ['guest'],
  slug: null,
  username: null
}

const setLocal = (state) => {
  const stateStr = JSON.stringify(state)
  const usrObj = state.roles.indexOf('user') === -1 ? 'guest' : 'user'
  localStorage.setItem(usrObj, stateStr)
}

const removeLocalUser = () => {
  localStorage.removeItem('user')
}

export const user = {
  namespaced: true,
  state: {
    ...defaultVals
  },
  mutations: {
    reset: (state) => {
      for (let k in defaultVals) Vue.set(state, k, defaultVals[k])
      setLocal(state)
    },
    set: (state, obj) => {
      for (let k in defaultVals) if (obj[k] !== undefined) Vue.set(state, k, obj[k])
      setLocal(state)
    }
  },
  actions: {
    addRecent ({ commit, state, dispatch }, room) {
      const found = state.recent.rooms.findIndex(item => item.slug === room.slug)
      if (found !== -1) {
        state.recent.rooms.splice(found, 1)
      }

      state.recent.rooms.unshift(room)
      if (state.recent.rooms.length > 10) {
        state.recent.rooms.pop()
      }
      setLocal(state)
    },
    getGuest ({ commit, dispatch }) {
      return userService.guestNew()
        .then(usr => {
          usr.isLoggedIn = false
          usr.roles = ['guest']
          commit('set', usr)
        })
    },
    init: ({ commit, state, dispatch }) => {
      return new Promise((resolve, reject) => {
        // CHECK FOR LOCAL GUEST OR USER
        let _usr = localStorage.getItem('user') || localStorage.getItem('guest')

        // CALL SERVER FOR NEW GUEST OBJECT
        if (!_usr) {
          dispatch('getGuest')
            .then(resolve)
            .catch(reject)
        } else {
          commit('set', JSON.parse(_usr))
          resolve()
        }
      })
    },
    loginLink: ({ state }, { email, deviceID }) => {
      return new Promise((resolve, reject) => {
        userService.loginLink(email, deviceID)
          .then(resolve)
          .catch(reject)
      })
    },
    login: ({ commit, state }, email) => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email })
      }
      fetch('http://localhost:3000/login', config)
        .then(response => response.json())
        .then(usr => {
          usr.isLoggedIn = true
          usr.roles = ['user']
          commit('set', usr)
        })
        .catch(err => console.log(err))
    },
    logout ({ commit, dispatch, state }) {
      removeLocalUser()
      dispatch('init')
      userService.logout(state.slug)
        .then(usr => {
          dispatch('init')
        })
        .catch(err => console.log(err))
    }
  }
}
