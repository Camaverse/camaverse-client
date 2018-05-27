<template>
  <div v-if="!isLoggedIn">
    <a href="#" v-b-modal.signupModal @click.prevent>Join For Free</a> |
    <a href="#" v-b-modal.loginModal @click.prevent>Login</a>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: 'user/isLoggedIn'
      })
    },
    name: 'guest-header-links'
  }
</script>
