<template>
  <div class="tip-box">
    <div class="flex" v-if="user.isLoggedIn">
      <div>
        <a href="#" class="btn btn-warning mr-1 btn-sm">Tip:</a>
        <b-btn @click="sendTip(tip)" v-for="tip in tipAmountsUser" v-text="tip" :key="tip" variant="warning" class="mr-1"></b-btn>
        <a href="#" class="btn btn-warning mr-1 btn-sm">More Tips</a>
        <a href="#" class="btn btn-success mr-1 btn-sm">Get Coins</a>
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
  import {api} from '../config'

  export default {
    computed: {
      ...mapGetters([
        'broadcaster',
        'user'
      ])
    },
    methods: {
      sendTip (amount) {
        let tip = {
          amount,
          from: {
            slug: this.user.slug,
            username: this.user.username
          },
          to: {
            id: this.broadcaster._id,
            show: this.broadcaster.status,
            slug: this.broadcaster.slug
          },
          clientTime: Date.now()
        }
        this.$http.post(api.getURL() + '/tips', tip)
      }
    },
    data () {
      return {
        tipAmt: null,
        tipAmountsGuest: [1, 5, 10, 25, 50, 100, 250, 500],
        tipAmountsUser: [5, 10, 25, 50, 100]
      }
    }
  }
</script>
<style>
  .custom-tip {
    width: 50px;
  }
</style>
