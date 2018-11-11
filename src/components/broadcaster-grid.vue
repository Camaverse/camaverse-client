<template lang="pug">
    section.broadcaster-grid
        broadcaster-grid-item(v-for="(item, index) in items", :item="item" :key="index")
</template>
<style lang="scss">
.broadcaster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: .2rem;
}
.broadcaster-grid-item {
    overflow: hidden;
    .broadcaster-thumb {
        background: #ccc;
        height: 100px;
    }
    .broadcaster-name {
        font-size: .8em;
    }
    .broadcaster-topic {
        font-size: .9em;
        font-weight: bold;
    }
}
</style>
<script>
import BroadcasterGridItem from '@/components/broadcaster-grid-item';
export default {
    name: 'broadcaster-grid',
    components: {
        BroadcasterGridItem
    },
    props: ['items']
}
</script>