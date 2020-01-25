<template lang="pug">
  .home
      carousel(:perPage="1", :autoplay="true", :paginationEnabled="false", :autoplayTimeout="3000")
          slide(v-for="item in slides", :key="item")
            .slide-inner
              img(src="/img/0001.jpg" width="100%")
</template>
<script>
export default {
  name: 'home',
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
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
