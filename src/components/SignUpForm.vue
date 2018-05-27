<template>
  <form action="#" method="post" @submit.prevent="sendSignup" class="join-form">
    <div class="join-form-inner">
      <p><input type="email" name="email" placeholder="Email" value="larry.l.sharpe@gmail.com" v-model="signup.email"></p>
      <p><input type="username" name="username" placeholder="Username" value="lsharpe" v-model="signup.username"></p>
      <p><input type="password" name="password" placeholder="Password" value="royalties" v-model="signup.password"></p>
      <p><button :disabled="!isSignupValid" class="btn-success btn">Join For Free!</button></p>
      <p>
        <a href="#" v-b-modal.loginModal @click.prevent>Already A Member? Login</a>
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
          password: '',
          username: ''
        },
        signup: {
          email: '',
          password: '',
          username: ''
        }
      }
    },
    name: 'sign-up-form',
    methods: {
      logout: function () {
        let url = process.env.API_PATH + '' + this.user.username
        this.$http.get(url).then((res) => {
          if (res.data.success) {
            this.$store.commit('resetUser')
            this.$router.push('/')
          }
        })
      },
      sendLogin: function () {
        let url = process.env.API_PATH + 'signin'
        this.$http.post(url, this.login).then((res) => {
          if (res.data.success) {
            this.$store.commit('setUser', res.data.user)
            this.$root.$emit('bv::hide::modal', 'signupModal')
            this.login.username = ''
            this.login.password = ''
          }
        })
      },
      sendSignup: function () {
        let url = process.env.API_PATH + 'signup'
        this.$http.post(url, this.signup).then((res) => {
          if (res.data.success) {
            this.login.username = this.signup.username
            this.login.password = this.signup.password
            this.sendLogin()
            this.signup.username = ''
            this.signup.password = ''
            this.signup.email = ''
          }
        })
      }
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'user/isLoggedIn',
        user: 'user'
      }),
      isLoginValid: function () {
        return this.login.password !== '' && this.login.username !== ''
      },
      isSignupValid: function () {
        return this.signup.password !== '' && this.signup.username !== '' && this.signup.email !== ''
      }
    }
  }
</script>
