import Vue from 'vue'

const defaultVals = {
  slug: null,
  username: null
}

export const broadcaster = {
  namespaced: true,
  state: {
    slug: null,
    username: null
  },
  mutations: {
    reset: (state) => {
      for (let k in defaultVals) Vue.set(state, k, defaultVals[k])
    },
    set: (state, obj) => {
      for (let k in defaultVals) if (obj[k]) Vue.set(state, k, obj[k])
    }
  }
}
