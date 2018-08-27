import Vue from 'vue'
import Vuex from 'vuex'
import {app} from './app.store'
import {broadcaster} from './broadcaster.store'
import {chat} from './chat.store'
import {chatrooms} from './chatrooms.store'
import {coins} from './coins.store'
import {dev} from './dev.store'
import {user} from './user.store'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    app,
    broadcaster,
    chat,
    chatrooms,
    coins,
    dev,
    user
  },
  getters: {
    broadcaster: state => state.broadcaster,
    chat: state => state.chat,
    user: state => state.user
  }
})
