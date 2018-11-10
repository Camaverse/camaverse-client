<template lang="pug">
    b-form(@submit='onSubmit')
        h2 Login
        b-form-group#loginEmailGroup
            b-form-input#loginEmail(type='email', v-model='form.email', required='', placeholder='Enter email')
        b-button(type='submit', variant='primary') Submit
</template>
<script>
import FormMixin from '@/mixins/forms.mixin'
export default {
    name: 'login-form',
    mixins: [FormMixin]
}
</script>