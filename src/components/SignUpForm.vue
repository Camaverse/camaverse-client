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
  import { mapActions, mapGetters } from 'vuex'

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
      ...mapActions({
        'loginAction': 'user/login',
        'register': 'user/register'
      }),
      loginUser () {
        this.login.username = this.signup.username
        this.login.password = this.signup.password
        this.loginAction(this.login)
      },
      handleSignup () {
        this.$root.$emit('bv::hide::modal', 'signupModal')
        this.signup.username = ''
        this.signup.password = ''
        this.signup.email = ''
      },
      sendSignup: function () {
        this.register(this.signup)
          .then(() => {
            this.loginUser()
            this.handleSignup()
          })
          .catch(console.log)
      }
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'user/isLoggedIn',
        user: 'user'
      }),
      isSignupValid: function () {
        return this.signup.password !== '' && this.signup.username !== '' && this.signup.email !== ''
      }
    }
  }
</script>
