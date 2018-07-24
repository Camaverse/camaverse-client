<template>
  <div class="splash" v-if="isShowing">
    <div>
      <div class="brand">
        Camaverse<span class="text-brand-alt brand-small">.com</span>
        <div class="brand-slogan">It's Your World To Share</div>
      </div>
      <span class="funny">
        {{currentPhrase}}
      </span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  methods: {
    setPhrase () {
      if (!this.isShowing) this.stopTimer()
      else {
        this.currentPhraseIndex = Math.floor(Math.random() * this.phrases.length)
      }
    },
    startTimer () {
      this.interval = setInterval(this.setPhrase, 5000)
    },
    stopTimer () {
      clearInterval(this.interval)
    }
  },
  created () {
    this.startTimer()
  },
  computed: {
    ...mapState({
      isShowing: state => state.app.showSplash
    }),
    currentPhrase: function () {
      return this.phrases[this.currentPhraseIndex]
    }
  },
  data () {
    return {
      interval: null,
      currentPhraseIndex: 0,
      phrases: [
        'Ensuring that these are the droids you are looking for...',
        'Obfuscating quantum entaglement',
        'TODO: Insert elevator music',
        'Chuck Norris doesn’t wear a watch. HE decides what time it is.',
        'Deleting all your hidden porn...'
      ]
    }
  }
}
</script>

<style>
  .splash {
    background: rgb(39,71,110);
    background: radial-gradient(circle, rgba(39,71,110,1) 35%, rgba(0,29,74,1) 100%);
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 75px;
    text-align: center;
  }

  .funny {
    color: #ccc;
    font-size: .4em;
  }

  .brand-slogan {
    border-top: 3px #CA907E solid;
    color: #006992;
    font-size: .57em;
    margin-top: 10px;
    padding-top: 10px;
  }
</style>
