<template lang="pug">
    .page-tags
        h2 Live {{$route.params.tag}} Web Cams
        .tag-grid
            broadcaster-grid(:items="items")
        hr
</template>
<script>
    import broadcasters from '@/config/broadcasters';
    import BroadcasterGrid from "../components/broadcaster-grid";
    export default {
        components: {BroadcasterGrid},
        data () {
            return {
                items: broadcasters.broadcasters.filter(b => b.tags.indexOf(this.$route.params.tag) > -1)
            }
        }
    }
</script>