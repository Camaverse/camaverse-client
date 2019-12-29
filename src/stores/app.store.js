import Vue from 'vue'

export const app = {
  namespaced: true,
  state: {
    showSplash: true
  },
  mutations: {
    HIDE_SPLASH: state => {
      Vue.set(state, 'showSplash', false)
    }
  }
}
