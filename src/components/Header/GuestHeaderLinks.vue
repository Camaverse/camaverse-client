<template>
  <div v-if="!isLoggedIn">
    <a href="#" v-b-modal.signupModal @click.prevent>Join For Free</a> |
    <a href="#" v-b-modal.loginModal @click.prevent>Login</a>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        isLoggedIn: state => state.user.isLoggedIn
      })
    },
    name: 'guest-header-links'
  }
</script>
