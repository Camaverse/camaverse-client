<template lang="pug">
    div
        div(v-if="!items.length")
            h2 Oops! Nothing to see here!
            p There seems to be no broadcasters available for this filter
        div.grid-wrapper
            section.broadcaster-grid(v-if="items.length")
                broadcaster-grid-item(v-for="(item, index) in items", :item="item" :key="index")
            ad-space.d-none.d-lg-block(orientation="vertical")
</template>
<style lang="scss">
.grid-wrapper {
    display: flex;
}

@media (max-width: 599px) {
    .grid-wrapper {
        padding: 0 10px;
    }
}

.broadcaster-grid {
    display: grid;
    flex: 1;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: .2rem;
}
.broadcaster-grid-wrapper {
    display: flex;
}
.broadcaster-grid-item {
    overflow: hidden;
    .broadcaster-thumb {
        background: #ccc;
        height: 100px;
    }
    .broadcaster-info {
        display: flex;
        font-size: .8em;
        justify-content: space-between;
        .broadcaster-name {
            font-weight: bold;
        }
    }
    .broadcaster-topic {
        font-size: .9em;
    }
}

</style>
<script>
import BroadcasterGridItem from '@/components/BroadcasterGrid/BroadcasterGridItem'
import AdSpace from '@/components/AdSpace'
export default {
  name: 'broadcaster-grid',
  components: {
    AdSpace,
    BroadcasterGridItem
  },
  props: ['items']
}
</script>
