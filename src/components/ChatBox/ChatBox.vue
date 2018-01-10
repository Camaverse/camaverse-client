<template>
  <div>
    <ul class="message-list" v-if="currentRoom">
      <li v-for="msg in currentRoom.messages" :key="msg._id" :class="{tip: (msg.msgType === 'tip')}">
        <b>{{msg.from.username}}:</b>
        <span v-if="msg.msgType === 'tip'">
          Tipped {{msg.amount}}
        </span>
        <span v-else>
          {{msg.message}}
        </span>
      </li>
    </ul>
    <form action="#" @submit.prevent="sendMessage">
      <input v-model="message" name="content"/>
      <button class="btn btn-dark" id="btn-send-msg" :disabled="!hasMsg">Send</button>
      <b-popover target="btn-send-msg"
                 placement="top"
                 title="Ooops!"
                 :disabled.sync="showSendMsgDisabled"
                 :show.sync="showSendMsgWarning">
        <p>You've hit your message limit!</p>
        <p>
          <a href="#" v-b-modal.signupModal >Join Now For Free!</a> or
          <a href="#" v-b-modal.loginModal >Login</a>
        </p>
        <p>
          <button class="btn btn-danger btn-sm" @click="closeSendMsgWarning()">Close</button>
        </p>
      </b-popover>
    </form>
    <ul>

    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'chatRooms',
        'currentMessages',
        'currentRoom',
        'broadcaster',
        'user',
        'selectedRoom'
      ]),
      hasMsg () {
        return this.message.length
      },
      isAllowed () {
        return (!this.user.isLoggedIn && this.guestLimit) || this.user.isLoggedIn
      }
    },
    updated () {
      this.scrollToEnd()
    },
    data () {
      return {
        message: '',
        guestLimit: 5,
        showSendMsgDisabled: true,
        showSendMsgWarning: false
      }
    },
    sockets: {
      transmitMsg (msg) {
        this.$store.commit('updateMessages', msg)
      },
      transmitTip (msg) {
        this.$store.commit('rcvTip', msg)
      }
    },
    methods: {
      closeSendMsgWarning () {
        this.showSendMsgDisabled = true
        this.showSendMsgWarning = false
      },
      createMsg () {
        return {
          message: this.message,
          clientTime: Date.now(),
          from: {
            type: 'user',
            username: this.user.username,
            slug: this.user.slug
          },
          to: this.currentRoom._id
        }
      },
      decreaseLimit () {
        this.guestLimit--
      },
      resetMsg () {
        this.message = ''
      },
      scrollToEnd () {
        var container = this.$el.querySelector('.message-list')
        if (container) container.scrollTop = container.scrollHeight
      },
      sendMessage () {
        if (this.isAllowed) {
          this.$socket.emit('sendMessage', this.createMsg(), (err) => {
            if (!err) {
              this.resetMsg()
              if (!this.user.isLoggedIn) this.decreaseLimit()
            }
          })
        } else if (!this.guestLimit) {
          this.showSendMsgDisabled = false
          this.showSendMsgWarning = true
          console.log('You\'ve met your MSG Quota')
        }
      }
    }
  }
</script>
<style>
  .message-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .message-list .tip {
    background-color: #fffd00
  }
</style>
