<template lang="pug">
  #app.hasHeaderTags(:class="pathClass")
    splash
    header-global
    main
        .route
            router-view
        broadcaster-grid(:items="items")
    footer-global
</template>
<script>
import broadcasters from '@/mock/broadcasters'

import BroadcasterGrid from '@/components/BroadcasterGrid/BroadcasterGrid'
import FooterGlobal from '@/components/FooterGlobal'
import HeaderGlobal from '@/components/HeaderGlobal'
import Splash from '@/components/Splash'
export default {
  components: {
    Splash,
    BroadcasterGrid,
    FooterGlobal,
    HeaderGlobal
  },
  computed: {
    pathClass: function () {
      const path = this.$route.path
      return path === '/' ? 'page-home' : 'page-' + path
    }
  },
  data () {
    return {
      items: broadcasters.broadcasters
    }
  }
}
</script>
<style lang="scss">
    #app {
        display: flex;
        flex-direction: column;
    }
    main {
        padding: 65px 10px 58px 10px;
    }
    .page-home {
        main {
            padding: 15px 0 58px 0;
        }
    }
    .hasDrop + main {
        /*padding-top: 225px;*/
    }
    .flex {
        display: flex;
    }
    .flex-1 {
        flex: 1;
    }
    .right {
        text-align: right;
    }
    .route {
        padding-bottom: 10px;
    }
</style>
