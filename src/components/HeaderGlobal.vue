<template>
  <header>
    <nav class="nav-primary navbar">

      <router-link to="/">CWL</router-link>

      <div v-if="!isLoggedIn">
        <a href="#" v-b-modal.signupModal ref="signupModal" id="signupModal">Join For Free</a> |
        <a href="#" v-b-modal.loginModal ref="loginModal" id="loginModal">Login</a>
      </div>

      <div v-if="user.username">
        Hi {{user.username}}

        <b-button variant="warning" id="btn-coins" @click.prevent="coinsClick()">
          Coins
          <b-badge variant="light">
            {{user.coins ? user.coins.balance : 0}}
          </b-badge>
        </b-button>

        <pop-over v-if="isLoggedIn" target="btn-coins" placement="bottom" title="Get More Coins" id="popover-get-more-coins-1"></pop-over>

<!--
        <b-button variant="info">
          XP
          <b-badge variant="light">
            {{user.xp || 0}}
          </b-badge>
        </b-button>
-->
      </div>
      <div v-if="isLoggedIn">
        <a href="#" @click.prevent="logout">Logout</a>
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
  import PopOver from './MainCoins.popover'

  export default {
    methods: {
      coinsClick () {
        if (!this.isLoggedIn) {
          console.log('open signupModal')
          this.$root.$emit('bv::show::popover', 'signupModal')
        }
      },
      leaveRoom () {
        if (this.currentRoom) {
          let room = this.currentRoom._id
          let user = this.user.slug
          let data = {room, user}
          this.$socket.emit('leaveRoom', data)
        }
      },
      logout: function () {
        let url = api.getURL() + '/logout/' + this.user.username
        this.$http.get(url).then((res) => {
          if (res.data.success) {
            this.leaveRoom()
            this.unsetUser()
            this.init()
            this.$router.push('/')
          }
        })
      },
      unsetUser () {
        this.$store.commit('resetUser')
        this.$localStorage.remove('user')
      },
      handleConnectGuest (err, guest) {
        if (err) console.log(err)
        else this.setUser(guest)
      },
      init () {
        let usr = this.$localStorage.get('user')
        if (usr) this.setUser(JSON.parse(usr))
        else this.$socket.emit('connect-guest', this.handleConnectGuest)
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
        'user',
        'currentRoom'
      ])
    },
    components: {
      PopOver
    }
  }
</script>
