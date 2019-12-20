<template lang="pug">
    .page-tags
        h2 Live {{$route.params.tag | capitalize }} Web Cams
        div(v-if="items.length")
            broadcaster-grid(:items="items")
        .tag-grid(v-else)
            h3 OOPS! We couldn't find any broadcasters in that category.
            p Checkout more below.
        hr
</template>
<script>
import broadcasters from '@/config/broadcasters'
import BroadcasterGrid from '../components/BroadcasterGrid/BroadcasterGrid'
export default {
  components: { BroadcasterGrid },
  data () {
    return {
      items: broadcasters.broadcasters.filter(b => b.tags.indexOf(this.$route.params.tag) > -1)
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
