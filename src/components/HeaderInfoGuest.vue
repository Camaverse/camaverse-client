<template>
  <div v-if="!isLoggedIn">
    Hi {{username}}

    <b-button variant="warning" v-b-modal.signupModal>
      Get Free Coins!
    </b-button>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: 'user/isLoggedIn',
        username: 'user/username'
      })
    },
    name: 'header-info-guest'
  }
</script>
