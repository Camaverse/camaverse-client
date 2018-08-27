import Vue from 'vue'

export const chatrooms = {
  namespaced: true,
  state: {
    grids: {}
  },
  mutations: {
    setItems: (state, grid, items) => {
      Vue.set(state.grids[grid], 'items', items)
    },
    newGrid: (state, gridId) => {
      Vue.set(state.grids, gridId, {})
    },
    hideSplash: state => {
      Vue.set(state, 'showSplash', false)
    }
  },
  actions: {
    createGrid ({commit}) {
      return new Promise((resolve, reject) => {
        const gridId = 'yoyoy'
        commit('newGrid', gridId)
        resolve(gridId)
      })
    }
  }
}
