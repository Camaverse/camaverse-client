import Vue from 'vue'

export const app = {
  namespaced: true,
  state: {
    errorAttempts: 0,
    isError: false,
    showSplash: true
  },
  mutations: {
    ERROR_ATTEMPTS: (state, value) => {
      Vue.set(state, 'errorAttempts', value)
    },
    HIDE_SPLASH: state => {
      Vue.set(state, 'showSplash', false)
    },
    SHOW_SPLASH: (state, err) => {
      if (err) {
        Vue.set(state, 'isError', true)
      }
      Vue.set(state, 'showSplash', true)
    }
  }
}
