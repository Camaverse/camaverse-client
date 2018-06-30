<template>
  <p class="broadcaster-tags">
    <a class="broadcaster-tag" href="#" @click.prevent="loadTag(tag)" v-for="tag in tags" :key="tag">#{{tag}}</a>
  </p>
</template>
<script>
  export default {
    methods: {
      loadTag (tag) {
        if (this.loadPage) {
          this.$router.push('/' + tag)
        } else {
          this.$emit('loadTag', tag)
        }
      }
    },
    name: 'broadcaster-tag-list',
    props: {
      tags: Array,
      loadPage: {
        default: false,
        type: Boolean
      }
    },
    sockets: {
      updateTags (tags) {
        this.$store.commit('chat/updateTags', tags)
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
