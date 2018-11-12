<template lang="pug">
    .page-tags
        h2 {{$route.params.tag}}
        .tag-grid
            broadcaster-grid(:items="items")
        hr
</template>
<script>
    import data from '@/config/data';
    import BroadcasterGrid from "../components/broadcaster-grid";
    export default {
        components: {BroadcasterGrid},
        data () {
            return {
                items: data.broadcasters.filter(b => b.tags.indexOf(this.$route.params.tag) > -1)
            }
        }
    }
</script>