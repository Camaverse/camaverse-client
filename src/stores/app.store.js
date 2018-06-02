import Vue from 'vue'

export const app = {
  namespaced: true,
  state: {
    showMainCoinsForm: false
  },
  getters: {
    showMainCoinsForm: state => state.showMainCoinsForm
  },
  mutations: {
    hideMainCoinsForm: (state, value) => {
      Vue.set(state, 'showMainCoinsForm', false)
    },
    showMainCoinsForm: (state, value) => {
      Vue.set(state, 'showMainCoinsForm', true)
    }
  }
}
