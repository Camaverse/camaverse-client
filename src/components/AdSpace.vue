<template lang="pug">
    div
        .ad-container(:class="orientClass", v-if="!removeAds")
            .ad-wrapper
                span Ad
                .ad-space
                a(href="#") Remove Ads
</template>
<style lang="scss">
    .ad-container {
        color: #000;
        background-color: #eeeeee;
        padding: 20px 0;
        a {
            color: #000;
        }
        &.vertical {
            height: 100%;
            margin: 0 10px;
            width: 200px;
        }
    }
    .ad-space {
        background-color: #ccc;
        cursor: pointer;
        height: 125px;
    }
    .ad-wrapper {
        margin: auto;
        width: 900px;
        max-width: 80%;
    }
    .vertical {
        .ad-wrapper {
            height: 100%;
            padding: 0 20px;
            width: auto;
        }
        .ad-space {
            width: 100%;
            height: 80%;
        }
    }
</style>
<script>
import { mapState } from 'vuex'

export default {
  name: 'ad-space',
  props: ['orientation'],
  computed: {
    orientClass: function () {
      return this.orientation === 'vertical' ? 'vertical' : 'horizontal'
    },
    ...mapState({
      removeAds: state => state.app.removeAds
    })
  }
}
</script>
