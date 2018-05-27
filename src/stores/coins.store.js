import Vue from 'vue'
export const coins = {
  namespaced: true,
  state: {
    balance: 0
  },
  getters: {
    balance: state => state.balance
  },
  mutations: {
    updateCoins (state, amt) {
      Vue.set(state, 'balance', amt)
    }
  },
  actions: {
    loadCoins ({commit, rootState}) {
      const qry = {
        slug: rootState.user.slug
      }
      this._vm.$socket.emit('users:get:coins', qry, (data) => {
        if (data.errors) {
          console.log('errors: ', data.errors)
        } else {
          commit('updateCoins', data.data.coins.balance)
        }
      })
    },
    buyCoins ({commit, rootState}, coins) {
      let purchase = {
        units: coins,
        from: {
          slug: rootState.user.slug,
          username: rootState.user.username
        },
        clientTime: Date.now()
      }
      this._vm.$socket.emit('buyCoins', purchase, (data) => {
        if (data.errors) {
          console.log('errors: ', data.errors)
        } else {
          commit('updateCoins', data.coins.balance)
        }
      })
    }
  }
}
