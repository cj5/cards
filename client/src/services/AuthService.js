import Api from './Api'

export default {
  signUp(creds) {
    return Api().post('/sign-up', creds)
  },
  logIn(creds) {
    console.log('HEY FROM CLIENT:', creds.username)
    return Api().get(`/user/${creds.username}`)
  }
}