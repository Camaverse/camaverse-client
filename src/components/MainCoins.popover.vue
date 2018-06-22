<template>
  <b-popover :target="target"
             :placement="placement"
             :title="title"
             :show="mainCoinsFormShowing"
             @show="showMainCoinsForm"
  >
    <buy-coins-form></buy-coins-form>

    <p>
      <button class="btn btn-danger mt-2" @click="hideMainCoinsForm()">Close</button>
    </p>
  </b-popover>
</template>
<script>
import BuyCoinsForm from './BuyCoinsForm'
import PopOver from '../mixins/poper.mixins'
import {mapState, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapState({
      mainCoinsFormShowing: state => state.app.showMainCoinsForm
    })
  },
  methods: {
    ...mapMutations({
      hideMainCoinsForm: 'app/hideMainCoinsForm',
      showMainCoinsForm: 'app/showMainCoinsForm'
    })
  },
  components: {
    BuyCoinsForm
  },
  mixins: [PopOver],
  name: 'cwl-popover',
  props: ['placement', 'target', 'title']
}
</script>
