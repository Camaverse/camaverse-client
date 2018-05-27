<template>
  <div v-if="isLoggedIn">
    <a href="#" @click.prevent="logout">Logout</a>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: 'user/isLoggedIn'
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
