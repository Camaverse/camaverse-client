<template lang="pug">
    b-form(@submit='onSubmit')
        h2 Login
        b-form-group#loginEmailGroup
            b-form-input#loginEmail(type='email', v-model='form.email', required='', placeholder='Enter email')
        b-button(type='submit', variant='primary') Submit
</template>
<script>
import FormMixin from '@/components/Forms/Forms.Mixin'
export default {
  name: 'login-form',
  mixins: [FormMixin]
}
</script>
