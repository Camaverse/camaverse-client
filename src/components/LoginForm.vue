<template>
  <form action="#" method="post" @submit.prevent="sendLogin" class="login-form">
    <div class="login-form-inner">
      <p><input type="username" name="username" placeholder="Username" value="lsharpe" v-model="login.username"></p>
      <p><input type="password" name="password" placeholder="Password" value="royalties" autocomplete="complete-password" v-model="login.password"></p>
      <p>
        <button :disabled="!isLoginValid" class="btn btn-primary" id="login-btn">Login</button>
        <b-popover target="login-btn" placement="bottom" title="Login Failed" :disabled="!showLoginFail"
                   :show.sync="showLoginFail">
          Please check you password and username.
        </b-popover>
      </p>
      <p>
        <a href="#" v-b-modal.signupModal @click.prevent>Not A Member? Join For Absolutely Free!</a>
      </p>
    </div>
  </form>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        showLoginFail: false,
        login: {
          password: 'royalties',
          username: 'user 1'
        }
      }
    },
    name: 'login-form',
    methods: {
      ...mapActions({
        'loginAction': 'user/login'
      }),
      clearLogin () {
        this.login.username = ''
        this.login.password = ''
      },
      handleLogin (res) {
        this.$root.$emit('bv::hide::modal', 'loginModal')
        this.clearLogin()
      },
      rejectLogin (res) {
        console.log('REJECT LOGIN', res)
        this.showLoginFail = true
      },
      sendLogin () {
        this.loginAction(this.login)
        .then(this.handleLogin)
        .catch(this.rejectLogin)
      }
    },
    computed: {
      ...mapState({
        isLoggedIn: state => state.user.isLoggedIn
      }),
      isLoginValid: function () {
        return this.login.password !== '' && this.login.username !== ''
      }
    }
  }
</script>
