<template lang="pug">
    b-form(@submit='onSubmit')
        h2 Join
        b-form-group#joinEmailGroup(description="We'll never share your email with anyone else.")
            b-form-input#joinEmail(type='email', v-model='form.email', required='', placeholder='Enter email')
        b-form-group#joinUsernameGroup
            b-form-input#joinUsername(type='text', v-model='form.username', required='', placeholder='Enter username')
        b-button(type='submit', variant='primary') Submit
</template>
<script>
import FormMixin from '@/components/Forms/Forms.Mixin'
export default {
  name: 'join-form',
  mixins: [FormMixin]
}
</script>
