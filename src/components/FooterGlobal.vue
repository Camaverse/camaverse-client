<template>
  <footer class="footer-main">
    <small>
      <a :href="assets + 'privacy.html'" target="_blank">Privacy Policy</a> |
      <a :href="assets + 'terms-of-service.html'" target="_blank">Terms Of Use</a> |
      &copy; {{year}}
    </small>
    <router-link to="/" class="brand text-white">
      Camaverse<span class="text-brand-alt brand-small">.com</span>
    </router-link>
  </footer>
</template>
<script>
  export default {
    data () {
      return {
        assets: process.env.ASSETS_PATH,
        year: (new Date()).getFullYear()
      }
    }
  }
</script>
<style>
  .footer-main {
    background: rgb(39,71,110);
    border-top: 3px solid #EAF8BF;
    color: #fff;
    height: 40px;
    padding: 10px 1%;
  }

  .footer-main  a{
    color: #fff;
  }
</style>
