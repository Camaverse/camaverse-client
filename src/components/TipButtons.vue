<template>
    <b-btn @click="sendTip()" variant="warning" class="mr-1" :id="id">
      {{tip}}

      <b-popover :target="id"
                 placement="top"
                 :disabled="true"
                 :show.sync="showNotEnoughTokens"
                 @show="onShow()"
                 title="You need More Tokens!">
        <b-btn class="btn btn-success" @click="openCoinsForm()">Get More Tokens</b-btn>
        <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
      </b-popover>
      <b-popover :target="id "
                 placement="top"
                 :disabled="true"
                 :show.sync="showOfflinePopup"
                 @show="onShow()"
                 title="Broadcaster is Offline!">
        <p>
          <label>
            <input type="checkbox" v-model="disableOfflineWarning"> Don't Show Again
          </label>
        </p>
        <b-btn class="btn btn-success" @click="sendOfflineTip()">Send Offline Tip</b-btn>
        <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
      </b-popover>

    </b-btn>
</template>
<script>
  import TipsMixin from '../mixins/tips.mixin'
  export default {
    mixins: [TipsMixin],
    props: ['tip', 'id']
  }
</script>
