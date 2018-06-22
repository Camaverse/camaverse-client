<template>
  <div v-if="isLoggedIn">
    <a href="#" @click.prevent="logout">Logout</a>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        isLoggedIn: state => state.user.isLoggedIn
      })
    },
    methods: {
      ...mapActions({
        logout: 'user/logout'
      })
    },
    name: 'logout-link'
  }
</script>
