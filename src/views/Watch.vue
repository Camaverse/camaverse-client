<template lang="pug">
  .watch
    header.header-watch
        h1.mr-2 {{username}}
        h4.text-muted.mb-0 {{topic}}
    section.content-watch
        broadcast
</template>
<script>
import Broadcast from '@/components/Broadcast'
import broadcasters from '@/mock/broadcasters'
export default {
  name: 'watch',
  components: { Broadcast },
  created () {
    this.updateBroadcaster(this.$route.params.slug)
  },
  data () {
    return {
      username: null,
      slug: null,
      topic: null
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.updateBroadcaster(to.params.slug)
    next()
  },
  methods: {
    updateBroadcaster (slug) {
      this.slug = slug
      const broadcaster = broadcasters.broadcasters.find(b => b.slug === this.slug)
      Object.keys(broadcaster).forEach(key => {
        this[key] = broadcaster[key]
      })
    }
  }
}
</script>
<style>
    .header-watch {
        display: flex;
        align-items: center;
    }
</style>
