<template lang="pug">
    .login.header-form(:class="{hasError, submitted}")
        b-form(@submit.prevent='onSubmit', v-if='!submitted')
            h2 Login
            b-form-group#loginEmailGroup
                b-form-input#loginEmail(type='email', v-model='form.email', required='', placeholder='Enter email')
            b-button(type='submit', variant='primary') Submit
        div(v-if='submitted')
            div(v-if='hasError')
                h2 There was an error.
                p
                    a(href="#", @click.prevent="openForm()") Please try again.
            div(v-else-if='hasSuccess')
                h2 Please Check Your Inbox.
                p A login link has been sent to the email.
                p
                    a(href="#", @click.prevent="openForm()") Resend
            div(v-else)
                h2 Logging In
                p Hitting the backend!
</template>
<script>
import FormMixin from '@/components/Forms/Forms.Mixin'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'login-form',
  mixins: [FormMixin],
  data () {
    return {
      form: {
        email: 'larry.l.sharpe@gmail.com'
      }
    }
  },
  computed: {
    ...mapState({
      deviceID: state => state.app.deviceID
    })
  },
  methods: {
    onSubmit () {
      this.submitted = true
      const { form: { email }, deviceID } = this
      this.loginLink({ email, deviceID })
        .then( () => {
          this.hasSuccess = true;
        })
        .catch(() => {
          this.hasError = true
        })
    },
    ...mapActions('user', { loginLink: 'loginLink' })
  }
}
</script>
