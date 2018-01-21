<template>
  <div>
    <a href="#" class="btn btn-success mr-1" id="get-more">Get Coins</a>
    <pop-over target="get-more" placement="right" title="Get More Coins" id="popover-get-more-coins" @click.prevent></pop-over>
  </div>
</template>
<script>
  import PopOver from './PopOver'

  export default {
    components: {
      PopOver
    }
  }
</script>
