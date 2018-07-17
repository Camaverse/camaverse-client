<template>
  <header>
    <nav class="nav-primary navbar">
      <router-link to="/" class="brand text-white">
        Camaverse<span class="text-brand-alt brand-small">.com</span>
      </router-link>
      <guest-header-links></guest-header-links>
      <header-info-guest></header-info-guest>
      <header-info-user></header-info-user>
      <logout-link></logout-link>
    </nav>
  </header>
</template>
<style>
  .nav-primary {
    background: rgb(39,71,110);
    border-bottom: 3px solid #EAF8BF;
    color: #fff;
    display: flex;
    height: 45px;
    left: 0;
    padding: 10px 1%;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
  }

  .nav-primary a{
    color: #fff;
  }
</style>
<script>
  import GuestHeaderLinks from './GuestHeaderLinks'
  import HeaderInfoGuest from './HeaderInfoGuest'
  import HeaderInfoUser from './HeaderInfoUser'
  import LogoutLink from '../LogoutLink'

  export default {
    components: {
      GuestHeaderLinks,
      HeaderInfoGuest,
      HeaderInfoUser,
      LogoutLink
    }
  }
</script>
