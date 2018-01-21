module.exports = {
  methods: {
    onShow () {
      this.$root.$emit('bv::hide::popover')
    },
    close () {
      this.$root.$emit('bv::hide::popover')
    }
  }
}
