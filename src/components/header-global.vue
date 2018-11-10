<template lang="pug">
    header.header-global
        b-navbar.nav-secondary.nav-tags-header.bg-dark(toggleable='md', type='dark')
            b-collapse#nav_collapse(is-nav='')
                b-navbar-nav
                    b-nav-item(:to='`/${tag}`', v-for='(tag, index) in tags', :key='index') \#{{tag}}
        b-navbar.nav-primary.hasTagList(toggleable='lg', type='dark')
            b-navbar-toggle(target='nav_collapse')
            b-navbar-brand(to='/') Camaverse
            b-collapse#nav_collapse(is-nav='')
                b-navbar-nav
                    b-nav-item(v-if='searchRoutes' v-for='rt in searchRoutes', :key='rt' :to='"/" + rt.toLowerCase()') {{rt}}
                b-navbar-nav.ml-auto
                    b-nav-form
                        b-form-input.mr-sm-2(size='sm', type='text', placeholder='Search')
                            b-button.my-2.my-sm-0(size='sm', type='submit') Search
                b-navbar-nav.ml-auto
                    b-nav-item(to='/') Make $$$ Streaming!
            b-navbar-nav.ml-auto
                b-nav-item.d-none.d-md-block(to='/join') Join For A Free Show!
                b-nav-item.d-block.d-sm-none(to='/join') Join Free
            b-navbar-nav.ml-auto
                b-nav-item(to='/login') Login
</template>
<script>
import searchRoutes from '@/config/searchRoutes'
import tags from '@/config/tags'
export default {
    name: 'header-global',
    data () {
        return {
            searchRoutes: searchRoutes,
            tags: tags
        }
    }
}
</script>
<style lang="scss">
.nav-primary {
    background-color: #006992;
    padding: 0 10px;
}

.nav-secondary {
    font-size: .75em;
    padding: 0 10px;
    &.navbar-expand-md .navbar-nav .nav-link {
        padding: 0;
    }
}
</style>