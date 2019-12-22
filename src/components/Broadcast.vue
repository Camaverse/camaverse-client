<template lang="pug">
    .broadcast
        .broadcast-inner
            video-screen
            chat-panel
</template>

<script>
import ChatPanel from './ChatPanel'
import VideoScreen from './VideoScreen'
export default {
  name: 'broadcast',
  components: { VideoScreen, ChatPanel }
}
</script>
<style>
    .broadcast-inner {
        display: flex;
        height: 500px;
        position: relative;
    }
</style>
