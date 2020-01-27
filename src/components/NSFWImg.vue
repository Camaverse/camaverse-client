<template lang="pug">
    span
        img(:src="src", :width="width")
</template>
<script>
export default {
  name: 'nsfw-img',
  props: ['url', 'width'],
  computed: {
    src: function () {
      return this.nsfw ? this.url : ''
    }
  },
  data () {
    return {
      nsfw: JSON.parse(process.env.VUE_APP_NSFW)
    }
  }
}
</script>
