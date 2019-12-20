import Vue from 'vue'

export const appStore = {
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
