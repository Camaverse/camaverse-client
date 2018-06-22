
import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'
import PopOver from '@/components/PopOver'
import PopOverMixin from '@/mixins/poper.mixins'

export default {
  components: {PopOver},
  mixins: [PopOverMixin],
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters({
      currentRoom: 'chat/currentRoom',
      offline: 'chat/offline'
    }),
    disableOfflineWarning: {
      get () {
        return this.user.disableOfflineWarning
      },
      set (value) {
        this.$store.commit('user/updateOfflineWarning', value)
      }
    },
    allowShowOfflineMsg () {
      return !this.disableOfflineWarning && this.offline
    }
  },
  data () {
    return {
      selectedTipAmount: null,
      showOfflinePopup: false,
      showNotEnoughTokens: false
    }
  },
  methods: {
    ...mapActions({
      sendTipStore: 'coins/sendTip'
    }),
    ...mapMutations({
      showMainCoinsForm: 'app/showMainCoinsForm'
    }),
    openCoinsForm () {
      this.showNotEnoughTokens = false
      this.showMainCoinsForm()
    },
    setTipAmount (amount) {
      this.tip = amount
    },
    sendTip () {
      if (this.allowShowOfflineMsg) {
        this.showOfflinePopup = true
      } else {
        this.emitTip()
      }
    },
    sendOfflineTip () {
      this.emitTip(this.selectedTipAmount)
    },
    emitTip (amount) {
      this.sendTipStore(amount || this.tip)
        .catch(errors => {
          if (errors.message === 'Declined. Not Enough Tokens.') {
            this.showNotEnoughTokens = true
          }
        })
    }
  }
}
