<template lang="pug">
    b-navbar.nav-secondary.nav-tags-header.bg-dark(toggleable='md', type='dark')
        b-collapse#nav_collapse(is-nav='')
            b-navbar-nav
                b-nav-item.pr-2(:to='`/tagged/${tag}`', v-for='(tag, index) in tags', :key='index') \#{{tag}}
</template>
<script>
import tags from '@/config/tags'
export default {
    name: 'tag-nav',
    data () {
        return {
            tags: tags
        }
    }
}
</script>
<style lang="scss">
.nav-secondary {
    font-size: .75em;
    padding: 0 10px;
    &.navbar-expand-md .navbar-nav .nav-link {
        padding: 0;
    }
}
</style>