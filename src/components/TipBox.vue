<template>
  <div class="tip-box">
    <div class="flex" v-if="isLoggedIn">
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
          <b-btn class="btn btn-success" @click="openCoinsForm()">Get More Tokens</b-btn>
          <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
        </b-popover>

        <b-popover target="more-tips"
                   placement="left"
                   title="More Tips!"
        @show="close()">
          <p v-if="offline">
            <strong v-if="currentRoom">{{currentRoom.username}}</strong>
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
            <input type="number" min="0" class="custom-tip-input form-control ml-3" placeholder="0" v-model="tip">
          </div>
          <textarea class="form-control" v-model="tipMessage"></textarea>
          <p>
            <button class="btn btn-primary btn-sm" @click="sendTip(tip)" :disabled="!enableCustom" >Send</button>
            <label><input type="checkbox" v-model="isTipMsgPrivate"> Message Privately</label>
          </p>
          <p>
            <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
          </p>
        </b-popover>
      </div>
    </div>
    <div v-else>
      <a href="#" class="btn btn-warning mr-1" v-b-modal.signupModal @click.prevent>Tip:</a>
      <b-btn v-b-modal.signupModal v-for="tip in tipAmountsGuest" v-text="tip" :key="tip" variant="warning" class="mr-1"></b-btn>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import TipsMixin from '../mixins/tips.mixin'
  import TipBtn from './TipButtons'

  export default {
    components: {
      TipBtn
    },
    computed: {
      ...mapState({
        isLoggedIn: state => state.user.isLoggedIn,
        user: state => state.user
      }),
      ...mapGetters({
        currentRoom: 'chat/currentRoom',
        offline: 'chat/offline'
      }),
      enableCustom () {
        return this.tip > 0
      }
    },
    mixins: [TipsMixin],
    data () {
      return {
        tip: 0,
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
