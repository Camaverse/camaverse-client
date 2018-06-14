import Vue from 'vue'

const defaultVals = {
  selected: '',
  roomsList: [],
  rooms: {}
}

export const chat = {
  namespaced: true,
  state: {
    selected: defaultVals.selected,
    roomsList: defaultVals.roomsList,
    rooms: defaultVals.rooms
  },
  getters: {
    chatRooms: (state) => state.rooms,
    currentMessages: (state) => {
      return (state.selected) ? state.rooms[state.selected].messages : null
    },
    currentRoom: (state) => {
      if (state.rooms && state.selected) {
        return state.rooms[state.selected]
      } else {
        return null
      }
    },
    currentShow: (state, getters) => (getters.currentRoom) ? getters.currentRoom.show : null,
    currentRoomID: (state, getters) => (getters.currentRoom) ? getters.currentRoom._id : null,
    currentStatus: (state, getters) => {
      return (!getters.selectedRoom) ? 'offline' : (getters.currentRoom.isAway) ? 'Away' : getters.currentRoom.show
    },
    viewers: (state, getters) => (getters.currentRoom && getters.currentRoom.users) ? getters.currentRoom.users.length : 0,
    isInShow: (state, getters) => (getters.currentRoom && getters.currentRoom.isOnline),
    topic: (state, getters) => (getters.currentRoom && getters.currentRoom.topic) ? getters.currentRoom.topic : null,
    selectedRoom: state => state.selected,
    offline: (state) => !state.selected,
    public: (state, getters) => (getters.currentRoom) ? getters.currentRoom.show === 'public' : false,
    away: (state, getters) => (getters.currentRoom) ? getters.currentRoom.isAway : false
  },

  mutations: {
    rcvMsg: (state, msg) => {
      let chat = state.chat
      let room = chat.rooms[chat.selected]
      if (!room.messages) {
        Vue.set(room, 'messages', [msg])
      } else {
        let msgCount = room.messages.length
        Vue.set(room.messages, msgCount, msg)
      }
    },
    updateTags: (state, room) => {
      Vue.set(state.chat.rooms[room._id], 'tags', room.tags)
    },
    updateTopic (state, {topic, _id}) {
      Vue.set(state.rooms[_id], 'topic', topic)
    },
    SOCKET_UPDATECHAT: (state, chat) => {
      let room = chat.room._id
      Vue.set(state.rooms, room, chat.room)
      console.log('SOCKET_UPDATECHAT', state.rooms[room])
    },
    rcvTip: (state, msg) => {
      let room = state.rooms[state.selected]
      msg.msgType = 'tip'
      if (!room.messages) {
        Vue.set(room, 'messages', [msg])
      } else {
        let msgCount = room.messages.length
        Vue.set(room.messages, msgCount, msg)
      }
    },
    removeChatRooms: (state, rooms) => {
      Vue.set(state, 'selected', defaultVals.selected)
      Vue.set(state, 'roomsList', [])
      Vue.set(state, 'rooms', {})
    },
    setChatRooms: (state, rooms) => {
      for (let r in rooms) {
        let room = rooms[r]
        let count = state.roomsList.length
        if (room.isOnline) {
          Vue.set(state.rooms, room._id, room)
          if (state.roomsList.indexOf(room._id) === -1) Vue.set(state.roomsList, count, room._id)
          if (state.roomsList.length === 1) Vue.set(state, 'selected', room._id)
        }
      }
    },
    setMessages: (state, room, msgs) => {
      Vue.set(state.rooms[room], 'messages', msgs)
    },
    updateViewers: (state, room) => {
      Vue.set(state.rooms[room._id], 'users', room.users)
      Vue.set(state.rooms[room._id], 'userSlugs', room.userSlugs)
      console.log(state.rooms[room._id])
    },
    updateMessages: (state, msg) => {
      let room = state.rooms[msg.to]
      if (!room.messages) {
        Vue.set(room, 'messages', [msg])
      } else {
        let msgCount = room.messages.length
        Vue.set(room.messages, msgCount, msg)
      }
    }
  }
}
