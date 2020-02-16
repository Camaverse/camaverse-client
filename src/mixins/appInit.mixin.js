import { mapActions, mapMutations } from 'vuex'

export default {
  methods: {
    storageDataInit () {
      this.setDeviceID()
      this.initUser()
        .then(() => {
          sessionStorage.removeItem('errorAttempts')
          this.setErrorAttempts(0)
        })
        .catch(err => {
          const errorAttempts = Number(sessionStorage.getItem('errorAttempts')) + 1
          sessionStorage.setItem('errorAttempts', JSON.stringify(errorAttempts))
          this.setErrorAttempts(errorAttempts)
          this.showSplash(err)
        })
    },
    ...mapMutations('app', { showSplash: 'SHOW_SPLASH', setErrorAttempts: 'ERROR_ATTEMPTS', setDeviceID: 'SET_DEVICE_ID' }),
    ...mapActions('user', { initUser: 'init' })
  }
}
