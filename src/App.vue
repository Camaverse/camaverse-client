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
import data from '@/config/data';

import BroadcasterGrid from './components/broadcaster-grid'
import FooterGlobal from './components/footer-global'
import HeaderGlobal from './components/header-global'
import Splash from "./components/splash";
export default {
    components: {
        Splash,
        BroadcasterGrid,
        FooterGlobal,
        HeaderGlobal
    },
    data (){
        return {
            items: data.broadcasters
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