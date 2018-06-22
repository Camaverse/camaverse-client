import Vue from 'vue'

export const app = {
  namespaced: true,
  state: {
    showMainCoinsForm: false
  },
  mutations: {
    hideMainCoinsForm: (state, value) => {
      Vue.set(state, 'showMainCoinsForm', false)
    },
    showMainCoinsForm: (state, value) => {
      Vue.set(state, 'showMainCoinsForm', false)
      Vue.set(state, 'showMainCoinsForm', true)
    }
  }
}
