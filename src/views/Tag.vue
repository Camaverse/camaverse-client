<template lang="pug">
    .page-tags
        h2.page-title Live {{tag | capitalize }} Web Cams
        .content-main(v-if="list.length")
            broadcaster-grid(:items="list")
        .tag-grid(v-else)
            h3 OOPS! We couldn't find any broadcasters in that category.
            p Checkout more below.
        hr
</template>
<script>
import broadcasters from '@/mock/broadcasters'
import BroadcasterGrid from '../components/BroadcasterGrid/BroadcasterGrid'
import { mapState } from 'vuex'
export default {
  components: { BroadcasterGrid },
  created () {
    this.tag = this.$route.params.tag
  },
  beforeRouteUpdate (to, from, next) {
    this.tag = to.params.tag
    next()
  },
  computed: {
    list: state => {
      if (state.tag === 'recent') {
        return state.recent.rooms
      } else {
        return broadcasters.broadcasters.filter(b => b.tags.indexOf(state.tag) > -1)
      }
    },
    ...mapState('user', ['slug', 'recent'])
  },
  data () {
    return {
      tag: ''
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
<style lang="scss">
    .page-title {
        background: #fff;
        position: fixed;
        top: 55px;
        width: 100%;
    }
    .content-main {
        padding-top: 50px;
    }
</style>
