<template lang="pug">
    .signup.header-form(:class="{hasError, submitted}")
        b-form(@submit='onSubmit', v-if='!submitted')
            h2 Join
            b-form-group#joinEmailGroup(description="We'll never share your email with anyone else.")
                b-form-input#joinEmail(type='email', v-model='form.email', required='', placeholder='Enter email')
            b-form-group#joinUsernameGroup
                b-form-input#joinUsername(type='text', v-model='form.username', required='', placeholder='Enter username')
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
                h2 Signing You Up
                p Hitting the backend!
</template>
<script>
import FormMixin from '@/components/Forms/Forms.Mixin'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'join-form',
  mixins: [FormMixin],
  data () {
    return {
      form: {
        email: 'larry.l.sharpe@gmail.com',
        username: 'lovinlyfehard'
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
      const { form: { email, username }, deviceID } = this
      this.join({ email, username })
        .then(() => {
            this.hasSuccess = true
            return this.loginLink({ email, deviceID })
        })
        .catch(() => {
          this.hasError = true
        })
    },
    ...mapActions('user', { join: 'join', loginLink: 'loginLink' })
  }
}
</script>
