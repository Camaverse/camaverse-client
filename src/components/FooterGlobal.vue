<template>
  <footer class="footer-main">
    <a :href="assets + 'privacy.html'">Privacy Policy</a>
    <a :href="assets + 'terms-of-service.html'">Terms Of Use</a>
    &copy; {{year}} ComeWatchLive.com
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
