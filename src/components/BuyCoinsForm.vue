<template>
  <div>
    <table width="250">
      <tr>
        <th>Coins</th>
        <th class="text-center">Cost</th>
        <th class="text-center">Save</th>
      </tr>
      <tr class="mr-1 mb-1" v-for="purchase in purchases" :key="purchase.coins">
        <td>{{purchase.coins}}</td>
        <td class="text-center"><button class="btn btn-outline-success btn-sm">${{purchase.cost}}</button></td>
        <td class="text-center">{{savings(purchase.coins, purchase.cost)}}%</td>
        <td>
          <button class="btn btn-success btn-sm" @click="buyCoins(purchase.coins)"> Buy! </button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'broadcaster',
        'user'
      ])
    },
    data () {
      return {
        purchases: [
          {coins: 100, cost: 12.99},
          {coins: 250, cost: 27.99},
          {coins: 500, cost: 49.99},
          {coins: 1000, cost: 92.99},
          {coins: 1500, cost: 134.99}
        ]
      }
    },
    methods: {
      buyCoins (coins) {
        let purchase = this.createPurchase(coins)
        this.$socket.emit('buyCoins', purchase, this.handleBuyCoins)
      },
      createPurchase (coins) {
        return {
          units: coins,
          from: {
            slug: this.user.slug,
            username: this.user.username
          },
          clientTime: Date.now()
        }
      },
      handleBuyCoins (data) {
        if (data.errors) {
          console.log('errors: ', data.errors)
        } else {
          this.$store.commit('updateCoins', data)
          this.setUser(this.user)
        }
      },
      savings (coins, cost) {
        const fullPricePerCoin = 12.99 / 100
        const regularPriceOfPurchase = coins * fullPricePerCoin
        const savings = (cost * 100) / regularPriceOfPurchase
        return 100 - Math.ceil(savings)
      },
      setUser (user) {
        let userString = JSON.stringify(user)
        this.$store.commit('setUser', user)
        this.$localStorage.set('user', userString)
      }
    },
    name: 'buy-coins-form'
  }
</script>
