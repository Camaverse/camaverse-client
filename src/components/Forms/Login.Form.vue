<template lang="pug">
    .login.header-form
        b-form(@submit.prevent='onSubmit', v-if='!submitted')
            h2 Login
            b-form-group#loginEmailGroup
                b-form-input#loginEmail(type='email', v-model='form.email', required='', placeholder='Enter email')
            b-button(type='submit', variant='primary') Submit
        div(v-if='submitted')
            h2 Please Check Your Inbox.
            p A login link has been sent to the email.
            p
                a(href="#", @click.prevent="openForm()") Resend
</template>
<script>
import FormMixin from '@/components/Forms/Forms.Mixin'
import { mapActions } from 'vuex'
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
  methods: {
    onSubmit () {
      this.submitted = true
      this.login(this.form.email)
    },
    ...mapActions('user', { login: 'login' })
  }
}
</script>
