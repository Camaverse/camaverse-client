<template>
  <div class="tip-box">
    <div class="flex" v-if="user.isLoggedIn">
      <div>
        <b-button-group class="mx-1">
          <b-btn @click.prevent variant="warning" class="mr-1">TIP:</b-btn>
          <tip-btn :tip="tip" v-for="tip in tipAmountsUser" :key="tip" :id="'tip-'+tip"></tip-btn>
          <b-btn @click.prevent variant="warning" id="more-tips">More</b-btn>
        </b-button-group>


        <b-popover target="more-tips"
                   placement="top"
                   :disabled="true"
                   :show.sync="showNotEnoughTokens"
                   @show="onShow()"
                   title="You need More Tokens!">
          <b-btn class="btn btn-success" @click="getMoreTokens()">Get More Tokens</b-btn>
          <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
        </b-popover>

        <b-popover target="more-tips"
                   placement="left"
                   title="More Tips!"
        @show="close()">
          <p v-if="broadcasterOffline">
            <strong>{{broadcaster.username}}</strong>
            is offline but will still receive your tip.</p>
          <label><input type="checkbox" v-model="isTipPrivate"> Tip Privately</label>
          <hr>
          <p>
            <b-btn @click="setTipAmount(tip)" class="mr-1" variant="warning" :tip="tip" v-for="tip in tipAmountsUser" :key="tip" :id="'tip-more-'+tip"> {{tip}} </b-btn>
          </p>
          <p>
            <b-btn @click="setTipAmount(tip)" class="mr-1" variant="warning" :tip="tip" v-for="tip in tipAmountsMore" :key="tip" :id="'tip-more-'+tip"> {{tip}} </b-btn>
          </p>
          <hr>
          <div class="flex">
            <strong>
              Custom Amount:
            </strong>
            <input type="number" min="0" class="custom-tip-input form-control ml-3" placeholder="0" v-model="customTipAmount">
          </div>
          <textarea class="form-control" v-model="tipMessage"></textarea>
          <p>
            <button class="btn btn-primary btn-sm" @click="sendTip(customTipAmount)" :disabled="!enableCustom" >Send</button>
            <label><input type="checkbox" v-model="isTipMsgPrivate"> Message Privately</label>
          </p>
          <p>
            <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
          </p>
        </b-popover>
      </div>
    </div>
    <div v-else>
      <a href="#" class="btn btn-warning mr-1" v-b-modal.signupModal>Tip:</a>
      <b-btn v-b-modal.signupModal v-for="tip in tipAmountsGuest" v-text="tip" :key="tip" variant="warning" class="mr-1"></b-btn>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PopOver from './PopOver'
  import PopOverMixins from '../mixins/poper.mixins'
  import TipBtn from './TipButtons'

  export default {
    components: {
      PopOver,
      TipBtn
    },
    computed: {
      ...mapGetters([
        'broadcaster',
        'broadcasterOffline',
        'user',
        'currentRoom'
      ]),
      enableCustom () {
        return this.customTipAmount > 0
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
          message: {
            isPrivate: this.isTipMsgPrivate,
            content: this.tipMessage
          },
          clientTime: Date.now()
        }
      },
      handleSendTip (d) {
        if (d.errors) {
          console.log(d.errors)
          if (d.errors === 'Declined. Not Enough Tokens.') {
            this.showNotEnoughTokens = true
          }
        } else {
          let data = {
            coins: {
              balance: d.balance
            }
          }
          this.$store.commit('updateCoins', data)
          this.$store.commit('rcvTip', d.tip)
          this.setUser(this.user)
        }
      },
      sendTip (amount) {
        let tip = this.createTip(amount)
        this.$socket.emit('sendTip', tip, this.handleSendTip)
      },
      getMoreTokens () {
        this.$store.commit('updateShowMainCoinsForm', false)
        this.$store.commit('updateShowMainCoinsForm', true)
      },
      setTipAmount (amount) {
        this.customTipAmount = amount
      },
      setUser (user) {
        let userString = JSON.stringify(user)
        this.$store.commit('setUser', user)
        this.$localStorage.set('user', userString)
      }
    },
    mixins: [PopOverMixins],
    data () {
      return {
        customTipAmount: 0,
        showNotEnoughTokens: false,
        tipAmountsGuest: [1, 5, 10, 25, 50, 100, 250, 500],
        tipAmountsMore: [250, 500, 1000],
        tipAmountsUser: [5, 10, 25, 50, 100],
        tipMessage: '',
        isTipMsgPrivate: false,
        isTipPrivate: false
      }
    }
  }
</script>
<style>
  .custom-tip {
    width: 50px;
  }

  .custom-tip-input {
    width: 80px;
  }
</style>
