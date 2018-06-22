<template>
  <div v-if="!isLoggedIn">
    Hi {{username}}

    <b-button variant="warning" v-b-modal.signupModal>
      Get Free Coins!
    </b-button>

  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        isLoggedIn: state => state.user.isLoggedIn,
        username: state => state.user.username
      })
    },
    name: 'header-info-guest'
  }
</script>
