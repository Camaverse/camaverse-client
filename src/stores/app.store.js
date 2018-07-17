import Vue from 'vue'

export const app = {
  namespaced: true,
  state: {
    showMainCoinsForm: false,
    showSplash: true
  },
  mutations: {
    hideMainCoinsForm: state => {
      Vue.set(state, 'showMainCoinsForm', false)
    },
    showMainCoinsForm: state => {
      Vue.set(state, 'showMainCoinsForm', false)
      Vue.set(state, 'showMainCoinsForm', true)
    },
    hideSplash: state => {
      Vue.set(state, 'showSplash', false)
    }
  }
}
