<template lang="pug">
  .login.flex
    login-form.flex-1.mr-2(:onSubmit="onSubmitLogin")
    join-form.flex-1(:onSubmit="onSubmitJoin")
</template>
<script>
    import LoginForm from "../components/forms/login.form";
    import JoinForm from "../components/forms/join.form";
    export default {
        components: {JoinForm, LoginForm},
        methods: {
            onSubmitLogin () {
                console.log('login submitted')
            },
            onSubmitJoin () {
                console.log('join submitted')
            }
        }
    }
</script>