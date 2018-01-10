<template>
  <p class="broadcaster-tags">
    <a class="broadcaster-tag" href="#" @click.prevent="loadTag(tag)" v-for="tag in currentRoom.tags" :key="tag">#{{tag}}</a>
  </p>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'currentRoom'
      ])
    },
    name: 'broadcaster-tag-list',
    methods: {
      loadTag (tag) {
        this.$emit('loadTag', tag)
      }
    },
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
