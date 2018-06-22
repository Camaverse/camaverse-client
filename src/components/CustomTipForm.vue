<template>
  <p v-if="offline">
    <strong>{{currentRoom.username}}</strong>
    is offline but will still receive your tip.</p>
  <label><input type="checkbox" v-model="isTipPrivate"> Tip Privately</label>
  <hr>
  <p>
    <b-btn @click="setTipAmount(tip)" class="mr-1" variant="warning" :tip="tip" v-for="tip in tipAmountsUser" :key="tip" :id="'tip-more-'+tip"> {{tip}} </b-btn>
  </p>
  <p>
    <b-btn @click="setTipAmount(tip)" class="mr-1" variant="warning" :tip="tip" v-for="tip in tipAmountsMore" :key="tip" :id="'tip-more-'+tip"> {{tip}} </b-btn>
  </p>
  <hr>
  <div class="flex">
    <strong>
      Custom Amount:
    </strong>
    <input type="number" min="0" class="custom-tip-input form-control ml-3" placeholder="0" v-model="tip">
  </div>
  <textarea class="form-control" v-model="tipMessage"></textarea>
  <p>
    <button class="btn btn-primary btn-sm" @click="sendTip(tip)" :disabled="!enableCustom" >Send</button>
    <label><input type="checkbox" v-model="isTipMsgPrivate"> Message Privately</label>
  </p>
  <p>
    <b-btn class="btn btn-danger" @click="close()">Cancel</b-btn>
  </p>
</template>
<script>
import TipsMixin from '@/components/tips.mixin'
export default {
  mixins: [TipsMixin]
}
</script>
