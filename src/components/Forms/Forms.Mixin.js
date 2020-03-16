export default {
  data () {
    return {
      form: {},
      errors: [],
      hasError: false,
      hasSuccess: false,
      submitted: false
    }
  },
  methods: {
    openForm () {
      this.submitted = false
      this.hasError = false
      this.hasSuccess = false
    }
  }
}
