import Api from './Api'

export default {
  signUp(creds) {
    return Api().post('/sign-up', creds)
  },
  logIn(creds) {
    return Api().post('/log-in', creds)
  }
}