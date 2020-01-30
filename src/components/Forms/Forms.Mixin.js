export default {
  data () {
    return {
      form: {},
      errors: [],
      hasError: false,
      submitted: false
    }
  },
  methods: {
    openForm () {
      this.submitted = false
      this.hasError = false
    }
  }
}
