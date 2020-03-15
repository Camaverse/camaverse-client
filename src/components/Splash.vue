<template lang="pug">
    .splash(v-if='isShowing')
        div
            .brand
                | Camaverse
                span.text-brand-alt.brand-small .com
                .brand-slogan It's Your World To Share
            span.funny(:class="{isError}")
                | {{currentPhrase}}
</template>

<script>
import { mapState } from 'vuex'
import errors from '../config/error-phrases'
import phrases from '../config/splash-phrases'
export default {
  methods: {
    setPhrase () {
      if (!this.isShowing || this.isError) this.stopTimer()
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
      errorAttempts: state => state.app.errorAttempts,
      isShowing: state => state.app.showSplash,
      isError: state => state.app.isError
    }),
    currentPhrase: function () {
      return this.isError ? this.errorMsg : this.phrases[this.currentPhraseIndex]
    },
    errorMsg: function () {
      return this.errorAttempts > 3 ? this.errors[this.errors.length - 1] : this.errors[this.errorAttempts - 1]
    }
  },
  data () {
    return {
      interval: null,
      currentPhraseIndex: 0,
      errors,
      phrases
    }
  }
}
</script>

<style lang="scss">
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
        font-size: 10vw;
        text-align: center;
    }

    .funny {
        color: #ccc;
        font-size: 3vw;
        &.isError {
            color: #ff0000;
        }
    }

    .brand-slogan {
        border-top: 3px #CA907E solid;
        color: #006992;
        font-size: .57em;
        margin-top: 10px;
        padding-top: 10px;
    }
</style>
