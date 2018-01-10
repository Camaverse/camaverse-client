<template>
  <div>
    <h3>{{tags}}</h3>
    <div class="broadcaster-grid">
      <div class="broadcaster-grid-inner">
        <broadcaster-grid-item :item="item" :index="index" v-for="(item, index) in items" :key="item.slug" v-on:loadTag="loadBroadcasters"></broadcaster-grid-item>
      </div>
    </div>
  </div>
</template>
<script>
  import BroadcasterGridItem from './BroadcasterGridItem.vue'
  import Vue from 'vue'
  export default {
    components: {
      BroadcasterGridItem
    },
    props: ['tags'],
    data () {
      return {
        itemsMap: {},
        items: [],
        limit: 10,
        offset: null,
        page: 1,
        pages: null,
        total: null
      }
    },
    sockets: {
      showChange (shows) {
        for (let s in shows) {
          let show = shows[s]
          let index = this.getIndexBySlug(show.slug)
          if (index !== false) {
            Vue.set(this.items, index, show)
          }
        }
      },
      updateTags (tags) {
        let index = this.getIndexBySlug(tags.slug)
        if (index !== false) {
          Vue.set(this.items[index], 'tags', tags.tags)
        }
      },
      updateTopic (topic) {
        let index = this.getIndexBySlug(topic.slug)
        if (index !== false) {
          Vue.set(this.items[index], 'topic', topic.topic)
        }
      }
    },
    methods: {
      getIndexBySlug (slug) {
        if (this.itemsMap[slug] || this.itemsMap[slug] === 0) {
          return this.itemsMap[slug]
        } else {
          return false
        }
      },
      setData (list, tags) {
        console.log(' --- SET DATA ---', list, tags)
        this.items = list.docs
        this.limit = list.limit
        this.offset = list.offset
        this.page = list.page
        this.pages = list.pages
        this.total = list.total

        this.itemsMap = []
        if (list.docs && list.docs.length) {
          for (let i = 0; i < list.docs.length; i++) {
            this.itemsMap[list.docs[i].slug] = i
          }
        }
      },
      loadBroadcasters (tags = this.tags) {
        console.log(' --- loadBroadcasters ---')
        this.$socket.emit('broadcasterlist', {tags}, this.setData)
      }
    },
    mounted () {
      this.loadBroadcasters()
    }
  }
</script>
<style>

  .broadcaster-grid {
    overflow: hidden;
    width: 100%;
  }
  .broadcaster-grid-inner {
    font-size: 0;
    white-space: nowrap;
    margin: 15px 0;
    padding-bottom: 10px;
  }

</style>
