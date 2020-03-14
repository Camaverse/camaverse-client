<template lang="pug">
    b-navbar.nav-secondary.nav-tags-header.bg-dark(toggleable='md', type='dark')
        tag-links(:tags="tags")
</template>
<script>
import tags from '@/config/tags'
import TagLinks from './TagLinks'
export default {
  name: 'tag-nav',
  components: { TagLinks },
  data () {
    return {
      tags: tags
    }
  }
}
</script>
