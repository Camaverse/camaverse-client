import ServiceBase from './service'
const apiBase = process.env.VUE_APP_AUTH_SERVICE_URL
const apiUser = process.env.VUE_APP_USER_SERVICE_URL

export default class UserService {
  guestNew () {
    return ServiceBase.post(apiUser + 'guest')
  }
  loginLink (email, deviceID) {
    return ServiceBase.get(`${apiUser}loginLink?email=${email}&deviceID=${deviceID}`)
  }
  logout (slug) {
    return new Promise((resolve, reject) => {
      ServiceBase.post(apiBase + 'logout', { slug })
        .then(resolve)
        .catch(reject)
    })
  }
}
