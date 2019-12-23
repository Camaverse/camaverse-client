import Vue from 'vue'

export const app = {
  namespaced: true,
  state: {
    showSplash: true
  },
  mutations: {
    hideSplash: state => {
      Vue.set(state, 'showSplash', false)
    }
  }
}
