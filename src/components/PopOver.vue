<template>
  <b-popover :target="target"
             :placement="placement"
             :title="title"
             :disabled="!isLoggedIn "
             @show="onShow()"
  >
    <buy-coins-form></buy-coins-form>

    <p>
      <button class="btn btn-danger mt-2" @click="close()">Close</button>
    </p>
  </b-popover>
</template>
<script>
import BuyCoinsForm from './BuyCoinsForm'
import {mapGetters} from 'vuex'
import PopOver from '../mixins/poper.mixins'
export default {
  components: {
    BuyCoinsForm
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    })
  },
  mixins: [PopOver],
  name: 'cwl-popover',
  props: ['placement', 'target', 'title']
}
</script>
