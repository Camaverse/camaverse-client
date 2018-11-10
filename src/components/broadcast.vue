<template lang="pug">
    .broadcast
        video-screen
        chat-panel
</template>

<script>
    import ChatPanel from "./chat-panel";
    import VideoScreen from "./video-screen";
    export default {
        name: 'broadcast',
        components: {VideoScreen, ChatPanel}
    }
</script>
<style>
    .broadcast {
        display: flex;
        height: 500px;
        position: relative;
    }
</style>