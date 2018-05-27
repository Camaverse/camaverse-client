<template>
    <b-btn @click="sendTip(tip)" variant="warning" class="mr-1" :id="id">
      {{tip}}

      <b-popover :target="id"
                 placement="top"
                 :disabled="true"
                 :show.sync="showNotEnoughTokens"
                 @show="onShow()"
                 title="You need More Tokens!">
        <b-btn class="btn btn-success" @click="getMoreTokens()">Get More Tokens</b-btn>
        <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
      </b-popover>
      <b-popover :target="id "
                 placement="top"
                 :disabled="true"
                 :show.sync="showOfflinePopup"
                 @show="onShow()"
                 title="Broadcaster is Offline!">
        <p>
          <label>
            <input type="checkbox" v-model="disableOfflineWarning"> Don't Show Again
          </label>
        </p>
        <b-btn class="btn btn-success" @click="sendOfflineTip()">Send Offline Tip</b-btn>
        <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
      </b-popover>

    </b-btn>
</template>
<script>
  import PopOver from './PopOver'
  import {mapGetters} from 'vuex'
  import PopOverMix from '../mixins/poper.mixins'
  export default {
    components: {PopOver},
    computed: {
      ...mapGetters({
        brodcaster: 'broadcaster',
        currentRoom: 'chat/currentRoom',
        offline: 'chat/offline',
        user: 'user'
      }),
      disableOfflineWarning: {
        get () {
          return this.user.disableOfflineWarning
        },
        set (value) {
          this.$store.commit('user/updateOfflineWarning', value)
        }
      },
      allowShowOfflineMsg () {
        return !this.disableOfflineWarning && this.offline
      }
    },
    data () {
      return {
        selectedTipAmount: null,
        showOfflinePopup: false,
        showNotEnoughTokens: false
      }
    },
    methods: {
      createTip (amount) {
        return {
          amount,
          isOffline: (!this.currentRoom),
          isPrivate: this.isTipPrivate,
          from: {
            slug: this.user.slug,
            username: this.user.username
          },
          to: {
            id: this.broadcaster._id,
            show: (this.currentRoom) ? this.currentRoom.show : null,
            slug: this.broadcaster.slug,
            room: (this.currentRoom) ? this.currentRoom._id : null
          },
          clientTime: Date.now()
        }
      },
      getMoreTokens () {
        this.$store.commit('app/updateShowMainCoinsForm', false)
        this.$store.commit('app/updateShowMainCoinsForm', true)
      },
      handleSendTip (d) {
        console.log('handleSendTip', d)
        this.selectedTipAmount = null
        this.close()
        if (d.errors) {
          console.log(d.errors)
          if (d.errors === 'Declined. Not Enough Tokens.') {
            this.showNotEnoughTokens = true
          }
        } else {
          this.$store.commit('coins/updateCoins', d.balance)
          this.$store.commit('chat/rcvTip', d.tip)
        }
      },
      sendOfflineTip () {
        this.emitTip(this.selectedTipAmount)
      },
      emitTip (amount) {
        let tip = this.createTip(amount)
        console.log(tip)
        this.$socket.emit('sendTip', tip, this.handleSendTip)
      },
      sendTip (amount) {
        this.selectedTipAmount = amount
        if (this.allowShowOfflineMsg) {
          this.showOfflinePopup = true
        } else {
          this.emitTip(amount)
        }
      },
      setUser (user) {
        let userString = JSON.stringify(user)
        this.$store.commit('user/set', user)
        this.$localStorage.set('user', userString)
      }
    },
    mixins: [PopOverMix],
    props: ['tip', 'id']
  }
</script>
