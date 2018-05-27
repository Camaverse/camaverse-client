<template>
  <footer class="footer-main">
    <a :href="assets + 'privacy.html'" target="_blank">Privacy Policy</a>
    <a :href="assets + 'terms-of-service.html'" target="_blank">Terms Of Use</a>
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
