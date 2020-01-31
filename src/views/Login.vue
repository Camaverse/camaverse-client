<template lang="pug">
  .login
    h1
      span(v-if="!hasError") Logging In
      span.hasError(v-if="hasError") Ooops! There was an error. Please Try again.
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      hasError: false
    }
  },
  created () {
    const { token } = this.$route.params
    const deviceID = localStorage.getItem('deviceID')
    if (!deviceID) {
      this.hasError = true
    }
    this.login({ token, deviceID })
      .then(() => {
        this.$router.push('/')
      })
      .catch(() => {
        this.hasError = true
      })
  },
  methods: {
    ...mapActions('user', { login: 'login' })
  }
}
</script>
<style scoped>
    .hasError {
        color: #c41400;
    }
</style>
