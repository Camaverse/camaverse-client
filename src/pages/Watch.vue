<template>
  <div>
    <div class="flex">
      <div>
        <div class="video-box"></div>
        <div class="flex">
          <tip-box></tip-box>
          <get-more-coins></get-more-coins>
        </div>
      </div>
      <div>
        <h1>{{broadcaster.username}}</h1>
        <div v-if="broadcasterOffline">
          <h3>Offline</h3>
        </div>
        <div v-else-if="broadcasterPublic">
          <p>{{currentRoom.topic}}</p>
          <broadcaster-tag-list :tags="currentRoom.tags"></broadcaster-tag-list>
          <chat-box></chat-box>
        </div>
      </div>
    </div>
    <broadcaster-grid></broadcaster-grid>
  </div>
</template>
<script>
  import BroadcasterGrid from '../components/BroadcasterGrid.vue'
  import BroadcasterTagList from '../components/BroadcasterTagList.vue'
  import ChatBox from '../components/ChatBox/ChatBox.vue'
  import TipBox from '../components/TipBox.vue'
  import GetMoreCoins from '../components/GetMoreCoins'
  import { mapGetters } from 'vuex'

  export default {
    filters: {
      pretty: function (value) {
        return JSON.stringify(value, null, 2)
      }
    },
    components: {
      BroadcasterGrid,
      BroadcasterTagList,
      ChatBox,
      GetMoreCoins,
      TipBox
    },
    created () {
      this.initPage()
    },
    beforeRouteLeave (to, from, next) {
      this.leaveRoom()
      next()
    },
    beforeRouteUpdate (to, from, next) {
      this.leaveRoom()
      this.initPage(to)
      next()
    },
    sockets: {
      showChange (chatrooms) {
        this.$store.commit('removeChatRooms')
        this.$store.commit('setChatRooms', chatrooms)
        if (this.currentroom) {
          this.$socket.emit('addUserToRoom', this.currentRoom._id, this.user)
        }
      },
      setOffline (rooms) {
        this.$store.commit('removeChatRooms')
      },
      updateTopic (topic) {
        this.$store.commit('updateTopic', topic)
      }
    },
    computed: {
      ...mapGetters([
        'chat',
        'currentRoom',
        'currentStatus',
        'broadcaster',
        'broadcasterStatus',
        'broadcasterOffline',
        'brodcasterPrivate',
        'broadcasterPublic',
        'broadcasterAway',
        'disableOfflineWarning',
        'user',
        'viewers',
        'app'
      ])
    },
    methods: {
      leaveRoom () {
        if (this.currentRoom && this.user && this.user.slug) {
          let room = this.currentRoom._id
          let user = this.user.slug
          let data = {room, user}
          this.$socket.emit('leaveRoom', data)
        }
      },
      getSlugFromRoute () {
        return (this.$route && this.$route.params && this.$route.params.slug) ? this.$route.params.slug : null
      },
      updateBroadcasterSuccess (res) {
        let broadcaster = res.data.data
        this.$store.commit('setBroadcaster', broadcaster)
        this.updateChatRoom(broadcaster.room)
      },
      updateBroadcaster (slug = this.$route.params.slug) {
        let url = process.env.API_PATH + '/broadcasters/' + slug
        let req = this.$http.get(url)
        req.then(this.updateBroadcasterSuccess)
        return req
      },
      updateChatRoom (room = this.broadcaster.room) {
        let url = process.env.API_PATH + '/chatrooms/' + room
        let user = this.user
        user = { slug: user.slug, username: user.username }
        let req = this.$http.post(url, {user})
        req.then(this.updateChatRoomSuccess)
        return req
      },
      updateChatRoomSuccess (res) {
        let room = res.data.data.room
        room.messages = res.data.data.messages
        this.$store.commit('setChatRoom', room)
      },
      initPage (to) {
        let slug = (to && to.params && to.params.slug) ? to.params.slug : this.getSlugFromRoute()
        let watch = {
          user: {
            isLoggedIn: this.user.isLoggedIn,
            slug: this.user.slug,
            username: this.user.username
          },
          broadcaster: slug
        }
        this.$socket.emit('watcherInit', watch, (data) => {
          if (data.broadcaster) this.$store.commit('setBroadcaster', data.broadcaster)
          this.$store.commit('removeChatRooms')
          if (data.chatrooms) this.$store.commit('setChatRooms', data.chatrooms)
        })
      }
    }
  }
</script>
<style>
  .video-box {
    background-color: #000;
    height: 400px;
    width: 700px;
  }
  .debugbox {
    background: #fff;
    border: 3px #ccc solid;
    height: 500px;
    overflow: auto;
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: 400px;
    z-index: 9999;
  }
</style>
