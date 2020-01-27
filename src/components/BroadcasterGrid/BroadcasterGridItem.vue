<template lang="pug">
    article.broadcaster-grid-item
        .broadcaster-thumb
            router-link(:to="`/watch/${item.slug}`")
                nsfw-img(:url="item.thumb")
        .broadcaster-info
            .broadcaster-name
                router-link(:to="`/watch/${item.slug}`") {{item.username}}
            .broadcaster-gender {{item.gender}}
            .broadcaster-show {{item.show}}
        .broadcaster-topic {{item.topic}}
        tag-links(:tags="item.tags")
</template>
<script>
import TagLinks from '../TagLinks'
import NsfwImg from '../NSFWImg'
export default {
  name: 'broadcaster-grid',
  components: { NsfwImg, TagLinks },
  props: ['item']
}
</script>
