<template>
  <div>
    <span v-if="!isLoggedIn">
      <a href="#" class="btn btn-success mr-1" v-b-modal.signupModal @click.prevent>Get Coins</a>
    </span>
    <span v-else>
      <a href="#" class="btn btn-success mr-1" id="get-more">Get Coins</a>
      <pop-over target="get-more" placement="right" title="Get More Coins" id="popover-get-more-coins" @click.prevent></pop-over>
    </span>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import PopOver from './PopOver'

  export default {
    components: {
      PopOver
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'user/isLoggedIn'
      })
    }
  }
</script>
