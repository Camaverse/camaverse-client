import Vue from 'vue'

export const app = {
  state: {
    showMainCoinsForm: false
  },
  mutations: {
    updateShowMainCoinsForm: (state, value) => {
      Vue.set(state, 'showMainCoinsForm', value)
    }
  }
}
