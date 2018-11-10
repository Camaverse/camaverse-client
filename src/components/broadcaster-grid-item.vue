<template lang="pug">
    article.broadcaster-grid-item
        .broadcaster-thumb
            router-link(:to="`/watch/${item.slug}`")
                img(src="//p-hold.com/300/100")
        .broadcaster-topic {{item.topic}}
        .broadcaster-name
            router-link(:to="`/watch/${item.slug}`") {{item.username}}
</template>
<style lang="scss">
</style>
<script>
export default {
    name: 'broadcaster-grid',
    props: ['item']
}
</script>