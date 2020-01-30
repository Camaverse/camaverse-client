import Vue from 'vue'
import uuid from 'uuid'

export const app = {
  namespaced: true,
  state: {
    errorAttempts: 0,
    isError: false,
    deviceID: null,
    showSplash: true
  },
  mutations: {
    ERROR_ATTEMPTS: (state, value) => {
      Vue.set(state, 'errorAttempts', value)
    },
    HIDE_SPLASH: state => {
      Vue.set(state, 'showSplash', false)
    },
    SET_DEVICE_ID: state => {
      let deviceID = localStorage.getItem('deviceID')
      if (!deviceID) {
        deviceID = uuid.v4()
        localStorage.setItem('deviceID', deviceID)
      }
      Vue.set(state, 'deviceID', deviceID)
    },
    SHOW_SPLASH: (state, err) => {
      if (err) {
        Vue.set(state, 'isError', true)
      }
      Vue.set(state, 'showSplash', true)
    }
  }
}
