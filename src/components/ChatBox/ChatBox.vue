<template>
  <div>
    <ul class="message-list" v-if="currentRoom">
      <li v-for="msg in currentRoom.messages" :key="msg._id" :class="{tip: (msg.msgType === 'tip')}">
        <b v-if="msg.from">{{displayName(msg.from.username)}}:</b>
        <span v-if="msg.msgType === 'tip'">
          Tipped {{msg.amount}}
        </span>
        <span v-else>
          {{msg.message}}
        </span>
      </li>
    </ul>
    <form action="#" @submit.prevent="sendMessage">
      <b-input-group>
        <b-form-input v-model="message" name="content"></b-form-input>
        <b-input-group-button slot="right">
          <b-btn variant="dark" id="btn-send-msg" type="submit">Send</b-btn>
        </b-input-group-button>
      </b-input-group>

      <b-popover target="btn-send-msg"
                 placement="top"
                 title="Ooops!"
                 :disabled.sync="showSendMsgDisabled"
                 :show.sync="showSendMsgWarning">
        <p>You've hit your message limit!</p>
        <p>
          <a href="#" v-b-modal.signupModal @click.prevent="hideMsgQuota()">Join Now For Free!</a> or
          <a href="#" v-b-modal.loginModal @click.prevent="hideMsgQuota()" >Login</a>
        </p>
        <p>
          <button class="btn btn-danger btn-sm" @click="hideMsgQuota()">Close</button>
        </p>
      </b-popover>
    </form>

    <audio ref="xsTip" :src="assetBase + 'tip-xs.mp3'"></audio>
    <audio ref="smTip" :src="assetBase + 'tip-sm.mp3'"></audio>
    <audio ref="medTip" :src="assetBase + 'tip-med.mp3'"></audio>
    <audio ref="largeTip" :src="assetBase + 'tip-large.mp3'"></audio>
    <audio ref="xlTip" :src="assetBase + 'tip-xl.mp3'"></audio>

  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState({
        chatRooms: state => state.chat.rooms,
        guestMsgs: state => state.chat.guestMsgs,
        isLoggedIn: state => state.user.isLoggedIn,
        user: state => state.user,
        selectedRoom: state => state.chat.selected
      }),
      showSendMsgDisabled: {
        get: function () {
          return this.$store.state.chat.showSendMsgDisabled
        },
        set: function (newValue) {
          this.$store.commit('chat/showSendMsgDisabled', newValue)
        }
      },
      showSendMsgWarning: {
        get: function () {
          return this.$store.state.chat.showSendMsgWarning
        },
        set: function (newValue) {
          this.$store.commit('chat/showSendMsgWarning', newValue)
        }
      },
      ...mapGetters({
        currentMessages: 'chat/currentMessages',
        currentRoom: 'chat/currentRoom'
      }),
      hasMsg () {
        return this.message.length
      }
    },
    mounted () {
      this.scrollToEnd()
    },
    updated () {
      this.scrollToEnd()
    },
    data () {
      return {
        assetBase: 'http://cwl-asset-bucket.s3-website-us-east-1.amazonaws.com/',
        message: '',
        tipSounds: ['xs', 'sm', 'med', 'large', 'xl']
      }
    },
    sockets: {
      transmitMsg (msg) {
        this.$store.commit('chat/updateMessages', msg)
      },
      transmitTip (msg) {
        let tip = msg.tip
        this.$store.commit('chat/rcvTip', tip)
        this.playTipSound(tip.amount)
      }
    },
    methods: {
      ...mapActions({
        sendMsgAction: 'chat/sendMessage'
      }),
      ...mapMutations({
        showMsgQuota: 'chat/showMsgQuota',
        hideMsgQuota: 'chat/hideMsgQuota'
      }),
      playTipSound (amount) {
        if (amount >= 1000) this.$refs.xlTip.play()
        else if (amount > 499) this.$refs.largeTip.play()
        else if (amount > 99) this.$refs.medTip.play()
        else if (amount > 4) this.$refs.smTip.play()
        else this.$refs.xsTip.play()
      },
      displayName (username) {
        return (username === this.user.username) ? 'You' : username
      },
      resetMsg () {
        this.message = ''
      },
      scrollToEnd () {
        var container = this.$el.querySelector('.message-list')
        if (container) container.scrollTop = container.scrollHeight
      },
      sendMessage () {
        if (this.hasMsg) {
          this.sendMsgAction(this.message)
            .then(this.resetMsg)
            .catch(this.showMsgQuota)
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
