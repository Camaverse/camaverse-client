<template lang="pug">
    .login
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
export default {
  name: 'login-form',
  mixins: [FormMixin],
  methods: {
    onSubmit () {
      this.submitted = true
    }
  }
}
</script>
