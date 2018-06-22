<template>
  <div>
    <span v-if="!isLoggedIn">
      <a href="#" class="btn btn-success mr-1" v-b-modal.signupModal @click.prevent>Get Coins</a>
    </span>
    <span v-else>
      <a href="#" class="btn btn-success mr-1" id="get-more" @click.prevent="openCoinsForm()">Get Coins</a>
    </span>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapState({
        isLoggedIn: state => state.user.isLoggedIn
      }),
      ...mapMutations({
        showMainCoinsForm: 'app/showMainCoinsForm'
      }),
      openCoinsForm () {
        this.showMainCoinsForm()
      }
    }
  }
</script>
