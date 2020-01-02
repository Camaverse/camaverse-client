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
import { mapActions } from 'vuex'
export default {
  name: 'watch',
  components: { Broadcast },
  beforeRouteUpdate (to, from, next) {
    this.broadcasterInit(to.params.slug)
    next()
  },
  created () {
    this.broadcasterInit(this.$route.params.slug)
  },
  data () {
    return {
      username: null,
      slug: null,
      topic: null
    }
  },
  methods: {
    broadcasterInit (slug) {
      this.updateBroadcaster(slug)
      const room = {
        slug: this.slug,
        username: this.username
      }
      this.addRecent(room)
    },
    updateBroadcaster (slug) {
      this.slug = slug
      const broadcaster = broadcasters.broadcasters.find(b => b.slug === this.slug)
      Object.keys(broadcaster).forEach(key => {
        this[key] = broadcaster[key]
      })
    },
    ...mapActions('user', ['addRecent'])
  }
}
</script>
<style>
    .header-watch {
        display: flex;
        align-items: center;
    }
</style>
