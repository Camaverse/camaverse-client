import Vue from 'vue'
import uuid from 'uuid'

export const app = {
  namespaced: true,
  state: {
    errorAttempts: 0,
    isError: false,
    deviceID: null,
    showSplash: true,
    removeAds: false,
    cookiePolicyAccepted: false
  },
  mutations: {
    ERROR_ATTEMPTS: (state, value) => {
      Vue.set(state, 'errorAttempts', value)
    },
    HIDE_SPLASH: state => {
      Vue.set(state, 'showSplash', false)
    },
    CHECK_COOKIE_ACCEPTED: state => {
      const hasAccepted = JSON.parse(localStorage.getItem('cookie:accepted')) || false
      Vue.set(state, 'cookiePolicyAccepted', hasAccepted)
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
