<template>
  <form action="#" method="post" @submit.prevent="sendLogin" class="login-form">
    <div class="login-form-inner">
      <p><input type="username" name="username" placeholder="Username" value="lsharpe" v-model="login.username"></p>
      <p><input type="password" name="password" placeholder="Password" value="royalties" v-model="login.password"></p>
      <p><button :disabled="!isLoginValid" class="btn btn-primary">Login</button></p>
      <p>
        <a href="#" v-b-modal.signupModal>Not A Member? Join For Absolutely Free!</a>
      </p>
    </div>
  </form>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        login: {
          password: 'royalties',
          username: 'userx'
        }
      }
    },
    name: 'login-form',
    methods: {
      sendLogin: function () {
        let url = process.env.API_PATH + '/signin'
        this.$http.post(url, this.login).then((res) => {
          if (res.data.success) {
            this.setUser(res.data.user)
            this.$root.$emit('bv::hide::modal', 'loginModal')
            this.login.username = ''
            this.login.password = ''
          }
        })
      },
      setUser (user) {
        let userString = JSON.stringify(user)
        this.$store.commit('setUser', user)
        this.$localStorage.set('user', userString)
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'user'
      ]),
      isLoginValid: function () {
        return this.login.password !== '' && this.login.username !== ''
      }
    }
  }
</script>
