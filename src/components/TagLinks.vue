<template lang="pug">
b-navbar-nav.tag-links
    b-nav-item.pr-2(:to='`/tagged/${tag}`', v-for='(tag, index) in tags', :key='index') \#{{tag}}
</template>
<script>
export default {
    name: 'tag-links',
    props: ['tags']
}
</script>
<style lang="scss">
.tag-links {
    font-size: .75em;
    .nav-link {
        padding: 0
    }
}
</style>