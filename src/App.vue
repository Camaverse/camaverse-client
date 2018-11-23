<template lang="pug">
  #app.hasHeaderTags
    splash
    header-global
    main
        .route
            router-view
        broadcaster-grid(:items="items")
    footer-global
</template>
<script>
import broadcasters from '@/config/broadcasters';

import BroadcasterGrid from '@/components/BroadcasterGrid/BroadcasterGrid'
import FooterGlobal from '@/components/FooterGlobal'
import HeaderGlobal from '@/components/HeaderGlobal'
import Splash from "@/components/Splash";
export default {
    components: {
        Splash,
        BroadcasterGrid,
        FooterGlobal,
        HeaderGlobal
    },
    data (){
        return {
            items: broadcasters .broadcasters
        }
    }
}
</script>
<style lang="scss">
    main {
        padding: 35px 10px 58px 10px;
    }
    .flex {
        display: flex;
    }
    .flex-1 {
        flex: 1;
    }
    .route {
        padding-bottom: 10px;
    }
</style>