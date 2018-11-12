<template lang="pug">
    header.header-global
        tag-nav
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
import TagNav from "./tag-nav";
export default {
    name: 'header-global',
    components: {TagNav},
    data () {
        return {
            searchRoutes: searchRoutes
        }
    }
}
</script>
<style lang="scss">
.nav-primary {
    background-color: #006992;
    padding: 0 10px;
}
</style>