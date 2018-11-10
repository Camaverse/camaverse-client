<template lang="pug">
  .join.flex
      join-form.flex-1.mr-2(:onSubmit="onSubmitJoin")
      login-form.flex-1(:onSubmit="onSubmitLogin")
</template>
<script>
    import JoinForm from "../components/forms/join.form";
    import LoginForm from "../components/forms/login.form";
    export default {
        components: {LoginForm, JoinForm},
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