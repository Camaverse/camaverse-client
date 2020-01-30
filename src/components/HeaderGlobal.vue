<template lang="pug">
    header.header-global(:class="{hasDrop, hasBackground}")
        tag-nav
        b-navbar.nav-primary.hasTagList(toggleable='lg', type='dark')
            b-navbar-toggle(target='nav_collapse')
            b-navbar-brand(to='/') {{appTitle}}
            b-collapse#nav_collapse(is-nav='')
                b-navbar-nav
                    b-nav-item(v-if='searchRoutes' v-for='rt in searchRoutes', :key='rt' :to='"/" + rt.toLowerCase()') {{rt}}
                    b-nav-item(:to='"/recent"', v-if="showRecent") Recent
                b-navbar-nav.ml-auto
                    b-nav-form
                        b-form-input.mr-sm-2(size='sm', type='text', placeholder='Search')
                            b-button.my-2.my-sm-0(size='sm', type='submit') Search
                b-navbar-nav.ml-auto
                    b-nav-text {{username}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    b-nav-item(to='/') Make $$$ Streaming!
            b-navbar-nav.ml-auto(v-if='!isLoggedIn')
                b-nav-item.d-none.d-md-block(@click="openJoin()") Join For A Free Show!
                b-nav-item.d-block.d-sm-none(@click="openJoin()") Join Free
            b-navbar-nav.ml-auto
                b-nav-item(@click='openLogin()', v-if='!isLoggedIn') Login
                b-nav-item(@click='logout()', v-if='isLoggedIn') Logout
        .header-drop(v-if="showDrop")
            .header-drop-inner
                a.header-drop-close(@click="hideDrop()") X
                login-form.flex-1.mr-2(:onSubmit="onSubmitLogin", v-if="showLogin")
                join-form.flex-1(:onSubmit="onSubmitJoin", v-if="showJoin")
</template>
<script>
import JoinForm from '@/components/Forms/Join.Form'
import LoginForm from '@/components/Forms/Login.Form'
import searchRoutes from '@/config/searchRoutes'
import TagNav from '@/components/TagNav'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'header-global',
  components: { JoinForm, LoginForm, TagNav },
  data () {
    return {
      appTitle: process.env.VUE_APP_TITLE,
      dropContent: null,
      scrollPosition: null,
      searchRoutes: searchRoutes
    }
  },
  computed: {
    hasBackground: function () {
      return this.scrollPosition >= 360
    },
    hasDrop: function () {
      return this.dropContent !== null
    },
    showDrop: function () {
      return this.dropContent !== null
    },
    showJoin: function () {
      return this.dropContent === 'join'
    },
    showLogin: function () {
      return this.dropContent === 'login'
    },
    ...mapState({
      username: state => state.user.username,
      isLoggedIn: state => state.user.isLoggedIn,
      showRecent: state => state.user.recent.rooms.length
    })
  },
  destroy () {
    window.removeEventListener('scroll', this.updateScroll)
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    hideDrop () {
      this.dropContent = null
    },
    onSubmitLogin () {
      console.log('login submitted')
    },
    onSubmitJoin () {
      console.log('join submitted')
    },
    openJoin () {
      this.dropContent = 'join'
    },
    openLogin () {
      this.dropContent = 'login'
    },
    updateScroll () {
      this.scrollPosition = window.scrollY
    },
    ...mapActions('user', { logout: 'logout' })
  }
}
</script>
<style lang="scss">
.header-global {
    background: #fff;
    position: fixed;
    width: 100%;
    z-index: 10;
}
.header-drop {
    display: flex;
    justify-content: flex-end;
    .header-drop-inner {
        width: 40%;
    }
    .header-drop-close {
        background: #fff;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        height: 25px;
        position: absolute;
        right: 0;
        text-align: center;
        width: 25px;
    }
}
.header-form {
    background: rgba(0, 105, 146, 1);
    border-radius: 10px;
    color: #fff;
    margin-top: 5px;
    padding: 20px;
}
.nav-primary {
    background-color: #006992;
    padding: 0 10px;
}

.nav-secondary {
    padding: 0 10px;
}

.page-home {
    .header-global {
        background-color: transparent;
        &.hasBackground .nav-primary {
            background-color: #006992;
        }
    }
    .nav-primary {
        background-color: transparent;
    }
    .navbar-dark .navbar-nav .nav-link {
        color: #fff;
    }
    .navbar-dark .navbar-text {
        color: #fff;
    }
}
</style>
