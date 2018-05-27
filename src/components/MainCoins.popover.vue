<template>
  <b-popover :target="target"
             :placement="placement"
             :title="title"
             :show.sync="showMainCoinsForm"
             @show="onShow()"
  >
    <buy-coins-form></buy-coins-form>

    <p>
      <button class="btn btn-danger mt-2" @click="onClose()">Close</button>
    </p>
  </b-popover>
</template>
<script>
import BuyCoinsForm from './BuyCoinsForm'
import PopOver from '../mixins/poper.mixins'
export default {
  computed: {
    showMainCoinsForm: {
      get () {
        return this.$store.state.app.showMainCoinsForm
      },
      set (value) {
        this.$store.commit('app/updateShowMainCoinsForm', value)
      }
    }
  },
  methods: {
    onClose () {
      this.$store.commit('app/updateShowMainCoinsForm', false)
    }
  },
  components: {
    BuyCoinsForm
  },
  mixins: [PopOver],
  name: 'cwl-popover',
  props: ['placement', 'target', 'title']
}
</script>
