// TODO: switch vue resource calls to fecth
import Vue from 'vue'

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
      // console.log('GET NEW GUEST FROM SERVER')
      fetch('http://localhost:3000/users/guest', { method: 'POST' })
        .then(response => response.json())
        .then(usr => {
          usr.isLoggedIn = false
          usr.roles = ['guest']
          commit('set', usr)
        })
        .catch(err => console.log(err))
    },
    init: ({ commit, state, dispatch }) => {
      let _usr;

      // CHECK FOR USER LOCAL
      _usr = localStorage.getItem('guest')

      // CHECK FOR GUEST LOCAL
      if (!_usr) {
        _usr = localStorage.getItem('user')
      }

      // CALL SERVER FOR NEW GUEST OBJECT
      if (!_usr) {
        dispatch('getGuest')
      } else {
        _usr = JSON.parse(_usr)
        commit('set', _usr)
      }
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
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ slug: state.slug })
      }
      fetch('http://localhost:3000/logout', config)
        .then(response => response.json())
        .then(usr => {
          removeLocalUser()
          dispatch('init')
        })
        .catch(err => console.log(err))
    }
  }
}
