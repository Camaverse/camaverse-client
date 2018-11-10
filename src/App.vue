<template lang="pug">
  #app.hasHeaderTags
    header-global
    main
        .route
            router-view
        broadcaster-grid
    footer-global
</template>
<script>
import BroadcasterGrid from './components/broadcaster-grid'
import FooterGlobal from './components/footer-global'
import HeaderGlobal from './components/header-global'
export default {
    components: {
        BroadcasterGrid,
        FooterGlobal,
        HeaderGlobal
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