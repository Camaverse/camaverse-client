<template>
  <form action="#" method="post" @submit.prevent="sendLogin" class="login-form">
    <div class="login-form-inner">
      <p><input type="username" name="username" placeholder="Username" value="lsharpe" v-model="login.username"></p>
      <p><input type="password" name="password" placeholder="Password" value="royalties" v-model="login.password"></p>
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
  import { mapGetters } from 'vuex'

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
      clearLogin () {
        this.login.username = ''
        this.login.password = ''
      },
      commitUser (usr) {
        this.$store.commit('user/set', usr)
        this.$store.commit('coins/updateCoins', usr.coins)
        this.$localStorage.set('user', JSON.stringify(usr))
      },
      handleLogin (res) {
        if (res.ok) {
          this.commitUser(res.data.data.user)
          this.$root.$emit('bv::hide::modal', 'loginModal')
          this.clearLogin()
        }
      },
      rejectLogin (res) {
        console.log('REJECT LOGIN', res)
        this.showLoginFail = true
      },
      sendLogin () {
        let url = process.env.API_PATH + 'users/login'
        this.$http.post(url, this.login)
        .then(this.handleLogin)
        .catch(this.rejectLogin)
      }
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'user/isLoggedIn'
      }),
      isLoginValid: function () {
        return this.login.password !== '' && this.login.username !== ''
      }
    }
  }
</script>
