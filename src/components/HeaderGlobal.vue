<template>
  <header>
    <nav class="nav-primary navbar">

      <router-link to="/">CWL</router-link>

      <div v-if="!isLoggedIn">
        <a href="#" v-b-modal.signupModal>Join For Free</a> |
        <a href="#" v-b-modal.loginModal>Login</a>
      </div>

      <div v-if="user.username">
        Hi {{user.username}}
      </div>
      <div v-if="isLoggedIn">
        <a href="#" @click="logout">Logout</a>
      </div>
    </nav>
  </header>
</template>
<style>
  .nav-primary {
    background: #fff;
    border-bottom: 1px solid #cbcbcb;
    display: flex;
    height: 20px;
    left: 0;
    padding: 10px 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import {api} from '../config'

  export default {
    methods: {
      logout: function () {
        let url = api.getURL() + '/logout/' + this.user.username
        this.$http.get(url).then((res) => {
          if (res.data.success) {
            this.$store.commit('resetUser')
            this.$localStorage.remove('user')
            this.$router.push('/')
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'user'
      ])
    }
  }
</script>
