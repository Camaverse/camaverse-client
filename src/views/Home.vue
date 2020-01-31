<template lang="pug">
  .home
      carousel(:perPage="1", :autoplay="true", :paginationEnabled="false", :autoplayTimeout="3000", :loop="true")
          slide(v-for="item in slides", :key="item")
            .slide-inner
              nsfw-img(:url="`/img/000${item}.jpg`" width="100%")
</template>
<script>
import NsfwImg from '../components/NSFWImg'
export default {
  name: 'home',
  components: { NsfwImg },
  data () {
    return {
      slides: [
        1, 2, 3
      ]
    }
  }
}
</script>
<style>
    .VueCarousel-slide {
        height: 400px;
    }
    .slide-inner{
        align-items: center;
        background-color: #ccc;
        display: flex;
        height: 100%;
        justify-content: center;
    }
</style>
