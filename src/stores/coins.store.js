import Vue from 'vue'
export const coins = {
  namespaced: true,
  state: {
    balance: 0,
    tip: {
      isPrivate: false,
      msg: {
        isPrivate: false,
        content: ''
      }
    }
  },
  mutations: {
    updateCoins (state, amt) {
      Vue.set(state, 'balance', amt)
    }
  },
  actions: {
    loadCoins ({commit, rootState}) {
      return new Promise((resolve, reject) => {
        const qry = {
          slug: rootState.user.slug
        }
        this._vm.$socket.emit('users:get:coins', qry, (data) => {
          if (data.errors) {
            console.log('errors: ', data.errors)
            reject(new Error(data.errors))
          } else {
            commit('updateCoins', data.data.coins.balance)
            resolve()
          }
        })
      })
    },
    buyCoins ({commit, rootState}, coins) {
      return new Promise((resolve, reject) => {
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
            reject(new Error(data.errors))
          } else {
            commit('updateCoins', data.coins.balance)
            resolve()
          }
        })
      })
    },
    sendTip ({commit, dispatch}, amount) {
      return new Promise((resolve, reject) => {
        dispatch('createTip', amount)
        .then((tip) => {
          this._vm.$socket.emit('sendTip', tip, ({errors, balance}) => {
            if (errors) reject(new Error(errors))
            else {
              commit('updateCoins', balance)
              resolve({balance})
            }
          })
        })
      })
    },
    createTip ({rootGetters, state}, amount) {
      const room = rootGetters['chat/currentRoom']
      const user = rootGetters['user']
      const tip = state.tip

      const ret = {
        amount,
        isOffline: (!room),
        isPrivate: tip.isPrivate,
        msg: {
          isPrivate: tip.msg.isPrivate,
          content: tip.msg.content
        },
        from: {
          slug: user.slug,
          username: user.username
        },
        to: {
          id: (room) ? room.broadcasterID : null,
          show: (room) ? room.show : null,
          slug: (room) ? room.slug : null,
          room: (room) ? room._id : null
        },
        clientTime: Date.now()
      }

      return new Promise((resolve, reject) => {
        resolve(ret)
      })
    }
  }
}
