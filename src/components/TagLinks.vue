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
    font-size: .65em;
    &.navbar-nav {
        display: block;
    }
    .nav-item {
        display: inline;
    }
    .nav-link {
        display: inline;
        padding: 0;
    }
}
</style>
