<template>
  <header>
    <nav class="nav-primary navbar">
      <router-link to="/">CWL</router-link>
      <guest-header-links></guest-header-links>
      <header-info-guest></header-info-guest>
      <header-info-user></header-info-user>
      <logout-link></logout-link>
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
  import GuestHeaderLinks from './GuestHeaderLinks'
  import HeaderInfoGuest from './HeaderInfoGuest'
  import HeaderInfoUser from './HeaderInfoUser'
  import LogoutLink from './LogoutLink'

  export default {
    components: {
      GuestHeaderLinks,
      HeaderInfoGuest,
      HeaderInfoUser,
      LogoutLink
    }
  }
</script>
