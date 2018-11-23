<template lang="pug">
  .watch
    header.header-watch
        h1.mr-2 {{username}}
        h4.text-muted.mb-0 {{topic}}
    section.content-watch
        broadcast
</template>
<script>
import Broadcast from "@/components/Broadcast";
export default {
    name: 'watch',
    components: {Broadcast},
    data () {
        return {
            username: 'Username Here',
            topic: 'The topic goes here'
        }
    }
}
</script>
<style>
    .header-watch {
        display: flex;
        align-items: center;
    }
</style>