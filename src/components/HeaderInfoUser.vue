<template>
  <div v-if="isLoggedIn">
    Hi {{username}}

    <b-button variant="warning" id="btn-coins">
      Coins
      <b-badge variant="light">
        {{coins}}
      </b-badge>
    </b-button>

    <pop-over v-if="isLoggedIn" target="btn-coins" placement="bottom" title="Get More Coins" id="popover-get-more-coins-1" />
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import PopOver from './MainCoins.popover'
  export default {
    components: {
      PopOver
    },
    computed: {
      ...mapGetters({
        coins: 'coins/balance',
        isLoggedIn: 'user/isLoggedIn',
        username: 'user/username'
      })
    },
    name: 'header-info-user'
  }
</script>
