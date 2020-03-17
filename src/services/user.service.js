import ServiceBase from './service'
const apiUser = process.env.VUE_APP_USER_SERVICE_URL

export default class UserService {
  guestNew () {
    return ServiceBase.post(`${apiUser}guest`)
  }
  join (email, username, deviceID) {
    return ServiceBase.post(`${apiUser}join`, { email, username, deviceID })
  }
  login (token, deviceID) {
    return ServiceBase.get(`${apiUser}login?token=${token}&deviceID=${deviceID}`)
  }
  loginLink (email, deviceID) {
    return ServiceBase.get(`${apiUser}loginLink?email=${email}&deviceID=${deviceID}`)
  }
  logout (slug) {
    return new Promise((resolve, reject) => {
      ServiceBase.get(`${apiUser}logout/${slug}`)
        .then(resolve)
        .catch(reject)
    })
  }
}
