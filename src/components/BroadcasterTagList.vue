<template>
  <p class="broadcaster-tags">
    <a class="broadcaster-tag" href="#" @click.prevent="loadTag(tag)" v-for="tag in tags" :key="tag">#{{tag}}</a>
  </p>
</template>
<script>
  export default {
    methods: {
      loadTag (tag) {
        this.$emit('loadTag', tag)
      }
    },
    name: 'broadcaster-tag-list',
    props: ['tags'],
    sockets: {
      updateTags (tags) {
        this.$store.commit('updateTags', tags)
      }
    }
  }
</script>
<style>
  .broadcaster-tags {
    margin: 0;
    font-size: .75em;
  }
  .broadcaster-tag {
    padding-right: 5px;
  }
</style>
