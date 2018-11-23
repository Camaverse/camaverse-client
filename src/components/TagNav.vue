<template lang="pug">
    b-navbar.nav-secondary.nav-tags-header.bg-dark(toggleable='md', type='dark')
        b-collapse#nav_collapse(is-nav='')
            tag-links(:tags="tags")
</template>
<script>
import tags from '@/config/tags'
import TagLinks from "./TagLinks";
export default {
    name: 'tag-nav',
    components: {TagLinks},
    data () {
        return {
            tags: tags
        }
    }
}
</script>
<style lang="scss">
.nav-secondary {
    padding: 0 10px;
}
</style>