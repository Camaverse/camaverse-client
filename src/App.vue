<template>
  <div id="app">
    <notifications group="foo" />
    <header-global id="header-global"></header-global>
    <main id="main">

      <!-- Join Modal -->
      <b-modal id="signupModal" ref="signupModal" title="Join Now To Tip!" :hide-footer="true">
        <div class="flex">
          <sign-up-form></sign-up-form>
        </div>
      </b-modal>

      <!-- login modal -->
      <b-modal id="loginModal" ref="loginModal" title="Welcome Back!" :hide-footer="true">
        <div class="flex">
          <login-form></login-form>
        </div>
      </b-modal>

      <router-view/>
    </main>
    <footer-global id="footer-global"></footer-global>
  </div>
</template>

<script>
import Vue from 'vue'
import FooterGlobal from './components/FooterGlobal.vue'
import SignUpForm from './components/SignUpForm.vue'
import LoginForm from './components/LoginForm.vue'
import HeaderGlobal from './components/HeaderGlobal.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

export default {
  name: 'app',
  components: {
    FooterGlobal,
    HeaderGlobal,
    LoginForm,
    SignUpForm
  }
}
</script>

<style>
  body {
    margin: 0;
    font-family: Arial;
  }
  .flex {
    display: flex;
  }

  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  #main {
    flex: 1;
    padding-top: 40px;
    width: 85%;
    margin: auto;
  }
</style>
