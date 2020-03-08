<template lang="pug">
    .chat-container
        .chat-advisories
            carousel( :perPage="1", :autoplay="false", :paginationEnabled="false")
                slide.slide
                    .slide-inner
                        h1 Since this is your first time chatting here.
                        p We are gonna lay down the law.
                slide.slide
                    .slide-inner
                        h1 #1
                        h2 Don't Be Demanding
                        p There is a time and place for it. But free chat ain't it.
                slide.slide
                    .slide-inner
                        h1 #2
                        h2 Don't Be Disruptive
                        p No spamming the chat room.
                            br
                            | No Arguing.
                            br
                            | No Heckling The Broadcasters.
                            br
                            | Don't Be Rude
                slide.slide
                    .slide-inner
                        h1 #3
                        h2 Don't Give Out Personal Info
                        p We can't protect your privacy if you're giving out your info.
                slide.slide
                    .slide-inner
                        h1 That's It!
                        h2 Ok You're Ready to Chat.
                        b-btn.btn-primary Start Chatting
        beautiful-chat#chat(
        :participants="participants",
        :titleImageUrl="titleImageUrl",
        :onMessageWasSent="onMessageWasSent",
        :messageList="messageList",
        :newMessagesCount="newMessagesCount",
        :isOpen="false",
        :close="blank",
        :open="blank",
        :showEmoji="true",
        :showFile="true",
        :showTypingIndicator="showTypingIndicator",
        :colors="colors",
        :alwaysScrollToBottom="alwaysScrollToBottom")
</template>

<script>
import Vue from 'vue'
import Chat from 'vue-beautiful-chat'
Vue.use(Chat)
export default {
  name: 'chat-panel',
  data () {
    return {
      participants: [
        {
          id: 'system',
          name: 'Camaverse System'
        },
        {
          id: 'user2',
          name: 'Support'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
        { type: 'text', author: `me`, data: { text: `Say yes!` } },
        { type: 'text', author: `user1`, data: { text: `No.` } },
        { type: 'text', author: `user1`, data: { text: `No.` } },
        { type: 'text', author: `user1`, data: { text: `No.` } },
        { type: 'text', author: `user1`, data: { text: `No.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: true, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    }
  },
  methods: {
    openChat () {},
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
    },
    blank () {}
  }
}
</script>

<style lang="scss">
#chat {
    height: 100%;
    .sc-launcher {
        display: none;
    }
    .sc-chat-window {
        bottom: unset;
        box-shadow: unset;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        right: unset;
    }
    .sc-header {
        display: none;
    }
    .sc-message-list {
        flex: 1
    }
}
.chat-container {
    position: relative;
    .chat-advisories {
        background-color: #005f85;
        color: #fff;
        height: 500px;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 2;
        .slide {
            padding: 5px;
            display: flex;
            align-items: center;
            text-align: center;
        }
        .slide-inner {
            width: 100%;
        }
        .VueCarousel, .VueCarousel-wrapper, .VueCarousel-inner {
            height: 100% !important;
        }
    }
}

</style>
